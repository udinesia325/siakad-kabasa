<?php

use App\Http\Controllers\Wakasis\WakasisDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('permission:wakasis.dashboard.view')->group(function () {
        Route::get('/wakasis', WakasisDashboardController::class)->name('wakasis.dashboard');
    });
});
