<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('t_ppdb', function (Blueprint $table) {
            $table->dropColumn('nama_kip');
            $table->string('no_kip', 10)->nullable()->after('penerima_kip');
        });

        Schema::table('m_siswa_detail', function (Blueprint $table) {
            $table->dropColumn('nama_kip');
            $table->string('no_kip', 10)->nullable()->after('penerima_kip');
        });
    }

    public function down(): void
    {
        Schema::table('t_ppdb', function (Blueprint $table) {
            $table->dropColumn('no_kip');
            $table->string('nama_kip')->nullable()->after('penerima_kip');
        });

        Schema::table('m_siswa_detail', function (Blueprint $table) {
            $table->dropColumn('no_kip');
            $table->string('nama_kip')->nullable()->after('penerima_kip');
        });
    }
};
