<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\HariLiburController;
use App\Http\Controllers\JadwalAbsensiController;
use App\Http\Controllers\JadwalMengajarController;
use App\Http\Controllers\JamPelajaranController;
use App\Http\Controllers\KehadiranController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\MataPelajaranController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TahunAjaranController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('permission:absensi.scan')->group(function () {
        Route::get('absensi', [AbsensiController::class, 'index'])->name('absensi.index');
        Route::post('api/absensi/scan', [AbsensiController::class, 'scan'])->name('absensi.scan');
    });

    Route::middleware('permission:tahun-ajaran.view')->group(function () {
        Route::get('tahun-ajaran', [TahunAjaranController::class, 'index'])->name('tahun-ajaran.index');
    });
    Route::middleware('permission:tahun-ajaran.create')->group(function () {
        Route::post('tahun-ajaran', [TahunAjaranController::class, 'store'])->name('tahun-ajaran.store');
    });
    Route::middleware('permission:tahun-ajaran.update')->group(function () {
        Route::put('tahun-ajaran/{tahunAjaran}', [TahunAjaranController::class, 'update']);
        Route::patch('tahun-ajaran/{tahunAjaran}', [TahunAjaranController::class, 'update'])->name('tahun-ajaran.update');
        Route::patch('tahun-ajaran/{tahunAjaran}/set-aktif', [TahunAjaranController::class, 'setAktif'])->name('tahun-ajaran.set-aktif');
    });
    Route::middleware('permission:tahun-ajaran.delete')->group(function () {
        Route::delete('tahun-ajaran/{tahunAjaran}', [TahunAjaranController::class, 'destroy'])->name('tahun-ajaran.destroy');
    });

    Route::middleware('permission:kelas.view')->group(function () {
        Route::get('kelas', [KelasController::class, 'index'])->name('kelas.index');
        Route::get('kelas/{kelas}/log-operasi', [KelasController::class, 'logOperasi'])->name('kelas.log-operasi');
    });
    Route::middleware('permission:kelas.create')->group(function () {
        Route::post('kelas', [KelasController::class, 'store'])->name('kelas.store');
    });
    Route::middleware('permission:kelas.update')->group(function () {
        Route::put('kelas/{kelas}', [KelasController::class, 'update']);
        Route::patch('kelas/{kelas}', [KelasController::class, 'update'])->name('kelas.update');
        Route::post('kelas/{kelas}/naik-kelas', [KelasController::class, 'naikKelas'])->name('kelas.naik-kelas');
        Route::post('kelas/{kelas}/luluskan', [KelasController::class, 'luluskan'])->name('kelas.luluskan');
    });
    Route::middleware('permission:kelas.delete')->group(function () {
        Route::delete('kelas/{kelas}', [KelasController::class, 'destroy'])->name('kelas.destroy');
    });

    Route::middleware('permission:siswa.view')->group(function () {
        Route::get('siswa/import/template', [SiswaController::class, 'importTemplate'])->name('siswa.import.template');
        Route::get('siswa/{siswa}/riwayat-kelas', [SiswaController::class, 'riwayatKelas'])->name('siswa.riwayat-kelas');
        Route::get('siswa', [SiswaController::class, 'index'])->name('siswa.index');
    });
    Route::middleware('permission:siswa.create')->group(function () {
        Route::get('siswa/create', [SiswaController::class, 'create'])->name('siswa.create');
        Route::post('siswa', [SiswaController::class, 'store'])->name('siswa.store');
        Route::post('siswa/import/preview', [SiswaController::class, 'importPreview'])->name('siswa.import.preview');
        Route::post('siswa/import/store', [SiswaController::class, 'importStore'])->name('siswa.import.store');
    });
    Route::middleware('permission:siswa.update')->group(function () {
        Route::get('siswa/{siswa}/edit', [SiswaController::class, 'edit'])->name('siswa.edit');
        Route::put('siswa/{siswa}', [SiswaController::class, 'update']);
        Route::patch('siswa/{siswa}', [SiswaController::class, 'update'])->name('siswa.update');
        Route::post('siswa/{siswa}/assign-rfid', [SiswaController::class, 'assignRfid'])->name('siswa.assign-rfid');
        Route::post('siswa/{siswa}/mutasi', [SiswaController::class, 'mutasi'])->name('siswa.mutasi');
    });
    Route::middleware('permission:siswa.delete')->group(function () {
        Route::delete('siswa/{siswa}', [SiswaController::class, 'destroy'])->name('siswa.destroy');
    });

    Route::middleware('permission:pegawai.view')->group(function () {
        Route::get('pegawai', [PegawaiController::class, 'index'])->name('pegawai.index');
    });
    Route::middleware('permission:pegawai.create')->group(function () {
        Route::get('pegawai/create', [PegawaiController::class, 'create'])->name('pegawai.create');
        Route::post('pegawai', [PegawaiController::class, 'store'])->name('pegawai.store');
    });
    Route::middleware('permission:pegawai.update')->group(function () {
        Route::get('pegawai/{pegawai}/edit', [PegawaiController::class, 'edit'])->name('pegawai.edit');
        Route::put('pegawai/{pegawai}', [PegawaiController::class, 'update']);
        Route::patch('pegawai/{pegawai}', [PegawaiController::class, 'update'])->name('pegawai.update');
        Route::post('pegawai/{pegawai}/assign-user', [PegawaiController::class, 'assignUser'])->name('pegawai.assign-user');
        Route::delete('pegawai/{pegawai}/revoke-user', [PegawaiController::class, 'revokeUser'])->name('pegawai.revoke-user');
        Route::post('pegawai/{pegawai}/assign-rfid', [PegawaiController::class, 'assignRfid'])->name('pegawai.assign-rfid');
    });
    Route::middleware('permission:pegawai.delete')->group(function () {
        Route::delete('pegawai/{pegawai}', [PegawaiController::class, 'destroy'])->name('pegawai.destroy');
    });

    Route::middleware('permission:mata-pelajaran.view')->group(function () {
        Route::get('mata-pelajaran', [MataPelajaranController::class, 'index'])->name('mata-pelajaran.index');
    });
    Route::middleware('permission:mata-pelajaran.create')->group(function () {
        Route::post('mata-pelajaran', [MataPelajaranController::class, 'store'])->name('mata-pelajaran.store');
    });
    Route::middleware('permission:mata-pelajaran.update')->group(function () {
        Route::put('mata-pelajaran/{mataPelajaran}', [MataPelajaranController::class, 'update']);
        Route::patch('mata-pelajaran/{mataPelajaran}', [MataPelajaranController::class, 'update'])->name('mata-pelajaran.update');
        Route::post('mata-pelajaran/{mataPelajaran}/pengampu', [MataPelajaranController::class, 'syncPengampu'])->name('mata-pelajaran.sync-pengampu');
    });
    Route::middleware('permission:mata-pelajaran.delete')->group(function () {
        Route::delete('mata-pelajaran/{mataPelajaran}', [MataPelajaranController::class, 'destroy'])->name('mata-pelajaran.destroy');
    });

    Route::middleware('permission:jam-pelajaran.view')->group(function () {
        Route::get('jam-pelajaran', [JamPelajaranController::class, 'index'])->name('jam-pelajaran.index');
    });
    Route::middleware('permission:jam-pelajaran.create')->group(function () {
        Route::post('jam-pelajaran', [JamPelajaranController::class, 'store'])->name('jam-pelajaran.store');
    });
    Route::middleware('permission:jam-pelajaran.update')->group(function () {
        Route::put('jam-pelajaran/{jamPelajaran}', [JamPelajaranController::class, 'update']);
        Route::patch('jam-pelajaran/{jamPelajaran}', [JamPelajaranController::class, 'update'])->name('jam-pelajaran.update');
    });
    Route::middleware('permission:jam-pelajaran.delete')->group(function () {
        Route::delete('jam-pelajaran/{jamPelajaran}', [JamPelajaranController::class, 'destroy'])->name('jam-pelajaran.destroy');
    });

    Route::middleware('permission:hari-libur.view')->group(function () {
        Route::get('hari-libur', [HariLiburController::class, 'index'])->name('hari-libur.index');
    });
    Route::middleware('permission:hari-libur.create')->group(function () {
        Route::post('hari-libur', [HariLiburController::class, 'store'])->name('hari-libur.store');
    });
    Route::middleware('permission:hari-libur.update')->group(function () {
        Route::put('hari-libur/{hariLibur}', [HariLiburController::class, 'update']);
        Route::patch('hari-libur/{hariLibur}', [HariLiburController::class, 'update'])->name('hari-libur.update');
    });
    Route::middleware('permission:hari-libur.delete')->group(function () {
        Route::delete('hari-libur/{hariLibur}', [HariLiburController::class, 'destroy'])->name('hari-libur.destroy');
    });

    Route::middleware('permission:kehadiran.view')->group(function () {
        Route::get('kehadiran', [KehadiranController::class, 'index'])->name('kehadiran.index');
        Route::get('kehadiran/{kelas}', [KehadiranController::class, 'show'])->name('kehadiran.show');
    });
    Route::middleware('permission:kehadiran.anulir')->group(function () {
        Route::post('kehadiran/{kelas}/anulir', [KehadiranController::class, 'anulir'])->name('kehadiran.anulir');
    });

    Route::middleware('permission:jadwal-mengajar.view')->group(function () {
        Route::get('jadwal-mengajar', [JadwalMengajarController::class, 'index'])->name('jadwal-mengajar.index');
        Route::get('jadwal-mengajar/{kelas}', [JadwalMengajarController::class, 'show'])->name('jadwal-mengajar.show');
    });
    Route::middleware('permission:jadwal-mengajar.create')->group(function () {
        Route::post('jadwal-mengajar/{kelas}', [JadwalMengajarController::class, 'store'])->name('jadwal-mengajar.store');
    });
    Route::middleware('permission:jadwal-mengajar.delete')->group(function () {
        Route::delete('jadwal-mengajar/{kelas}/{jadwal}', [JadwalMengajarController::class, 'destroy'])->name('jadwal-mengajar.destroy');
    });

    Route::middleware('permission:jadwal-absensi.view')->group(function () {
        Route::get('jadwal-absensi', [JadwalAbsensiController::class, 'index'])->name('jadwal-absensi.index');
    });
    Route::middleware('permission:jadwal-absensi.update')->group(function () {
        Route::patch('jadwal-absensi/{jadwalAbsensi}', [JadwalAbsensiController::class, 'update'])->name('jadwal-absensi.update');
    });
});
