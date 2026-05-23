<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\JenisPelanggaran;
use App\Models\Wakasis\PoinPelanggaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PoinPelanggaranController extends Controller
{
    public function index(Request $request): Response
    {
        $query = PoinPelanggaran::with('jenisPelanggaran:id,nama,warna')->orderBy('poin', 'desc');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        if ($request->filled('jenis_pelanggaran_id')) {
            $query->where('jenis_pelanggaran_id', $request->jenis_pelanggaran_id);
        }

        return Inertia::render('wakasis/poin-pelanggaran/index', [
            'poinPelanggaran' => $query->paginate(20)->withQueryString(),
            'filters'         => $request->only('search', 'jenis_pelanggaran_id'),
            'jenisList'       => JenisPelanggaran::orderBy('nama')->get(['id', 'nama', 'warna']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'jenis_pelanggaran_id' => ['required', 'exists:m_wakasis_jenis_pelanggaran,id'],
            'nama'                 => ['required', 'string', 'max:150'],
            'poin'                 => ['required', 'integer', 'min:1', 'max:100'],
            'deskripsi'            => ['nullable', 'string'],
        ]);

        PoinPelanggaran::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Poin pelanggaran berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, PoinPelanggaran $poinPelanggaran): RedirectResponse
    {
        $data = $request->validate([
            'jenis_pelanggaran_id' => ['required', 'exists:m_wakasis_jenis_pelanggaran,id'],
            'nama'                 => ['required', 'string', 'max:150'],
            'poin'                 => ['required', 'integer', 'min:1', 'max:100'],
            'deskripsi'            => ['nullable', 'string'],
        ]);

        $poinPelanggaran->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Poin pelanggaran berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(PoinPelanggaran $poinPelanggaran): RedirectResponse
    {
        $poinPelanggaran->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Poin pelanggaran berhasil dihapus.']);

        return redirect()->back();
    }
}
