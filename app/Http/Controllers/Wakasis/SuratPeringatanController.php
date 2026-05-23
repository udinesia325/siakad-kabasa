<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\JenisSuratPeringatan;
use App\Models\Wakasis\SuratPeringatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SuratPeringatanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = SuratPeringatan::with([
            'siswa:id,nama,nisn',
            'jenisSp:id,nama,level',
            'divalidasiOleh:id,name',
        ])->orderBy('tanggal', 'desc');

        if ($request->filled('search')) {
            $query->whereHas('siswa', fn ($q) => $q->where('nama', 'like', "%{$request->search}%")
                ->orWhere('nisn', 'like', "%{$request->search}%"));
        }

        if ($request->filled('jenis_sp_id')) {
            $query->where('jenis_sp_id', $request->jenis_sp_id);
        }

        if ($request->filled('validated')) {
            if ($request->validated === 'ya') {
                $query->whereNotNull('validated_at');
            } else {
                $query->whereNull('validated_at');
            }
        }

        return Inertia::render('wakasis/surat-peringatan/index', [
            'suratPeringatan' => $query->paginate(20)->withQueryString(),
            'filters'         => $request->only('search', 'jenis_sp_id', 'validated'),
            'jenisSps'        => JenisSuratPeringatan::orderBy('level')->get(['id', 'nama', 'level']),
        ]);
    }

    public function validate(SuratPeringatan $suratPeringatan): RedirectResponse
    {
        abort_if($suratPeringatan->validated_at !== null, 422, 'SP sudah divalidasi.');

        $suratPeringatan->update([
            'divalidasi_oleh' => auth()->id(),
            'validated_at'    => now(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Surat Peringatan berhasil divalidasi.']);

        return redirect()->back();
    }
}
