<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_wakasis_pembinaan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('m_siswa')->cascadeOnDelete();
            $table->foreignId('surat_peringatan_id')->nullable()->constrained('t_wakasis_surat_peringatan')->nullOnDelete();
            $table->foreignId('kategori_pembinaan_id')->constrained('m_wakasis_kategori_pembinaan')->cascadeOnDelete();
            $table->foreignId('pembina_id')->constrained('m_pegawai')->cascadeOnDelete();
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai')->nullable();
            $table->enum('status', ['proses', 'monitoring', 'selesai'])->default('proses');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_wakasis_pembinaan');
    }
};
