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
        Schema::create('t_absensi', function (Blueprint $table) {
            $table->id();
            $table->string('reff_type', 100);
            $table->unsignedBigInteger('reff_id');
            $table->timestamp('waktu_absen');
            $table->enum('tipe', ['masuk', 'pulang']);
            $table->timestamps();
            $table->index(['reff_type', 'reff_id']);
            $table->index('waktu_absen');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_absensi');
    }
};
