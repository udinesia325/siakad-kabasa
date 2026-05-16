<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_pegawai', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->unique()->constrained('users')->nullOnDelete();
            $table->string('nip', 30)->nullable()->unique();
            $table->string('nuptk', 30)->nullable()->unique();
            $table->string('nama');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->enum('jenis', ['guru', 'staff_tu', 'kepala_sekolah', 'lainnya'])->default('guru');
            $table->string('jabatan')->nullable();
            $table->enum('status_kepegawaian', ['pns', 'pppk', 'honorer', 'kontrak', 'lainnya'])->nullable();
            $table->string('no_hp', 30)->nullable();
            $table->string('email')->nullable();
            $table->text('alamat')->nullable();
            $table->string('foto')->nullable();
            $table->boolean('aktif')->default(true);
            $table->timestamps();

            $table->index('jenis');
            $table->index('aktif');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_pegawai');
    }
};
