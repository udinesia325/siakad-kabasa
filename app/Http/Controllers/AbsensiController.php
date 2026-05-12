<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\JadwalAbsensi;
use App\Models\Rfid;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class AbsensiController extends Controller
{
    public function index(): Response
    {
        $hari = (int) Carbon::now()->isoWeekday(); // 1=Senin ... 7=Minggu
        $jadwal = JadwalAbsensi::where('hari', $hari)->first();

        return Inertia::render('absensi/scanner', [
            'jadwal' => $jadwal ? [
                'is_libur' => $jadwal->is_libur,
                'jam_masuk_min' => $jadwal->jam_masuk_min?->format('H:i'),
                'jam_masuk_max' => $jadwal->jam_masuk_max?->format('H:i'),
                'jam_pulang_min' => $jadwal->jam_pulang_min?->format('H:i'),
                'jam_pulang_max' => $jadwal->jam_pulang_max?->format('H:i'),
            ] : null,
        ]);
    }

    public function scan(Request $request): JsonResponse
    {
        $request->validate(['kode_rfid' => 'required|string']);

        $rfid = Rfid::where('kode_rfid', $request->kode_rfid)
            ->where('reff_type', 'm_siswa')
            ->with('siswa.kelas')
            ->first();

        if (! $rfid || ! $rfid->siswa) {
            return response()->json(['status' => 'not_registered'], 200);
        }

        $now = Carbon::now();
        $hari = (int) $now->isoWeekday();
        $jadwal = JadwalAbsensi::where('hari', $hari)->first();

        if (! $jadwal || $jadwal->is_libur) {
            return response()->json(['status' => 'libur'], 200);
        }

        // Tentukan tipe: masuk atau pulang
        $nowTime = $now->format('H:i:s');
        $tipe = null;
        if ($jadwal->jam_masuk_min && $jadwal->jam_masuk_max) {
            $min = $jadwal->jam_masuk_min->format('H:i:s');
            $max = $jadwal->jam_masuk_max->format('H:i:s');
            if ($nowTime >= $min && $nowTime <= $max) {
                $tipe = 'masuk';
            }
        }
        if (! $tipe && $jadwal->jam_pulang_min && $jadwal->jam_pulang_max) {
            $min = $jadwal->jam_pulang_min->format('H:i:s');
            $max = $jadwal->jam_pulang_max->format('H:i:s');
            if ($nowTime >= $min && $nowTime <= $max) {
                $tipe = 'pulang';
            }
        }
        if (! $tipe) {
            return response()->json(['status' => 'diluar_jadwal'], 200);
        }

        // Cek duplikat hari ini
        $sudahAbsen = Absensi::where('reff_type', 'm_siswa')
            ->where('reff_id', $rfid->siswa->id)
            ->where('tipe', $tipe)
            ->whereDate('waktu_absen', $now->toDateString())
            ->first();

        if ($sudahAbsen) {
            return response()->json([
                'status' => 'duplicate',
                'tipe' => $tipe,
                'nama' => $rfid->siswa->nama,
                'kelas' => $rfid->siswa->kelas?->nama,
                'waktu_absen' => $sudahAbsen->waktu_absen->format('H:i'),
            ], 200);
        }

        $absensi = Absensi::create([
            'reff_type' => 'm_siswa',
            'reff_id' => $rfid->siswa->id,
            'waktu_absen' => $now,
            'tipe' => $tipe,
        ]);

        return response()->json([
            'status' => 'success',
            'tipe' => $tipe,
            'nama' => $rfid->siswa->nama,
            'kelas' => $rfid->siswa->kelas?->nama,
            'waktu_absen' => $absensi->waktu_absen->format('H:i'),
        ], 200);
    }
}
