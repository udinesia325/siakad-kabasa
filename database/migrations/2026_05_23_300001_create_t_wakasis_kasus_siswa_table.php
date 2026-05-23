<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_wakasis_kasus_siswa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('m_siswa')->cascadeOnDelete();
            $table->date('tanggal');
            $table->string('judul', 200);
            $table->text('deskripsi')->nullable();
            $table->enum('status', ['baru', 'proses', 'selesai'])->default('baru');
            $table->foreignId('ditangani_oleh')->nullable()->constrained('m_pegawai')->nullOnDelete();
            $table->text('catatan_penanganan')->nullable();
            $table->foreignId('dicatat_oleh')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_wakasis_kasus_siswa');
    }
};
