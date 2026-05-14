<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\JadwalAbsensiController;
use App\Http\Controllers\KehadiranController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TahunAjaranController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('absensi', [AbsensiController::class, 'index'])->name('absensi.index');
    Route::post('api/absensi/scan', [AbsensiController::class, 'scan'])->name('absensi.scan');
    Route::resource('tahun-ajaran', TahunAjaranController::class)->except(['create', 'edit', 'show']);
    Route::patch('tahun-ajaran/{tahunAjaran}/set-aktif', [TahunAjaranController::class, 'setAktif'])
        ->name('tahun-ajaran.set-aktif');

    Route::resource('kelas', KelasController::class)->except(['create', 'edit', 'show'])->parameters(['kelas' => 'kelas']);
    Route::post('kelas/{kelas}/naik-kelas', [KelasController::class, 'naikKelas'])->name('kelas.naik-kelas');
    Route::post('kelas/{kelas}/luluskan', [KelasController::class, 'luluskan'])->name('kelas.luluskan');
    Route::get('kelas/{kelas}/log-operasi', [KelasController::class, 'logOperasi'])->name('kelas.log-operasi');

    Route::get('siswa/import/template', [SiswaController::class, 'importTemplate'])->name('siswa.import.template');
    Route::post('siswa/import/preview', [SiswaController::class, 'importPreview'])->name('siswa.import.preview');
    Route::post('siswa/import/store', [SiswaController::class, 'importStore'])->name('siswa.import.store');
    Route::resource('siswa', SiswaController::class)->except(['show']);
    Route::post('siswa/{siswa}/assign-rfid', [SiswaController::class, 'assignRfid'])
        ->name('siswa.assign-rfid');
    Route::post('siswa/{siswa}/mutasi', [SiswaController::class, 'mutasi'])->name('siswa.mutasi');
    Route::get('siswa/{siswa}/riwayat-kelas', [SiswaController::class, 'riwayatKelas'])->name('siswa.riwayat-kelas');

    Route::get('jadwal-absensi', [JadwalAbsensiController::class, 'index'])->name('jadwal-absensi.index');
    Route::patch('jadwal-absensi/{jadwalAbsensi}', [JadwalAbsensiController::class, 'update'])->name('jadwal-absensi.update');

    Route::get('kehadiran', [KehadiranController::class, 'index'])->name('kehadiran.index');
    Route::get('kehadiran/{kelas}', [KehadiranController::class, 'show'])->name('kehadiran.show');
    Route::post('kehadiran/{kelas}/anulir', [KehadiranController::class, 'anulir'])->name('kehadiran.anulir');
});
