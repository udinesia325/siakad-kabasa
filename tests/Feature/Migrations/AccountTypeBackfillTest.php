<?php

namespace Tests\Feature\Migrations;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AccountTypeBackfillTest extends TestCase
{
    use RefreshDatabase;

    public function test_existing_admin_pegawai_roles_are_system_after_migration(): void
    {
        $admin = Role::where('name', 'admin')->first();
        $pegawai = Role::where('name', 'pegawai')->first();
        $staff = Role::where('name', 'staff')->first();

        $this->assertNotNull($admin);
        $this->assertTrue((bool) $admin->is_system);
        $this->assertNotNull($pegawai);
        $this->assertTrue((bool) $pegawai->is_system);
        $this->assertNotNull($staff);
        $this->assertTrue((bool) $staff->is_system);
    }

    public function test_no_superadmin_role_remains_after_backfill(): void
    {
        $this->assertNull(Role::where('name', 'superadmin')->first());
    }
}
