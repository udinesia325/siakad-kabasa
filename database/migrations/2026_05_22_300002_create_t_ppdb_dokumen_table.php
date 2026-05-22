<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_ppdb_dokumen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ppdb_id')->constrained('t_ppdb')->cascadeOnDelete();
            $table->string('nama_dokumen');
            $table->string('file_path');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_ppdb_dokumen');
    }
};
