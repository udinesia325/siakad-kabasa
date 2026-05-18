<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
}
