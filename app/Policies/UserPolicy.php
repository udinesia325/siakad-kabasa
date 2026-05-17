<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->hasRole('superadmin') && $user->is_primary_superadmin) {
            // Untuk aksi destruktif/edit, biar metode policy yang putuskan,
            // agar primary tidak bisa merusak dirinya sendiri.
            if (in_array($ability, ['update', 'delete', 'forceDelete'], true)) {
                return null;
            }

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
        if ($target->is_primary_superadmin) {
            return false;
        }

        if ($user->id === $target->id) {
            return false;
        }

        // Primary superadmin boleh edit non-primary superadmin lain
        if ($user->is_primary_superadmin && $user->hasRole('superadmin')) {
            return true;
        }

        if ($target->hasRole('superadmin') || $target->hasRole('pegawai')) {
            return false;
        }

        return $user->hasRole('admin') || $user->hasRole('superadmin');
    }

    public function delete(User $user, User $target): bool
    {
        if ($target->is_primary_superadmin) {
            return false;
        }

        if ($user->id === $target->id) {
            return false;
        }

        // Primary superadmin boleh hapus non-primary superadmin lain
        if ($user->is_primary_superadmin && $user->hasRole('superadmin')) {
            return true;
        }

        if ($target->hasRole('superadmin') || $target->hasRole('pegawai')) {
            return false;
        }

        return $user->hasRole('admin') || $user->hasRole('superadmin');
    }

    public function restore(User $user, User $target): bool
    {
        if ($target->is_primary_superadmin) {
            return false;
        }

        return $user->hasRole('superadmin');
    }

    public function forceDelete(User $user, User $target): bool
    {
        if ($target->is_primary_superadmin) {
            return false;
        }

        return $user->hasRole('superadmin');
    }
}
