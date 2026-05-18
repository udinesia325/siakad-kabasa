<?php

namespace App\Console\Commands;

use App\Authorization\ModuleRegistry;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class SyncPermissionsCommand extends Command
{
    protected $signature = 'permission:sync {--prune : Hapus permission yang tidak terdaftar di registry}';

    protected $description = 'Sinkronkan tabel permissions dengan ModuleRegistry';

    public function handle(ModuleRegistry $registry, PermissionRegistrar $registrar): int
    {
        $desired = collect($registry->permissions());
        $existing = Permission::query()->where('guard_name', 'web')->pluck('name');

        $toAdd = $desired->diff($existing);
        $toRemove = $existing->diff($desired);

        foreach ($toAdd as $name) {
            Permission::create(['name' => $name, 'guard_name' => 'web']);
        }

        $removed = collect();
        if ($this->option('prune')) {
            $removed = $toRemove;
            Permission::query()->whereIn('name', $toRemove)->delete();
        }

        $registrar->forgetCachedPermissions();

        $this->info(sprintf('Added: %d', $toAdd->count()));
        $this->info(sprintf('Removed: %d', $removed->count()));
        $this->info(sprintf('Unchanged: %d', $desired->intersect($existing)->count()));

        if (! $this->option('prune') && $toRemove->isNotEmpty()) {
            $this->warn(sprintf('%d permission tidak terpakai (jalankan dengan --prune untuk hapus):', $toRemove->count()));
            foreach ($toRemove as $name) {
                $this->line('  - '.$name);
            }
        }

        return self::SUCCESS;
    }
}
