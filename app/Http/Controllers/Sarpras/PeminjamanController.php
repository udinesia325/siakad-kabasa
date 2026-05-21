<?php

namespace App\Http\Controllers\Sarpras;

use App\Http\Controllers\Controller;
use App\Models\Sarpras\Barang;
use App\Models\Sarpras\Peminjaman;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PeminjamanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Peminjaman::with([
            'barang:id,kode,nama',
            'peminjam:id,name',
            'approvedBy:id,name',
        ])->orderByDesc('created_at');

        if ($request->filled('search')) {
            $query->whereHas('barang', fn ($q) => $q->where('nama', 'like', "%{$request->search}%")
                ->orWhere('kode', 'like', "%{$request->search}%"));
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        return Inertia::render('sarpras/peminjaman/index', [
            'peminjaman' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search', 'status'),
            'barangList' => Barang::where('kondisi', 'baik')->orderBy('nama')->get(['id', 'kode', 'nama', 'satuan']),
            'authId' => auth()->id(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'barang_id' => ['required', 'exists:m_sarpras_barang,id'],
            'tgl_pinjam' => ['required', 'date'],
            'tgl_kembali_rencana' => ['required', 'date', 'after_or_equal:tgl_pinjam'],
            'keperluan' => ['required', 'string'],
            'catatan' => ['nullable', 'string'],
        ]);

        $data['peminjam_id'] = auth()->id();
        $data['status'] = 'menunggu';

        Peminjaman::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Permohonan peminjaman berhasil dikirim.']);

        return redirect()->back();
    }

    public function approve(Request $request, Peminjaman $peminjaman): RedirectResponse
    {
        abort_unless($peminjaman->status === 'menunggu', 422, 'Hanya peminjaman berstatus menunggu yang dapat disetujui.');

        $peminjaman->update([
            'status' => 'disetujui',
            'approved_by' => auth()->id(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Peminjaman disetujui.']);

        return redirect()->back();
    }

    public function reject(Request $request, Peminjaman $peminjaman): RedirectResponse
    {
        abort_unless($peminjaman->status === 'menunggu', 422, 'Hanya peminjaman berstatus menunggu yang dapat ditolak.');

        $peminjaman->update([
            'status' => 'ditolak',
            'approved_by' => auth()->id(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Peminjaman ditolak.']);

        return redirect()->back();
    }

    public function kembalikan(Request $request, Peminjaman $peminjaman): RedirectResponse
    {
        abort_unless($peminjaman->status === 'disetujui', 422, 'Hanya peminjaman berstatus disetujui yang dapat dikembalikan.');

        $peminjaman->update([
            'status' => 'dikembalikan',
            'tgl_kembali_aktual' => now()->toDateString(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pengembalian barang dicatat.']);

        return redirect()->back();
    }

    public function destroy(Peminjaman $peminjaman): RedirectResponse
    {
        abort_unless($peminjaman->status === 'menunggu', 422, 'Hanya peminjaman menunggu yang dapat dihapus.');

        $peminjaman->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Permohonan peminjaman dihapus.']);

        return redirect()->back();
    }
}
