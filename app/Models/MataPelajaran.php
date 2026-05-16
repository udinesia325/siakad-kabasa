<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['kode', 'nama', 'kelompok', 'deskripsi', 'aktif'])]
class MataPelajaran extends Model
{
    protected $table = 'm_mata_pelajaran';

    protected function casts(): array
    {
        return [
            'aktif' => 'boolean',
        ];
    }

    public function pengampu(): BelongsToMany
    {
        return $this->belongsToMany(Pegawai::class, 'm_pengampu', 'mata_pelajaran_id', 'pegawai_id')
            ->withTimestamps();
    }
}
