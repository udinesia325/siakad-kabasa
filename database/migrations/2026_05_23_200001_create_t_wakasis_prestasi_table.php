<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_wakasis_prestasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('m_siswa')->cascadeOnDelete();
            $table->foreignId('jenis_prestasi_id')->constrained('m_wakasis_jenis_prestasi')->cascadeOnDelete();
            $table->foreignId('kategori_prestasi_id')->constrained('m_wakasis_kategori_prestasi')->cascadeOnDelete();
            $table->date('tanggal');
            $table->string('nama_kejuaraan', 200);
            $table->string('peringkat', 50)->nullable();
            $table->string('sertifikat_path')->nullable();
            $table->text('keterangan')->nullable();
            $table->foreignId('input_oleh')->constrained('users')->cascadeOnDelete();
            $table->foreignId('divalidasi_oleh')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('validated_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_wakasis_prestasi');
    }
};
