<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePegawaiRequest;
use App\Http\Requests\UpdatePegawaiRequest;
use App\Models\Pegawai;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PegawaiController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Pegawai::query();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', "%{$request->search}%")
                    ->orWhere('nip', 'like', "%{$request->search}%")
                    ->orWhere('nuptk', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        $status = $request->input('status', 'aktif');
        if ($status === 'aktif') {
            $query->where('aktif', true);
        } elseif ($status === 'nonaktif') {
            $query->where('aktif', false);
        }

        return Inertia::render('akademik/pegawai/index', [
            'pegawai' => $query->orderBy('nama')->paginate(20)->withQueryString(),
            'filters' => $request->only(['search', 'jenis', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('akademik/pegawai/create');
    }

    public function store(StorePegawaiRequest $request): RedirectResponse
    {
        Pegawai::create($request->validated());

        return redirect()->route('pegawai.index')->with('success', 'Pegawai berhasil ditambahkan.');
    }

    public function edit(Pegawai $pegawai): Response
    {
        return Inertia::render('akademik/pegawai/edit', [
            'pegawai' => $pegawai,
        ]);
    }

    public function update(UpdatePegawaiRequest $request, Pegawai $pegawai): RedirectResponse
    {
        $pegawai->update($request->validated());

        return redirect()->route('pegawai.index')->with('success', 'Pegawai berhasil diperbarui.');
    }

    public function destroy(Pegawai $pegawai): RedirectResponse
    {
        $pegawai->delete();

        return redirect()->route('pegawai.index')->with('success', 'Pegawai berhasil dihapus.');
    }
}
