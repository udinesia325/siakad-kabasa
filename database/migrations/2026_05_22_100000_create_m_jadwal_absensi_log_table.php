<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_jadwal_absensi_log', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('hari'); // 1=Senin, 7=Minggu
            $table->date('berlaku_mulai');
            $table->boolean('is_libur')->default(false);
            $table->time('jam_masuk_min')->nullable();
            $table->time('jam_masuk_max')->nullable();
            $table->time('jam_pulang_min')->nullable();
            $table->time('jam_pulang_max')->nullable();
            $table->foreignId('dibuat_oleh')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->unique(['hari', 'berlaku_mulai']);
            $table->index(['hari', 'berlaku_mulai']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_jadwal_absensi_log');
    }
};
