<?php

namespace App\Http\Controllers;

use App\Models\BukuTamu;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BukuTamuController extends Controller
{
    public function index(Request $request): Response
    {
        $query = BukuTamu::with('dicatatOleh:id,name')
            ->orderByDesc('tanggal')
            ->orderByDesc('jam_masuk');

        if ($request->filled('bulan') && $request->filled('tahun')) {
            $query->whereMonth('tanggal', $request->bulan)
                ->whereYear('tanggal', $request->tahun);
        } elseif ($request->filled('tahun')) {
            $query->whereYear('tanggal', $request->tahun);
        } else {
            $query->whereMonth('tanggal', now()->month)
                ->whereYear('tanggal', now()->year);
        }

        if ($request->filled('nama')) {
            $query->where('nama', 'like', '%'.$request->nama.'%');
        }

        return Inertia::render('master/buku-tamu/index', [
            'bukuTamu' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only(['bulan', 'tahun', 'nama']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'tanggal' => ['required', 'date'],
            'jam_masuk' => ['required', 'date_format:H:i'],
            'jam_keluar' => ['nullable', 'date_format:H:i', 'after:jam_masuk'],
            'nama' => ['required', 'string', 'max:255'],
            'instansi' => ['nullable', 'string', 'max:255'],
            'keperluan' => ['required', 'string', 'max:255'],
            'bertemu_dengan' => ['nullable', 'string', 'max:255'],
        ]);

        $data['dicatat_oleh'] = Auth::id();

        BukuTamu::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data tamu berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, BukuTamu $bukuTamu): RedirectResponse
    {
        $data = $request->validate([
            'tanggal' => ['required', 'date'],
            'jam_masuk' => ['required', 'date_format:H:i'],
            'jam_keluar' => ['nullable', 'date_format:H:i', 'after:jam_masuk'],
            'nama' => ['required', 'string', 'max:255'],
            'instansi' => ['nullable', 'string', 'max:255'],
            'keperluan' => ['required', 'string', 'max:255'],
            'bertemu_dengan' => ['nullable', 'string', 'max:255'],
        ]);

        $bukuTamu->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data tamu berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(BukuTamu $bukuTamu): RedirectResponse
    {
        $bukuTamu->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data tamu berhasil dihapus.']);

        return redirect()->back();
    }
}
