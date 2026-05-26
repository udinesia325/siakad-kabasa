<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Consolidate m_kelas: rows 2 and 3 are now safe to delete (FKs already dropped in migration 3)
        // Rename id:1 from "X A" to "A" (the single master kelas identity)
        DB::table('m_kelas')->where('id', 1)->update(['nama' => 'A']);
        DB::table('m_kelas')->whereIn('id', [2, 3])->delete();

        Schema::table('m_kelas', function (Blueprint $table) {
            // Drop old constraints
            $table->dropUnique('m_kelas_nama_tahun_ajaran_id_unique');
            $table->dropConstrainedForeignId('tahun_ajaran_id');
            $table->dropConstrainedForeignId('pegawai_id');
            $table->dropColumn('tingkat');

            // Add jurusan_id
            $table->foreignId('jurusan_id')->nullable()->after('nama')
                ->constrained('m_jurusan')->nullOnDelete();

            // New unique: (nama, jurusan_id)
            $table->unique(['nama', 'jurusan_id'], 'm_kelas_nama_jurusan_id_unique');
        });
    }

    public function down(): void
    {
        Schema::table('m_kelas', function (Blueprint $table) {
            $table->dropUnique('m_kelas_nama_jurusan_id_unique');
            $table->dropConstrainedForeignId('jurusan_id');
            $table->enum('tingkat', ['X', 'XI', 'XII'])->after('nama');
            $table->foreignId('tahun_ajaran_id')->after('tingkat')
                ->constrained('m_tahun_ajaran')->cascadeOnDelete();
            $table->foreignId('pegawai_id')->nullable()->after('tahun_ajaran_id')
                ->constrained('m_pegawai')->nullOnDelete();
            $table->unique(['nama', 'tahun_ajaran_id'], 'm_kelas_nama_tahun_ajaran_id_unique');
        });
    }
};
