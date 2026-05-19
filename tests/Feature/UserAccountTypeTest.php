<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserAccountTypeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
    }

    public function test_primary_superadmin_forces_account_type_superadmin(): void
    {
        $u = User::factory()->create([
            'is_primary_superadmin' => true,
            'account_type' => 'staff',
        ]);

        $this->assertSame('superadmin', $u->refresh()->account_type);
    }

    public function test_superadmin_account_detaches_spatie_roles(): void
    {
        $u = User::factory()->create(['account_type' => 'staff']);
        $u->assignRole('admin');

        $u->account_type = 'superadmin';
        $u->save();

        $this->assertCount(0, $u->refresh()->roles);
    }

    public function test_create_staff_without_role_returns_validation_error(): void
    {
        $admin = User::factory()->create(['account_type' => 'superadmin']);

        $this->actingAs($admin)
            ->post('/users', [
                'name' => 'X',
                'email' => 'x@y.id',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'account_type' => 'staff',
            ])
            ->assertSessionHasErrors('role');
    }

    public function test_non_superadmin_cannot_create_superadmin_account(): void
    {
        $role = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $role->givePermissionTo(Permission::firstOrCreate(['name' => 'users.create', 'guard_name' => 'web']));

        $admin = User::factory()->create(['account_type' => 'staff']);
        $admin->assignRole($role);

        $this->actingAs($admin)
            ->post('/users', [
                'name' => 'X',
                'email' => 'x@y.id',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'account_type' => 'superadmin',
            ])
            ->assertSessionHasErrors('account_type');
    }
}
