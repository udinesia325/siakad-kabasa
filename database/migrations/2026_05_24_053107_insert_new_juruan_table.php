<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {

        DB::table('m_jurusan')->insert([
            ['nama' => 'KULINER', 'singkatan' => 'KULINER', 'created_at' => now(), 'updated_at' => now()]
        ]);
    }

    public function down(): void
    {
        DB::table('m_jurusan')->where('singkatan', 'KULINER')->delete();
    }
};
