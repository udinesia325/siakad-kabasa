<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', User::class);

        $query = User::query()
            ->with('roles:id,name')
            ->orderByDesc('id');

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->whereHas('roles', fn ($q) => $q->where('name', $request->role));
        }

        $users = $query->paginate(15)->withQueryString()->through(fn (User $u) => [
            'id' => $u->id,
            'name' => $u->name,
            'email' => $u->email,
            'role' => $u->roles->first()?->name,
            'account_type' => $u->account_type,
            'created_at' => $u->created_at?->toDateTimeString(),
            'is_self' => $u->id === $request->user()->id,
            'is_primary_superadmin' => $u->is_primary_superadmin,
        ]);

        $current = $request->user();

        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => $request->only('search', 'role'),
            'assignableRoles' => Role::orderBy('name')->pluck('name'),
            'roleFilterOptions' => Role::orderBy('name')->pluck('name'),
            'currentIsPrimarySuperadmin' => $current->is_primary_superadmin,
        ]);
    }

    public function trashed(Request $request): Response
    {
        Gate::authorize('viewAny', User::class);

        $query = User::onlyTrashed()
            ->with('roles:id,name')
            ->orderByDesc('deleted_at');

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate(15)->withQueryString()->through(fn (User $u) => [
            'id' => $u->id,
            'name' => $u->name,
            'email' => $u->email,
            'role' => $u->roles->first()?->name,
            'deleted_at' => $u->deleted_at?->toDateTimeString(),
            'is_primary_superadmin' => $u->is_primary_superadmin,
        ]);

        return Inertia::render('users/trashed', [
            'users' => $users,
            'filters' => $request->only('search'),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $user = User::create([
            'name' => $request->string('name'),
            'email' => $request->string('email'),
            'password' => Hash::make($request->string('password')),
            'email_verified_at' => now(),
            'account_type' => $request->input('account_type'),
        ]);

        if ($user->account_type === 'staff') {
            $user->syncRoles([$request->string('role')->toString()]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pengguna berhasil ditambahkan.']);

        return redirect()->route('users.index');
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $user->update([
            'name' => $request->string('name'),
            'email' => $request->string('email'),
            'account_type' => $request->input('account_type'),
            ...($request->filled('password') ? ['password' => Hash::make($request->string('password'))] : []),
        ]);

        if ($user->account_type === 'staff') {
            $user->syncRoles([$request->string('role')->toString()]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pengguna berhasil diperbarui.']);

        return redirect()->route('users.index');
    }

    public function destroy(User $user): RedirectResponse
    {
        Gate::authorize('delete', $user);

        $user->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pengguna berhasil dihapus.']);

        return redirect()->route('users.index');
    }

    public function restore(int $id): RedirectResponse
    {
        $user = User::onlyTrashed()->findOrFail($id);

        Gate::authorize('restore', $user);

        $user->restore();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pengguna berhasil dipulihkan.']);

        return redirect()->route('users.trashed');
    }

    public function forceDelete(int $id): RedirectResponse
    {
        $user = User::onlyTrashed()->findOrFail($id);

        Gate::authorize('forceDelete', $user);

        $user->forceDelete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pengguna berhasil dihapus permanen.']);

        return redirect()->route('users.trashed');
    }
}
