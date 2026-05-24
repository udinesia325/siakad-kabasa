<?php

use App\Http\Controllers\Api\SiswaSearchController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('api')->group(function () {
    Route::get('/siswa/search', SiswaSearchController::class)->name('api.siswa.search');
});
