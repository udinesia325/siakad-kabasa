<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('t_anulir_absensi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('siswa_id');
            $table->date('tanggal');
            $table->enum('status', ['hadir', 'sakit', 'izin', 'dispensasi', 'terlambat', 'alpha']);
            $table->text('keterangan')->nullable();
            $table->json('bukti')->nullable();
            $table->unsignedBigInteger('anulir_oleh');
            $table->timestamps();

            $table->foreign('siswa_id')->references('id')->on('m_siswa')->cascadeOnDelete();
            $table->foreign('anulir_oleh')->references('id')->on('users');
            $table->unique(['siswa_id', 'tanggal']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_anulir_absensi');
    }
};
