<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKelasRequest;
use App\Http\Requests\UpdateKelasRequest;
use App\Models\Kelas;
use App\Models\TahunAjaran;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class KelasController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('akademik/kelas/index', [
            'kelas' => Kelas::with('tahunAjaran')->orderBy('tingkat')->orderBy('nama')->get(),
            'tahunAjaran' => TahunAjaran::orderByDesc('nama')->get(),
        ]);
    }

    public function store(StoreKelasRequest $request): RedirectResponse
    {
        Kelas::create($request->validated());

        return redirect()->route('kelas.index');
    }

    public function update(UpdateKelasRequest $request, Kelas $kelas): RedirectResponse
    {
        $kelas->update($request->validated());

        return redirect()->route('kelas.index');
    }

    public function destroy(Kelas $kelas): RedirectResponse
    {
        $kelas->delete();

        return redirect()->route('kelas.index');
    }
}
