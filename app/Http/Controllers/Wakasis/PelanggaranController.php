<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\JenisSuratPeringatan;
use App\Models\Wakasis\Pelanggaran;
use App\Models\Wakasis\PoinPelanggaran;
use App\Models\Wakasis\SuratPeringatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PelanggaranController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Pelanggaran::with([
            'siswa:id,nama,nisn',
            'poinPelanggaran:id,nama,poin,jenis_pelanggaran_id',
            'poinPelanggaran.jenisPelanggaran:id,nama,warna',
            'inputOleh:id,name',
        ])->orderBy('tanggal', 'desc');

        if ($request->filled('search')) {
            $query->whereHas('siswa', fn ($q) => $q->where('nama', 'like', "%{$request->search}%")
                ->orWhere('nisn', 'like', "%{$request->search}%"));
        }

        if ($request->filled('siswa_id')) {
            $query->where('siswa_id', $request->siswa_id);
        }

        return Inertia::render('wakasis/pelanggaran/index', [
            'pelanggaran' => $query->paginate(20)->withQueryString(),
            'filters'     => $request->only('search', 'siswa_id'),
            'poinList'    => PoinPelanggaran::with('jenisPelanggaran:id,nama,warna')
                ->orderBy('poin', 'desc')->get(['id', 'nama', 'poin', 'jenis_pelanggaran_id']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'siswa_id'            => ['required', 'exists:m_siswa,id'],
            'poin_pelanggaran_id' => ['required', 'exists:m_wakasis_poin_pelanggaran,id'],
            'tanggal'             => ['required', 'date'],
            'keterangan'          => ['nullable', 'string'],
        ]);

        $data['input_oleh'] = auth()->id();

        Pelanggaran::create($data);
        $this->checkAndCreateSP($data['siswa_id']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pelanggaran berhasil dicatat.']);

        return redirect()->back();
    }

    public function update(Request $request, Pelanggaran $pelanggaran): RedirectResponse
    {
        $data = $request->validate([
            'siswa_id'            => ['required', 'exists:m_siswa,id'],
            'poin_pelanggaran_id' => ['required', 'exists:m_wakasis_poin_pelanggaran,id'],
            'tanggal'             => ['required', 'date'],
            'keterangan'          => ['nullable', 'string'],
        ]);

        $pelanggaran->update($data);
        $this->checkAndCreateSP($pelanggaran->siswa_id);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pelanggaran berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Pelanggaran $pelanggaran): RedirectResponse
    {
        $pelanggaran->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pelanggaran berhasil dihapus.']);

        return redirect()->back();
    }

    private function checkAndCreateSP(int $siswaId): void
    {
        $totalPoin = Pelanggaran::where('siswa_id', $siswaId)->sum(
            DB::raw('(SELECT poin FROM m_wakasis_poin_pelanggaran WHERE id = poin_pelanggaran_id)')
        );

        $jenisSps = JenisSuratPeringatan::orderBy('batas_poin')->get();

        foreach ($jenisSps as $jenisSp) {
            if ($totalPoin >= $jenisSp->batas_poin) {
                $alreadyExists = SuratPeringatan::where('siswa_id', $siswaId)
                    ->where('jenis_sp_id', $jenisSp->id)
                    ->exists();

                if (! $alreadyExists) {
                    SuratPeringatan::create([
                        'siswa_id'            => $siswaId,
                        'jenis_sp_id'         => $jenisSp->id,
                        'tanggal'             => now()->toDateString(),
                        'total_poin_saat_itu' => $totalPoin,
                    ]);
                }
            }
        }
    }
}
