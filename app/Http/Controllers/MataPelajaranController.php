<?php

namespace App\Http\Controllers;

use App\Models\MataPelajaran;
use App\Models\Pegawai;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MataPelajaranController extends Controller
{
    public function index(Request $request): Response
    {
        $query = MataPelajaran::withCount('pengampu')
            ->with(['pengampu:id,nama'])
            ->orderBy('kode');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('kode', 'like', "%{$request->search}%")
                    ->orWhere('nama', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('kelompok')) {
            $query->where('kelompok', $request->kelompok);
        }

        return Inertia::render('akademik/mata-pelajaran/index', [
            'mataPelajaran' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search', 'kelompok'),
            'pegawaiGuru' => Pegawai::where('aktif', true)
                ->where('jenis', 'guru')
                ->orderBy('nama')
                ->get(['id', 'nama', 'nip']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'kode' => ['required', 'string', 'max:30', 'unique:m_mata_pelajaran,kode'],
            'nama' => ['required', 'string', 'max:255'],
            'kelompok' => ['required', 'in:umum,kejuruan,muatan_lokal,lainnya'],
            'deskripsi' => ['nullable', 'string'],
            'aktif' => ['boolean'],
        ]);

        MataPelajaran::create($data);

        return redirect()->back()->with('success', 'Mata pelajaran ditambahkan.');
    }

    public function update(Request $request, MataPelajaran $mataPelajaran): RedirectResponse
    {
        $data = $request->validate([
            'kode' => ['required', 'string', 'max:30', "unique:m_mata_pelajaran,kode,{$mataPelajaran->id}"],
            'nama' => ['required', 'string', 'max:255'],
            'kelompok' => ['required', 'in:umum,kejuruan,muatan_lokal,lainnya'],
            'deskripsi' => ['nullable', 'string'],
            'aktif' => ['boolean'],
        ]);

        $mataPelajaran->update($data);

        return redirect()->back()->with('success', 'Mata pelajaran diperbarui.');
    }

    public function destroy(MataPelajaran $mataPelajaran): RedirectResponse
    {
        $mataPelajaran->delete();

        return redirect()->back()->with('success', 'Mata pelajaran dihapus.');
    }

    public function syncPengampu(Request $request, MataPelajaran $mataPelajaran): RedirectResponse
    {
        $data = $request->validate([
            'pegawai_ids' => ['array'],
            'pegawai_ids.*' => ['integer', 'exists:m_pegawai,id'],
        ]);

        $mataPelajaran->pengampu()->sync($data['pegawai_ids'] ?? []);

        return redirect()->back()->with('success', "Pengampu {$mataPelajaran->nama} diperbarui.");
    }
}
