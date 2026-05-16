<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_jam_pelajaran', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('nomor')->unique();
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->string('keterangan')->nullable();
            $table->boolean('aktif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_jam_pelajaran');
    }
};
