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
        $query = TahunAjaran::withCount('kelas')->orderByDesc('nama')->orderByDesc('is_active');

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

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Tahun ajaran berhasil ditambahkan.']);

        return redirect()->route('tahun-ajaran.index');
    }

    public function update(UpdateTahunAjaranRequest $request, TahunAjaran $tahunAjaran): RedirectResponse
    {
        $tahunAjaran->update(['nama' => $request->getNama()]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Tahun ajaran berhasil diperbarui.']);

        return redirect()->route('tahun-ajaran.index');
    }

    public function destroy(TahunAjaran $tahunAjaran): RedirectResponse
    {
        if ($tahunAjaran->kelas()->exists()) {
            Inertia::flash('toast', ['type' => 'error', 'message' => "Tahun ajaran {$tahunAjaran->nama} tidak dapat dihapus karena sudah memiliki kelas."]);

            return redirect()->route('tahun-ajaran.index');
        }

        $tahunAjaran->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Tahun ajaran berhasil dihapus.']);

        return redirect()->route('tahun-ajaran.index');
    }

    public function setAktif(TahunAjaran $tahunAjaran): RedirectResponse
    {
        TahunAjaran::where('is_active', true)->update(['is_active' => false]);
        $tahunAjaran->update(['is_active' => true]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Tahun ajaran {$tahunAjaran->nama} berhasil diaktifkan.",
        ]);

        return redirect()->route('tahun-ajaran.index');
    }
}
