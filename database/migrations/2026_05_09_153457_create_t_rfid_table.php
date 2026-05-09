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
        Schema::create('t_rfid', function (Blueprint $table) {
            $table->id();
            $table->string('kode_rfid')->unique();
            $table->string('reff_type', 100);
            $table->unsignedBigInteger('reff_id');
            $table->timestamp('dibuat_pada')->nullable();
            $table->timestamps();
            $table->index(['reff_type', 'reff_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_rfid');
    }
};
