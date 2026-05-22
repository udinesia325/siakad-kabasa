<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JadwalAbsensiLogSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil semua jadwal absensi saat ini
        $jadwalList = DB::table('m_jadwal_absensi')->get();

        foreach ($jadwalList as $jadwal) {
            // Cari tanggal absensi tertua untuk hari ini (iso weekday = WEEKDAY()+1)
            $tanggalTertua = DB::table('t_absensi')
                ->selectRaw('DATE(MIN(waktu_absen)) as tgl_min')
                ->whereRaw('WEEKDAY(waktu_absen) + 1 = ?', [$jadwal->hari])
                ->value('tgl_min');

            // Fallback ke hari ini jika belum ada data absensi untuk hari ini
            $berlakuMulai = $tanggalTertua ?? now()->toDateString();

            DB::table('m_jadwal_absensi_log')->updateOrInsert(
                ['hari' => $jadwal->hari, 'berlaku_mulai' => $berlakuMulai],
                [
                    'is_libur' => $jadwal->is_libur,
                    'jam_masuk_min' => $jadwal->jam_masuk_min,
                    'jam_masuk_max' => $jadwal->jam_masuk_max,
                    'jam_pulang_min' => $jadwal->jam_pulang_min,
                    'jam_pulang_max' => $jadwal->jam_pulang_max,
                    'dibuat_oleh' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
