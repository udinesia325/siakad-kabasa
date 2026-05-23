<?php

use App\Http\Controllers\Wakasis\JenisPelanggaranController;
use App\Http\Controllers\Wakasis\JenisPrestasiController;
use App\Http\Controllers\Wakasis\JenisSuratPeringatanController;
use App\Http\Controllers\Wakasis\KategoriPembinaanController;
use App\Http\Controllers\Wakasis\KategoriPrestasiController;
use App\Http\Controllers\Wakasis\PelanggaranController;
use App\Http\Controllers\Wakasis\PembinaanController;
use App\Http\Controllers\Wakasis\PoinPelanggaranController;
use App\Http\Controllers\Wakasis\SuratPeringatanController;
use App\Http\Controllers\Wakasis\WakasisDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('permission:wakasis.dashboard.view')->group(function () {
        Route::get('/wakasis', WakasisDashboardController::class)->name('wakasis.dashboard');
    });

    // Jenis Pelanggaran
    Route::middleware('permission:wakasis.jenis-pelanggaran.view')->group(function () {
        Route::get('wakasis/jenis-pelanggaran', [JenisPelanggaranController::class, 'index'])->name('wakasis.jenis-pelanggaran.index');
    });
    Route::middleware('permission:wakasis.jenis-pelanggaran.create')->group(function () {
        Route::post('wakasis/jenis-pelanggaran', [JenisPelanggaranController::class, 'store'])->name('wakasis.jenis-pelanggaran.store');
    });
    Route::middleware('permission:wakasis.jenis-pelanggaran.update')->group(function () {
        Route::put('wakasis/jenis-pelanggaran/{jenisPelanggaran}', [JenisPelanggaranController::class, 'update']);
        Route::patch('wakasis/jenis-pelanggaran/{jenisPelanggaran}', [JenisPelanggaranController::class, 'update'])->name('wakasis.jenis-pelanggaran.update');
    });
    Route::middleware('permission:wakasis.jenis-pelanggaran.delete')->group(function () {
        Route::delete('wakasis/jenis-pelanggaran/{jenisPelanggaran}', [JenisPelanggaranController::class, 'destroy'])->name('wakasis.jenis-pelanggaran.destroy');
    });

    // Poin Pelanggaran
    Route::middleware('permission:wakasis.poin-pelanggaran.view')->group(function () {
        Route::get('wakasis/poin-pelanggaran', [PoinPelanggaranController::class, 'index'])->name('wakasis.poin-pelanggaran.index');
    });
    Route::middleware('permission:wakasis.poin-pelanggaran.create')->group(function () {
        Route::post('wakasis/poin-pelanggaran', [PoinPelanggaranController::class, 'store'])->name('wakasis.poin-pelanggaran.store');
    });
    Route::middleware('permission:wakasis.poin-pelanggaran.update')->group(function () {
        Route::put('wakasis/poin-pelanggaran/{poinPelanggaran}', [PoinPelanggaranController::class, 'update']);
        Route::patch('wakasis/poin-pelanggaran/{poinPelanggaran}', [PoinPelanggaranController::class, 'update'])->name('wakasis.poin-pelanggaran.update');
    });
    Route::middleware('permission:wakasis.poin-pelanggaran.delete')->group(function () {
        Route::delete('wakasis/poin-pelanggaran/{poinPelanggaran}', [PoinPelanggaranController::class, 'destroy'])->name('wakasis.poin-pelanggaran.destroy');
    });

    // Jenis Prestasi
    Route::middleware('permission:wakasis.jenis-prestasi.view')->group(function () {
        Route::get('wakasis/jenis-prestasi', [JenisPrestasiController::class, 'index'])->name('wakasis.jenis-prestasi.index');
    });
    Route::middleware('permission:wakasis.jenis-prestasi.create')->group(function () {
        Route::post('wakasis/jenis-prestasi', [JenisPrestasiController::class, 'store'])->name('wakasis.jenis-prestasi.store');
    });
    Route::middleware('permission:wakasis.jenis-prestasi.update')->group(function () {
        Route::put('wakasis/jenis-prestasi/{jenisPrestasi}', [JenisPrestasiController::class, 'update']);
        Route::patch('wakasis/jenis-prestasi/{jenisPrestasi}', [JenisPrestasiController::class, 'update'])->name('wakasis.jenis-prestasi.update');
    });
    Route::middleware('permission:wakasis.jenis-prestasi.delete')->group(function () {
        Route::delete('wakasis/jenis-prestasi/{jenisPrestasi}', [JenisPrestasiController::class, 'destroy'])->name('wakasis.jenis-prestasi.destroy');
    });

    // Kategori Prestasi
    Route::middleware('permission:wakasis.kategori-prestasi.view')->group(function () {
        Route::get('wakasis/kategori-prestasi', [KategoriPrestasiController::class, 'index'])->name('wakasis.kategori-prestasi.index');
    });
    Route::middleware('permission:wakasis.kategori-prestasi.create')->group(function () {
        Route::post('wakasis/kategori-prestasi', [KategoriPrestasiController::class, 'store'])->name('wakasis.kategori-prestasi.store');
    });
    Route::middleware('permission:wakasis.kategori-prestasi.update')->group(function () {
        Route::put('wakasis/kategori-prestasi/{kategoriPrestasi}', [KategoriPrestasiController::class, 'update']);
        Route::patch('wakasis/kategori-prestasi/{kategoriPrestasi}', [KategoriPrestasiController::class, 'update'])->name('wakasis.kategori-prestasi.update');
    });
    Route::middleware('permission:wakasis.kategori-prestasi.delete')->group(function () {
        Route::delete('wakasis/kategori-prestasi/{kategoriPrestasi}', [KategoriPrestasiController::class, 'destroy'])->name('wakasis.kategori-prestasi.destroy');
    });

    // Kategori Pembinaan
    Route::middleware('permission:wakasis.kategori-pembinaan.view')->group(function () {
        Route::get('wakasis/kategori-pembinaan', [KategoriPembinaanController::class, 'index'])->name('wakasis.kategori-pembinaan.index');
    });
    Route::middleware('permission:wakasis.kategori-pembinaan.create')->group(function () {
        Route::post('wakasis/kategori-pembinaan', [KategoriPembinaanController::class, 'store'])->name('wakasis.kategori-pembinaan.store');
    });
    Route::middleware('permission:wakasis.kategori-pembinaan.update')->group(function () {
        Route::put('wakasis/kategori-pembinaan/{kategoriPembinaan}', [KategoriPembinaanController::class, 'update']);
        Route::patch('wakasis/kategori-pembinaan/{kategoriPembinaan}', [KategoriPembinaanController::class, 'update'])->name('wakasis.kategori-pembinaan.update');
    });
    Route::middleware('permission:wakasis.kategori-pembinaan.delete')->group(function () {
        Route::delete('wakasis/kategori-pembinaan/{kategoriPembinaan}', [KategoriPembinaanController::class, 'destroy'])->name('wakasis.kategori-pembinaan.destroy');
    });

    // Jenis Surat Peringatan (SP)
    Route::middleware('permission:wakasis.jenis-sp.view')->group(function () {
        Route::get('wakasis/jenis-sp', [JenisSuratPeringatanController::class, 'index'])->name('wakasis.jenis-sp.index');
    });
    Route::middleware('permission:wakasis.jenis-sp.create')->group(function () {
        Route::post('wakasis/jenis-sp', [JenisSuratPeringatanController::class, 'store'])->name('wakasis.jenis-sp.store');
    });
    Route::middleware('permission:wakasis.jenis-sp.update')->group(function () {
        Route::put('wakasis/jenis-sp/{jenisSp}', [JenisSuratPeringatanController::class, 'update']);
        Route::patch('wakasis/jenis-sp/{jenisSp}', [JenisSuratPeringatanController::class, 'update'])->name('wakasis.jenis-sp.update');
    });
    Route::middleware('permission:wakasis.jenis-sp.delete')->group(function () {
        Route::delete('wakasis/jenis-sp/{jenisSp}', [JenisSuratPeringatanController::class, 'destroy'])->name('wakasis.jenis-sp.destroy');
    });

    // Pelanggaran
    Route::middleware('permission:wakasis.pelanggaran.view')->group(function () {
        Route::get('wakasis/pelanggaran', [PelanggaranController::class, 'index'])->name('wakasis.pelanggaran.index');
    });
    Route::middleware('permission:wakasis.pelanggaran.create')->group(function () {
        Route::post('wakasis/pelanggaran', [PelanggaranController::class, 'store'])->name('wakasis.pelanggaran.store');
    });
    Route::middleware('permission:wakasis.pelanggaran.update')->group(function () {
        Route::put('wakasis/pelanggaran/{pelanggaran}', [PelanggaranController::class, 'update']);
        Route::patch('wakasis/pelanggaran/{pelanggaran}', [PelanggaranController::class, 'update'])->name('wakasis.pelanggaran.update');
    });
    Route::middleware('permission:wakasis.pelanggaran.delete')->group(function () {
        Route::delete('wakasis/pelanggaran/{pelanggaran}', [PelanggaranController::class, 'destroy'])->name('wakasis.pelanggaran.destroy');
    });

    // Surat Peringatan
    Route::middleware('permission:wakasis.surat-peringatan.view')->group(function () {
        Route::get('wakasis/surat-peringatan', [SuratPeringatanController::class, 'index'])->name('wakasis.surat-peringatan.index');
    });
    Route::middleware('permission:wakasis.surat-peringatan.validate')->group(function () {
        Route::post('wakasis/surat-peringatan/{suratPeringatan}/validate', [SuratPeringatanController::class, 'validate'])->name('wakasis.surat-peringatan.validate');
    });

    // Pembinaan
    Route::middleware('permission:wakasis.pembinaan.view')->group(function () {
        Route::get('wakasis/pembinaan', [PembinaanController::class, 'index'])->name('wakasis.pembinaan.index');
    });
    Route::middleware('permission:wakasis.pembinaan.create')->group(function () {
        Route::post('wakasis/pembinaan', [PembinaanController::class, 'store'])->name('wakasis.pembinaan.store');
    });
    Route::middleware('permission:wakasis.pembinaan.update')->group(function () {
        Route::put('wakasis/pembinaan/{pembinaan}', [PembinaanController::class, 'update']);
        Route::patch('wakasis/pembinaan/{pembinaan}', [PembinaanController::class, 'update'])->name('wakasis.pembinaan.update');
    });
    Route::middleware('permission:wakasis.pembinaan.delete')->group(function () {
        Route::delete('wakasis/pembinaan/{pembinaan}', [PembinaanController::class, 'destroy'])->name('wakasis.pembinaan.destroy');
    });
});
