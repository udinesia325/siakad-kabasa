<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_kelas_siswa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('m_siswa')->cascadeOnDelete();
            $table->foreignId('kelas_id')->constrained('m_kelas')->restrictOnDelete();
            $table->date('mulai');
            $table->date('selesai')->nullable();
            $table->enum('alasan', ['pendaftaran', 'naik_kelas', 'mutasi', 'koreksi', 'tinggal_kelas']);
            $table->text('keterangan')->nullable();
            $table->timestamps();

            $table->index(['siswa_id', 'selesai']);
            $table->index(['kelas_id', 'selesai']);
            $table->index(['siswa_id', 'mulai', 'selesai']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_kelas_siswa');
    }
};
