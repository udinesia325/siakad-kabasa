<?php

namespace App\Http\Controllers;

use App\Exports\SiswaTemplateExport;
use App\Http\Requests\AssignRfidRequest;
use App\Http\Requests\MutasiSiswaRequest;
use App\Http\Requests\StoreSiswaRequest;
use App\Http\Requests\UpdateSiswaRequest;
use App\Imports\SiswaImportPreview;
use App\Models\Kelas;
use App\Models\Rfid;
use App\Models\Siswa;
use App\Services\MutasiKelasService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SiswaController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Siswa::with(['kelas.tahunAjaran', 'rfid']);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', "%{$request->search}%")
                    ->orWhere('nik', 'like', "%{$request->search}%")
                    ->orWhere('nisn', 'like', "%{$request->search}%");
            });
        }

        if ($request->input('kelas_id') === '_no_kelas') {
            $query->whereNull('kelas_id');
        } elseif ($request->filled('kelas_id')) {
            $query->where('kelas_id', $request->kelas_id);
        }

        $status = $request->input('status', 'aktif');
        if ($status !== 'semua') {
            $query->where('status', $status);
        }

        $rfidFilter = $request->input('rfid_filter', 'semua');
        if ($rfidFilter === 'dengan') {
            $query->whereHas('rfid');
        } elseif ($rfidFilter === 'tanpa') {
            $query->whereDoesntHave('rfid');
        }

        return Inertia::render('akademik/siswa/index', [
            'siswa' => $query->orderBy('nama')->paginate(20)->withQueryString(),
            'kelas' => Kelas::with('tahunAjaran')->orderBy('tingkat')->orderBy('nama')->get(),
            'filters' => $request->only(['search', 'kelas_id', 'status', 'rfid_filter']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('akademik/siswa/create', [
            'kelas' => Kelas::with('tahunAjaran')->orderBy('tingkat')->orderBy('nama')->get(),
        ]);
    }

    public function store(StoreSiswaRequest $request, MutasiKelasService $service): RedirectResponse
    {
        DB::transaction(function () use ($request, $service) {
            $siswa = Siswa::create($request->validated());
            $service->daftarkanSiswa($siswa);
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Siswa berhasil ditambahkan.']);

        return redirect()->route('siswa.index');
    }

    public function edit(Siswa $siswa): Response
    {
        return Inertia::render('akademik/siswa/edit', [
            'siswa' => $siswa->load(['kelas', 'rfid']),
            'kelas' => Kelas::with('tahunAjaran')->orderBy('tingkat')->orderBy('nama')->get(),
        ]);
    }

    public function update(UpdateSiswaRequest $request, Siswa $siswa): RedirectResponse
    {
        $siswa->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data siswa berhasil diperbarui.']);

        return redirect()->route('siswa.index');
    }

    public function destroy(Siswa $siswa): RedirectResponse
    {
        $siswa->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Siswa berhasil dihapus.']);

        return redirect()->route('siswa.index');
    }

    public function assignRfid(AssignRfidRequest $request, Siswa $siswa): RedirectResponse
    {
        $rfid = Rfid::where('reff_type', 'm_siswa')->where('reff_id', $siswa->id)->first();

        if ($rfid) {
            $rfid->update(['kode_rfid' => $request->kode_rfid, 'dibuat_pada' => now()]);
        } else {
            Rfid::create([
                'kode_rfid' => $request->kode_rfid,
                'reff_type' => 'm_siswa',
                'reff_id' => $siswa->id,
                'dibuat_pada' => now(),
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kartu RFID terhubung dengan '.$siswa->nama.'.']);

        return redirect()->back();
    }

    public function importTemplate(): BinaryFileResponse
    {
        return Excel::download(new SiswaTemplateExport, 'template-import-siswa.xlsx');
    }

    public function importPreview(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:xlsx,xls', 'max:5120'],
        ]);

        $import = new SiswaImportPreview;

        try {
            Excel::import($import, $request->file('file'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Format file Excel tidak dikenali. Pastikan Anda menggunakan template yang telah disediakan.'], 422);
        }

        if ($import->hasError()) {
            return response()->json(['error' => $import->getError()], 422);
        }

        return response()->json([
            'valid' => $import->valid,
            'invalid' => $import->invalid,
        ]);
    }

    public function importStore(Request $request, MutasiKelasService $service): RedirectResponse
    {
        $request->validate([
            'data' => ['required', 'array', 'min:1'],
            'data.*.nik' => ['required', 'string', 'max:20', 'distinct'],
            'data.*.nisn' => ['nullable', 'string', 'max:20', 'distinct'],
            'data.*.nama' => ['required', 'string'],
            'data.*.jenis_kelamin' => ['required', 'in:L,P'],
            'data.*.kelas_id' => ['nullable', 'exists:m_kelas,id'],
            'data.*.email' => ['nullable', 'email'],
        ]);

        try {
            DB::transaction(function () use ($request, $service) {
                foreach ($request->data as $row) {
                    $siswa = Siswa::create([
                        'nik' => $row['nik'],
                        'nisn' => $row['nisn'] ?? null,
                        'nama' => $row['nama'],
                        'jenis_kelamin' => $row['jenis_kelamin'],
                        'email' => $row['email'] ?? null,
                        'alamat' => $row['alamat'] ?? null,
                        'kelas_id' => $row['kelas_id'] ?? null,
                    ]);

                    $service->daftarkanSiswa($siswa);

                    if (! empty($row['rfid'])) {
                        Rfid::create([
                            'kode_rfid' => $row['rfid'],
                            'reff_type' => 'm_siswa',
                            'reff_id' => $siswa->id,
                            'dibuat_pada' => now(),
                        ]);
                    }
                }
            });
        } catch (\Exception $e) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Gagal menyimpan data. Beberapa data mungkin sudah ada di sistem.']);

            return redirect()->route('siswa.index');
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Import siswa berhasil.']);

        return redirect()->route('siswa.index');
    }

    public function mutasi(MutasiSiswaRequest $request, Siswa $siswa, MutasiKelasService $service): RedirectResponse
    {
        $data = $request->validated();
        $tujuan = ! empty($data['kelas_tujuan_id']) ? Kelas::findOrFail($data['kelas_tujuan_id']) : null;
        $keterangan = $data['keterangan'] ?? null;

        match ($data['aksi']) {
            'pindah_kelas' => $service->pindahKelas($siswa, $tujuan, $keterangan),
            'turunkan_tingkat' => $service->turunkanTingkat($siswa, $tujuan, $keterangan),
            'set_lulus' => $service->setLulus($siswa, $keterangan),
            'set_keluar' => $service->setKeluar($siswa, $keterangan),
            'reaktivasi' => $service->reaktivasi($siswa, $tujuan, $keterangan),
        };

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Mutasi siswa berhasil.']);

        return redirect()->route('siswa.index');
    }

    public function riwayatKelas(Siswa $siswa): JsonResponse
    {
        $riwayat = $siswa->riwayatKelas()->with('kelas.tahunAjaran')->get();

        return response()->json(['riwayat' => $riwayat]);
    }
}
