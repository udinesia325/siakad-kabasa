<?php

use App\Http\Controllers\JadwalAbsensiController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TahunAjaranController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('tahun-ajaran', TahunAjaranController::class)->except(['create', 'edit', 'show']);
    Route::patch('tahun-ajaran/{tahunAjaran}/set-aktif', [TahunAjaranController::class, 'setAktif'])
        ->name('tahun-ajaran.set-aktif');

    Route::resource('kelas', KelasController::class)->except(['create', 'edit', 'show'])->parameters(['kelas' => 'kelas']);

    Route::resource('siswa', SiswaController::class)->except(['show']);
    Route::post('siswa/{siswa}/assign-rfid', [SiswaController::class, 'assignRfid'])
        ->name('siswa.assign-rfid');

    Route::get('jadwal-absensi', [JadwalAbsensiController::class, 'index'])->name('jadwal-absensi.index');
    Route::patch('jadwal-absensi/{jadwalAbsensi}', [JadwalAbsensiController::class, 'update'])->name('jadwal-absensi.update');
});
