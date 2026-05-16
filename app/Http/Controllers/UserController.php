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
            'created_at' => $u->created_at?->toDateTimeString(),
            'is_self' => $u->id === $request->user()->id,
        ]);

        $current = $request->user();

        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => $request->only('search', 'role'),
            'assignableRoles' => $current->hasRole('superadmin')
                ? ['superadmin', 'admin']
                : ['admin'],
            'roleFilterOptions' => ['superadmin', 'admin', 'pegawai'],
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $user = User::create([
            'name' => $request->string('name'),
            'email' => $request->string('email'),
            'password' => Hash::make($request->string('password')),
            'email_verified_at' => now(),
        ]);

        $user->assignRole($request->string('role')->toString());

        return redirect()->route('users.index');
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $user->update([
            'name' => $request->string('name'),
            'email' => $request->string('email'),
            ...($request->filled('password') ? ['password' => Hash::make($request->string('password'))] : []),
        ]);

        $user->syncRoles([$request->string('role')->toString()]);

        return redirect()->route('users.index');
    }

    public function destroy(User $user): RedirectResponse
    {
        Gate::authorize('delete', $user);

        $user->delete();

        return redirect()->route('users.index');
    }
}
