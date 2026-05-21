<?php

use App\Http\Controllers\Sarpras\KategoriController;
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
});
