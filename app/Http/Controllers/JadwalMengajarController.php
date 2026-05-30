<?php

namespace App\Http\Controllers;

use App\Models\JadwalMengajar;
use App\Models\JamPelajaran;
use App\Models\KelasAjaran;
use App\Models\MataPelajaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class JadwalMengajarController extends Controller
{
    private const HARI = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];

    public function index(): Response
    {
        $kelas = KelasAjaran::with([
                'kelas.jurusan:id,nama,singkatan',
                'kelas.jenisKelas:id,nama',
                'tingkat',
                'tahunAjaran:id,nama,is_active',
                'waliKelas:id,nama',
            ])
            ->withCount('siswa')
            ->aktif()
            ->orderBy('tingkat_id')
            ->orderBy('kelas_id')
            ->get();

        return Inertia::render('akademik/jadwal-mengajar/index', [
            'kelas' => $kelas->map(fn ($ka) => [
                'id'             => $ka->id,
                'nama'           => $ka->nama_lengkap,
                'tingkat'        => $ka->tingkat?->nama,
                'tingkat_id'     => $ka->tingkat_id,
                'rombel'         => $ka->kelas?->rombel,
                'jurusan'        => $ka->kelas?->jurusan
                    ? ['id' => $ka->kelas->jurusan->id, 'nama' => $ka->kelas->jurusan->nama, 'singkatan' => $ka->kelas->jurusan->singkatan]
                    : null,
                'jenis_kelas'    => $ka->kelas?->jenisKelas
                    ? ['id' => $ka->kelas->jenisKelas->id, 'nama' => $ka->kelas->jenisKelas->nama]
                    : null,
                'wali_kelas'     => $ka->waliKelas
                    ? ['id' => $ka->waliKelas->id, 'nama' => $ka->waliKelas->nama]
                    : null,
                'siswa_count'    => $ka->siswa_count,
                'tahun_ajaran'   => $ka->tahunAjaran ? [
                    'id'        => $ka->tahunAjaran->id,
                    'nama'      => $ka->tahunAjaran->nama,
                    'is_active' => $ka->tahunAjaran->is_active,
                ] : null,
            ])->values(),
        ]);
    }

    public function show(KelasAjaran $kelasAjaran): Response
    {
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

        $mataPelajaran = MataPelajaran::where('aktif', true)
            ->orderBy('nama')
            ->get(['id', 'kode', 'nama']);

        // Map mata_pelajaran_id -> array of pegawai pengampu
        $pengampuMap = MataPelajaran::where('aktif', true)
            ->with(['pengampu' => function ($q) {
                $q->where('aktif', true)->select('m_pegawai.id', 'nama');
            }])
            ->get()
            ->mapWithKeys(fn ($mp) => [
                $mp->id => $mp->pengampu->map(fn ($p) => [
                    'id' => $p->id,
                    'nama' => $p->nama,
                ])->values(),
            ]);

        $kelasAjaran->load(['tahunAjaran:id,nama', 'kelas', 'tingkat']);

        return Inertia::render('akademik/jadwal-mengajar/show', [
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
            'mataPelajaran' => $mataPelajaran,
            'pengampuMap' => $pengampuMap,
        ]);
    }

    public function store(Request $request, KelasAjaran $kelasAjaran): RedirectResponse
    {
        $data = $request->validate([
            'hari' => ['required', Rule::in(self::HARI)],
            'jam_pelajaran_id' => ['required', 'exists:m_jam_pelajaran,id'],
            'mata_pelajaran_id' => ['required', 'exists:m_mata_pelajaran,id'],
            'pegawai_id' => ['required', 'exists:m_pegawai,id'],
        ]);

        $this->ensureNoTeacherConflict(
            $data['pegawai_id'],
            $data['hari'],
            $data['jam_pelajaran_id'],
            $kelasAjaran->id,
        );

        JadwalMengajar::updateOrCreate(
            [
                'kelas_ajaran_id' => $kelasAjaran->id,
                'hari' => $data['hari'],
                'jam_pelajaran_id' => $data['jam_pelajaran_id'],
            ],
            [
                'mata_pelajaran_id' => $data['mata_pelajaran_id'],
                'pegawai_id' => $data['pegawai_id'],
            ],
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal berhasil disimpan.']);

        return redirect()->back();
    }

    public function destroy(KelasAjaran $kelasAjaran, JadwalMengajar $jadwal): RedirectResponse
    {
        if ($jadwal->kelas_ajaran_id !== $kelasAjaran->id) {
            abort(404);
        }

        $jadwal->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal berhasil dihapus.']);

        return redirect()->back();
    }

    private function ensureNoTeacherConflict(int $pegawaiId, string $hari, int $jamPelajaranId, int $kelasAjaranId): void
    {
        $conflict = JadwalMengajar::where('pegawai_id', $pegawaiId)
            ->where('hari', $hari)
            ->where('jam_pelajaran_id', $jamPelajaranId)
            ->where('kelas_ajaran_id', '!=', $kelasAjaranId)
            ->with('kelasAjaran:id,kelas_id,tingkat_id')
            ->first();

        if ($conflict) {
            throw ValidationException::withMessages([
                'pegawai_id' => "Guru sudah mengajar di kelas {$conflict->kelasAjaran->nama_lengkap} pada slot ini.",
            ]);
        }
    }
}
