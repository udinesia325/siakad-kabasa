<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Backfill account_type berdasarkan role lama
        $superadminIds = DB::table('model_has_roles as mhr')
            ->join('roles as r', 'r.id', '=', 'mhr.role_id')
            ->where('r.name', 'superadmin')
            ->where('mhr.model_type', User::class)
            ->pluck('mhr.model_id');

        DB::table('users')
            ->whereIn('id', $superadminIds)
            ->update(['account_type' => 'superadmin']);

        DB::table('users')
            ->whereNotIn('id', $superadminIds)
            ->update(['account_type' => 'staff']);

        // 2. Detach role Spatie dari user superadmin
        DB::table('model_has_roles')
            ->whereIn('model_id', $superadminIds)
            ->where('model_type', User::class)
            ->delete();

        // 3. Hapus role Spatie 'superadmin' (tidak dipakai lagi)
        DB::table('roles')->where('name', 'superadmin')->delete();

        // 4. Tandai role 'admin' & 'pegawai' is_system, lengkapi description
        // Create jika belum ada (untuk fresh installs)
        if (! DB::table('roles')->where('name', 'admin')->exists()) {
            Role::create([
                'name' => 'admin',
                'guard_name' => 'web',
                'is_system' => true,
                'description' => 'Akses penuh fitur akademik & kehadiran.',
            ]);
        } else {
            DB::table('roles')->where('name', 'admin')->update([
                'is_system' => true,
                'description' => 'Akses penuh fitur akademik & kehadiran.',
            ]);
        }

        if (! DB::table('roles')->where('name', 'pegawai')->exists()) {
            Role::create([
                'name' => 'pegawai',
                'guard_name' => 'web',
                'is_system' => true,
                'description' => 'Scan absensi + lihat kehadiran.',
            ]);
        } else {
            DB::table('roles')->where('name', 'pegawai')->update([
                'is_system' => true,
                'description' => 'Scan absensi + lihat kehadiran.',
            ]);
        }

        // 5. Buat role 'staff' baru (template — permission diisi setelah sync)
        if (! DB::table('roles')->where('name', 'staff')->exists()) {
            Role::create([
                'name' => 'staff',
                'guard_name' => 'web',
                'is_system' => true,
                'description' => 'Template staff TU — sesuaikan permission sesuai kebutuhan.',
            ]);
        }
    }

    public function down(): void
    {
        DB::table('roles')->where('name', 'staff')->where('is_system', true)->delete();

        DB::table('roles')->where('name', 'admin')->update([
            'is_system' => false,
            'description' => null,
        ]);
        DB::table('roles')->where('name', 'pegawai')->update([
            'is_system' => false,
            'description' => null,
        ]);

        Role::firstOrCreate(['name' => 'superadmin', 'guard_name' => 'web']);
    }
};
