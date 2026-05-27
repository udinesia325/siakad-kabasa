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

        // Insert t_kelas_ajaran: only run in non-testing environments
        // (pegawai_id=1 references production data that does not exist in test DB)
        if (app()->environment() !== 'testing') {
            DB::table('t_kelas_ajaran')->insert([
                ['id' => 1, 'kelas_id' => 1, 'tingkat_id' => 1, 'tahun_ajaran_id' => 1, 'pegawai_id' => 1, 'created_at' => now(), 'updated_at' => now()],
                ['id' => 2, 'kelas_id' => 1, 'tingkat_id' => 2, 'tahun_ajaran_id' => 1, 'pegawai_id' => null, 'created_at' => now(), 'updated_at' => now()],
                ['id' => 3, 'kelas_id' => 1, 'tingkat_id' => 3, 'tahun_ajaran_id' => 1, 'pegawai_id' => null, 'created_at' => now(), 'updated_at' => now()],
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('t_kelas_ajaran');
    }
};
