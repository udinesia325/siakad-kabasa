<?php

namespace Tests\Feature\Console;

use App\Authorization\ModuleRegistry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class SyncPermissionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_sync_creates_missing_permissions(): void
    {
        $this->app->instance(ModuleRegistry::class, new ModuleRegistry([
            ['key' => 'siswa', 'label' => 'Siswa', 'group' => 'M', 'type' => 'crud', 'sidebar' => true],
        ]));

        $this->artisan('permission:sync')->assertSuccessful();

        $this->assertDatabaseHas('permissions', ['name' => 'siswa.view']);
        $this->assertDatabaseHas('permissions', ['name' => 'siswa.create']);
        $this->assertDatabaseHas('permissions', ['name' => 'siswa.update']);
        $this->assertDatabaseHas('permissions', ['name' => 'siswa.delete']);
    }

    public function test_sync_without_prune_keeps_stale_permissions(): void
    {
        Permission::create(['name' => 'old.feature', 'guard_name' => 'web']);

        $this->app->instance(ModuleRegistry::class, new ModuleRegistry([
            ['key' => 'siswa', 'label' => 'Siswa', 'group' => 'M', 'type' => 'crud', 'sidebar' => true],
        ]));

        $this->artisan('permission:sync')->assertSuccessful();

        $this->assertDatabaseHas('permissions', ['name' => 'old.feature']);
    }

    public function test_sync_with_prune_deletes_stale_permissions(): void
    {
        Permission::create(['name' => 'old.feature', 'guard_name' => 'web']);

        $this->app->instance(ModuleRegistry::class, new ModuleRegistry([
            ['key' => 'siswa', 'label' => 'Siswa', 'group' => 'M', 'type' => 'crud', 'sidebar' => true],
        ]));

        $this->artisan('permission:sync', ['--prune' => true])->assertSuccessful();

        $this->assertDatabaseMissing('permissions', ['name' => 'old.feature']);
    }
}
