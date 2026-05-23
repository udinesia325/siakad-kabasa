<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\JenisPelanggaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JenisPelanggaranController extends Controller
{
    public function index(Request $request): Response
    {
        $query = JenisPelanggaran::orderBy('nama');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('wakasis/jenis-pelanggaran/index', [
            'jenisPelanggaran' => $query->paginate(20)->withQueryString(),
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

        JenisPelanggaran::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis pelanggaran berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, JenisPelanggaran $jenisPelanggaran): RedirectResponse
    {
        $data = $request->validate([
            'nama'      => ['required', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
            'warna'     => ['nullable', 'string', 'max:20'],
        ]);

        $jenisPelanggaran->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis pelanggaran berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(JenisPelanggaran $jenisPelanggaran): RedirectResponse
    {
        $jenisPelanggaran->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis pelanggaran berhasil dihapus.']);

        return redirect()->back();
    }
}
