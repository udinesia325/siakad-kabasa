<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_sarpras_vendor', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 150);
            $table->string('pic_nama', 100)->nullable();
            $table->string('pic_kontak', 50)->nullable();
            $table->text('alamat')->nullable();
            $table->enum('spesialisasi', ['pengadaan', 'servis', 'keduanya'])->default('keduanya');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_sarpras_vendor');
    }
};
