<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateJadwalAbsensiRequest;
use App\Models\JadwalAbsensi;
use App\Models\JadwalAbsensiLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
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

        // Update state aktif untuk tampilan UI
        $jadwalAbsensi->update($data);

        // Catat ke log historis — updateOrCreate agar perubahan kedua di hari yang sama
        // menimpa record hari ini (bukan insert duplikat)
        JadwalAbsensiLog::updateOrCreate(
            ['hari' => $jadwalAbsensi->hari, 'berlaku_mulai' => today()->toDateString()],
            array_merge($data, ['dibuat_oleh' => Auth::id()])
        );

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Jadwal absensi berhasil diperbarui.',
        ]);

        return redirect()->route('jadwal-absensi.index');
    }
}
