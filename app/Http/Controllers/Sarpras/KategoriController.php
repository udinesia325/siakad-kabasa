<?php

namespace App\Http\Controllers\Sarpras;

use App\Http\Controllers\Controller;
use App\Models\Sarpras\Kategori;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KategoriController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Kategori::orderBy('nama');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('sarpras/kategori/index', [
            'kategori' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nama'      => ['required', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
            'warna'     => ['nullable', 'string', 'max:20'],
        ]);

        Kategori::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kategori berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, Kategori $kategori): RedirectResponse
    {
        $data = $request->validate([
            'nama'      => ['required', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
            'warna'     => ['nullable', 'string', 'max:20'],
        ]);

        $kategori->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kategori berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Kategori $kategori): RedirectResponse
    {
        $kategori->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kategori berhasil dihapus.']);

        return redirect()->back();
    }
}
