<?php

namespace App\Http\Controllers;

use App\Authorization\ModuleRegistry;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleController extends Controller
{
    use AuthorizesRequests;

    public function index(): Response
    {
        $roles = Role::query()
            ->withCount('users')
            ->orderBy('is_system', 'desc')
            ->orderBy('name')
            ->get(['id', 'name', 'description', 'is_system'])
            ->map(fn ($r) => [
                'id' => $r->id,
                'name' => $r->name,
                'description' => $r->description,
                'is_system' => (bool) $r->is_system,
                'users_count' => $r->users_count,
                'permissions_count' => $r->permissions()->count(),
            ]);

        return Inertia::render('master/roles/index', ['roles' => $roles]);
    }

    public function create(ModuleRegistry $registry): Response
    {
        return Inertia::render('master/roles/create', [
            'matrix' => $registry->forMatrix(),
        ]);
    }

    public function store(StoreRoleRequest $request, PermissionRegistrar $registrar): RedirectResponse
    {
        $role = Role::create([
            'name' => $request->string('name')->toString(),
            'guard_name' => 'web',
            'description' => $request->input('description'),
            'is_system' => false,
        ]);

        $valid = Permission::query()->whereIn('name', $request->input('permissions', []))->pluck('name');
        $role->syncPermissions($valid);

        $registrar->forgetCachedPermissions();

        return redirect('/master/roles');
    }

    public function edit(Role $role, ModuleRegistry $registry): Response
    {
        return Inertia::render('master/roles/edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'description' => $role->description,
                'is_system' => (bool) $role->is_system,
                'users_count' => $role->users()->count(),
                'permissions' => $role->permissions()->pluck('name')->all(),
            ],
            'matrix' => $registry->forMatrix(),
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role, PermissionRegistrar $registrar): RedirectResponse
    {
        if (! $role->is_system) {
            $role->update(['name' => $request->input('name'), 'description' => $request->input('description')]);
        } else {
            $role->update(['description' => $request->input('description')]);
        }

        $valid = Permission::query()->whereIn('name', $request->input('permissions', []))->pluck('name');
        $role->syncPermissions($valid);

        $registrar->forgetCachedPermissions();

        return back();
    }

    public function destroy(Role $role): RedirectResponse
    {
        if ($role->is_system) {
            abort(403, 'Role sistem tidak dapat dihapus.');
        }

        $this->authorize('delete', $role);

        if ($role->users()->exists()) {
            abort(422, 'Role masih digunakan oleh user lain.');
        }

        $role->delete();

        return redirect('/master/roles');
    }
}
