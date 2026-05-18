<?php

namespace Tests\Feature\MasterRole;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleCrudTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('permission:sync');
    }

    private function superadmin(): User
    {
        return User::factory()->create(['account_type' => 'superadmin']);
    }

    public function test_superadmin_can_list_roles(): void
    {
        Role::create(['name' => 'admin', 'guard_name' => 'web', 'is_system' => true]);

        $this->withoutVite()
            ->actingAs($this->superadmin())
            ->get('/master/roles')
            ->assertOk();
    }

    public function test_superadmin_can_create_role_with_permissions(): void
    {
        $this->actingAs($this->superadmin())
            ->post('/master/roles', [
                'name' => 'custom-role',
                'description' => 'Test role',
                'permissions' => ['siswa.view', 'siswa.create'],
            ])
            ->assertRedirect('/master/roles');

        $role = Role::where('name', 'custom-role')->firstOrFail();
        $this->assertTrue($role->hasPermissionTo('siswa.view'));
        $this->assertTrue($role->hasPermissionTo('siswa.create'));
        $this->assertFalse($role->hasPermissionTo('siswa.update'));
    }

    public function test_system_role_name_cannot_be_changed(): void
    {
        $role = Role::create(['name' => 'admin', 'guard_name' => 'web', 'is_system' => true]);

        $this->actingAs($this->superadmin())
            ->put('/master/roles/'.$role->id, [
                'name' => 'admin-renamed',
                'permissions' => [],
            ])
            ->assertRedirect();

        $this->assertSame('admin', $role->fresh()->name);
    }

    public function test_system_role_cannot_be_deleted(): void
    {
        $role = Role::create(['name' => 'admin', 'guard_name' => 'web', 'is_system' => true]);

        $this->actingAs($this->superadmin())
            ->delete('/master/roles/'.$role->id)
            ->assertForbidden();

        $this->assertDatabaseHas('roles', ['id' => $role->id]);
    }

    public function test_role_in_use_cannot_be_deleted(): void
    {
        $role = Role::create(['name' => 'limited', 'guard_name' => 'web']);
        $u = User::factory()->create(['account_type' => 'staff']);
        $u->assignRole($role);

        $this->actingAs($this->superadmin())
            ->delete('/master/roles/'.$role->id)
            ->assertStatus(422);
    }

    public function test_update_filters_invalid_permissions(): void
    {
        $role = Role::create(['name' => 'limited', 'guard_name' => 'web']);

        $this->actingAs($this->superadmin())
            ->put('/master/roles/'.$role->id, [
                'name' => 'limited',
                'permissions' => ['siswa.view', 'fake.nonexistent'],
            ])
            ->assertRedirect();

        $fresh = $role->fresh();
        $this->assertTrue($fresh->hasPermissionTo('siswa.view'));
        $this->assertFalse($fresh->permissions()->where('name', 'fake.nonexistent')->exists());
    }
}
