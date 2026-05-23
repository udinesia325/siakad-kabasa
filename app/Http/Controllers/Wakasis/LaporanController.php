<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Wakasis\KasusSiswa;
use App\Models\Wakasis\Pembinaan;
use App\Models\Wakasis\Pelanggaran;
use App\Models\Wakasis\Prestasi;
use App\Models\Wakasis\SuratPeringatan;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class LaporanController extends Controller
{
    public function index(Request $request): Response
    {
        $kelasId = $request->filled('kelas_id') ? (int) $request->kelas_id : null;

        $siswaQuery = Siswa::orderBy('nama');
        if ($kelasId) {
            $siswaQuery->where('kelas_id', $kelasId);
        }
        $siswaList = $siswaQuery->get(['id', 'nama', 'nisn', 'kelas_id']);

        $rows = $siswaList->map(function ($siswa) {
            $id = $siswa->id;
            return [
                'id'                  => $id,
                'nama'                => $siswa->nama,
                'nisn'                => $siswa->nisn,
                'total_pelanggaran'   => Pelanggaran::where('siswa_id', $id)->count(),
                'total_sp'            => SuratPeringatan::where('siswa_id', $id)->whereNotNull('validated_at')->count(),
                'total_prestasi'      => Prestasi::where('siswa_id', $id)->whereNotNull('validated_at')->count(),
                'total_kasus'         => KasusSiswa::where('siswa_id', $id)->count(),
                'status_pembinaan'    => Pembinaan::where('siswa_id', $id)
                    ->whereIn('status', ['proses', 'monitoring'])
                    ->exists() ? 'aktif' : 'tidak',
            ];
        })->values();

        return Inertia::render('wakasis/laporan/index', [
            'rows'      => $rows,
            'kelasList' => Kelas::orderBy('nama')->get(['id', 'nama']),
            'filters'   => $request->only('kelas_id'),
        ]);
    }

    public function export(Request $request): HttpResponse
    {
        $kelasId = $request->filled('kelas_id') ? (int) $request->kelas_id : null;

        $siswaQuery = Siswa::orderBy('nama');
        if ($kelasId) {
            $siswaQuery->where('kelas_id', $kelasId);
        }
        $siswaList = $siswaQuery->get(['id', 'nama', 'nisn']);

        $filename = 'laporan-wakasis-' . now()->format('Ymd') . '.csv';

        return response()->streamDownload(function () use ($siswaList) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['No', 'Nama', 'NISN', 'Pelanggaran', 'Surat Peringatan', 'Prestasi', 'Kasus', 'Status Pembinaan']);

            foreach ($siswaList as $i => $siswa) {
                $id = $siswa->id;
                fputcsv($handle, [
                    $i + 1,
                    $siswa->nama,
                    $siswa->nisn ?? '-',
                    Pelanggaran::where('siswa_id', $id)->count(),
                    SuratPeringatan::where('siswa_id', $id)->whereNotNull('validated_at')->count(),
                    Prestasi::where('siswa_id', $id)->whereNotNull('validated_at')->count(),
                    KasusSiswa::where('siswa_id', $id)->count(),
                    Pembinaan::where('siswa_id', $id)->whereIn('status', ['proses', 'monitoring'])->exists() ? 'Aktif' : 'Tidak',
                ]);
            }

            fclose($handle);
        }, $filename, ['Content-Type' => 'text/csv']);
    }
}
