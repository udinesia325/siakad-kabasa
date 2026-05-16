<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('m_kelas', function (Blueprint $table) {
            $table->foreignId('pegawai_id')
                ->nullable()
                ->after('tahun_ajaran_id')
                ->constrained('m_pegawai')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('m_kelas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('pegawai_id');
        });
    }
};
