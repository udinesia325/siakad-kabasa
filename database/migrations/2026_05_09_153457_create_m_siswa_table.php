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
        Schema::create('m_siswa', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 20)->unique();
            $table->string('nis', 20)->nullable()->unique();
            $table->string('nama');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('email')->nullable();
            $table->text('alamat')->nullable();
            $table->string('foto')->nullable();
            $table->foreignId('kelas_id')->nullable()->constrained('m_kelas')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_siswa');
    }
};
