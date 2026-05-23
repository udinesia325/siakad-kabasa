<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\KategoriPrestasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KategoriPrestasiController extends Controller
{
    public function index(Request $request): Response
    {
        $query = KategoriPrestasi::orderBy('nama');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        if ($request->filled('tingkat')) {
            $query->where('tingkat', $request->tingkat);
        }

        return Inertia::render('wakasis/kategori-prestasi/index', [
            'kategoriPrestasi' => $query->paginate(20)->withQueryString(),
            'filters'          => $request->only('search', 'tingkat'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nama'      => ['required', 'string', 'max:100'],
            'tingkat'   => ['required', 'in:sekolah,kabupaten,provinsi,nasional,internasional'],
            'deskripsi' => ['nullable', 'string'],
        ]);

        KategoriPrestasi::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kategori prestasi berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, KategoriPrestasi $kategoriPrestasi): RedirectResponse
    {
        $data = $request->validate([
            'nama'      => ['required', 'string', 'max:100'],
            'tingkat'   => ['required', 'in:sekolah,kabupaten,provinsi,nasional,internasional'],
            'deskripsi' => ['nullable', 'string'],
        ]);

        $kategoriPrestasi->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kategori prestasi berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(KategoriPrestasi $kategoriPrestasi): RedirectResponse
    {
        $kategoriPrestasi->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kategori prestasi berhasil dihapus.']);

        return redirect()->back();
    }
}
