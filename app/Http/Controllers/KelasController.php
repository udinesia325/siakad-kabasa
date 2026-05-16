<?php

namespace App\Http\Controllers;

use App\Http\Requests\LuluskanRequest;
use App\Http\Requests\NaikKelasRequest;
use App\Http\Requests\StoreKelasRequest;
use App\Http\Requests\UpdateKelasRequest;
use App\Models\Kelas;
use App\Models\LogOperasiKelas;
use App\Models\Pegawai;
use App\Models\TahunAjaran;
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
        $query = Kelas::with(['tahunAjaran', 'waliKelas:id,nama'])
            ->withCount(['siswa' => fn ($q) => $q->where('status', 'aktif')])
            ->orderBy('tingkat')
            ->orderBy('nama');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('akademik/kelas/index', [
            'kelas' => $query->paginate(12)->withQueryString(),
            'tahunAjaran' => TahunAjaran::orderByDesc('nama')->get(),
            'kelasTujuanOptions' => Kelas::with('tahunAjaran')->orderBy('tingkat')->orderBy('nama')->get(['id', 'nama', 'tingkat', 'tahun_ajaran_id']),
            'pegawaiOptions' => Pegawai::where('aktif', true)
                ->where('jenis', 'guru')
                ->orderBy('nama')
                ->get(['id', 'nama', 'nip']),
            'kelasDenganWali' => Kelas::with('tahunAjaran:id,nama')
                ->whereNotNull('pegawai_id')
                ->get(['id', 'nama', 'pegawai_id', 'tahun_ajaran_id']),
            'filters' => $request->only('search'),
        ]);
    }

    public function store(StoreKelasRequest $request): RedirectResponse
    {
        Kelas::create($request->validated());

        return redirect()->route('kelas.index');
    }

    public function update(UpdateKelasRequest $request, Kelas $kelas): RedirectResponse
    {
        $kelas->update($request->validated());

        return redirect()->route('kelas.index');
    }

    public function destroy(Kelas $kelas): RedirectResponse
    {
        $kelas->delete();

        return redirect()->route('kelas.index');
    }

    public function naikKelas(NaikKelasRequest $request, Kelas $kelas, MutasiKelasService $service): RedirectResponse|JsonResponse
    {
        $tujuan = Kelas::findOrFail($request->validated()['kelas_tujuan_id']);
        try {
            $service->naikKelas(
                $kelas,
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

        return redirect()->route('kelas.index')->with('success', 'Operasi naik kelas berhasil.');
    }

    public function luluskan(LuluskanRequest $request, Kelas $kelas, MutasiKelasService $service): RedirectResponse
    {
        $service->luluskan($kelas, $request->user(), keterangan: $request->validated()['keterangan'] ?? null);

        return redirect()->route('kelas.index')->with('success', 'Angkatan berhasil diluluskan.');
    }

    public function logOperasi(Kelas $kelas): JsonResponse
    {
        $logs = LogOperasiKelas::with(['kelasAsal', 'kelasTujuan', 'oleh'])
            ->where(fn ($q) => $q->where('kelas_asal_id', $kelas->id)->orWhere('kelas_tujuan_id', $kelas->id))
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        return response()->json(['logs' => $logs]);
    }
}
