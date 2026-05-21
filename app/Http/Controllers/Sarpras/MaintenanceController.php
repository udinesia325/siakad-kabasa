<?php

namespace App\Http\Controllers\Sarpras;

use App\Http\Controllers\Controller;
use App\Models\Sarpras\Barang;
use App\Models\Sarpras\Maintenance;
use App\Models\Sarpras\Vendor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Maintenance::with([
            'barang:id,kode,nama',
            'vendor:id,nama',
        ])->orderByDesc('tgl_rencana');

        if ($request->filled('search')) {
            $query->whereHas('barang', fn ($q) => $q->where('nama', 'like', "%{$request->search}%"));
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        return Inertia::render('sarpras/maintenance/index', [
            'maintenances' => $query->paginate(20)->withQueryString(),
            'barangs' => Barang::orderBy('nama')->get(['id', 'nama']),
            'vendors' => Vendor::orderBy('nama')->get(['id', 'nama']),
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'barang_id' => ['required', 'exists:m_sarpras_barang,id'],
            'vendor_id' => ['nullable', 'exists:m_sarpras_vendor,id'],
            'tgl_rencana' => ['required', 'date'],
            'tgl_selesai' => ['nullable', 'date'],
            'interval' => ['required', 'in:mingguan,bulanan,tahunan'],
            'biaya' => ['nullable', 'integer', 'min:0'],
            'catatan' => ['nullable', 'string', 'max:2000'],
            'status' => ['required', 'in:dijadwalkan,selesai'],
        ]);

        Maintenance::create($request->all());
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal maintenance berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, Maintenance $maintenance): RedirectResponse
    {
        $request->validate([
            'barang_id' => ['required', 'exists:m_sarpras_barang,id'],
            'vendor_id' => ['nullable', 'exists:m_sarpras_vendor,id'],
            'tgl_rencana' => ['required', 'date'],
            'tgl_selesai' => ['nullable', 'date'],
            'interval' => ['required', 'in:mingguan,bulanan,tahunan'],
            'biaya' => ['nullable', 'integer', 'min:0'],
            'catatan' => ['nullable', 'string', 'max:2000'],
            'status' => ['required', 'in:dijadwalkan,selesai'],
        ]);

        $maintenance->update($request->all());
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal maintenance berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Maintenance $maintenance): RedirectResponse
    {
        $maintenance->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal maintenance berhasil dihapus.']);

        return redirect()->back();
    }
}
