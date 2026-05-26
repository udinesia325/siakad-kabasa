<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nama', 'is_active'])]
class TahunAjaran extends Model
{
    use HasFactory;

    protected $table = 'm_tahun_ajaran';

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function kelasAjaran(): HasMany
    {
        return $this->hasMany(KelasAjaran::class, 'tahun_ajaran_id');
    }
}
