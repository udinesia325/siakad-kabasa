<?php

namespace App\Http\Controllers\Sarpras;

use App\Http\Controllers\Controller;
use App\Models\Sarpras\Barang;
use App\Models\Sarpras\Kategori;
use App\Models\Sarpras\Lokasi;
use App\Models\Sarpras\Vendor;
use App\Models\User;
use App\Services\StorageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BarangController extends Controller
{
    public function __construct(private StorageService $storage) {}

    public function index(Request $request): Response
    {
        $query = Barang::with([
            'kategori:id,nama,warna',
            'lokasi:id,nama,kode',
            'penanggungjawab:id,name',
        ])->orderBy('nama');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('kode', 'like', "%{$request->search}%")
                    ->orWhere('nama', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('kondisi')) {
            $query->where('kondisi', $request->kondisi);
        }

        if ($request->filled('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
        }

        return Inertia::render('sarpras/barang/index', [
            'barang' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search', 'kondisi', 'kategori_id'),
            'kategoriList' => Kategori::orderBy('nama')->get(['id', 'nama', 'warna']),
            'lokasiList' => Lokasi::orderBy('nama')->get(['id', 'nama', 'kode']),
            'vendorList' => Vendor::orderBy('nama')->get(['id', 'nama']),
            'userList' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateBarang($request);

        $data['kode'] = Barang::generateKode();

        if ($request->hasFile('foto')) {
            $data['foto_path'] = $this->storage->upload($request->file('foto'), 'sarpras/barang');
        }

        Barang::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Barang berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, Barang $barang): RedirectResponse
    {
        $data = $this->validateBarang($request, $barang->id);

        if ($request->hasFile('foto')) {
            if ($barang->foto_path) {
                $this->storage->delete($barang->foto_path);
            }
            $data['foto_path'] = $this->storage->upload($request->file('foto'), 'sarpras/barang');
        }

        $barang->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Barang berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Barang $barang): RedirectResponse
    {
        if ($barang->foto_path) {
            $this->storage->delete($barang->foto_path);
        }
        $barang->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Barang berhasil dihapus.']);

        return redirect()->back();
    }

    private function validateBarang(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'nama' => ['required', 'string', 'max:150'],
            'kategori_id' => ['nullable', 'exists:m_sarpras_kategori,id'],
            'lokasi_id' => ['nullable', 'exists:m_sarpras_lokasi,id'],
            'kondisi' => ['required', 'in:baik,rusak_ringan,rusak_berat,hilang'],
            'satuan' => ['required', 'string', 'max:30'],
            'tahun_beli' => ['nullable', 'integer', 'min:1900', 'max:2099'],
            'harga_beli' => ['nullable', 'integer', 'min:0'],
            'jumlah_unit' => ['required', 'integer', 'min:1'],
            'penanggung_jawab_id' => ['nullable', 'exists:users,id'],
            'foto' => ['nullable', 'file', 'max:10240', 'mimes:jpg,jpeg,png,webp,pdf'],
            'garansi_sampai' => ['nullable', 'date'],
            'sumber_dana' => ['nullable', 'string', 'max:100'],
            'vendor_id' => ['nullable', 'exists:m_sarpras_vendor,id'],
        ]);
    }
}
