<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_kelas_ajaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('m_kelas')->restrictOnDelete();
            $table->foreignId('tingkat_id')->constrained('m_tingkat')->restrictOnDelete();
            $table->foreignId('tahun_ajaran_id')->constrained('m_tahun_ajaran')->restrictOnDelete();
            $table->foreignId('pegawai_id')->nullable()->constrained('m_pegawai')->nullOnDelete();
            $table->timestamps();

            $table->unique(['kelas_id', 'tingkat_id', 'tahun_ajaran_id']);
        });

        // Insert t_kelas_ajaran: explicit ids 1/2/3 match old m_kelas ids 1/2/3
        // m_kelas rows 2 and 3 will be deleted in migration 4 after FK references are dropped
        // m_tingkat id 1=X, 2=XI, 3=XII (from migration 1 seed)
        // pegawai_id: from actual m_kelas data (id:1 had pegawai_id:1, id:2 and id:3 were NULL)
        DB::table('t_kelas_ajaran')->insert([
            ['id' => 1, 'kelas_id' => 1, 'tingkat_id' => 1, 'tahun_ajaran_id' => 1, 'pegawai_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'kelas_id' => 1, 'tingkat_id' => 2, 'tahun_ajaran_id' => 1, 'pegawai_id' => null, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'kelas_id' => 1, 'tingkat_id' => 3, 'tahun_ajaran_id' => 1, 'pegawai_id' => null, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('t_kelas_ajaran');
    }
};
