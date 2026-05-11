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
        Schema::table('t_absensi', function (Blueprint $table) {
            $table->index(['reff_type', 'reff_id', 'waktu_absen'], 'absensi_type_id_waktu_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('t_absensi', function (Blueprint $table) {
            $table->dropIndex('absensi_type_id_waktu_idx');
        });
    }
};
