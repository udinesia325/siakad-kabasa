<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['hari', 'is_libur', 'jam_masuk_min', 'jam_masuk_max', 'jam_pulang_min', 'jam_pulang_max'])]
class JadwalAbsensi extends Model
{
    protected $table = 'm_jadwal_absensi';

    public static array $NAMA_HARI = [
        1 => 'Senin', 2 => 'Selasa', 3 => 'Rabu',
        4 => 'Kamis', 5 => 'Jumat', 6 => 'Sabtu', 7 => 'Minggu',
    ];

    protected function casts(): array
    {
        return [
            'is_libur' => 'boolean',
            'jam_masuk_min' => 'datetime:H:i',
            'jam_masuk_max' => 'datetime:H:i',
            'jam_pulang_min' => 'datetime:H:i',
            'jam_pulang_max' => 'datetime:H:i',
        ];
    }
}
