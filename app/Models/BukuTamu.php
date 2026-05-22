<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['tanggal', 'jam_masuk', 'jam_keluar', 'nama', 'instansi', 'keperluan', 'bertemu_dengan', 'dicatat_oleh'])]
class BukuTamu extends Model
{
    protected $table = 'm_buku_tamu';

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
        ];
    }

    public function dicatatOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dicatat_oleh');
    }
}
