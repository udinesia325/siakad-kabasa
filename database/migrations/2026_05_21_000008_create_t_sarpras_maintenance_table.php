<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('t_sarpras_maintenance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('barang_id')->constrained('m_sarpras_barang')->cascadeOnDelete();
            $table->foreignId('vendor_id')->nullable()->constrained('m_sarpras_vendor')->nullOnDelete();
            $table->date('tgl_rencana');
            $table->date('tgl_selesai')->nullable();
            $table->enum('interval', ['mingguan', 'bulanan', 'tahunan'])->default('bulanan');
            $table->unsignedBigInteger('biaya')->nullable();
            $table->text('catatan')->nullable();
            $table->enum('status', ['dijadwalkan', 'selesai'])->default('dijadwalkan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('t_sarpras_maintenance');
    }
};
