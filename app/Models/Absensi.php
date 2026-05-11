<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['reff_type', 'reff_id', 'waktu_absen', 'tipe'])]
class Absensi extends Model
{
    protected $table = 't_absensi';

    protected function casts(): array
    {
        return [
            'waktu_absen' => 'datetime',
        ];
    }
}
