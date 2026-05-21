<?php

use App\Http\Controllers\Sarpras\BarangController;
use App\Http\Controllers\Sarpras\SarprasDashboardController;
use App\Http\Controllers\Sarpras\MaintenanceController;
use App\Http\Controllers\Sarpras\BookingRuanganController;
use App\Http\Controllers\Sarpras\KategoriController;
use App\Http\Controllers\Sarpras\KerusakanController;
use App\Http\Controllers\Sarpras\LokasiController;
use App\Http\Controllers\Sarpras\PeminjamanController;
use App\Http\Controllers\Sarpras\VendorController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('permission:sarpras.dashboard.view')->group(function () {
        Route::get('/sarpras', SarprasDashboardController::class)->name('sarpras.dashboard');
    });

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

    Route::middleware('permission:sarpras.peminjaman.view')->group(function () {
        Route::get('sarpras/peminjaman', [PeminjamanController::class, 'index'])->name('sarpras.peminjaman.index');
    });
    Route::middleware('permission:sarpras.peminjaman.create')->group(function () {
        Route::post('sarpras/peminjaman', [PeminjamanController::class, 'store'])->name('sarpras.peminjaman.store');
    });
    Route::middleware('permission:sarpras.peminjaman.approve')->group(function () {
        Route::post('sarpras/peminjaman/{peminjaman}/approve', [PeminjamanController::class, 'approve'])->name('sarpras.peminjaman.approve');
        Route::post('sarpras/peminjaman/{peminjaman}/reject', [PeminjamanController::class, 'reject'])->name('sarpras.peminjaman.reject');
        Route::post('sarpras/peminjaman/{peminjaman}/kembalikan', [PeminjamanController::class, 'kembalikan'])->name('sarpras.peminjaman.kembalikan');
    });
    Route::middleware('permission:sarpras.peminjaman.delete')->group(function () {
        Route::delete('sarpras/peminjaman/{peminjaman}', [PeminjamanController::class, 'destroy'])->name('sarpras.peminjaman.destroy');
    });

    Route::middleware('permission:sarpras.booking-ruangan.view')->group(function () {
        Route::get('sarpras/booking-ruangan', [BookingRuanganController::class, 'index'])->name('sarpras.booking-ruangan.index');
    });
    Route::middleware('permission:sarpras.booking-ruangan.create')->group(function () {
        Route::post('sarpras/booking-ruangan', [BookingRuanganController::class, 'store'])->name('sarpras.booking-ruangan.store');
    });
    Route::middleware('permission:sarpras.booking-ruangan.approve')->group(function () {
        Route::post('sarpras/booking-ruangan/{bookingRuangan}/approve', [BookingRuanganController::class, 'approve'])->name('sarpras.booking-ruangan.approve');
        Route::post('sarpras/booking-ruangan/{bookingRuangan}/reject', [BookingRuanganController::class, 'reject'])->name('sarpras.booking-ruangan.reject');
        Route::post('sarpras/booking-ruangan/{bookingRuangan}/selesai', [BookingRuanganController::class, 'selesai'])->name('sarpras.booking-ruangan.selesai');
    });
    Route::middleware('permission:sarpras.booking-ruangan.delete')->group(function () {
        Route::delete('sarpras/booking-ruangan/{bookingRuangan}', [BookingRuanganController::class, 'destroy'])->name('sarpras.booking-ruangan.destroy');
    });

    Route::middleware('permission:sarpras.kerusakan.view')->group(function () {
        Route::get('sarpras/kerusakan', [KerusakanController::class, 'index'])->name('sarpras.kerusakan.index');
    });
    Route::middleware('permission:sarpras.kerusakan.create')->group(function () {
        Route::post('sarpras/kerusakan', [KerusakanController::class, 'store'])->name('sarpras.kerusakan.store');
    });
    Route::middleware('permission:sarpras.kerusakan.update')->group(function () {
        Route::put('sarpras/kerusakan/{kerusakan}', [KerusakanController::class, 'update']);
        Route::patch('sarpras/kerusakan/{kerusakan}', [KerusakanController::class, 'update'])->name('sarpras.kerusakan.update');
    });
    Route::middleware('permission:sarpras.kerusakan.delete')->group(function () {
        Route::delete('sarpras/kerusakan/{kerusakan}', [KerusakanController::class, 'destroy'])->name('sarpras.kerusakan.destroy');
    });

    Route::middleware('permission:sarpras.maintenance.view')->group(function () {
        Route::get('/sarpras/maintenance', [MaintenanceController::class, 'index'])->name('sarpras.maintenance.index');
    });
    Route::middleware('permission:sarpras.maintenance.create')->group(function () {
        Route::post('/sarpras/maintenance', [MaintenanceController::class, 'store'])->name('sarpras.maintenance.store');
    });
    Route::middleware('permission:sarpras.maintenance.update')->group(function () {
        Route::put('/sarpras/maintenance/{maintenance}', [MaintenanceController::class, 'update'])->name('sarpras.maintenance.update');
    });
    Route::middleware('permission:sarpras.maintenance.delete')->group(function () {
        Route::delete('/sarpras/maintenance/{maintenance}', [MaintenanceController::class, 'destroy'])->name('sarpras.maintenance.destroy');
    });
});
