<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\JenisPrestasi;
use App\Models\Wakasis\KategoriPrestasi;
use App\Models\Wakasis\Prestasi;
use App\Services\StorageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PrestasiController extends Controller
{
    public function __construct(private StorageService $storage) {}

    public function index(Request $request): Response
    {
        $query = Prestasi::with([
            'siswa:id,nama,nisn',
            'jenisPrestasi:id,nama',
            'kategoriPrestasi:id,nama,tingkat',
            'inputOleh:id,name',
            'divalidasiOleh:id,name',
        ])->orderBy('tanggal', 'desc');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama_kejuaraan', 'like', "%{$request->search}%")
                    ->orWhereHas('siswa', fn ($s) => $s->where('nama', 'like', "%{$request->search}%")
                        ->orWhere('nisn', 'like', "%{$request->search}%"));
            });
        }

        if ($request->filled('jenis_prestasi_id')) {
            $query->where('jenis_prestasi_id', $request->jenis_prestasi_id);
        }

        if ($request->filled('validated')) {
            if ($request->validated === 'ya') {
                $query->whereNotNull('validated_at');
            } else {
                $query->whereNull('validated_at');
            }
        }

        return Inertia::render('wakasis/prestasi/index', [
            'prestasi'     => $query->paginate(20)->withQueryString(),
            'filters'      => $request->only('search', 'jenis_prestasi_id', 'validated'),
            'jenisList'    => JenisPrestasi::orderBy('nama')->get(['id', 'nama']),
            'kategoriList' => KategoriPrestasi::orderBy('nama')->get(['id', 'nama', 'tingkat']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'siswa_id'             => ['required', 'exists:m_siswa,id'],
            'jenis_prestasi_id'    => ['required', 'exists:m_wakasis_jenis_prestasi,id'],
            'kategori_prestasi_id' => ['required', 'exists:m_wakasis_kategori_prestasi,id'],
            'tanggal'              => ['required', 'date'],
            'nama_kejuaraan'       => ['required', 'string', 'max:200'],
            'peringkat'            => ['nullable', 'string', 'max:50'],
            'keterangan'           => ['nullable', 'string'],
            'sertifikat'           => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
        ]);

        $data['input_oleh'] = auth()->id();

        if ($request->hasFile('sertifikat')) {
            $data['sertifikat_path'] = $this->storage->upload($request->file('sertifikat'), 'wakasis/sertifikat');
        }

        unset($data['sertifikat']);

        Prestasi::create($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Prestasi berhasil dicatat.']);

        return redirect()->back();
    }

    public function update(Request $request, Prestasi $prestasi): RedirectResponse
    {
        $data = $request->validate([
            'siswa_id'             => ['required', 'exists:m_siswa,id'],
            'jenis_prestasi_id'    => ['required', 'exists:m_wakasis_jenis_prestasi,id'],
            'kategori_prestasi_id' => ['required', 'exists:m_wakasis_kategori_prestasi,id'],
            'tanggal'              => ['required', 'date'],
            'nama_kejuaraan'       => ['required', 'string', 'max:200'],
            'peringkat'            => ['nullable', 'string', 'max:50'],
            'keterangan'           => ['nullable', 'string'],
            'sertifikat'           => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
        ]);

        if ($request->hasFile('sertifikat')) {
            if ($prestasi->sertifikat_path) {
                $this->storage->delete($prestasi->sertifikat_path);
            }
            $data['sertifikat_path'] = $this->storage->upload($request->file('sertifikat'), 'wakasis/sertifikat');
        }

        unset($data['sertifikat']);

        $prestasi->update($data);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Prestasi berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Prestasi $prestasi): RedirectResponse
    {
        if ($prestasi->sertifikat_path) {
            $this->storage->delete($prestasi->sertifikat_path);
        }
        $prestasi->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Prestasi berhasil dihapus.']);

        return redirect()->back();
    }

    public function validate(Prestasi $prestasi): RedirectResponse
    {
        abort_if($prestasi->validated_at !== null, 422, 'Prestasi sudah divalidasi.');

        $prestasi->update([
            'divalidasi_oleh' => auth()->id(),
            'validated_at'    => now(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Prestasi berhasil divalidasi.']);

        return redirect()->back();
    }
}
