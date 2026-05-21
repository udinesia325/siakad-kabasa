<?php

namespace App\Http\Controllers\Sarpras;

use App\Http\Controllers\Controller;
use App\Models\Sarpras\Vendor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VendorController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Vendor::query()->orderBy('nama');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', "%{$request->search}%")
                    ->orWhere('pic_nama', 'like', "%{$request->search}%");
            });
        }

        return Inertia::render('sarpras/vendor/index', [
            'vendor' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:150'],
            'pic_nama' => ['nullable', 'string', 'max:100'],
            'pic_kontak' => ['nullable', 'string', 'max:50'],
            'alamat' => ['nullable', 'string'],
            'spesialisasi' => ['required', 'in:pengadaan,servis,keduanya'],
        ]);

        Vendor::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Vendor berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, Vendor $vendor): RedirectResponse
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:150'],
            'pic_nama' => ['nullable', 'string', 'max:100'],
            'pic_kontak' => ['nullable', 'string', 'max:50'],
            'alamat' => ['nullable', 'string'],
            'spesialisasi' => ['required', 'in:pengadaan,servis,keduanya'],
        ]);

        $vendor->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Vendor berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Vendor $vendor): RedirectResponse
    {
        $vendor->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Vendor berhasil dihapus.']);

        return redirect()->back();
    }
}
