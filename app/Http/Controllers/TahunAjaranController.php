<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTahunAjaranRequest;
use App\Http\Requests\UpdateTahunAjaranRequest;
use App\Models\TahunAjaran;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TahunAjaranController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('akademik/tahun-ajaran/index', [
            'tahunAjaran' => TahunAjaran::orderByDesc('nama')->get(),
        ]);
    }

    public function store(StoreTahunAjaranRequest $request): RedirectResponse
    {
        TahunAjaran::create($request->validated());

        return redirect()->route('tahun-ajaran.index');
    }

    public function update(UpdateTahunAjaranRequest $request, TahunAjaran $tahunAjaran): RedirectResponse
    {
        $tahunAjaran->update($request->validated());

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
