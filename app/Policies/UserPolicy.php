<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        // Superadmin inti punya akses penuh tanpa syarat.
        if ($user->hasRole('superadmin') && $user->is_primary_superadmin) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('superadmin');
    }

    public function view(User $user, User $target): bool
    {
        return $user->hasRole('admin') || $user->hasRole('superadmin');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('superadmin');
    }

    public function update(User $user, User $target): bool
    {
        // Tidak boleh edit diri sendiri lewat halaman ini.
        if ($user->id === $target->id) {
            return false;
        }

        // Superadmin biasa tidak bisa edit sesama superadmin atau pegawai.
        if ($target->hasRole('superadmin') || $target->hasRole('pegawai')) {
            return false;
        }

        return $user->hasRole('admin') || $user->hasRole('superadmin');
    }

    public function delete(User $user, User $target): bool
    {
        if ($user->id === $target->id) {
            return false;
        }

        // Superadmin biasa tidak bisa hapus sesama superadmin atau pegawai.
        if ($target->hasRole('superadmin') || $target->hasRole('pegawai')) {
            return false;
        }

        return $user->hasRole('admin') || $user->hasRole('superadmin');
    }

    public function restore(User $user, User $target): bool
    {
        return $user->hasRole('superadmin');
    }

    public function forceDelete(User $user, User $target): bool
    {
        return $user->hasRole('superadmin');
    }
}
