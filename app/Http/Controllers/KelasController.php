<?php

namespace App\Http\Controllers;

use App\Http\Requests\LuluskanRequest;
use App\Http\Requests\NaikKelasRequest;
use App\Http\Requests\StoreKelasRequest;
use App\Http\Requests\UpdateKelasRequest;
use App\Models\JenisKelas;
use App\Models\Kelas;
use App\Models\KelasAjaran;
use App\Models\LogOperasiKelas;
use App\Models\Pegawai;
use App\Models\TahunAjaran;
use App\Models\Tingkat;
use App\Services\KelasTujuanTidakKosongException;
use App\Services\MutasiKelasService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KelasController extends Controller
{
    public function index(Request $request): Response
    {
        $query = KelasAjaran::with(['kelas.jurusan', 'kelas.jenisKelas', 'tingkat', 'waliKelas:id,nama', 'tahunAjaran'])
            ->withCount(['siswa' => fn ($q) => $q->where('status', 'aktif')])
            ->orderBy('tingkat_id')
            ->orderBy('kelas_id');

        if ($request->filled('search')) {
            $query->whereHas('kelas', fn ($q) => $q->where('nama', 'like', "%{$request->search}%"));
        }

        if ($request->filled('tahun_ajaran_id')) {
            $query->where('tahun_ajaran_id', $request->tahun_ajaran_id);
        } else {
            $query->aktif();
        }

        $flattenKa = fn ($ka) => [
            'id' => $ka->id,
            'nama' => $ka->kelas?->nama ?? $ka->nama_lengkap,
            'tingkat' => $ka->tingkat?->nama,
            'tingkat_id' => $ka->tingkat_id,
            'kelas_id' => $ka->kelas_id,
            'rombel' => $ka->kelas?->rombel,
            'jurusan' => $ka->kelas?->jurusan ? [
                'id' => $ka->kelas->jurusan->id,
                'nama' => $ka->kelas->jurusan->nama,
                'singkatan' => $ka->kelas->jurusan->singkatan,
            ] : null,
            'jenis_kelas' => $ka->kelas?->jenisKelas ? [
                'id' => $ka->kelas->jenisKelas->id,
                'nama' => $ka->kelas->jenisKelas->nama,
            ] : null,
            'tahun_ajaran_id' => $ka->tahun_ajaran_id,
            'tahun_ajaran' => $ka->tahunAjaran ? [
                'id' => $ka->tahunAjaran->id,
                'nama' => $ka->tahunAjaran->nama,
                'is_active' => $ka->tahunAjaran->is_active,
            ] : null,
            'pegawai_id' => $ka->pegawai_id,
            'wali_kelas' => $ka->waliKelas ? ['id' => $ka->waliKelas->id, 'nama' => $ka->waliKelas->nama] : null,
            'siswa_count' => $ka->siswa_count,
        ];

        $paginator = $query->paginate(12)->withQueryString();
        $paginator->getCollection()->transform($flattenKa);

        return Inertia::render('akademik/kelas/index', [
            'kelas' => $paginator,
            'tahunAjaran' => TahunAjaran::orderByDesc('nama')->get(),
            'kelasTujuanOptions' => KelasAjaran::with(['kelas', 'tingkat', 'tahunAjaran'])->get()->map($flattenKa)->values(),
            'pegawaiOptions' => Pegawai::where('aktif', true)->where('jenis', 'guru')->orderBy('nama')->get(['id', 'nama', 'nik']),
            'masterKelasOptions' => Kelas::with('jurusan')->orderBy('nama')->get(['id', 'nama', 'rombel', 'jurusan_id', 'jenis_kelas_id']),
            'jenisKelasOptions' => JenisKelas::orderBy('urutan')->orderBy('nama')->get(['id', 'nama', 'urutan']),
            'tingkatOptions' => Tingkat::orderBy('jenjang')->orderBy('urutan')->get(),
            'kelasDenganWali' => KelasAjaran::with('tahunAjaran:id,nama')->whereNotNull('pegawai_id')->get(['id', 'kelas_id', 'pegawai_id', 'tahun_ajaran_id'])->map(fn ($ka) => [
                'id' => $ka->id,
                'nama' => $ka->nama_lengkap,
                'pegawai_id' => $ka->pegawai_id,
                'tahun_ajaran_id' => $ka->tahun_ajaran_id,
                'tahun_ajaran' => $ka->tahunAjaran ? ['id' => $ka->tahunAjaran->id, 'nama' => $ka->tahunAjaran->nama] : null,
            ])->values(),
            'filters' => $request->only(['search', 'tahun_ajaran_id']),
        ]);
    }

    public function store(StoreKelasRequest $request): RedirectResponse
    {
        KelasAjaran::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kelas berhasil ditambahkan.']);

        return redirect()->route('kelas.index');
    }

    public function update(UpdateKelasRequest $request, KelasAjaran $kelasAjaran): RedirectResponse
    {
        $kelasAjaran->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kelas berhasil diperbarui.']);

        return redirect()->route('kelas.index');
    }

    public function destroy(KelasAjaran $kelasAjaran): RedirectResponse
    {
        if ($kelasAjaran->siswa()->exists()) {
            Inertia::flash('toast', ['type' => 'error', 'message' => "Kelas {$kelasAjaran->nama_lengkap} tidak dapat dihapus karena masih memiliki siswa."]);

            return redirect()->route('kelas.index');
        }

        $kelasAjaran->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kelas berhasil dihapus.']);

        return redirect()->route('kelas.index');
    }

    public function naikKelas(NaikKelasRequest $request, KelasAjaran $kelasAjaran, MutasiKelasService $service): RedirectResponse|JsonResponse
    {
        $tujuan = KelasAjaran::findOrFail($request->validated()['kelas_tujuan_id']);
        try {
            $service->naikKelas(
                $kelasAjaran,
                $tujuan,
                $request->user(),
                paksa: (bool) $request->boolean('paksa'),
                keterangan: $request->validated()['keterangan'] ?? null,
            );
        } catch (KelasTujuanTidakKosongException $e) {
            return response()->json([
                'kode' => 'kelas_tujuan_tidak_kosong',
                'jumlah' => $e->jumlah,
            ], 409);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Operasi naik kelas berhasil.']);

        return redirect()->route('kelas.index');
    }

    public function luluskan(LuluskanRequest $request, KelasAjaran $kelasAjaran, MutasiKelasService $service): RedirectResponse
    {
        $service->luluskan($kelasAjaran, $request->user(), keterangan: $request->validated()['keterangan'] ?? null);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Angkatan berhasil diluluskan.']);

        return redirect()->route('kelas.index');
    }

    public function logOperasi(KelasAjaran $kelasAjaran): JsonResponse
    {
        $logs = LogOperasiKelas::with(['kelasAsal', 'kelasTujuan', 'oleh'])
            ->where(fn ($q) => $q->where('kelas_ajaran_asal_id', $kelasAjaran->id)->orWhere('kelas_ajaran_tujuan_id', $kelasAjaran->id))
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        return response()->json(['logs' => $logs]);
    }
}
