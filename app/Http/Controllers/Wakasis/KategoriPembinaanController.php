<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\KategoriPembinaan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KategoriPembinaanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = KategoriPembinaan::orderBy('nama');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('wakasis/kategori-pembinaan/index', [
            'kategoriPembinaan' => $query->paginate(20)->withQueryString(),
            'filters'           => $request->only('search'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nama'      => ['required', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
        ]);

        KategoriPembinaan::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kategori pembinaan berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, KategoriPembinaan $kategoriPembinaan): RedirectResponse
    {
        $data = $request->validate([
            'nama'      => ['required', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
        ]);

        $kategoriPembinaan->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kategori pembinaan berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(KategoriPembinaan $kategoriPembinaan): RedirectResponse
    {
        $kategoriPembinaan->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kategori pembinaan berhasil dihapus.']);

        return redirect()->back();
    }
}
