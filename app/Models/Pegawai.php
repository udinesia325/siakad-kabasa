<?php

namespace App\Models;

use App\Support\PhoneNormalizer;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

#[Fillable([
    'user_id', 'nik', 'nuptk', 'nama', 'jenis_kelamin', 'jenis',
    'jabatan', 'status_kepegawaian', 'no_hp', 'email', 'alamat', 'foto', 'aktif',
])]
class Pegawai extends Model
{
    protected $table = 'm_pegawai';

    protected function casts(): array
    {
        return [
            'aktif' => 'boolean',
        ];
    }

    public function setNoHpAttribute(?string $value): void
    {
        $this->attributes['no_hp'] = PhoneNormalizer::normalize($value);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mataPelajaran(): BelongsToMany
    {
        return $this->belongsToMany(MataPelajaran::class, 'm_pengampu', 'pegawai_id', 'mata_pelajaran_id')
            ->withTimestamps();
    }

    public function rfids(): MorphMany
    {
        return $this->morphMany(Rfid::class, 'reff', 'reff_type', 'reff_id');
    }

    public function rfid(): MorphOne
    {
        return $this->morphOne(Rfid::class, 'reff', 'reff_type', 'reff_id');
    }

    public function kelasDiwalikan(): HasMany
    {
        return $this->hasMany(Kelas::class, 'pegawai_id');
    }

    public function jadwalMengajar(): HasMany
    {
        return $this->hasMany(JadwalMengajar::class, 'pegawai_id');
    }
}
