<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_sarpras_booking_ruangan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lokasi_id')->constrained('m_sarpras_lokasi')->cascadeOnDelete();
            $table->foreignId('pemohon_id')->constrained('users')->cascadeOnDelete();
            $table->text('keperluan');
            $table->dateTime('mulai');
            $table->dateTime('selesai');
            $table->text('catatan')->nullable();
            $table->enum('status', ['menunggu', 'disetujui', 'ditolak', 'selesai'])->default('menunggu');
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_sarpras_booking_ruangan');
    }
};
