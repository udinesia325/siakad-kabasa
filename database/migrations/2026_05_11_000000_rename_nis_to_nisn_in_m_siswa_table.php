<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // Column 'nisn' already exists in m_siswa table (created in create_m_siswa_table migration)
        // This migration is a no-op
    }

    public function down(): void
    {
        // No changes to reverse
    }
};
