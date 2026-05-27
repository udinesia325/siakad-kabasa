<?php

// app/Http/Controllers/KehadiranController.php

namespace App\Http\Controllers;

use App\Exports\KehadiranExport;
use App\Http\Requests\StoreAnulirAbsensiRequest;
use App\Models\Absensi;
use App\Models\AnulirAbsensi;
use App\Models\HariLibur;
use App\Models\JadwalAbsensiLog;
use App\Models\KelasAjaran;
use App\Models\Siswa;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class KehadiranController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $isSuperadmin = $user->isSuperadmin();
        $isWaliKelasScope = ! $isSuperadmin
            && ! $user->hasPermissionTo('kehadiran.view_scope_semua')
            && $user->hasPermissionTo('kehadiran.view_scope_wali');

        $query = KelasAjaran::with(['kelas', 'tingkat', 'tahunAjaran'])
            ->withCount('siswa')
            ->aktif()
            ->orderBy('tingkat_id')
            ->orderBy('kelas_id');

        if ($isWaliKelasScope) {
            $pegawaiId = $user->pegawai?->id;
            if ($pegawaiId) {
                $query->where('pegawai_id', $pegawaiId);
            } else {
                $query->whereRaw('1 = 0');
            }
        }

        if ($request->filled('search')) {
            $query->whereHas('kelas', fn ($q) => $q->where('nama', 'like', "%{$request->search}%"));
        }

        return Inertia::render('kehadiran/index', [
            'kelas' => $query->paginate(12)->withQueryString(),
            'filters' => $request->only('search'),
            'view_scope' => $isWaliKelasScope ? 'wali_kelas' : 'semua_kelas',
        ]);
    }

    public function show(Request $request, KelasAjaran $kelasAjaran): BinaryFileResponse|Response|HttpResponse
    {
        // Fix Important 5: eager-load tahunAjaran to avoid lazy load
        $kelasAjaran->load(['tahunAjaran', 'kelas.jurusan', 'tingkat']);

        [$dari, $sampai] = $this->resolvePeriode($request);

        $siswaList = Siswa::query()
            ->whereHas('riwayatKelas', function ($q) use ($kelasAjaran, $dari, $sampai) {
                $q->where('kelas_ajaran_id', $kelasAjaran->id)
                    ->where('mulai', '<=', $sampai->copy()->endOfDay())
                    ->where(function ($qq) use ($dari) {
                        $qq->whereNull('selesai')->orWhere('selesai', '>=', $dari->copy()->startOfDay());
                    });
            })
            ->orderBy('nama')
            ->get(['id', 'nama', 'nisn']);
        $siswaIds = $siswaList->pluck('id');

        // Query 1: semua record absensi dalam rentang
        $absensiRows = Absensi::where('reff_type', 'm_siswa')
            ->whereIn('reff_id', $siswaIds)
            ->whereBetween('waktu_absen', [
                $dari->copy()->startOfDay()->toDateTimeString(),
                $sampai->copy()->endOfDay()->toDateTimeString(),
            ])
            ->get(['reff_id', 'tipe', 'waktu_absen']);

        // Query 2: semua anulir dalam rentang
        $anulirRows = AnulirAbsensi::whereIn('siswa_id', $siswaIds)
            ->whereBetween('tanggal', [$dari->toDateString(), $sampai->toDateString()])
            ->with('anulirOleh:id,name')
            ->get();

        // Preload log jadwal absensi historis untuk seluruh rentang periode
        $jadwalLogs = JadwalAbsensiLog::preloadUntukRentang($sampai);

        // Libur insidental dari tabel m_hari_libur
        $liburInsidental = HariLibur::whereBetween('tanggal', [$dari->toDateString(), $sampai->toDateString()])
            ->pluck('tanggal')
            ->map(fn ($tgl) => $tgl->toDateString())
            ->flip()
            ->map(fn () => true);

        // Build tanggal list & libur map (gabungan jadwal historis + insidental)
        $tanggalList = [];
        $liburMap = [];
        $current = $dari->copy();
        while ($current->lte($sampai)) {
            $tglStr = $current->toDateString();
            $tanggalList[] = $tglStr;
            $jadwal = JadwalAbsensiLog::resolveUntukTanggal($jadwalLogs, $current);
            $liburMap[$tglStr] = ($jadwal && $jadwal->is_libur) || isset($liburInsidental[$tglStr]);
            $current->addDay();
        }

        // Index absensi: [siswa_id][date][tipe] = waktu
        $absensiIndex = [];
        foreach ($absensiRows as $row) {
            $date = Carbon::parse($row->waktu_absen)->toDateString();
            $absensiIndex[$row->reff_id][$date][$row->tipe] = Carbon::parse($row->waktu_absen)->format('H:i');
        }

        // Index anulir: [siswa_id][date] = anulir
        $anulirIndex = [];
        foreach ($anulirRows as $a) {
            $anulirIndex[$a->siswa_id][$a->tanggal->toDateString()] = $a;
        }

        $matrix = [];
        foreach ($siswaList as $siswa) {
            $matrix[$siswa->id] = [];
            foreach ($tanggalList as $tgl) {
                // Hari libur tidak masuk matrix — tidak dihitung sebagai status apapun
                if ($liburMap[$tgl] ?? false) {
                    continue;
                }

                $anulir = $anulirIndex[$siswa->id][$tgl] ?? null;
                $absenMasuk = $absensiIndex[$siswa->id][$tgl]['masuk'] ?? null;
                $absenPulang = $absensiIndex[$siswa->id][$tgl]['pulang'] ?? null;

                $statusOtomatis = 'alpha';
                if ($absenMasuk) {
                    $jadwal = JadwalAbsensiLog::resolveUntukTanggal($jadwalLogs, Carbon::parse($tgl));
                    $terlambat = $jadwal && $jadwal->jam_masuk_max
                        && $absenMasuk > $jadwal->jam_masuk_max->format('H:i');
                    $statusOtomatis = $terlambat ? 'terlambat' : 'hadir';
                }

                $matrix[$siswa->id][$tgl] = [
                    'status' => $anulir ? $anulir->status : $statusOtomatis,
                    'is_anulir' => (bool) $anulir,
                    'jam_masuk' => $absenMasuk,
                    'jam_pulang' => $absenPulang,
                    'anulir' => $anulir ? [
                        'id' => $anulir->id,
                        'status' => $anulir->status,
                        'keterangan' => $anulir->keterangan,
                        'bukti' => collect($anulir->bukti ?? [])->map(fn ($p) => Storage::disk('r2')->url($p))->values(),
                        'anulir_oleh' => $anulir->anulirOleh?->name,
                        'updated_at' => $anulir->updated_at->format('d M Y H:i'),
                    ] : null,
                ];
            }
        }

        if ($request->boolean('export')) {
            $slug = Str::slug($kelasAjaran->nama_lengkap).'-'.$dari->format('Y-m-d').'-'.$sampai->format('Y-m-d');

            if ($request->input('format') === 'pdf') {
                $hariId = ['Mon' => 'Sen', 'Tue' => 'Sel', 'Wed' => 'Rab', 'Thu' => 'Kam', 'Fri' => 'Jum', 'Sat' => 'Sab', 'Sun' => 'Min'];
                $statusHuruf = ['hadir' => 'H', 'terlambat' => 'T', 'alpha' => 'A', 'sakit' => 'S', 'izin' => 'I', 'dispensasi' => 'D'];
                $statusLabel = ['hadir' => 'H — Hadir', 'terlambat' => 'T — Terlambat', 'alpha' => 'A — Alpha', 'sakit' => 'S — Sakit', 'izin' => 'I — Izin', 'dispensasi' => 'D — Dispensasi'];

                $totals = array_fill_keys(array_keys($statusHuruf), 0);
                foreach ($siswaList as $siswa) {
                    foreach ($tanggalList as $tgl) {
                        if ($liburMap[$tgl] ?? false) {
                            continue;
                        }
                        $cell = $matrix[$siswa->id][$tgl] ?? null;
                        if ($cell && isset($totals[$cell['status']])) {
                            $totals[$cell['status']]++;
                        }
                    }
                }

                $pdf = Pdf::loadView('exports.kehadiran.rekap', [
                    'kelas' => $kelasAjaran,
                    'siswaList' => $siswaList->toArray(),
                    'tanggalList' => $tanggalList,
                    'liburMap' => $liburMap,
                    'matrix' => $matrix,
                    'dari' => $dari->format('Y-m-d'),
                    'sampai' => $sampai->format('Y-m-d'),
                    'dariFormatted' => $dari->translatedFormat('d F Y'),
                    'sampaiFormatted' => $sampai->translatedFormat('d F Y'),
                    'hariId' => $hariId,
                    'statusHuruf' => $statusHuruf,
                    'statusLabel' => $statusLabel,
                    'totals' => $totals,
                    'generatedAt' => Carbon::now()->translatedFormat('d F Y, H:i'),
                ])->setPaper('a4', 'landscape');

                $namaFilePdf = 'Rekap Kehadiran '.$kelasAjaran->nama_lengkap
                    .' Periode '.$dari->translatedFormat('d F Y')
                    .' sampai '.$sampai->translatedFormat('d F Y').'.pdf';

                return $pdf->download($namaFilePdf);
            }

            return Excel::download(
                new KehadiranExport(
                    $kelasAjaran,
                    $siswaList->toArray(),
                    $tanggalList,
                    $liburMap,
                    $matrix,
                    $dari->format('Y-m-d'),
                    $sampai->format('Y-m-d'),
                ),
                "rekap-kehadiran-{$slug}.xlsx"
            );
        }

        return Inertia::render('kehadiran/show', [
            'kelas' => [
                'id' => $kelasAjaran->id,
                'nama' => $kelasAjaran->nama_lengkap,
                'tingkat' => $kelasAjaran->tingkat?->nama ?? null,
                'tahun_ajaran' => $kelasAjaran->tahunAjaran?->nama,
            ],
            'siswa' => $siswaList,
            'tanggal' => $tanggalList,
            'liburMap' => $liburMap,
            'matrix' => $matrix,
            'filters' => [
                'periode' => $request->get('periode', 'hari_ini'),
                'dari' => $request->get('dari'),
                'sampai' => $request->get('sampai'),
            ],
        ]);
    }

    public function anulir(StoreAnulirAbsensiRequest $request, KelasAjaran $kelasAjaran): RedirectResponse
    {
        $data = $request->validated();

        $tanggal = Carbon::parse($data['tanggal'])->toDateString();
        $anulir = AnulirAbsensi::where('siswa_id', $data['siswa_id'])
            ->whereDate('tanggal', $tanggal)
            ->first();

        $buktiPaths = $anulir?->bukti ?? [];

        if ($request->hasFile('bukti')) {
            foreach ($buktiPaths as $oldPath) {
                Storage::disk('r2')->delete($oldPath);
            }
            $buktiPaths = [];
            foreach ($request->file('bukti') as $file) {
                $buktiPaths[] = $file->store('anulir', 'r2');
            }
        }

        $fields = [
            'status' => $data['status'],
            'keterangan' => $data['keterangan'] ?? null,
            'bukti' => count($buktiPaths) ? $buktiPaths : null,
            'anulir_oleh' => Auth::id(),
        ];

        if ($anulir) {
            $anulir->update($fields);
        } else {
            AnulirAbsensi::create(array_merge([
                'siswa_id' => $data['siswa_id'],
                'tanggal' => $tanggal,
            ], $fields));
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Anulir kehadiran berhasil disimpan.']);

        return redirect()->back();
    }

    private function resolvePeriode(Request $request): array
    {
        $periode = $request->get('periode', 'hari_ini');

        if ($periode === 'custom') {
            // Fix Critical 2: wrap Carbon::parse in try/catch for invalid user input
            try {
                $dari = Carbon::parse($request->get('dari') ?: now()->toDateString());
            } catch (\Exception) {
                $dari = Carbon::today();
            }

            try {
                $sampai = Carbon::parse($request->get('sampai') ?: now()->toDateString());
            } catch (\Exception) {
                $sampai = Carbon::today();
            }

            return [$dari, $sampai];
        }

        return match ($periode) {
            'kemarin' => [Carbon::yesterday(), Carbon::yesterday()],
            '7_hari' => [Carbon::now()->subDays(6), Carbon::now()],
            '30_hari' => [Carbon::now()->subDays(29), Carbon::now()],
            'bulan_ini' => [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()],
            default => [Carbon::today(), Carbon::today()],
        };
    }
}
