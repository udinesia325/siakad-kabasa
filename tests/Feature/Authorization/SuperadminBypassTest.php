<?php

namespace Tests\Feature\Authorization;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class SuperadminBypassTest extends TestCase
{
    use RefreshDatabase;

    public function test_superadmin_account_passes_arbitrary_gate_check(): void
    {
        $u = User::factory()->create(['account_type' => 'superadmin']);

        $this->assertTrue(Gate::forUser($u)->allows('this.does.not.exist'));
    }

    public function test_staff_without_permission_fails_gate(): void
    {
        $u = User::factory()->create(['account_type' => 'staff']);

        $this->assertFalse(Gate::forUser($u)->allows('siswa.view'));
    }
}
