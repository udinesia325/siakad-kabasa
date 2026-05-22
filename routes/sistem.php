<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\ServerMonitorController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Trashed user — hanya superadmin sungguhan
    Route::middleware('superadmin.only')->group(function () {
        Route::get('users/trashed', [UserController::class, 'trashed'])->name('users.trashed');
        Route::post('users/{id}/restore', [UserController::class, 'restore'])->name('users.restore');
        Route::delete('users/{id}/force-delete', [UserController::class, 'forceDelete'])->name('users.force-delete');
    });

    // Users CRUD — bisa didelegasikan via permission users.*
    Route::middleware('permission:users.view')->group(function () {
        Route::get('users', [UserController::class, 'index'])->name('users.index');
    });
    Route::middleware('permission:users.create')->group(function () {
        Route::post('users', [UserController::class, 'store'])->name('users.store');
    });
    Route::middleware('permission:users.update')->group(function () {
        Route::put('users/{user}', [UserController::class, 'update']);
        Route::patch('users/{user}', [UserController::class, 'update'])->name('users.update');
    });
    Route::middleware('permission:users.delete')->group(function () {
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });

    // Master roles
    Route::middleware('permission:roles.view')->group(function () {
        Route::get('master/roles', [RoleController::class, 'index'])->name('roles.index');
        Route::get('master/roles/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
    });
    Route::middleware('permission:roles.create')->group(function () {
        Route::get('master/roles/create', [RoleController::class, 'create'])->name('roles.create');
        Route::post('master/roles', [RoleController::class, 'store'])->name('roles.store');
    });
    Route::middleware('permission:roles.update')->group(function () {
        Route::put('master/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    });
    Route::middleware('permission:roles.delete')->group(function () {
        Route::delete('master/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
    });

    Route::middleware('permission:server-monitor.view')->group(function () {
        Route::get('sistem/server-monitor', [ServerMonitorController::class, 'index'])
            ->name('sistem.server-monitor.index');
        Route::get('sistem/server-monitor/stats', [ServerMonitorController::class, 'stats'])
            ->name('sistem.server-monitor.stats');
    });
});
