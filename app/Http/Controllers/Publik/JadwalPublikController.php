<?php

namespace App\Http\Controllers\Publik;

use App\Http\Controllers\Controller;
use App\Models\TahunAjaran;
use Inertia\Inertia;
use Inertia\Response;

class JadwalPublikController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('publik/jadwal/index', [
            'tahunAjaranAktif' => TahunAjaran::where('is_active', true)->first(['nama']),
            'namaSekolah' => config('app.name'),
        ]);
    }
}
