<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Absensi extends Model
{
    protected $table = 't_absensi';
    protected $fillable = ['reff_type', 'reff_id', 'waktu_absen', 'tipe'];
    protected $casts = ['waktu_absen' => 'datetime'];
}
