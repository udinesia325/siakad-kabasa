<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_jadwal_mengajar', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('m_kelas')->cascadeOnDelete();
            $table->enum('hari', ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu']);
            $table->foreignId('jam_pelajaran_id')->constrained('m_jam_pelajaran')->cascadeOnDelete();
            $table->foreignId('mata_pelajaran_id')->constrained('m_mata_pelajaran')->cascadeOnDelete();
            $table->foreignId('pegawai_id')->constrained('m_pegawai')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['kelas_id', 'hari', 'jam_pelajaran_id'], 'jadwal_slot_unique');
            $table->index(['pegawai_id', 'hari', 'jam_pelajaran_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_jadwal_mengajar');
    }
};
