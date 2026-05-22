<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\JadwalAbsensiLog;
use App\Models\Pegawai;
use App\Models\Rfid;
use App\Models\Siswa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class AbsensiController extends Controller
{
    public function index(): Response
    {
        $jadwal = JadwalAbsensiLog::untukHariIni();

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

        $rfid = Rfid::where('kode_rfid', $request->kode_rfid)->first();

        if (! $rfid) {
            return response()->json(['status' => 'not_registered'], 200);
        }

        $now = Carbon::now();
        $jadwal = JadwalAbsensiLog::untukHariIni();

        // Hari libur tetap tolak untuk siswa maupun pegawai
        if (! $jadwal || $jadwal->is_libur) {
            return response()->json(['status' => 'libur'], 200);
        }

        if ($rfid->reff_type === 'm_pegawai') {
            return $this->scanPegawai($rfid, $now);
        }

        if ($rfid->reff_type === 'm_siswa') {
            return $this->scanSiswa($rfid, $jadwal, $now);
        }

        return response()->json(['status' => 'not_registered'], 200);
    }

    private function scanSiswa(Rfid $rfid, JadwalAbsensi $jadwal, Carbon $now): JsonResponse
    {
        $siswa = Siswa::with('kelas')->find($rfid->reff_id);

        if (! $siswa) {
            return response()->json(['status' => 'not_registered'], 200);
        }

        // Tentukan tipe berdasarkan rentang jam masuk/pulang
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

        $sudahAbsen = Absensi::where('reff_type', 'm_siswa')
            ->where('reff_id', $siswa->id)
            ->where('tipe', $tipe)
            ->whereDate('waktu_absen', $now->toDateString())
            ->first();

        if ($sudahAbsen) {
            return response()->json([
                'status' => 'duplicate',
                'tipe' => $tipe,
                'nama' => $siswa->nama,
                'kelas' => $siswa->kelas?->nama,
                'waktu_absen' => $sudahAbsen->waktu_absen->format('H:i'),
            ], 200);
        }

        $absensi = Absensi::create([
            'reff_type' => 'm_siswa',
            'reff_id' => $siswa->id,
            'waktu_absen' => $now,
            'tipe' => $tipe,
        ]);

        return response()->json([
            'status' => 'success',
            'tipe' => $tipe,
            'nama' => $siswa->nama,
            'kelas' => $siswa->kelas?->nama,
            'waktu_absen' => $absensi->waktu_absen->format('H:i'),
        ], 200);
    }

    private function scanPegawai(Rfid $rfid, Carbon $now): JsonResponse
    {
        $pegawai = Pegawai::find($rfid->reff_id);

        if (! $pegawai) {
            return response()->json(['status' => 'not_registered'], 200);
        }

        if (! $pegawai->aktif) {
            return response()->json([
                'status' => 'pegawai_nonaktif',
                'nama' => $pegawai->nama,
            ], 200);
        }

        // Pegawai bebas jam: cukup 1x scan per hari, selalu tipe 'masuk'.
        $sudahAbsen = Absensi::where('reff_type', 'm_pegawai')
            ->where('reff_id', $pegawai->id)
            ->whereDate('waktu_absen', $now->toDateString())
            ->first();

        if ($sudahAbsen) {
            return response()->json([
                'status' => 'duplicate',
                'tipe' => 'masuk',
                'nama' => $pegawai->nama,
                'kelas' => $pegawai->jabatan,
                'waktu_absen' => $sudahAbsen->waktu_absen->format('H:i'),
            ], 200);
        }

        $absensi = Absensi::create([
            'reff_type' => 'm_pegawai',
            'reff_id' => $pegawai->id,
            'waktu_absen' => $now,
            'tipe' => 'masuk',
        ]);

        return response()->json([
            'status' => 'success',
            'tipe' => 'masuk',
            'nama' => $pegawai->nama,
            'kelas' => $pegawai->jabatan,
            'waktu_absen' => $absensi->waktu_absen->format('H:i'),
        ], 200);
    }
}
