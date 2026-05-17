<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperadminSeeder extends Seeder
{
    public function run(): void
    {
        if (User::where('is_primary_superadmin', true)->exists()) {
            return;
        }

        $email = env('SUPERADMIN_EMAIL', 'admin@example.com');
        $password = env('SUPERADMIN_PASSWORD', 'password');

        $user = User::withTrashed()->firstOrNew(['email' => $email]);
        $user->name = $user->name ?: 'Super Admin';
        $user->password = Hash::make($password);
        $user->email_verified_at ??= now();
        $user->deleted_at = null;
        $user->is_primary_superadmin = true;
        $user->save();

        if (! $user->hasRole('superadmin')) {
            $user->assignRole('superadmin');
        }
    }
}
