<?php

namespace App\Http\Controllers;

use App\Models\Jurusan;
use App\Models\Ppdb;
use App\Models\PpdbDokumen;
use App\Models\Siswa;
use App\Models\SiswaDetail;
use App\Models\TahunAjaran;
use App\Services\StorageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PpdbController extends Controller
{
    public function __construct(private StorageService $storage) {}

    public function index(Request $request): Response
    {
        $query = Ppdb::with([
            'tahunAjaran:id,nama',
            'jurusan:id,nama,singkatan',
            'dokumen',
        ])->orderByDesc('tanggal_daftar')->orderByDesc('created_at');

        if ($request->filled('tahun_ajaran_id')) {
            $query->where('tahun_ajaran_id', $request->tahun_ajaran_id);
        }

        if ($request->filled('jurusan_id')) {
            $query->where('jurusan_id', $request->jurusan_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('nama')) {
            $query->where('nama', 'like', '%'.$request->nama.'%');
        }

        $ppdbPaginated = $query->paginate(20)->withQueryString();
        $ppdbPaginated->getCollection()->transform(function ($item) {
            $item->dokumen->transform(function ($dok) {
                $dok->file_url = $this->storage->url($dok->file_path);

                return $dok;
            });

            return $item;
        });

        return Inertia::render('master/ppdb/index', [
            'ppdb' => $ppdbPaginated,
            'filters' => $request->only(['tahun_ajaran_id', 'jurusan_id', 'status', 'nama']),
            'tahunAjaranList' => TahunAjaran::orderByDesc('is_active')->orderByDesc('id')->get(['id', 'nama']),
            'jurusanList' => Jurusan::orderBy('nama')->get(['id', 'nama', 'singkatan']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validatePpdb($request);
        $data['dicatat_oleh'] = Auth::id();
        $data['status'] = 'draft';

        $ppdb = Ppdb::create($data);

        $this->syncDokumen($request, $ppdb);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data pendaftaran berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, Ppdb $ppdb): RedirectResponse
    {
        if ($ppdb->status === 'aktif') {
            abort(403, 'Data pendaftaran yang sudah diaktifkan tidak dapat diubah.');
        }

        $data = $this->validatePpdb($request, $ppdb->id);
        $ppdb->update($data);

        $this->syncDokumen($request, $ppdb);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data pendaftaran berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Ppdb $ppdb): RedirectResponse
    {
        if ($ppdb->status === 'aktif') {
            abort(403, 'Data pendaftaran yang sudah diaktifkan tidak dapat dihapus.');
        }

        foreach ($ppdb->dokumen as $dok) {
            $this->storage->delete($dok->file_path);
        }

        $ppdb->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data pendaftaran berhasil dihapus.']);

        return redirect()->back();
    }

    public function aktivasi(Ppdb $ppdb): RedirectResponse
    {
        if ($ppdb->status === 'aktif') {
            abort(422, 'Pendaftaran ini sudah diaktifkan.');
        }

        DB::transaction(function () use ($ppdb) {
            $siswa = Siswa::create([
                'nik' => $ppdb->nik,
                'nisn' => $ppdb->nisn,
                'nama' => $ppdb->nama,
                'jenis_kelamin' => $ppdb->jenis_kelamin,
                'alamat' => $ppdb->alamat,
                'status' => 'aktif',
            ]);

            SiswaDetail::create([
                'siswa_id' => $siswa->id,
                'ppdb_id' => $ppdb->id,
                'tempat_lahir' => $ppdb->tempat_lahir,
                'tanggal_lahir' => $ppdb->tanggal_lahir,
                'agama' => $ppdb->agama,
                'sekolah_asal' => $ppdb->sekolah_asal,
                'no_telepon' => $ppdb->no_telepon,
                'penerima_kip' => $ppdb->penerima_kip,
                'nama_kip' => $ppdb->nama_kip,
                'no_registrasi_akta' => $ppdb->no_registrasi_akta,
                'rt' => $ppdb->rt,
                'rw' => $ppdb->rw,
                'kelurahan' => $ppdb->kelurahan,
                'kecamatan' => $ppdb->kecamatan,
                'kabupaten' => $ppdb->kabupaten,
                'provinsi' => $ppdb->provinsi,
                'kode_pos' => $ppdb->kode_pos,
                'nama_ayah' => $ppdb->nama_ayah,
                'pekerjaan_ayah' => $ppdb->pekerjaan_ayah,
                'pendidikan_ayah' => $ppdb->pendidikan_ayah,
                'penghasilan_ayah' => $ppdb->penghasilan_ayah,
                'nama_ibu' => $ppdb->nama_ibu,
                'pekerjaan_ibu' => $ppdb->pekerjaan_ibu,
                'pendidikan_ibu' => $ppdb->pendidikan_ibu,
                'penghasilan_ibu' => $ppdb->penghasilan_ibu,
            ]);

            $ppdb->update(['status' => 'aktif', 'siswa_id' => $siswa->id]);
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pendaftaran berhasil diaktifkan. Siswa baru telah dibuat.']);

        return redirect()->back();
    }

    private function validatePpdb(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'tahun_ajaran_id' => ['required', 'exists:m_tahun_ajaran,id'],
            'jurusan_id' => ['required', 'exists:m_jurusan,id'],
            'nomor_registrasi' => ['required', 'string', 'max:50', 'unique:t_ppdb,nomor_registrasi'.($ignoreId ? ','.$ignoreId : '')],
            'tanggal_daftar' => ['required', 'date'],
            'nama' => ['required', 'string', 'max:255'],
            'nik' => ['required', 'string', 'size:16'],
            'nisn' => ['nullable', 'string', 'size:10'],
            'jenis_kelamin' => ['required', 'in:L,P'],
            'tempat_lahir' => ['required', 'string', 'max:100'],
            'tanggal_lahir' => ['required', 'date', 'before:today'],
            'agama' => ['required', 'in:Islam,Kristen,Katolik,Hindu,Buddha,Konghucu'],
            'sekolah_asal' => ['required', 'string', 'max:255'],
            'no_telepon' => ['nullable', 'string', 'max:20'],
            'penerima_kip' => ['boolean'],
            'nama_kip' => ['nullable', 'required_if:penerima_kip,true', 'string', 'max:255'],
            'no_registrasi_akta' => ['nullable', 'string', 'max:100'],
            'alamat' => ['required', 'string'],
            'rt' => ['nullable', 'string', 'max:5'],
            'rw' => ['nullable', 'string', 'max:5'],
            'kelurahan' => ['nullable', 'string', 'max:100'],
            'kecamatan' => ['nullable', 'string', 'max:100'],
            'kabupaten' => ['nullable', 'string', 'max:100'],
            'provinsi' => ['nullable', 'string', 'max:100'],
            'kode_pos' => ['nullable', 'string', 'max:10'],
            'nama_ayah' => ['required', 'string', 'max:255'],
            'pekerjaan_ayah' => ['nullable', 'string', 'max:100'],
            'pendidikan_ayah' => ['nullable', 'string', 'max:50'],
            'penghasilan_ayah' => ['nullable', 'string', 'max:50'],
            'nama_ibu' => ['required', 'string', 'max:255'],
            'pekerjaan_ibu' => ['nullable', 'string', 'max:100'],
            'pendidikan_ibu' => ['nullable', 'string', 'max:50'],
            'penghasilan_ibu' => ['nullable', 'string', 'max:50'],
            'dokumen' => ['nullable', 'array'],
            'dokumen.*.nama' => ['required_with:dokumen.*.file', 'string', 'max:255'],
            'dokumen.*.file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf,doc,docx', 'max:5120'],
            'hapus_dokumen_ids' => ['nullable', 'array'],
            'hapus_dokumen_ids.*' => ['integer', 'exists:t_ppdb_dokumen,id'],
        ]);
    }

    private function syncDokumen(Request $request, Ppdb $ppdb): void
    {
        if ($request->filled('hapus_dokumen_ids')) {
            $toDelete = PpdbDokumen::whereIn('id', $request->hapus_dokumen_ids)
                ->where('ppdb_id', $ppdb->id)
                ->get();

            foreach ($toDelete as $dok) {
                $this->storage->delete($dok->file_path);
                $dok->delete();
            }
        }

        if ($request->has('dokumen')) {
            foreach ($request->dokumen as $index => $item) {
                $file = $request->file("dokumen.{$index}.file");
                if ($file) {
                    $path = $this->storage->upload($file, 'ppdb/dokumen');
                    PpdbDokumen::create([
                        'ppdb_id' => $ppdb->id,
                        'nama_dokumen' => $item['nama'],
                        'file_path' => $path,
                    ]);
                }
            }
        }
    }
}
