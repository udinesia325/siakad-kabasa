<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignRfidRequest;
use App\Http\Requests\StoreSiswaRequest;
use App\Http\Requests\UpdateSiswaRequest;
use App\Models\Kelas;
use App\Models\Rfid;
use App\Models\Siswa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiswaController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Siswa::with(['kelas.tahunAjaran', 'rfid']);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', "%{$request->search}%")
                    ->orWhere('nik', 'like', "%{$request->search}%")
                    ->orWhere('nis', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('kelas_id')) {
            $query->where('kelas_id', $request->kelas_id);
        }

        return Inertia::render('akademik/siswa/index', [
            'siswa' => $query->orderBy('nama')->paginate(20)->withQueryString(),
            'kelas' => Kelas::with('tahunAjaran')->orderBy('tingkat')->orderBy('nama')->get(),
            'filters' => $request->only(['search', 'kelas_id']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('akademik/siswa/create', [
            'kelas' => Kelas::with('tahunAjaran')->orderBy('tingkat')->orderBy('nama')->get(),
        ]);
    }

    public function store(StoreSiswaRequest $request): RedirectResponse
    {
        Siswa::create($request->validated());

        return redirect()->route('siswa.index');
    }

    public function edit(Siswa $siswa): Response
    {
        return Inertia::render('akademik/siswa/edit', [
            'siswa' => $siswa->load(['kelas', 'rfid']),
            'kelas' => Kelas::with('tahunAjaran')->orderBy('tingkat')->orderBy('nama')->get(),
        ]);
    }

    public function update(UpdateSiswaRequest $request, Siswa $siswa): RedirectResponse
    {
        $siswa->update($request->validated());

        return redirect()->route('siswa.index');
    }

    public function destroy(Siswa $siswa): RedirectResponse
    {
        $siswa->delete();

        return redirect()->route('siswa.index');
    }

    public function assignRfid(AssignRfidRequest $request, Siswa $siswa): RedirectResponse
    {
        $rfid = Rfid::where('reff_type', 'm_siswa')->where('reff_id', $siswa->id)->first();

        if ($rfid) {
            $rfid->update(['kode_rfid' => $request->kode_rfid, 'dibuat_pada' => now()]);
        } else {
            Rfid::create([
                'kode_rfid' => $request->kode_rfid,
                'reff_type' => 'm_siswa',
                'reff_id' => $siswa->id,
                'dibuat_pada' => now(),
            ]);
        }

        return redirect()->route('siswa.edit', $siswa);
    }
}
