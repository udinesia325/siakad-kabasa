<?php

namespace App\Authorization;

class ModuleRegistry
{
    /**
     * @param  array<int, array<string, mixed>>|null  $modules
     */
    public function __construct(private ?array $modules = null)
    {
        $this->modules ??= require base_path('config/modules.php');
    }

    /** @return array<int, array<string, mixed>> */
    public function all(): array
    {
        return $this->modules;
    }

    /** @return array<int, string> */
    public function permissions(): array
    {
        $out = [];
        foreach ($this->modules as $m) {
            $actions = match ($m['type']) {
                'crud' => ['view', 'create', 'update', 'delete'],
                'single', 'custom' => $m['actions'] ?? [],
                default => [],
            };
            foreach ($actions as $a) {
                $out[] = $m['key'].'.'.$a;
            }
        }

        return $out;
    }

    /** @return array<int, array<string, mixed>> */
    public function forSidebar(): array
    {
        return array_values(array_filter($this->modules, fn ($m) => ($m['sidebar'] ?? false) === true));
    }

    /** @return array<string, array<int, array<string, mixed>>> */
    public function forMatrix(): array
    {
        $out = [];
        foreach ($this->modules as $m) {
            $actions = match ($m['type']) {
                'crud' => ['view', 'create', 'update', 'delete'],
                'single', 'custom' => $m['actions'] ?? [],
                default => [],
            };
            $out[$m['group']][] = array_merge($m, ['resolved_actions' => $actions]);
        }

        return $out;
    }
}
