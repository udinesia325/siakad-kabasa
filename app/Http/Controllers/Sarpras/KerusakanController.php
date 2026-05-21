<?php

namespace App\Http\Controllers\Sarpras;

use App\Http\Controllers\Controller;
use App\Models\Sarpras\Barang;
use App\Models\Sarpras\Kerusakan;
use App\Models\Sarpras\Vendor;
use App\Services\StorageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KerusakanController extends Controller
{
    public function __construct(private StorageService $storage) {}

    public function index(Request $request): Response
    {
        $query = Kerusakan::with([
            'barang:id,kode,nama',
            'pelapor:id,name',
            'vendor:id,nama',
        ])->orderByDesc('created_at');

        if ($request->filled('search')) {
            $query->whereHas('barang', fn ($q) => $q->where('nama', 'like', "%{$request->search}%")
                ->orWhere('kode', 'like', "%{$request->search}%"));
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('prioritas') && $request->prioritas !== 'all') {
            $query->where('prioritas', $request->prioritas);
        }

        return Inertia::render('sarpras/kerusakan/index', [
            'kerusakan' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search', 'status', 'prioritas'),
            'barangList' => Barang::orderBy('nama')->get(['id', 'kode', 'nama']),
            'vendorList' => Vendor::whereIn('spesialisasi', ['servis', 'keduanya'])->orderBy('nama')->get(['id', 'nama']),
            'authId' => auth()->id(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'barang_id' => ['required', 'exists:m_sarpras_barang,id'],
            'deskripsi' => ['required', 'string'],
            'prioritas' => ['required', 'in:rendah,sedang,tinggi'],
            'foto' => ['nullable', 'file', 'max:10240', 'mimes:jpg,jpeg,png,webp,pdf'],
        ]);

        if ($request->hasFile('foto')) {
            $data['foto_path'] = $this->storage->upload($request->file('foto'), 'sarpras/kerusakan');
        }

        $data['pelapor_id'] = auth()->id();
        $data['status'] = 'dilaporkan';
        unset($data['foto']);

        Kerusakan::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Laporan kerusakan berhasil dikirim.']);

        return redirect()->back();
    }

    public function update(Request $request, Kerusakan $kerusakan): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:dilaporkan,diproses,menunggu_sparepart,selesai'],
            'prioritas' => ['required', 'in:rendah,sedang,tinggi'],
            'catatan_progres' => ['nullable', 'string'],
            'tgl_selesai' => ['nullable', 'date'],
            'vendor_id' => ['nullable', 'exists:m_sarpras_vendor,id'],
            'foto' => ['nullable', 'file', 'max:10240', 'mimes:jpg,jpeg,png,webp,pdf'],
        ]);

        if ($request->hasFile('foto')) {
            if ($kerusakan->foto_path) {
                $this->storage->delete($kerusakan->foto_path);
            }
            $data['foto_path'] = $this->storage->upload($request->file('foto'), 'sarpras/kerusakan');
        }

        unset($data['foto']);
        $kerusakan->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Laporan kerusakan diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Kerusakan $kerusakan): RedirectResponse
    {
        if ($kerusakan->foto_path) {
            $this->storage->delete($kerusakan->foto_path);
        }
        $kerusakan->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Laporan kerusakan dihapus.']);

        return redirect()->back();
    }
}
