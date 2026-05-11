<?php
// app/Models/AnulirAbsensi.php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['siswa_id', 'tanggal', 'status', 'keterangan', 'bukti', 'anulir_oleh'])]
class AnulirAbsensi extends Model
{
    protected $table = 't_anulir_absensi';

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
            'bukti'   => 'array',
        ];
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function anulirOleh(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'anulir_oleh');
    }
}
