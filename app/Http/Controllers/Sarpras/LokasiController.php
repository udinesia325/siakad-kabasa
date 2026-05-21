<?php

namespace App\Http\Controllers\Sarpras;

use App\Http\Controllers\Controller;
use App\Models\Sarpras\Lokasi;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LokasiController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Lokasi::with('penanggungjawab:id,name')->orderBy('nama');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('kode', 'like', "%{$request->search}%")
                    ->orWhere('nama', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        return Inertia::render('sarpras/lokasi/index', [
            'lokasi' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search', 'jenis'),
            'users' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'kode' => ['required', 'string', 'max:20', 'unique:m_sarpras_lokasi,kode'],
            'nama' => ['required', 'string', 'max:100'],
            'kapasitas' => ['nullable', 'integer', 'min:1'],
            'jenis' => ['required', 'in:lab,kelas,gudang,lainnya'],
            'penanggung_jawab_id' => ['nullable', 'exists:users,id'],
        ]);
        $data['kode'] = strtoupper($data['kode']);
        Lokasi::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Lokasi berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, Lokasi $lokasi): RedirectResponse
    {
        $data = $request->validate([
            'kode' => ['required', 'string', 'max:20', "unique:m_sarpras_lokasi,kode,{$lokasi->id}"],
            'nama' => ['required', 'string', 'max:100'],
            'kapasitas' => ['nullable', 'integer', 'min:1'],
            'jenis' => ['required', 'in:lab,kelas,gudang,lainnya'],
            'penanggung_jawab_id' => ['nullable', 'exists:users,id'],
        ]);
        $data['kode'] = strtoupper($data['kode']);
        $lokasi->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Lokasi berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Lokasi $lokasi): RedirectResponse
    {
        $lokasi->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Lokasi berhasil dihapus.']);

        return redirect()->back();
    }
}
