<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperadminSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('SUPERADMIN_EMAIL', 'test@example.com');
        $password = env('SUPERADMIN_PASSWORD', 'password');

        $user = User::withTrashed()->firstOrNew(['email' => $email]);
        $user->name = $user->name ?: 'Super Admin';
        $user->password = Hash::make($password);
        $user->email_verified_at ??= now();
        $user->deleted_at = null;
        $user->save();

        if (! $user->hasRole('superadmin')) {
            $user->assignRole('superadmin');
        }
    }
}
