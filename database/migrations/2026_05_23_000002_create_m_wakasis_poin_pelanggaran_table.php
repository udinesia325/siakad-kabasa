<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_wakasis_poin_pelanggaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jenis_pelanggaran_id')
                ->constrained('m_wakasis_jenis_pelanggaran')
                ->cascadeOnDelete();
            $table->string('nama', 150);
            $table->unsignedSmallInteger('poin')->default(1);
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_wakasis_poin_pelanggaran');
    }
};
