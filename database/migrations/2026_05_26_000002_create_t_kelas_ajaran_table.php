<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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

    }

    public function down(): void
    {
        Schema::dropIfExists('t_kelas_ajaran');
    }
};
