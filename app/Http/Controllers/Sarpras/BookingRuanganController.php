<?php

namespace App\Http\Controllers\Sarpras;

use App\Http\Controllers\Controller;
use App\Models\Sarpras\BookingRuangan;
use App\Models\Sarpras\Lokasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingRuanganController extends Controller
{
    public function index(Request $request): Response
    {
        $query = BookingRuangan::with([
            'lokasi:id,nama,kode',
            'pemohon:id,name',
            'approvedBy:id,name',
        ])->orderByDesc('mulai');

        if ($request->filled('search')) {
            $query->whereHas('lokasi', fn ($q) => $q->where('nama', 'like', "%{$request->search}%")
                ->orWhere('kode', 'like', "%{$request->search}%"));
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        return Inertia::render('sarpras/booking-ruangan/index', [
            'booking' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search', 'status'),
            'lokasiList' => Lokasi::orderBy('nama')->get(['id', 'nama', 'kode', 'kapasitas']),
            'authId' => auth()->id(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'lokasi_id' => ['required', 'exists:m_sarpras_lokasi,id'],
            'keperluan' => ['required', 'string'],
            'mulai' => ['required', 'date'],
            'selesai' => ['required', 'date', 'after:mulai'],
            'catatan' => ['nullable', 'string'],
        ]);

        // Cek overlap booking yang sudah disetujui
        $overlap = BookingRuangan::where('lokasi_id', $data['lokasi_id'])
            ->where('status', 'disetujui')
            ->where(function ($q) use ($data) {
                $q->whereBetween('mulai', [$data['mulai'], $data['selesai']])
                    ->orWhereBetween('selesai', [$data['mulai'], $data['selesai']]);
            })->exists();

        if ($overlap) {
            return back()->withErrors(['mulai' => 'Ruangan sudah ada booking yang disetujui pada waktu tersebut.']);
        }

        $data['pemohon_id'] = auth()->id();
        $data['status'] = 'menunggu';

        BookingRuangan::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Permohonan booking ruangan berhasil dikirim.']);

        return redirect()->back();
    }

    public function approve(BookingRuangan $bookingRuangan): RedirectResponse
    {
        abort_unless($bookingRuangan->status === 'menunggu', 422, 'Hanya booking menunggu yang dapat disetujui.');

        $bookingRuangan->update(['status' => 'disetujui', 'approved_by' => auth()->id()]);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Booking disetujui.']);

        return redirect()->back();
    }

    public function reject(BookingRuangan $bookingRuangan): RedirectResponse
    {
        abort_unless($bookingRuangan->status === 'menunggu', 422, 'Hanya booking menunggu yang dapat ditolak.');

        $bookingRuangan->update(['status' => 'ditolak', 'approved_by' => auth()->id()]);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Booking ditolak.']);

        return redirect()->back();
    }

    public function selesai(BookingRuangan $bookingRuangan): RedirectResponse
    {
        abort_unless($bookingRuangan->status === 'disetujui', 422, 'Hanya booking disetujui yang dapat diselesaikan.');

        $bookingRuangan->update(['status' => 'selesai']);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Booking ditandai selesai.']);

        return redirect()->back();
    }

    public function destroy(BookingRuangan $bookingRuangan): RedirectResponse
    {
        abort_unless($bookingRuangan->status === 'menunggu', 422, 'Hanya booking menunggu yang dapat dihapus.');

        $bookingRuangan->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Booking dihapus.']);

        return redirect()->back();
    }
}
