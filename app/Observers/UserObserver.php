<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    public function saving(User $user): void
    {
        if ($user->is_primary_superadmin) {
            $user->account_type = 'superadmin';
        }
    }

    public function saved(User $user): void
    {
        if ($user->account_type === 'superadmin' && $user->roles()->exists()) {
            $user->syncRoles([]);
        }
    }
}
