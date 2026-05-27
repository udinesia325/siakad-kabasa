<?php

use App\Http\Controllers\Settings\JenisKelasController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('settings/jenis-kelas', [JenisKelasController::class, 'index'])->name('jenis-kelas.index');
    Route::post('settings/jenis-kelas', [JenisKelasController::class, 'store'])->name('jenis-kelas.store');
    Route::patch('settings/jenis-kelas/{jenis_kelas}', [JenisKelasController::class, 'update'])->name('jenis-kelas.update');
    Route::delete('settings/jenis-kelas/{jenis_kelas}', [JenisKelasController::class, 'destroy'])->name('jenis-kelas.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])->name('security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');
});
