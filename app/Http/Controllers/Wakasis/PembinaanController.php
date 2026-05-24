<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use App\Models\Wakasis\KategoriPembinaan;
use App\Models\Wakasis\Pembinaan;
use App\Models\Wakasis\SuratPeringatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PembinaanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Pembinaan::with([
            'siswa:id,nama,nisn',
            'kategoriPembinaan:id,nama',
            'pembina:id,nama',
            'suratPeringatan:id,jenis_sp_id',
            'suratPeringatan.jenisSp:id,nama',
        ])->orderBy('tanggal_mulai', 'desc');

        if ($request->filled('search')) {
            $query->whereHas('siswa', fn ($q) => $q->where('nama', 'like', "%{$request->search}%"));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('wakasis/pembinaan/index', [
            'pembinaan'          => $query->paginate(20)->withQueryString(),
            'filters'            => $request->only('search', 'status'),
            'pegawaiList'        => Pegawai::orderBy('nama')->get(['id', 'nama']),
            'kategoriList'       => KategoriPembinaan::orderBy('nama')->get(['id', 'nama']),
            'suratPeringatanList' => SuratPeringatan::with('siswa:id,nama', 'jenisSp:id,nama')
                ->orderBy('tanggal', 'desc')->get(['id', 'siswa_id', 'jenis_sp_id', 'tanggal']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'siswa_id'              => ['required', 'exists:m_siswa,id'],
            'surat_peringatan_id'   => ['nullable', 'exists:t_wakasis_surat_peringatan,id'],
            'kategori_pembinaan_id' => ['required', 'exists:m_wakasis_kategori_pembinaan,id'],
            'pembina_id'            => ['required', 'exists:m_pegawai,id'],
            'tanggal_mulai'         => ['required', 'date'],
            'tanggal_selesai'       => ['nullable', 'date', 'after_or_equal:tanggal_mulai'],
            'status'                => ['required', 'in:proses,monitoring,selesai'],
            'catatan'               => ['nullable', 'string'],
        ]);

        Pembinaan::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pembinaan berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, Pembinaan $pembinaan): RedirectResponse
    {
        $data = $request->validate([
            'siswa_id'              => ['required', 'exists:m_siswa,id'],
            'surat_peringatan_id'   => ['nullable', 'exists:t_wakasis_surat_peringatan,id'],
            'kategori_pembinaan_id' => ['required', 'exists:m_wakasis_kategori_pembinaan,id'],
            'pembina_id'            => ['required', 'exists:m_pegawai,id'],
            'tanggal_mulai'         => ['required', 'date'],
            'tanggal_selesai'       => ['nullable', 'date', 'after_or_equal:tanggal_mulai'],
            'status'                => ['required', 'in:proses,monitoring,selesai'],
            'catatan'               => ['nullable', 'string'],
        ]);

        $pembinaan->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pembinaan berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Pembinaan $pembinaan): RedirectResponse
    {
        $pembinaan->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pembinaan berhasil dihapus.']);

        return redirect()->back();
    }
}
