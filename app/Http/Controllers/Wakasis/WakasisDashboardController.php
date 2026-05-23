<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use App\Models\Wakasis\KasusSiswa;
use App\Models\Wakasis\Pembinaan;
use App\Models\Wakasis\Pelanggaran;
use App\Models\Wakasis\Prestasi;
use App\Models\Wakasis\SuratPeringatan;
use Inertia\Inertia;
use Inertia\Response;

class WakasisDashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('wakasis/dashboard/index', [
            'stats' => [
                'totalPelanggaran'        => Pelanggaran::count(),
                'totalPrestasi'           => Prestasi::whereNotNull('validated_at')->count(),
                'totalKasus'              => KasusSiswa::whereIn('status', ['baru', 'proses'])->count(),
                'totalPembinaan'          => Pembinaan::whereIn('status', ['proses', 'monitoring'])->count(),
                'siswaAktifPembinaan'     => Pembinaan::whereIn('status', ['proses', 'monitoring'])->distinct('siswa_id')->count('siswa_id'),
                'suratPeringatanBulanIni' => SuratPeringatan::whereNotNull('validated_at')
                    ->whereYear('tanggal', now()->year)
                    ->whereMonth('tanggal', now()->month)
                    ->count(),
            ],
        ]);
    }
}
