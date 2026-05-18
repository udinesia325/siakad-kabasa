<?php

namespace Tests\Feature\Authorization;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PermissionEnforcementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('permission:sync');
    }

    public function test_staff_with_siswa_view_can_get_siswa_index(): void
    {
        $role = Role::create(['name' => 'limited', 'guard_name' => 'web']);
        $role->givePermissionTo('siswa.view');

        $u = User::factory()->create(['account_type' => 'staff']);
        $u->assignRole($role);

        $this->actingAs($u)->get('/siswa')->assertOk();
    }

    public function test_staff_without_siswa_view_gets_403(): void
    {
        $role = Role::create(['name' => 'limited2', 'guard_name' => 'web']);

        $u = User::factory()->create(['account_type' => 'staff']);
        $u->assignRole($role);

        $this->actingAs($u)->get('/siswa')->assertForbidden();
    }

    public function test_superadmin_can_access_without_permission(): void
    {
        $u = User::factory()->create(['account_type' => 'superadmin']);

        $this->actingAs($u)->get('/siswa')->assertOk();
    }
}
