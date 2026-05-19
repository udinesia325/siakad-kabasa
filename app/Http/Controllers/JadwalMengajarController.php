<?php

namespace App\Http\Controllers;

use App\Models\JadwalMengajar;
use App\Models\JamPelajaran;
use App\Models\Kelas;
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
        $kelas = Kelas::with('tahunAjaran:id,nama,is_active')
            ->orderBy('tingkat')
            ->orderBy('nama')
            ->get();

        return Inertia::render('akademik/jadwal-mengajar/index', [
            'kelas' => $kelas,
        ]);
    }

    public function show(Kelas $kelas): Response
    {
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

        return Inertia::render('akademik/jadwal-mengajar/show', [
            'kelas' => $kelas->load('tahunAjaran:id,nama'),
            'hariList' => self::HARI,
            'jamPelajaran' => $jamPelajaran,
            'jadwal' => $jadwal,
            'mataPelajaran' => $mataPelajaran,
            'pengampuMap' => $pengampuMap,
        ]);
    }

    public function store(Request $request, Kelas $kelas): RedirectResponse
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
            $kelas->id,
        );

        JadwalMengajar::updateOrCreate(
            [
                'kelas_id' => $kelas->id,
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

    public function destroy(Kelas $kelas, JadwalMengajar $jadwal): RedirectResponse
    {
        if ($jadwal->kelas_id !== $kelas->id) {
            abort(404);
        }

        $jadwal->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal berhasil dihapus.']);

        return redirect()->back();
    }

    private function ensureNoTeacherConflict(int $pegawaiId, string $hari, int $jamPelajaranId, int $kelasId): void
    {
        $conflict = JadwalMengajar::where('pegawai_id', $pegawaiId)
            ->where('hari', $hari)
            ->where('jam_pelajaran_id', $jamPelajaranId)
            ->where('kelas_id', '!=', $kelasId)
            ->with('kelas:id,nama')
            ->first();

        if ($conflict) {
            throw ValidationException::withMessages([
                'pegawai_id' => "Guru sudah mengajar di kelas {$conflict->kelas->nama} pada slot ini.",
            ]);
        }
    }
}
