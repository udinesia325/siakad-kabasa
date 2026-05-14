<?php

// app/Http/Controllers/KehadiranController.php

namespace App\Http\Controllers;

use App\Exports\KehadiranExport;
use App\Http\Requests\StoreAnulirAbsensiRequest;
use App\Models\Absensi;
use App\Models\AnulirAbsensi;
use App\Models\JadwalAbsensi;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $query = Kelas::with('tahunAjaran')
            ->withCount('siswa')
            ->orderBy('tingkat')
            ->orderBy('nama');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('kehadiran/index', [
            'kelas' => $query->paginate(12)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    public function show(Request $request, Kelas $kelas): BinaryFileResponse|Response
    {
        // Fix Important 5: eager-load tahunAjaran to avoid lazy load
        $kelas->load('tahunAjaran');

        [$dari, $sampai] = $this->resolvePeriode($request);

        $siswaList = Siswa::query()
            ->whereHas('riwayatKelas', function ($q) use ($kelas, $dari, $sampai) {
                $q->where('kelas_id', $kelas->id)
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

        // Fix Important 6: select only needed columns
        $jadwalMap = JadwalAbsensi::select(['hari', 'jam_masuk_max', 'is_libur'])->get()->keyBy('hari');

        // Build tanggal list
        $tanggalList = [];
        $current = $dari->copy();
        while ($current->lte($sampai)) {
            $tanggalList[] = $current->toDateString();
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
                $anulir = $anulirIndex[$siswa->id][$tgl] ?? null;
                $absenMasuk = $absensiIndex[$siswa->id][$tgl]['masuk'] ?? null;
                $absenPulang = $absensiIndex[$siswa->id][$tgl]['pulang'] ?? null;

                // Tentukan status otomatis
                $statusOtomatis = 'alpha';
                if ($absenMasuk) {
                    $hari = Carbon::parse($tgl)->isoWeekday();
                    $jadwal = $jadwalMap->get($hari);

                    // Fix Important 3: skip hadir/terlambat if jadwal is_libur
                    if (! $jadwal || ! $jadwal->is_libur) {
                        $terlambat = $jadwal && $jadwal->jam_masuk_max
                            && $absenMasuk > $jadwal->jam_masuk_max->format('H:i');
                        $statusOtomatis = $terlambat ? 'terlambat' : 'hadir';
                    }
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
                        'bukti' => collect($anulir->bukti ?? [])->map(fn ($p) => Storage::url($p))->values(),
                        'anulir_oleh' => $anulir->anulirOleh?->name,
                        'updated_at' => $anulir->updated_at->format('d M Y H:i'),
                    ] : null,
                ];
            }
        }

        if ($request->boolean('export')) {
            $namaFile = 'rekap-kehadiran-'
                .Str::slug($kelas->nama).'-'
                .$dari->format('Y-m-d').'-'
                .$sampai->format('Y-m-d').'.xlsx';

            return Excel::download(
                new KehadiranExport(
                    $kelas,
                    $siswaList->toArray(),
                    $tanggalList,
                    $matrix,
                    $dari->format('Y-m-d'),
                    $sampai->format('Y-m-d'),
                ),
                $namaFile
            );
        }

        return Inertia::render('kehadiran/show', [
            'kelas' => [
                'id' => $kelas->id,
                'nama' => $kelas->nama,
                'tingkat' => $kelas->tingkat,
                'tahun_ajaran' => $kelas->tahunAjaran?->nama,
            ],
            'siswa' => $siswaList,
            'tanggal' => $tanggalList,
            'matrix' => $matrix,
            'filters' => [
                'periode' => $request->get('periode', 'hari_ini'),
                'dari' => $request->get('dari'),
                'sampai' => $request->get('sampai'),
            ],
        ]);
    }

    public function anulir(StoreAnulirAbsensiRequest $request, Kelas $kelas): RedirectResponse
    {
        $data = $request->validated();

        $tanggal = Carbon::parse($data['tanggal'])->toDateString();
        $anulir = AnulirAbsensi::where('siswa_id', $data['siswa_id'])
            ->whereDate('tanggal', $tanggal)
            ->first();

        $buktiPaths = $anulir?->bukti ?? [];

        if ($request->hasFile('bukti')) {
            foreach ($buktiPaths as $oldPath) {
                Storage::disk('public')->delete($oldPath);
            }
            $buktiPaths = [];
            foreach ($request->file('bukti') as $file) {
                $buktiPaths[] = $file->store('anulir', 'public');
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
