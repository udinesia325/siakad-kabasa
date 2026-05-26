<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_tingkat', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 20);
            $table->tinyInteger('urutan')->unsigned();
            $table->string('jenjang', 20); // smk, smp, sd
            $table->timestamps();

            $table->unique(['urutan', 'jenjang']);
        });

        DB::table('m_tingkat')->insert([
            ['nama' => 'X',   'urutan' => 1, 'jenjang' => 'smk', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'XI',  'urutan' => 2, 'jenjang' => 'smk', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'XII', 'urutan' => 3, 'jenjang' => 'smk', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('m_tingkat');
    }
};
