<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $isMysql = DB::getDriverName() === 'mysql';

        Schema::table('m_kelas', function (Blueprint $table) use ($isMysql) {
            if ($isMysql) {
                $table->dropUnique('m_kelas_nama_jurusan_id_unique');
            }
            $table->unique(
                ['nama', 'rombel', 'jurusan_id', 'jenis_kelas_id'],
                'm_kelas_full_metadata_unique'
            );
        });
    }

    public function down(): void
    {
        $isMysql = DB::getDriverName() === 'mysql';

        Schema::table('m_kelas', function (Blueprint $table) use ($isMysql) {
            $table->dropUnique('m_kelas_full_metadata_unique');
            if ($isMysql) {
                $table->unique(['nama', 'jurusan_id'], 'm_kelas_nama_jurusan_id_unique');
            }
        });
    }
};
