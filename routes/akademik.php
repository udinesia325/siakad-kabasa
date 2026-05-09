<?php

use App\Http\Controllers\TahunAjaranController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('tahun-ajaran', TahunAjaranController::class)->except(['create', 'edit', 'show']);
    Route::patch('tahun-ajaran/{tahunAjaran}/set-aktif', [TahunAjaranController::class, 'setAktif'])
        ->name('tahun-ajaran.set-aktif');
});
