<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\RoleSeeder;
use Database\Seeders\SuperadminSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SuperadminPrimaryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RoleSeeder::class);
    }

    private function makeSuperadmin(bool $primary = false, ?string $email = null): User
    {
        $user = User::factory()->create([
            'email' => $email ?? fake()->unique()->safeEmail(),
        ]);

        if ($primary) {
            $user->is_primary_superadmin = true;
            $user->save();
        }

        $user->assignRole('superadmin');

        return $user;
    }

    public function test_seeder_bikin_primary_saat_fresh_install(): void
    {
        putenv('SUPERADMIN_EMAIL=primary@test.local');
        $_ENV['SUPERADMIN_EMAIL'] = 'primary@test.local';
        $_SERVER['SUPERADMIN_EMAIL'] = 'primary@test.local';

        putenv('SUPERADMIN_PASSWORD=secret123');
        $_ENV['SUPERADMIN_PASSWORD'] = 'secret123';
        $_SERVER['SUPERADMIN_PASSWORD'] = 'secret123';

        $this->seed(SuperadminSeeder::class);

        $primary = User::where('email', 'primary@test.local')->first();
        $this->assertNotNull($primary);
        $this->assertTrue((bool) $primary->is_primary_superadmin);
        $this->assertTrue($primary->hasRole('superadmin'));
    }

    public function test_seeder_tidak_menyentuh_apapun_jika_sudah_ada_primary(): void
    {
        $existing = $this->makeSuperadmin(primary: true, email: 'old-primary@test.local');

        putenv('SUPERADMIN_EMAIL=different@test.local');
        $_ENV['SUPERADMIN_EMAIL'] = 'different@test.local';
        $_SERVER['SUPERADMIN_EMAIL'] = 'different@test.local';

        $this->seed(SuperadminSeeder::class);

        $this->assertSame(1, User::where('is_primary_superadmin', true)->count());
        $this->assertSame($existing->id, User::where('is_primary_superadmin', true)->first()->id);
        $this->assertFalse(User::where('email', 'different@test.local')->exists());
    }

    public function test_primary_boleh_ganti_email_tanpa_kehilangan_status(): void
    {
        $primary = $this->makeSuperadmin(primary: true, email: 'before@test.local');

        $primary->email = 'after@test.local';
        $primary->save();

        $primary->refresh();
        $this->assertTrue((bool) $primary->is_primary_superadmin);
    }

    public function test_save_user_kedua_dengan_is_primary_superadmin_true_throw_exception(): void
    {
        $this->makeSuperadmin(primary: true);

        $other = User::factory()->create();

        $this->expectException(\DomainException::class);

        $other->is_primary_superadmin = true;
        $other->save();
    }

    public function test_superadmin_non_primary_tidak_bisa_hapus_primary_via_policy(): void
    {
        $primary = $this->makeSuperadmin(primary: true);
        $other = $this->makeSuperadmin();

        $this->assertFalse($other->can('delete', $primary));
    }

    public function test_primary_tidak_bisa_hapus_dirinya_sendiri(): void
    {
        $primary = $this->makeSuperadmin(primary: true);

        $this->assertFalse($primary->can('delete', $primary));
    }

    public function test_primary_tidak_bisa_diedit_via_policy_oleh_siapa_pun(): void
    {
        $primary = $this->makeSuperadmin(primary: true);
        $other = $this->makeSuperadmin();

        $this->assertFalse($other->can('update', $primary));
        $this->assertFalse($primary->can('update', $primary));
    }

    public function test_primary_tidak_bisa_di_force_delete(): void
    {
        $primary = $this->makeSuperadmin(primary: true);
        $other = $this->makeSuperadmin();

        $this->assertFalse($other->can('forceDelete', $primary));
        $this->assertFalse($primary->can('forceDelete', $primary));
    }

    public function test_primary_tidak_bisa_di_restore(): void
    {
        $primary = $this->makeSuperadmin(primary: true);
        $other = $this->makeSuperadmin();

        $this->assertFalse($other->can('restore', $primary));
    }

    public function test_primary_bisa_hapus_superadmin_non_primary_lain(): void
    {
        $primary = $this->makeSuperadmin(primary: true);
        $other = $this->makeSuperadmin();

        $this->assertTrue($primary->can('delete', $other));
    }

    public function test_primary_bisa_edit_superadmin_non_primary_lain(): void
    {
        $primary = $this->makeSuperadmin(primary: true);
        $other = $this->makeSuperadmin();

        $this->assertTrue($primary->can('update', $other));
    }

    public function test_delete_primary_oleh_superadmin_lain_return_403(): void
    {
        $primary = $this->makeSuperadmin(primary: true);
        $other = $this->makeSuperadmin();

        $response = $this->actingAs($other)->delete(route('users.destroy', $primary));
        $response->assertForbidden();

        $this->assertFalse($primary->fresh()->trashed());
    }
}
