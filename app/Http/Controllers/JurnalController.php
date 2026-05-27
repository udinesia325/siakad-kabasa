<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\AnulirAbsensi;
use App\Models\JadwalMengajar;
use App\Models\Jurnal;
use App\Models\Pegawai;
use App\Models\Siswa;
use App\Models\Tingkat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class JurnalController extends Controller
{
    private const HARI_MAP = [1 => 'senin', 2 => 'selasa', 3 => 'rabu', 4 => 'kamis', 5 => 'jumat', 6 => 'sabtu', 7 => 'minggu'];

    public function buat(): Response
    {
        $user = Auth::user();
        $pegawai = $user->pegawai;

        if (! $pegawai) {
            return Inertia::render('jurnal/buat', [
                'jadwals' => [],
                'error' => 'Akun belum terhubung ke data pegawai.',
            ]);
        }

        $hariIni = self::HARI_MAP[Carbon::today()->isoWeekday()] ?? null;
        $tanggal = Carbon::today()->toDateString();

        $jadwals = JadwalMengajar::where('pegawai_id', $pegawai->id)
            ->where('hari', $hariIni)
            ->with(['jamPelajaran', 'mataPelajaran', 'kelasAjaran.kelas', 'kelasAjaran.tingkat'])
            ->get()
            ->map(function ($jadwal) use ($tanggal) {
                $jurnal = Jurnal::where('jadwal_mengajar_id', $jadwal->id)
                    ->where('tanggal', $tanggal)
                    ->first();

                return [
                    'id' => $jadwal->id,
                    'mata_pelajaran' => $jadwal->mataPelajaran->nama,
                    'kelas' => $jadwal->kelasAjaran->kelas->nama,
                    'tingkat' => $jadwal->kelasAjaran->tingkat?->nama,
                    'jam_mulai' => $jadwal->jamPelajaran->jam_mulai,
                    'jam_selesai' => $jadwal->jamPelajaran->jam_selesai,
                    'nomor_jam' => $jadwal->jamPelajaran->nomor,
                    'sudah_dibuat' => $jurnal !== null,
                    'jurnal_id' => $jurnal?->id,
                ];
            })
            ->sortBy('nomor_jam')
            ->values();

        return Inertia::render('jurnal/buat', [
            'jadwals' => $jadwals,
            'error' => null,
        ]);
    }

    public function buatSlot(JadwalMengajar $jadwalMengajar): Response
    {
        $tanggal = Carbon::today()->toDateString();
        $jurnal = Jurnal::where('jadwal_mengajar_id', $jadwalMengajar->id)
            ->where('tanggal', $tanggal)
            ->with('details')
            ->first();

        $jadwalMengajar->load(['jamPelajaran', 'mataPelajaran', 'kelasAjaran.kelas', 'kelasAjaran.tingkat']);
        $kelasAjaranId = $jadwalMengajar->kelas_ajaran_id;

        $jadwalInfo = [
            'id' => $jadwalMengajar->id,
            'mata_pelajaran' => $jadwalMengajar->mataPelajaran->nama,
            'kelas' => $jadwalMengajar->kelasAjaran->kelas->nama,
            'tingkat' => $jadwalMengajar->kelasAjaran->tingkat?->nama,
            'jam_mulai' => $jadwalMengajar->jamPelajaran->jam_mulai,
            'jam_selesai' => $jadwalMengajar->jamPelajaran->jam_selesai,
            'tanggal' => $tanggal,
        ];

        if ($jurnal) {
            $detailMap = $jurnal->details->keyBy('siswa_id');

            $siswa = Siswa::where('kelas_ajaran_id', $kelasAjaranId)
                ->orderBy('nama')
                ->get(['id', 'nama'])
                ->map(fn ($s) => [
                    'id' => $s->id,
                    'nama' => $s->nama,
                    'status' => $detailMap[$s->id]?->status ?? 'alpha',
                    'keterangan' => $detailMap[$s->id]?->keterangan,
                ]);

            return Inertia::render('jurnal/buat-slot', [
                'mode' => 'edit',
                'jadwal' => $jadwalInfo,
                'siswa' => $siswa,
                'jurnal_id' => $jurnal->id,
            ]);
        }

        $siswaList = Siswa::where('kelas_ajaran_id', $kelasAjaranId)
            ->orderBy('nama')
            ->get(['id', 'nama']);

        $siswaIds = $siswaList->pluck('id');

        $absensiHariIni = Absensi::where('reff_type', 'm_siswa')
            ->whereIn('reff_id', $siswaIds)
            ->whereDate('waktu_absen', $tanggal)
            ->where('tipe', 'masuk')
            ->get()
            ->keyBy('reff_id');

        $anulirHariIni = AnulirAbsensi::whereIn('siswa_id', $siswaIds)
            ->where('tanggal', $tanggal)
            ->get()
            ->keyBy('siswa_id');

        $siswa = $siswaList->map(function ($s) use ($absensiHariIni, $anulirHariIni) {
            $anulir = $anulirHariIni[$s->id] ?? null;
            $absensi = $absensiHariIni[$s->id] ?? null;

            if ($anulir) {
                $status = in_array($anulir->status, ['hadir', 'terlambat']) ? 'hadir' : $anulir->status;
            } elseif ($absensi) {
                $status = 'hadir';
            } else {
                $status = 'alpha';
            }

            return [
                'id' => $s->id,
                'nama' => $s->nama,
                'status' => $status,
                'keterangan' => null,
            ];
        });

        return Inertia::render('jurnal/buat-slot', [
            'mode' => 'create',
            'jadwal' => $jadwalInfo,
            'siswa' => $siswa,
            'jurnal_id' => null,
        ]);
    }

    public function store(Request $request, JadwalMengajar $jadwalMengajar): RedirectResponse
    {
        $request->validate([
            'detail' => ['required', 'array', 'min:1'],
            'detail.*.siswa_id' => ['required', 'integer', 'exists:m_siswa,id'],
            'detail.*.status' => ['required', 'in:hadir,alpha,sakit,izin,dispensasi'],
            'detail.*.keterangan' => ['nullable', 'string', 'max:500'],
        ]);

        $user = Auth::user();
        $pegawai = $user->pegawai;
        $tanggal = Carbon::today()->toDateString();

        DB::transaction(function () use ($request, $jadwalMengajar, $user, $pegawai, $tanggal) {
            $jurnal = Jurnal::create([
                'jadwal_mengajar_id' => $jadwalMengajar->id,
                'pegawai_id' => $pegawai->id,
                'mata_pelajaran_id' => $jadwalMengajar->mata_pelajaran_id,
                'kelas_ajaran_id' => $jadwalMengajar->kelas_ajaran_id,
                'jam_pelajaran_id' => $jadwalMengajar->jam_pelajaran_id,
                'tanggal' => $tanggal,
                'dibuat_oleh' => $user->id,
            ]);

            $details = collect($request->detail)->map(fn ($d) => [
                'jurnal_id' => $jurnal->id,
                'siswa_id' => $d['siswa_id'],
                'status' => $d['status'],
                'keterangan' => $d['keterangan'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ])->all();

            \App\Models\JurnalDetail::insert($details);
        });

        return redirect()->route('jurnal.buat')->with('success', 'Jurnal berhasil disimpan.');
    }

    public function update(Request $request, Jurnal $jurnal): RedirectResponse
    {
        $request->validate([
            'detail' => ['required', 'array', 'min:1'],
            'detail.*.siswa_id' => ['required', 'integer', 'exists:m_siswa,id'],
            'detail.*.status' => ['required', 'in:hadir,alpha,sakit,izin,dispensasi'],
            'detail.*.keterangan' => ['nullable', 'string', 'max:500'],
        ]);

        DB::transaction(function () use ($request, $jurnal) {
            $jurnal->touch();

            foreach ($request->detail as $d) {
                \App\Models\JurnalDetail::updateOrCreate(
                    ['jurnal_id' => $jurnal->id, 'siswa_id' => $d['siswa_id']],
                    ['status' => $d['status'], 'keterangan' => $d['keterangan'] ?? null]
                );
            }
        });

        return redirect()->route('jurnal.buat')->with('success', 'Jurnal berhasil diperbarui.');
    }

    public function index(Request $request): Response
    {
        $user = Auth::user();
        $isSuperadmin = $user->isSuperadmin();
        $bisaLihatSemua = $isSuperadmin || $user->hasPermissionTo('jurnal.view_scope_semua');

        $query = Jurnal::with([
            'pegawai:id,nama',
            'mataPelajaran:id,nama',
            'jamPelajaran:id,nomor,jam_mulai,jam_selesai',
            'kelasAjaran.kelas',
            'kelasAjaran.tingkat',
        ]);

        if (! $bisaLihatSemua) {
            $pegawai = $user->pegawai;
            if ($pegawai) {
                $query->where('pegawai_id', $pegawai->id);
            } else {
                $query->whereRaw('1 = 0');
            }
        }

        if ($request->filled('tanggal_dari')) {
            $query->whereDate('tanggal', '>=', $request->tanggal_dari);
        }
        if ($request->filled('tanggal_sampai')) {
            $query->whereDate('tanggal', '<=', $request->tanggal_sampai);
        }
        if ($request->filled('pegawai_id') && $bisaLihatSemua) {
            $query->where('pegawai_id', $request->pegawai_id);
        }
        if ($request->filled('mata_pelajaran_id')) {
            $query->where('mata_pelajaran_id', $request->mata_pelajaran_id);
        }
        if ($request->filled('jam_pelajaran_id')) {
            $query->where('jam_pelajaran_id', $request->jam_pelajaran_id);
        }
        if ($request->filled('tingkat')) {
            $query->whereHas('kelasAjaran.tingkat', fn ($q) => $q->where('nama', $request->tingkat));
        }

        $jurnals = $query->orderByDesc('tanggal')
            ->orderBy('jam_pelajaran_id')
            ->paginate(20)
            ->withQueryString();

        $jurnals->getCollection()->transform(function ($j) {
            $counts = $j->details()->selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status');

            return [
                'id' => $j->id,
                'tanggal' => $j->tanggal->format('Y-m-d'),
                'guru' => $j->pegawai->nama,
                'mata_pelajaran' => $j->mataPelajaran->nama,
                'kelas' => $j->kelasAjaran->kelas->nama,
                'tingkat' => $j->kelasAjaran->tingkat?->nama,
                'jam_mulai' => $j->jamPelajaran->jam_mulai,
                'jam_selesai' => $j->jamPelajaran->jam_selesai,
                'hadir' => $counts['hadir'] ?? 0,
                'alpha' => $counts['alpha'] ?? 0,
                'sakit' => $counts['sakit'] ?? 0,
                'izin' => $counts['izin'] ?? 0,
                'dispensasi' => $counts['dispensasi'] ?? 0,
            ];
        });

        $pegawaiOptions = $bisaLihatSemua
            ? Pegawai::where('jenis', 'guru')->orderBy('nama')->get(['id', 'nama'])
            : collect();

        $mapelOptions = \App\Models\MataPelajaran::orderBy('nama')->get(['id', 'nama']);
        $jamOptions = \App\Models\JamPelajaran::where('aktif', true)->orderBy('nomor')->get(['id', 'nomor', 'jam_mulai', 'jam_selesai']);
        $tingkatOptions = Tingkat::orderBy('urutan')->pluck('nama');

        return Inertia::render('jurnal/index', [
            'jurnals' => $jurnals,
            'filters' => $request->only(['tanggal_dari', 'tanggal_sampai', 'pegawai_id', 'mata_pelajaran_id', 'jam_pelajaran_id', 'tingkat']),
            'options' => [
                'pegawai' => $pegawaiOptions,
                'mata_pelajaran' => $mapelOptions,
                'jam_pelajaran' => $jamOptions,
                'tingkat' => $tingkatOptions,
                'bisa_lihat_semua' => $bisaLihatSemua,
            ],
        ]);
    }

    public function show(Jurnal $jurnal): Response
    {
        $user = Auth::user();
        $isSuperadmin = $user->isSuperadmin();
        $bisaLihatSemua = $isSuperadmin || $user->hasPermissionTo('jurnal.view_scope_semua');

        if (! $bisaLihatSemua) {
            $pegawai = $user->pegawai;
            abort_if(! $pegawai || $jurnal->pegawai_id !== $pegawai->id, 403);
        }

        $jurnal->load([
            'details.siswa:id,nama',
            'pegawai:id,nama',
            'mataPelajaran:id,nama',
            'kelasAjaran.kelas',
            'kelasAjaran.tingkat',
            'jamPelajaran:id,nomor,jam_mulai,jam_selesai',
            'dibuatOleh:id,name',
        ]);

        return Inertia::render('jurnal/show', [
            'jurnal' => [
                'id' => $jurnal->id,
                'tanggal' => $jurnal->tanggal->format('Y-m-d'),
                'guru' => $jurnal->pegawai->nama,
                'mata_pelajaran' => $jurnal->mataPelajaran->nama,
                'kelas' => $jurnal->kelasAjaran->kelas->nama,
                'tingkat' => $jurnal->kelasAjaran->tingkat?->nama,
                'jam_mulai' => $jurnal->jamPelajaran->jam_mulai,
                'jam_selesai' => $jurnal->jamPelajaran->jam_selesai,
                'dibuat_oleh' => $jurnal->dibuatOleh->name,
                'created_at' => $jurnal->created_at->format('d M Y H:i'),
                'updated_at' => $jurnal->updated_at->format('d M Y H:i'),
                'details' => $jurnal->details->sortBy('siswa.nama')->values()->map(fn ($d) => [
                    'siswa_id' => $d->siswa_id,
                    'nama' => $d->siswa->nama,
                    'status' => $d->status,
                    'keterangan' => $d->keterangan,
                ]),
            ],
        ]);
    }
}
