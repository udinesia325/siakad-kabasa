<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nama', 'urutan'])]
class JenisKelas extends Model
{
    protected $table = 'm_jenis_kelas';

    public function kelas(): HasMany
    {
        return $this->hasMany(Kelas::class, 'jenis_kelas_id');
    }
}
