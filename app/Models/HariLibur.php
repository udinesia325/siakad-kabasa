<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['tanggal', 'keterangan', 'dibuat_oleh'])]
class HariLibur extends Model
{
    protected $table = 'm_hari_libur';

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
        ];
    }

    public function dibuatOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dibuat_oleh');
    }
}
