<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_log_operasi_kelas', function (Blueprint $table) {
            $table->id();
            $table->enum('tipe', ['naik_kelas', 'lulus_angkatan']);
            $table->foreignId('kelas_asal_id')->constrained('m_kelas')->restrictOnDelete();
            $table->foreignId('kelas_tujuan_id')->nullable()->constrained('m_kelas')->restrictOnDelete();
            $table->timestamp('tanggal_efektif');
            $table->integer('jumlah_siswa');
            $table->boolean('dipaksa')->default(false);
            $table->foreignId('oleh_user_id')->constrained('users')->restrictOnDelete();
            $table->text('keterangan')->nullable();
            $table->timestamps();

            $table->index(['kelas_asal_id', 'created_at']);
            $table->index(['kelas_tujuan_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_log_operasi_kelas');
    }
};
