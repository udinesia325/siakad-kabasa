<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_sarpras_kerusakan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('barang_id')->constrained('m_sarpras_barang')->cascadeOnDelete();
            $table->foreignId('pelapor_id')->constrained('users')->cascadeOnDelete();
            $table->text('deskripsi');
            $table->string('foto_path')->nullable();
            $table->enum('prioritas', ['rendah', 'sedang', 'tinggi'])->default('sedang');
            $table->enum('status', ['dilaporkan', 'diproses', 'menunggu_sparepart', 'selesai'])->default('dilaporkan');
            $table->text('catatan_progres')->nullable();
            $table->date('tgl_selesai')->nullable();
            $table->foreignId('vendor_id')->nullable()->constrained('m_sarpras_vendor')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_sarpras_kerusakan');
    }
};
