<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_sarpras_barang', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 30)->unique();
            $table->string('nama', 150);
            $table->foreignId('kategori_id')->nullable()->constrained('m_sarpras_kategori')->nullOnDelete();
            $table->foreignId('lokasi_id')->nullable()->constrained('m_sarpras_lokasi')->nullOnDelete();
            $table->enum('kondisi', ['baik', 'rusak_ringan', 'rusak_berat', 'hilang'])->default('baik');
            $table->string('satuan', 30)->default('unit');
            $table->unsignedSmallInteger('tahun_beli')->nullable();
            $table->unsignedBigInteger('harga_beli')->nullable();
            $table->unsignedInteger('jumlah_unit')->default(1);
            $table->foreignId('penanggung_jawab_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('foto_path')->nullable();
            $table->date('garansi_sampai')->nullable();
            $table->string('sumber_dana', 100)->nullable();
            $table->foreignId('vendor_id')->nullable()->constrained('m_sarpras_vendor')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_sarpras_barang');
    }
};
