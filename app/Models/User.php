<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, Notifiable, SoftDeletes, TwoFactorAuthenticatable;

    public function pegawai(): HasOne
    {
        return $this->hasOne(Pegawai::class);
    }

    protected static function booted(): void
    {
        static::saving(function (User $user) {
            if ($user->is_primary_superadmin && $user->isDirty('is_primary_superadmin')) {
                $exists = static::query()
                    ->where('is_primary_superadmin', true)
                    ->when($user->exists, fn ($q) => $q->where('id', '!=', $user->id))
                    ->exists();
                if ($exists) {
                    throw new \DomainException(
                        'Superadmin inti sudah ada — hanya boleh satu di sistem.'
                    );
                }
            }
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_primary_superadmin' => 'boolean',
        ];
    }
}
