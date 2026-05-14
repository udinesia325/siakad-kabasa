<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('m_siswa', function (Blueprint $table) {
            $table->enum('status', ['aktif', 'lulus', 'keluar'])->default('aktif')->after('kelas_id');
            $table->date('status_tanggal')->nullable()->after('status');
            $table->text('status_keterangan')->nullable()->after('status_tanggal');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::table('m_siswa', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropColumn(['status', 'status_tanggal', 'status_keterangan']);
        });
    }
};
