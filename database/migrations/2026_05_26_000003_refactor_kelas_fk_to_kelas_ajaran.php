<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Add new columns (nullable for backfill)
        Schema::table('m_siswa', function (Blueprint $table) {
            $table->foreignId('kelas_ajaran_id')->nullable()->after('kelas_id')
                ->constrained('t_kelas_ajaran')->nullOnDelete();
        });

        Schema::table('t_kelas_siswa', function (Blueprint $table) {
            $table->foreignId('kelas_ajaran_id')->nullable()->after('kelas_id')
                ->constrained('t_kelas_ajaran')->restrictOnDelete();
        });

        Schema::table('t_jadwal_mengajar', function (Blueprint $table) {
            $table->foreignId('kelas_ajaran_id')->nullable()->after('kelas_id')
                ->constrained('t_kelas_ajaran')->cascadeOnDelete();
        });

        Schema::table('t_log_operasi_kelas', function (Blueprint $table) {
            $table->foreignId('kelas_ajaran_asal_id')->nullable()->after('kelas_asal_id')
                ->constrained('t_kelas_ajaran')->restrictOnDelete();
            $table->foreignId('kelas_ajaran_tujuan_id')->nullable()->after('kelas_tujuan_id')
                ->constrained('t_kelas_ajaran')->restrictOnDelete();
        });

        // 2. Backfill — t_kelas_ajaran ids 1/2/3 == old m_kelas ids 1/2/3
        DB::statement('UPDATE m_siswa SET kelas_ajaran_id = kelas_id WHERE kelas_id IS NOT NULL');
        DB::statement('UPDATE t_kelas_siswa SET kelas_ajaran_id = kelas_id');
        DB::statement('UPDATE t_jadwal_mengajar SET kelas_ajaran_id = kelas_id');
        // t_log_operasi_kelas: 0 rows, no backfill needed

        // 3. Add index on t_kelas_siswa
        Schema::table('t_kelas_siswa', function (Blueprint $table) {
            $table->index(['kelas_ajaran_id', 'selesai']);
        });

        // 4. Replace jadwal_slot_unique on t_jadwal_mengajar
        // Must drop FK on kelas_id first, as MySQL cannot drop the index while a FK references it
        Schema::table('t_jadwal_mengajar', function (Blueprint $table) {
            $table->dropForeign('t_jadwal_mengajar_kelas_id_foreign');
            $table->dropUnique('jadwal_slot_unique');
            $table->unique(['kelas_ajaran_id', 'hari', 'jam_pelajaran_id'], 'jadwal_slot_unique');
            $table->dropColumn('kelas_id');
        });

        // 5. Drop old kelas_id columns and FKs from remaining tables
        Schema::table('m_siswa', function (Blueprint $table) {
            $table->dropConstrainedForeignId('kelas_id');
        });

        Schema::table('t_kelas_siswa', function (Blueprint $table) {
            $table->dropConstrainedForeignId('kelas_id');
        });

        Schema::table('t_log_operasi_kelas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('kelas_asal_id');
            $table->dropConstrainedForeignId('kelas_tujuan_id');
        });
    }

    public function down(): void
    {
        Schema::table('m_siswa', function (Blueprint $table) {
            $table->foreignId('kelas_id')->nullable()->after('foto')
                ->constrained('m_kelas')->nullOnDelete();
        });
        DB::statement('UPDATE m_siswa SET kelas_id = kelas_ajaran_id');
        Schema::table('m_siswa', function (Blueprint $table) {
            $table->dropConstrainedForeignId('kelas_ajaran_id');
        });
    }
};
