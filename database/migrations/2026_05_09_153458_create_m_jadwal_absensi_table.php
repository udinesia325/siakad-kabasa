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
        Schema::create('m_jadwal_absensi', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('hari')->unique(); // 1=Senin, 7=Minggu
            $table->boolean('is_libur')->default(false);
            $table->time('jam_masuk_min')->nullable();
            $table->time('jam_masuk_max')->nullable();
            $table->time('jam_pulang_min')->nullable();
            $table->time('jam_pulang_max')->nullable();
            $table->timestamps();
        });

        $hari = [
            ['hari' => 1, 'is_libur' => false, 'jam_masuk_min' => '06:00', 'jam_masuk_max' => '08:00', 'jam_pulang_min' => '14:00', 'jam_pulang_max' => '16:00'],
            ['hari' => 2, 'is_libur' => false, 'jam_masuk_min' => '06:00', 'jam_masuk_max' => '08:00', 'jam_pulang_min' => '14:00', 'jam_pulang_max' => '16:00'],
            ['hari' => 3, 'is_libur' => false, 'jam_masuk_min' => '06:00', 'jam_masuk_max' => '08:00', 'jam_pulang_min' => '14:00', 'jam_pulang_max' => '16:00'],
            ['hari' => 4, 'is_libur' => false, 'jam_masuk_min' => '06:00', 'jam_masuk_max' => '08:00', 'jam_pulang_min' => '14:00', 'jam_pulang_max' => '16:00'],
            ['hari' => 5, 'is_libur' => false, 'jam_masuk_min' => '06:00', 'jam_masuk_max' => '08:00', 'jam_pulang_min' => '14:00', 'jam_pulang_max' => '16:00'],
            ['hari' => 6, 'is_libur' => true,  'jam_masuk_min' => null, 'jam_masuk_max' => null, 'jam_pulang_min' => null, 'jam_pulang_max' => null],
            ['hari' => 7, 'is_libur' => true,  'jam_masuk_min' => null, 'jam_masuk_max' => null, 'jam_pulang_min' => null, 'jam_pulang_max' => null],
        ];
        foreach ($hari as $h) {
            \DB::table('m_jadwal_absensi')->insert(array_merge($h, ['created_at' => now(), 'updated_at' => now()]));
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_jadwal_absensi');
    }
};
