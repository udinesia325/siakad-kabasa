<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_wakasis_surat_peringatan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('m_siswa')->cascadeOnDelete();
            $table->foreignId('jenis_sp_id')->constrained('m_wakasis_jenis_sp')->cascadeOnDelete();
            $table->date('tanggal');
            $table->unsignedSmallInteger('total_poin_saat_itu');
            $table->text('keterangan')->nullable();
            $table->foreignId('divalidasi_oleh')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('validated_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_wakasis_surat_peringatan');
    }
};
