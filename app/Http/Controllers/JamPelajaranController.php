<?php

namespace App\Http\Controllers;

use App\Models\JamPelajaran;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JamPelajaranController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('akademik/jam-pelajaran/index', [
            'jamPelajaran' => JamPelajaran::orderBy('nomor')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nomor' => ['required', 'integer', 'min:1', 'max:20', 'unique:m_jam_pelajaran,nomor'],
            'jam_mulai' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i', 'after:jam_mulai'],
            'keterangan' => ['nullable', 'string', 'max:255'],
            'aktif' => ['boolean'],
        ]);

        JamPelajaran::create($data);

        return redirect()->back()->with('success', 'Jam pelajaran ditambahkan.');
    }

    public function update(Request $request, JamPelajaran $jamPelajaran): RedirectResponse
    {
        $data = $request->validate([
            'nomor' => ['required', 'integer', 'min:1', 'max:20', "unique:m_jam_pelajaran,nomor,{$jamPelajaran->id}"],
            'jam_mulai' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i', 'after:jam_mulai'],
            'keterangan' => ['nullable', 'string', 'max:255'],
            'aktif' => ['boolean'],
        ]);

        $jamPelajaran->update($data);

        return redirect()->back()->with('success', 'Jam pelajaran diperbarui.');
    }

    public function destroy(JamPelajaran $jamPelajaran): RedirectResponse
    {
        $jamPelajaran->delete();

        return redirect()->back()->with('success', 'Jam pelajaran dihapus.');
    }
}
