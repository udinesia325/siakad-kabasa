<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTahunAjaranRequest;
use App\Http\Requests\UpdateTahunAjaranRequest;
use App\Models\KelasAjaran;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Services\TahunAjaranService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TahunAjaranController extends Controller
{
    public function index(Request $request): Response
    {
        $query = TahunAjaran::withCount('kelasAjaran')->orderByDesc('nama')->orderByDesc('is_active');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        $tahunAktif = TahunAjaran::where('is_active', true)->withCount('kelasAjaran')->first();

        return Inertia::render('akademik/tahun-ajaran/index', [
            'tahunAjaran' => $query->paginate(12)->withQueryString(),
            'filters'     => $request->only('search'),
            'tahunAktif'  => $tahunAktif ? [
                'nama'        => $tahunAktif->nama,
                'punya_kelas' => $tahunAktif->kelas_ajaran_count > 0,
            ] : null,
        ]);
    }

    public function store(StoreTahunAjaranRequest $request, TahunAjaranService $service): RedirectResponse
    {
        $tahunBaru = TahunAjaran::create(['nama' => $request->getNama()]);

        if ($request->boolean('salin_kelas')) {
            $tahunAsal = TahunAjaran::where('is_active', true)->first();

            if ($tahunAsal) {
                $service->buatKelasAjaranUntukTahunBaru($tahunBaru, $tahunAsal);
            }
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Tahun ajaran berhasil ditambahkan.']);

        return redirect()->route('tahun-ajaran.index');
    }

    public function update(UpdateTahunAjaranRequest $request, TahunAjaran $tahunAjaran): RedirectResponse
    {
        $tahunAjaran->update(['nama' => $request->getNama()]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Tahun ajaran berhasil diperbarui.']);

        return redirect()->route('tahun-ajaran.index');
    }

    public function destroy(TahunAjaran $tahunAjaran): RedirectResponse
    {
        if ($tahunAjaran->kelasAjaran()->exists()) {
            Inertia::flash('toast', ['type' => 'error', 'message' => "Tahun ajaran {$tahunAjaran->nama} tidak dapat dihapus karena sudah memiliki kelas."]);

            return redirect()->route('tahun-ajaran.index');
        }

        $tahunAjaran->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Tahun ajaran berhasil dihapus.']);

        return redirect()->route('tahun-ajaran.index');
    }

    public function previewAktivasi(TahunAjaran $tahunAjaran): JsonResponse
    {
        $punya_kelas = KelasAjaran::where('tahun_ajaran_id', $tahunAjaran->id)->exists();

        $siswa_belum_pindah = Siswa::aktif()
            ->whereNotNull('kelas_ajaran_id')
            ->whereHas('kelasAjaran', fn ($q) => $q->where('tahun_ajaran_id', '!=', $tahunAjaran->id))
            ->count();

        return response()->json([
            'punya_kelas' => $punya_kelas,
            'siswa_belum_pindah' => $siswa_belum_pindah,
        ]);
    }

    public function buatKelasAjaran(TahunAjaran $tahunAjaran, TahunAjaranService $service): JsonResponse
    {
        $tahunAsal = TahunAjaran::where('is_active', true)->first();
        if (! $tahunAsal) {
            return response()->json(['error' => 'Tidak ada tahun ajaran aktif sebagai acuan.'], 422);
        }

        $dibuat = $service->buatKelasAjaranUntukTahunBaru($tahunAjaran, $tahunAsal);

        return response()->json(['dibuat' => $dibuat]);
    }

    public function setAktif(TahunAjaran $tahunAjaran): RedirectResponse
    {
        TahunAjaran::where('is_active', true)->update(['is_active' => false]);
        $tahunAjaran->update(['is_active' => true]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Tahun ajaran {$tahunAjaran->nama} berhasil diaktifkan.",
        ]);

        return redirect()->route('tahun-ajaran.index');
    }
}
