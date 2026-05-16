<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function before(User $user): ?bool
    {
        if ($user->hasRole('superadmin')) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin');
    }

    public function view(User $user, User $target): bool
    {
        return $user->hasRole('admin');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    public function update(User $user, User $target): bool
    {
        if ($target->hasRole('superadmin') || $target->hasRole('pegawai')) {
            return false;
        }

        if ($user->id === $target->id) {
            return false;
        }

        return $user->hasRole('admin');
    }

    public function delete(User $user, User $target): bool
    {
        if ($target->hasRole('superadmin') || $target->hasRole('pegawai')) {
            return false;
        }

        if ($user->id === $target->id) {
            return false;
        }

        return $user->hasRole('admin');
    }
}
