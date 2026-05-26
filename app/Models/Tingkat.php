<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nama', 'urutan', 'jenjang'])]
class Tingkat extends Model
{
    protected $table = 'm_tingkat';

    public function kelasAjaran(): HasMany
    {
        return $this->hasMany(KelasAjaran::class, 'tingkat_id');
    }

    public function scopeByJenjang(Builder $query, string $jenjang): Builder
    {
        return $query->where('jenjang', $jenjang);
    }
}
