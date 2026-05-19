<?php

use App\Http\Controllers\Publik\JadwalPublikController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:60,1')->group(function () {
    Route::prefix('jadwal')->name('publik.jadwal.')->group(function () {
        Route::get('/', [JadwalPublikController::class, 'index'])->name('index');
    });
});
