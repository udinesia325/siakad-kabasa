<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['kode_rfid', 'reff_type', 'reff_id', 'dibuat_pada'])]
class Rfid extends Model
{
    protected $table = 't_rfid';

    protected function casts(): array
    {
        return [
            'dibuat_pada' => 'datetime',
        ];
    }
}
