<?php

namespace App\Http\Controllers\Publik;

use App\Http\Controllers\Controller;
use App\Models\JadwalMengajar;
use App\Models\JamPelajaran;
use App\Models\KelasAjaran;
use App\Models\Pegawai;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JadwalPublikController extends Controller
{
    private const HARI = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];

    public function index(): Response
    {
        return Inertia::render('publik/jadwal/index', [
            'tahunAjaranAktif' => TahunAjaran::where('is_active', true)->first(['nama']),
            'namaSekolah' => config('app.name'),
        ]);
    }

    public function kelasIndex(): Response
    {
        $kelas = KelasAjaran::aktif()
            ->with(['kelas.jurusan', 'tingkat', 'tahunAjaran:id,nama'])
            ->orderBy('tingkat_id')
            ->orderBy('kelas_id')
            ->get();

        return Inertia::render('publik/jadwal/kelas/index', [
            'kelas' => $kelas->map(fn ($ka) => [
                'id' => $ka->id,
                'nama' => $ka->nama_lengkap,
                'tingkat' => $ka->tingkat?->nama,
            ])->values(),
            'tahunAjaranAktif' => TahunAjaran::where('is_active', true)->first(['nama']),
            'namaSekolah' => config('app.name'),
        ]);
    }

    public function kelasShow(KelasAjaran $kelasAjaran): Response
    {
        $kelasAjaran->load(['tahunAjaran:id,nama,is_active', 'kelas', 'tingkat']);

        if (! $kelasAjaran->tahunAjaran || ! $kelasAjaran->tahunAjaran->is_active) {
            abort(404);
        }

        $jamPelajaran = JamPelajaran::where('aktif', true)
            ->orderBy('nomor')
            ->get();

        $jadwal = JadwalMengajar::where('kelas_ajaran_id', $kelasAjaran->id)
            ->with([
                'mataPelajaran:id,kode,nama',
                'pegawai:id,nama',
            ])
            ->get()
            ->groupBy(fn ($j) => "{$j->hari}|{$j->jam_pelajaran_id}");

        return Inertia::render('publik/jadwal/kelas/show', [
            'kelas' => [
                'id' => $kelasAjaran->id,
                'nama' => $kelasAjaran->nama_lengkap,
                'tingkat' => $kelasAjaran->tingkat?->nama,
                'tahun_ajaran' => $kelasAjaran->tahunAjaran ? [
                    'id' => $kelasAjaran->tahunAjaran->id,
                    'nama' => $kelasAjaran->tahunAjaran->nama,
                ] : null,
            ],
            'hariList' => self::HARI,
            'jamPelajaran' => $jamPelajaran,
            'jadwal' => $jadwal,
            'tahunAjaranAktif' => TahunAjaran::where('is_active', true)->first(['nama']),
            'namaSekolah' => config('app.name'),
        ]);
    }

    public function guruIndex(Request $request): Response
    {
        $search = trim((string) $request->string('search'));

        $guru = Pegawai::query()
            ->where('jenis', 'guru')
            ->where('aktif', true)
            ->whereHas(
                'jadwalMengajar.kelasAjaran.tahunAjaran',
                fn ($q) => $q->where('is_active', true)
            )
            ->when(
                $search !== '',
                fn ($q) => $q->where('nama', 'like', "%{$search}%"),
            )
            ->orderBy('nama')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('publik/jadwal/guru/index', [
            'guru' => $guru,
            'filters' => ['search' => $search],
            'tahunAjaranAktif' => TahunAjaran::where('is_active', true)->first(['nama']),
            'namaSekolah' => config('app.name'),
        ]);
    }

    public function guruShow(Pegawai $pegawai): Response
    {
        if ($pegawai->jenis !== 'guru' || ! $pegawai->aktif) {
            abort(404);
        }

        $jadwalPerHari = JadwalMengajar::where('pegawai_id', $pegawai->id)
            ->whereHas('kelasAjaran.tahunAjaran', fn ($q) => $q->where('is_active', true))
            ->with([
                'mataPelajaran:id,kode,nama',
                'kelasAjaran.kelas',
                'kelasAjaran.tingkat',
                'jamPelajaran:id,nomor,jam_mulai,jam_selesai,keterangan',
            ])
            ->get()
            ->groupBy('hari')
            ->map(fn ($items) => $items->sortBy(fn ($i) => $i->jamPelajaran->nomor)->values());

        return Inertia::render('publik/jadwal/guru/show', [
            'pegawai' => ['id' => $pegawai->id, 'nama' => $pegawai->nama],
            'hariList' => self::HARI,
            'jadwalPerHari' => $jadwalPerHari,
            'tahunAjaranAktif' => TahunAjaran::where('is_active', true)->first(['nama']),
            'namaSekolah' => config('app.name'),
        ]);
    }
}
