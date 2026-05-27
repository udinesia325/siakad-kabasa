<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('m_kelas', function (Blueprint $table) {
            $table->char('rombel', 1)->nullable()->after('nama');
            $table->foreignId('jenis_kelas_id')->nullable()->after('jurusan_id')
                ->constrained('m_jenis_kelas')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('m_kelas', function (Blueprint $table) {
            $table->dropForeign(['jenis_kelas_id']);
            $table->dropColumn(['rombel', 'jenis_kelas_id']);
        });
    }
};
