<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function () {
    Route::get('users/trashed', [UserController::class, 'trashed'])->name('users.trashed');
    Route::post('users/{id}/restore', [UserController::class, 'restore'])->name('users.restore');
    Route::delete('users/{id}/force-delete', [UserController::class, 'forceDelete'])->name('users.force-delete');
});

Route::middleware(['auth', 'verified', 'role:superadmin|admin'])->group(function () {
    Route::resource('users', UserController::class)->except(['create', 'edit', 'show']);
});
