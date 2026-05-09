<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateJadwalAbsensiRequest;
use App\Models\JadwalAbsensi;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class JadwalAbsensiController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('akademik/jadwal-absensi/index', [
            'jadwal' => JadwalAbsensi::orderBy('hari')->get(),
        ]);
    }

    public function update(UpdateJadwalAbsensiRequest $request, JadwalAbsensi $jadwalAbsensi): RedirectResponse
    {
        $data = $request->validated();

        if ($data['is_libur']) {
            $data['jam_masuk_min'] = null;
            $data['jam_masuk_max'] = null;
            $data['jam_pulang_min'] = null;
            $data['jam_pulang_max'] = null;
        }

        $jadwalAbsensi->update($data);
        return redirect()->route('jadwal-absensi.index');
    }
}
