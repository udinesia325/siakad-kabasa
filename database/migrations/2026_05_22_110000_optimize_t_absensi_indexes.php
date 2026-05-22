<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('t_absensi', function (Blueprint $table) {
            // Hapus index duplikat — subset dari absensi_type_id_waktu_idx
            $table->dropIndex('t_absensi_reff_type_reff_id_index');

            // Hapus index standalone waktu_absen — akan dicakup index baru
            $table->dropIndex('t_absensi_waktu_absen_index');

            // Hapus index lama (reff_type, reff_id, waktu_absen) — urutan kolom kurang optimal
            // untuk query berbasis rentang tanggal lintas banyak siswa
            $table->dropIndex('absensi_type_id_waktu_idx');

            // Index baru: (reff_type, waktu_absen, reff_id, tipe)
            // Urutan ini optimal untuk dua pola query utama:
            // 1. WHERE reff_type=? AND reff_id IN (...) AND waktu_absen BETWEEN ? AND ?
            //    → seek reff_type dulu, lalu range scan waktu_absen, filter reff_id
            // 2. WHERE reff_type=? AND waktu_absen BETWEEN ? AND ?
            //    → covering index, tipe & reff_id dibaca tanpa back-to-table
            $table->index(['reff_type', 'waktu_absen', 'reff_id', 'tipe'], 'absensi_type_waktu_id_tipe_idx');
        });
    }

    public function down(): void
    {
        Schema::table('t_absensi', function (Blueprint $table) {
            $table->dropIndex('absensi_type_waktu_id_tipe_idx');

            $table->index(['reff_type', 'reff_id'], 't_absensi_reff_type_reff_id_index');
            $table->index(['waktu_absen'], 't_absensi_waktu_absen_index');
            $table->index(['reff_type', 'reff_id', 'waktu_absen'], 'absensi_type_id_waktu_idx');
        });
    }
};
