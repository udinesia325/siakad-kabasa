<?php

namespace Tests\Unit\Authorization;

use App\Authorization\ModuleRegistry;
use PHPUnit\Framework\TestCase;

class ModuleRegistryTest extends TestCase
{
    public function test_crud_module_generates_four_permissions(): void
    {
        $registry = new ModuleRegistry([
            ['key' => 'siswa', 'label' => 'Siswa', 'group' => 'Master', 'type' => 'crud', 'sidebar' => true],
        ]);

        $this->assertEqualsCanonicalizing(
            ['siswa.view', 'siswa.create', 'siswa.update', 'siswa.delete'],
            $registry->permissions()
        );
    }

    public function test_single_module_generates_one_permission_from_actions(): void
    {
        $registry = new ModuleRegistry([
            ['key' => 'absensi', 'label' => 'Scan', 'group' => 'Op', 'type' => 'single', 'actions' => ['scan'], 'sidebar' => false],
        ]);

        $this->assertSame(['absensi.scan'], $registry->permissions());
    }

    public function test_custom_module_generates_permissions_from_actions(): void
    {
        $registry = new ModuleRegistry([
            ['key' => 'kehadiran', 'label' => 'Kehadiran', 'group' => 'Op', 'type' => 'custom', 'actions' => ['view', 'export', 'anulir'], 'sidebar' => true],
        ]);

        $this->assertSame(['kehadiran.view', 'kehadiran.export', 'kehadiran.anulir'], $registry->permissions());
    }

    public function test_for_sidebar_returns_only_sidebar_true_modules(): void
    {
        $registry = new ModuleRegistry([
            ['key' => 'siswa', 'label' => 'Siswa', 'group' => 'Master', 'type' => 'crud', 'sidebar' => true],
            ['key' => 'absensi', 'label' => 'Scan', 'group' => 'Op', 'type' => 'single', 'actions' => ['scan'], 'sidebar' => false],
        ]);

        $sidebar = $registry->forSidebar();

        $this->assertCount(1, $sidebar);
        $this->assertSame('siswa', $sidebar[0]['key']);
    }

    public function test_for_matrix_groups_modules_by_group_key(): void
    {
        $registry = new ModuleRegistry([
            ['key' => 'siswa', 'label' => 'Siswa', 'group' => 'Master Data', 'type' => 'crud', 'sidebar' => true],
            ['key' => 'kelas', 'label' => 'Kelas', 'group' => 'Master Data', 'type' => 'crud', 'sidebar' => true],
            ['key' => 'kehadiran', 'label' => 'Kehadiran', 'group' => 'Operasional', 'type' => 'custom', 'actions' => ['view'], 'sidebar' => true],
        ]);

        $matrix = $registry->forMatrix();

        $this->assertArrayHasKey('Master Data', $matrix);
        $this->assertArrayHasKey('Operasional', $matrix);
        $this->assertCount(2, $matrix['Master Data']);
        $this->assertCount(1, $matrix['Operasional']);
    }
}
