<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use App\Models\Wakasis\KasusSiswa;
use App\Models\Wakasis\Pembinaan;
use App\Models\Wakasis\Pelanggaran;
use App\Models\Wakasis\Prestasi;
use App\Models\Wakasis\SuratPeringatan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentTimelineController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $siswaId   = $request->filled('siswa_id') ? (int) $request->siswa_id : null;

        $events = [];

        if ($siswaId) {
            // Pelanggaran (only non-soft-deleted, auto-filtered by model)
            Pelanggaran::with(['poinPelanggaran.jenisPelanggaran:id,nama', 'poinPelanggaran:id,jenis_pelanggaran_id,poin'])
                ->where('siswa_id', $siswaId)
                ->orderBy('tanggal', 'desc')
                ->get()
                ->each(function ($item) use (&$events) {
                    $events[] = [
                        'type'    => 'pelanggaran',
                        'tanggal' => $item->tanggal?->format('Y-m-d'),
                        'label'   => $item->poinPelanggaran?->jenisPelanggaran?->nama ?? 'Pelanggaran',
                        'detail'  => $item->keterangan,
                        'meta'    => $item->poinPelanggaran ? '-' . $item->poinPelanggaran->poin . ' poin' : null,
                    ];
                });

            // Surat Peringatan (hanya yang sudah divalidasi)
            SuratPeringatan::with(['jenisSp:id,nama'])
                ->where('siswa_id', $siswaId)
                ->whereNotNull('validated_at')
                ->orderBy('tanggal', 'desc')
                ->get()
                ->each(function ($item) use (&$events) {
                    $events[] = [
                        'type'    => 'surat_peringatan',
                        'tanggal' => $item->tanggal?->format('Y-m-d'),
                        'label'   => $item->jenisSp?->nama ?? 'Surat Peringatan',
                        'detail'  => $item->keterangan,
                        'meta'    => 'Total poin: ' . $item->total_poin_saat_itu,
                    ];
                });

            // Pembinaan
            Pembinaan::with(['kategoriPembinaan:id,nama'])
                ->where('siswa_id', $siswaId)
                ->orderBy('tanggal_mulai', 'desc')
                ->get()
                ->each(function ($item) use (&$events) {
                    $events[] = [
                        'type'    => 'pembinaan',
                        'tanggal' => $item->tanggal_mulai?->format('Y-m-d'),
                        'label'   => $item->kategoriPembinaan?->nama ?? 'Pembinaan',
                        'detail'  => $item->catatan,
                        'meta'    => $item->status,
                    ];
                });

            // Prestasi (hanya yang sudah divalidasi)
            Prestasi::with(['jenisPrestasi:id,nama', 'kategoriPrestasi:id,nama'])
                ->where('siswa_id', $siswaId)
                ->whereNotNull('validated_at')
                ->orderBy('tanggal', 'desc')
                ->get()
                ->each(function ($item) use (&$events) {
                    $events[] = [
                        'type'    => 'prestasi',
                        'tanggal' => $item->tanggal?->format('Y-m-d'),
                        'label'   => $item->nama_kejuaraan,
                        'detail'  => $item->jenisPrestasi?->nama . ($item->peringkat ? ' — ' . $item->peringkat : ''),
                        'meta'    => $item->kategoriPrestasi?->nama,
                    ];
                });

            // Kasus Siswa
            KasusSiswa::where('siswa_id', $siswaId)
                ->orderBy('tanggal', 'desc')
                ->get()
                ->each(function ($item) use (&$events) {
                    $events[] = [
                        'type'    => 'kasus',
                        'tanggal' => $item->tanggal?->format('Y-m-d'),
                        'label'   => $item->judul,
                        'detail'  => $item->deskripsi,
                        'meta'    => $item->status,
                    ];
                });

            // Sort descending by tanggal
            usort($events, fn ($a, $b) => strcmp($b['tanggal'] ?? '', $a['tanggal'] ?? ''));
        }

        $selectedSiswa = $siswaId
            ? Siswa::with('kelas:id,nama')
                ->where('id', $siswaId)
                ->select(['id', 'nama', 'nisn', 'kelas_id', 'status'])
                ->first()
            : null;

        return Inertia::render('wakasis/student-timeline/index', [
            'selectedSiswa' => $selectedSiswa ? [
                'id'       => $selectedSiswa->id,
                'nama'     => $selectedSiswa->nama,
                'nisn'     => $selectedSiswa->nisn,
                'kelas_id' => $selectedSiswa->kelas_id,
                'kelas'    => $selectedSiswa->kelas?->nama,
                'status'   => $selectedSiswa->status,
            ] : null,
            'events'        => $events,
            'filters'       => $request->only('siswa_id'),
        ]);
    }
}
