<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJenisKelasRequest;
use App\Http\Requests\UpdateJenisKelasRequest;
use App\Models\JenisKelas;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JenisKelasController extends Controller
{
    public function index(Request $request): Response
    {
        $query = JenisKelas::orderBy('urutan')->orderBy('nama');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('settings/jenis-kelas/index', [
            'jenisKelas' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    public function store(StoreJenisKelasRequest $request): RedirectResponse
    {
        JenisKelas::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis kelas berhasil ditambahkan.']);

        return redirect()->route('jenis-kelas.index');
    }

    public function update(UpdateJenisKelasRequest $request, JenisKelas $jenisKelas): RedirectResponse
    {
        $jenisKelas->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis kelas berhasil diperbarui.']);

        return redirect()->route('jenis-kelas.index');
    }

    public function destroy(JenisKelas $jenisKelas): RedirectResponse
    {
        if ($jenisKelas->kelas()->exists()) {
            Inertia::flash('toast', ['type' => 'error', 'message' => "Jenis kelas {$jenisKelas->nama} tidak dapat dihapus karena masih digunakan."]);

            return redirect()->route('jenis-kelas.index');
        }

        $jenisKelas->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jenis kelas berhasil dihapus.']);

        return redirect()->route('jenis-kelas.index');
    }
}
