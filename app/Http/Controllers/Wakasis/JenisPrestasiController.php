<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\JenisPrestasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JenisPrestasiController extends Controller
{
    public function index(Request $request): Response
    {
        $query = JenisPrestasi::orderBy('nama');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('wakasis/jenis-prestasi/index', [
            'jenisPrestasi' => $query->paginate(20)->withQueryString(),
            'filters'       => $request->only('search'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nama'      => ['required', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
        ]);

        JenisPrestasi::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis prestasi berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, JenisPrestasi $jenisPrestasi): RedirectResponse
    {
        $data = $request->validate([
            'nama'      => ['required', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
        ]);

        $jenisPrestasi->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis prestasi berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(JenisPrestasi $jenisPrestasi): RedirectResponse
    {
        $jenisPrestasi->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis prestasi berhasil dihapus.']);

        return redirect()->back();
    }
}
