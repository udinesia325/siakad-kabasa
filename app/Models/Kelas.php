<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nama', 'rombel', 'jurusan_id', 'jenis_kelas_id'])]
class Kelas extends Model
{
    use HasFactory;

    protected $table = 'm_kelas';

    public function jurusan(): BelongsTo
    {
        return $this->belongsTo(Jurusan::class, 'jurusan_id');
    }

    public function jenisKelas(): BelongsTo
    {
        return $this->belongsTo(JenisKelas::class, 'jenis_kelas_id');
    }

    public function kelasAjaran(): HasMany
    {
        return $this->hasMany(KelasAjaran::class, 'kelas_id');
    }

    public function ppdb(): HasMany
    {
        return $this->hasMany(Ppdb::class, 'kelas_id');
    }
}
