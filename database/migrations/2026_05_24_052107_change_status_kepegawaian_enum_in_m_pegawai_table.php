<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Rename existing 'pns' values to 'gty' before altering enum
        DB::statement("UPDATE m_pegawai SET status_kepegawaian = 'gty' WHERE status_kepegawaian = 'pns'");

        DB::statement("ALTER TABLE m_pegawai MODIFY COLUMN status_kepegawaian ENUM('gty', 'pppk', 'honorer', 'kontrak', 'lainnya') NULL");
    }

    public function down(): void
    {
        DB::statement("UPDATE m_pegawai SET status_kepegawaian = 'pns' WHERE status_kepegawaian = 'gty'");

        DB::statement("ALTER TABLE m_pegawai MODIFY COLUMN status_kepegawaian ENUM('pns', 'pppk', 'honorer', 'kontrak', 'lainnya') NULL");
    }
};
