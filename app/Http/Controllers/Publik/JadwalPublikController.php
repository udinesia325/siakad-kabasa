<?php

namespace App\Http\Controllers\Publik;

use App\Http\Controllers\Controller;
use App\Models\JadwalMengajar;
use App\Models\JamPelajaran;
use App\Models\Kelas;
use App\Models\TahunAjaran;
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
        $kelas = Kelas::whereHas('tahunAjaran', fn ($q) => $q->where('is_active', true))
            ->with('tahunAjaran:id,nama')
            ->orderBy('tingkat')
            ->orderBy('nama')
            ->get(['id', 'nama', 'tingkat', 'tahun_ajaran_id']);

        return Inertia::render('publik/jadwal/kelas/index', [
            'kelas' => $kelas,
            'tahunAjaranAktif' => TahunAjaran::where('is_active', true)->first(['nama']),
            'namaSekolah' => config('app.name'),
        ]);
    }

    public function kelasShow(Kelas $kelas): Response
    {
        $kelas->load('tahunAjaran:id,nama,is_active');

        if (! $kelas->tahunAjaran || ! $kelas->tahunAjaran->is_active) {
            abort(404);
        }

        $jamPelajaran = JamPelajaran::where('aktif', true)
            ->orderBy('nomor')
            ->get();

        $jadwal = JadwalMengajar::where('kelas_id', $kelas->id)
            ->with([
                'mataPelajaran:id,kode,nama',
                'pegawai:id,nama',
            ])
            ->get()
            ->groupBy(fn ($j) => "{$j->hari}|{$j->jam_pelajaran_id}");

        return Inertia::render('publik/jadwal/kelas/show', [
            'kelas' => $kelas,
            'hariList' => self::HARI,
            'jamPelajaran' => $jamPelajaran,
            'jadwal' => $jadwal,
            'tahunAjaranAktif' => TahunAjaran::where('is_active', true)->first(['nama']),
            'namaSekolah' => config('app.name'),
        ]);
    }
}
