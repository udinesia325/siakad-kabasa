<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTahunAjaranRequest;
use App\Http\Requests\UpdateTahunAjaranRequest;
use App\Models\TahunAjaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TahunAjaranController extends Controller
{
    public function index(Request $request): Response
    {
        $query = TahunAjaran::orderByDesc('nama')->orderByDesc('is_active');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('akademik/tahun-ajaran/index', [
            'tahunAjaran' => $query->paginate(12)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    public function store(StoreTahunAjaranRequest $request): RedirectResponse
    {
        TahunAjaran::create(['nama' => $request->getNama()]);

        return redirect()->route('tahun-ajaran.index');
    }

    public function update(UpdateTahunAjaranRequest $request, TahunAjaran $tahunAjaran): RedirectResponse
    {
        $tahunAjaran->update(['nama' => $request->getNama()]);

        return redirect()->route('tahun-ajaran.index');
    }

    public function destroy(TahunAjaran $tahunAjaran): RedirectResponse
    {
        $tahunAjaran->delete();

        return redirect()->route('tahun-ajaran.index');
    }

    public function setAktif(TahunAjaran $tahunAjaran): RedirectResponse
    {
        TahunAjaran::where('is_active', true)->update(['is_active' => false]);
        $tahunAjaran->update(['is_active' => true]);

        return redirect()->route('tahun-ajaran.index');
    }
}
