<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use App\Models\Wakasis\KasusSiswa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KasusSiswaController extends Controller
{
    public function index(Request $request): Response
    {
        $query = KasusSiswa::with([
            'siswa:id,nama,nisn',
            'ditanganiOlehPegawai:id,nama',
            'dicatatOleh:id,name',
        ])->orderBy('tanggal', 'desc');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('judul', 'like', "%{$request->search}%")
                    ->orWhereHas('siswa', fn ($s) => $s->where('nama', 'like', "%{$request->search}%")
                        ->orWhere('nisn', 'like', "%{$request->search}%"));
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('wakasis/kasus-siswa/index', [
            'kasusSiswa'  => $query->paginate(20)->withQueryString(),
            'filters'     => $request->only('search', 'status'),
            'pegawaiList' => Pegawai::orderBy('nama')->get(['id', 'nama']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'siswa_id'           => ['required', 'exists:m_siswa,id'],
            'tanggal'            => ['required', 'date'],
            'judul'              => ['required', 'string', 'max:200'],
            'deskripsi'          => ['nullable', 'string'],
            'status'             => ['required', 'in:baru,proses,selesai'],
            'ditangani_oleh'     => ['nullable', 'exists:m_pegawai,id'],
            'catatan_penanganan' => ['nullable', 'string'],
        ]);

        $data['dicatat_oleh'] = auth()->id();

        KasusSiswa::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kasus siswa berhasil dicatat.']);

        return redirect()->back();
    }

    public function update(Request $request, KasusSiswa $kasusSiswa): RedirectResponse
    {
        $data = $request->validate([
            'siswa_id'           => ['required', 'exists:m_siswa,id'],
            'tanggal'            => ['required', 'date'],
            'judul'              => ['required', 'string', 'max:200'],
            'deskripsi'          => ['nullable', 'string'],
            'status'             => ['required', 'in:baru,proses,selesai'],
            'ditangani_oleh'     => ['nullable', 'exists:m_pegawai,id'],
            'catatan_penanganan' => ['nullable', 'string'],
        ]);

        $kasusSiswa->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kasus siswa berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(KasusSiswa $kasusSiswa): RedirectResponse
    {
        $kasusSiswa->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kasus siswa berhasil dihapus.']);

        return redirect()->back();
    }
}
