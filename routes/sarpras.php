<?php

use App\Http\Controllers\Sarpras\BarangController;
use App\Http\Controllers\Sarpras\KategoriController;
use App\Http\Controllers\Sarpras\LokasiController;
use App\Http\Controllers\Sarpras\VendorController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('permission:sarpras.kategori.view')->group(function () {
        Route::get('sarpras/kategori', [KategoriController::class, 'index'])->name('sarpras.kategori.index');
    });
    Route::middleware('permission:sarpras.kategori.create')->group(function () {
        Route::post('sarpras/kategori', [KategoriController::class, 'store'])->name('sarpras.kategori.store');
    });
    Route::middleware('permission:sarpras.kategori.update')->group(function () {
        Route::put('sarpras/kategori/{kategori}', [KategoriController::class, 'update']);
        Route::patch('sarpras/kategori/{kategori}', [KategoriController::class, 'update'])->name('sarpras.kategori.update');
    });
    Route::middleware('permission:sarpras.kategori.delete')->group(function () {
        Route::delete('sarpras/kategori/{kategori}', [KategoriController::class, 'destroy'])->name('sarpras.kategori.destroy');
    });

    Route::middleware('permission:sarpras.lokasi.view')->group(function () {
        Route::get('sarpras/lokasi', [LokasiController::class, 'index'])->name('sarpras.lokasi.index');
    });
    Route::middleware('permission:sarpras.lokasi.create')->group(function () {
        Route::post('sarpras/lokasi', [LokasiController::class, 'store'])->name('sarpras.lokasi.store');
    });
    Route::middleware('permission:sarpras.lokasi.update')->group(function () {
        Route::put('sarpras/lokasi/{lokasi}', [LokasiController::class, 'update']);
        Route::patch('sarpras/lokasi/{lokasi}', [LokasiController::class, 'update'])->name('sarpras.lokasi.update');
    });
    Route::middleware('permission:sarpras.lokasi.delete')->group(function () {
        Route::delete('sarpras/lokasi/{lokasi}', [LokasiController::class, 'destroy'])->name('sarpras.lokasi.destroy');
    });

    Route::middleware('permission:sarpras.vendor.view')->group(function () {
        Route::get('sarpras/vendor', [VendorController::class, 'index'])->name('sarpras.vendor.index');
    });
    Route::middleware('permission:sarpras.vendor.create')->group(function () {
        Route::post('sarpras/vendor', [VendorController::class, 'store'])->name('sarpras.vendor.store');
    });
    Route::middleware('permission:sarpras.vendor.update')->group(function () {
        Route::put('sarpras/vendor/{vendor}', [VendorController::class, 'update']);
        Route::patch('sarpras/vendor/{vendor}', [VendorController::class, 'update'])->name('sarpras.vendor.update');
    });
    Route::middleware('permission:sarpras.vendor.delete')->group(function () {
        Route::delete('sarpras/vendor/{vendor}', [VendorController::class, 'destroy'])->name('sarpras.vendor.destroy');
    });

    Route::middleware('permission:sarpras.barang.view')->group(function () {
        Route::get('sarpras/barang', [BarangController::class, 'index'])->name('sarpras.barang.index');
    });
    Route::middleware('permission:sarpras.barang.create')->group(function () {
        Route::post('sarpras/barang', [BarangController::class, 'store'])->name('sarpras.barang.store');
    });
    Route::middleware('permission:sarpras.barang.update')->group(function () {
        Route::put('sarpras/barang/{barang}', [BarangController::class, 'update']);
        Route::patch('sarpras/barang/{barang}', [BarangController::class, 'update'])->name('sarpras.barang.update');
    });
    Route::middleware('permission:sarpras.barang.delete')->group(function () {
        Route::delete('sarpras/barang/{barang}', [BarangController::class, 'destroy'])->name('sarpras.barang.destroy');
    });
});
