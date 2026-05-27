<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_jurnal', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jadwal_mengajar_id')->constrained('t_jadwal_mengajar')->restrictOnDelete();
            $table->foreignId('pegawai_id')->constrained('m_pegawai')->restrictOnDelete();
            $table->foreignId('mata_pelajaran_id')->constrained('m_mata_pelajaran')->restrictOnDelete();
            $table->foreignId('kelas_ajaran_id')->constrained('t_kelas_ajaran')->restrictOnDelete();
            $table->foreignId('jam_pelajaran_id')->constrained('m_jam_pelajaran')->restrictOnDelete();
            $table->date('tanggal');
            $table->foreignId('dibuat_oleh')->constrained('users')->restrictOnDelete();
            $table->timestamps();

            $table->unique(['jadwal_mengajar_id', 'tanggal']);
            $table->index(['pegawai_id', 'tanggal']);
            $table->index('tanggal');
        });

        Schema::create('t_jurnal_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jurnal_id')->constrained('t_jurnal')->cascadeOnDelete();
            $table->foreignId('siswa_id')->constrained('m_siswa')->restrictOnDelete();
            $table->enum('status', ['hadir', 'alpha', 'sakit', 'izin', 'dispensasi']);
            $table->text('keterangan')->nullable();
            $table->timestamps();

            $table->unique(['jurnal_id', 'siswa_id']);
            $table->index('siswa_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_jurnal_detail');
        Schema::dropIfExists('t_jurnal');
    }
};
