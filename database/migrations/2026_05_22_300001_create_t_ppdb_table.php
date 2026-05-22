<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_ppdb', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tahun_ajaran_id')->constrained('m_tahun_ajaran')->restrictOnDelete();
            $table->foreignId('jurusan_id')->constrained('m_jurusan')->restrictOnDelete();
            $table->string('nomor_registrasi')->unique();
            $table->date('tanggal_daftar');
            $table->enum('status', ['draft', 'aktif'])->default('draft');
            $table->foreignId('siswa_id')->nullable()->constrained('m_siswa')->nullOnDelete();

            // Identitas
            $table->string('nama');
            $table->string('nik', 20);
            $table->string('nisn', 10)->nullable();
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']);
            $table->string('sekolah_asal');
            $table->string('no_telepon')->nullable();
            $table->boolean('penerima_kip')->default(false);
            $table->string('nama_kip')->nullable();
            $table->string('no_registrasi_akta')->nullable();

            // Alamat
            $table->text('alamat');
            $table->string('rt', 5)->nullable();
            $table->string('rw', 5)->nullable();
            $table->string('kelurahan')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('kode_pos', 10)->nullable();

            // Data Ayah
            $table->string('nama_ayah');
            $table->string('pekerjaan_ayah')->nullable();
            $table->string('pendidikan_ayah')->nullable();
            $table->string('penghasilan_ayah')->nullable();

            // Data Ibu
            $table->string('nama_ibu');
            $table->string('pekerjaan_ibu')->nullable();
            $table->string('pendidikan_ibu')->nullable();
            $table->string('penghasilan_ibu')->nullable();

            $table->foreignId('dicatat_oleh')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index('status');
            $table->index('tahun_ajaran_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_ppdb');
    }
};
