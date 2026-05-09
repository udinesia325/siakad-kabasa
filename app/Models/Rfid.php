<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rfid extends Model
{
    protected $table = 't_rfid';

    protected $fillable = ['kode_rfid', 'reff_type', 'reff_id', 'dibuat_pada'];

    protected $casts = ['dibuat_pada' => 'datetime'];
}
