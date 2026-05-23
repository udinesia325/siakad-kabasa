<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_wakasis_jenis_sp', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 50);
            $table->unsignedTinyInteger('level')->default(1);
            $table->unsignedSmallInteger('batas_poin');
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_wakasis_jenis_sp');
    }
};
