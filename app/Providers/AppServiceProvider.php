<?php

namespace App\Providers;

use App\Models\Pegawai;
use App\Models\Siswa;
use App\Models\User;
use App\Observers\UserObserver;
use App\Policies\RolePolicy;
use App\Services\StorageService;
use App\Services\Waha\WahaService;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(StorageService::class);
        $this->app->singleton(WahaService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Relation::morphMap([
            'm_pegawai' => Pegawai::class,
            'm_siswa' => Siswa::class,
        ]);

        User::observe(UserObserver::class);

        Gate::define('viewPulse', function (?User $user) {
            return $user?->isPrimarySuperadmin() === true;
        });

        Gate::before(function (User $user, string $ability, array $arguments) {
            if (! $user->isSuperadmin()) {
                return null;
            }

            // Biarkan policy menangani aksi yang menargetkan diri sendiri
            // agar primary superadmin tidak bisa mengubah/menghapus dirinya sendiri.
            $target = $arguments[0] ?? null;
            if ($target instanceof User && $target->id === $user->id) {
                return null;
            }

            return true;
        });

        Gate::policy(Role::class, RolePolicy::class);

        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
