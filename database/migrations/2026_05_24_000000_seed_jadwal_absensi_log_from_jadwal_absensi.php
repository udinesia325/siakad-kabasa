<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Seed initial rows ke m_jadwal_absensi_log dari m_jadwal_absensi.
     *
     * Dijalankan agar semua 7 hari terdaftar di log sehingga resolveUntukTanggal()
     * tidak return null untuk hari yang belum pernah diubah sejak sistem berjalan.
     * berlaku_mulai diset ke 2026-05-18 (tanggal absensi pertama di prod).
     */
    public function up(): void
    {
        $berlakuMulai = '2026-05-18';
        $now = now();

        $rows = DB::table('m_jadwal_absensi')->orderBy('hari')->get();

        foreach ($rows as $row) {
            $sudahAda = DB::table('m_jadwal_absensi_log')
                ->where('hari', $row->hari)
                ->where('berlaku_mulai', $berlakuMulai)
                ->exists();

            if ($sudahAda) {
                continue;
            }

            DB::table('m_jadwal_absensi_log')->insert([
                'hari'          => $row->hari,
                'berlaku_mulai' => $berlakuMulai,
                'is_libur'      => $row->is_libur,
                'jam_masuk_min' => $row->jam_masuk_min,
                'jam_masuk_max' => $row->jam_masuk_max,
                'jam_pulang_min' => $row->jam_pulang_min,
                'jam_pulang_max' => $row->jam_pulang_max,
                'dibuat_oleh'   => null,
                'created_at'    => $now,
                'updated_at'    => $now,
            ]);
        }
    }

    public function down(): void
    {
        DB::table('m_jadwal_absensi_log')
            ->where('berlaku_mulai', '2026-05-18')
            ->whereNull('dibuat_oleh')
            ->delete();
    }
};
