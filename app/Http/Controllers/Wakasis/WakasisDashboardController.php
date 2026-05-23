<?php

namespace App\Http\Controllers\Wakasis;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class WakasisDashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('wakasis/dashboard/index', [
            'stats' => [
                'totalPelanggaran' => 0,
                'totalPrestasi' => 0,
                'totalKasus' => 0,
                'totalPembinaan' => 0,
                'siswaAktifPembinaan' => 0,
                'suratPeringatanBulanIni' => 0,
            ],
        ]);
    }
}
