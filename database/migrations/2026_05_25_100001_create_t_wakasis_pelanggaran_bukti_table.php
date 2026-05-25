<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_wakasis_pelanggaran_bukti', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggaran_id')->constrained('t_wakasis_pelanggaran')->cascadeOnDelete();
            $table->string('file_path');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_wakasis_pelanggaran_bukti');
    }
};
