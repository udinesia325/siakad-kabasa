<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\JenisSuratPeringatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JenisSuratPeringatanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = JenisSuratPeringatan::orderBy('level');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('wakasis/jenis-sp/index', [
            'jenisSp' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nama'        => ['required', 'string', 'max:50'],
            'level'       => ['required', 'integer', 'min:1', 'max:10'],
            'batas_poin'  => ['required', 'integer', 'min:1'],
            'deskripsi'   => ['nullable', 'string'],
        ]);

        JenisSuratPeringatan::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis SP berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, JenisSuratPeringatan $jenisSp): RedirectResponse
    {
        $data = $request->validate([
            'nama'        => ['required', 'string', 'max:50'],
            'level'       => ['required', 'integer', 'min:1', 'max:10'],
            'batas_poin'  => ['required', 'integer', 'min:1'],
            'deskripsi'   => ['nullable', 'string'],
        ]);

        $jenisSp->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis SP berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(JenisSuratPeringatan $jenisSp): RedirectResponse
    {
        $jenisSp->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis SP berhasil dihapus.']);

        return redirect()->back();
    }
}
