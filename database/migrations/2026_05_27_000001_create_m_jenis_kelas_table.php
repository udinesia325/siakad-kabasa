<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_jenis_kelas', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 50)->unique();
            $table->tinyInteger('urutan')->unsigned()->default(0);
            $table->timestamps();
        });

        DB::table('m_jenis_kelas')->insert([
            ['nama' => 'Reguler',  'urutan' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Industri', 'urutan' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('m_jenis_kelas');
    }
};
