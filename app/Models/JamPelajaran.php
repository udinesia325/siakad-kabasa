<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nomor', 'jam_mulai', 'jam_selesai', 'keterangan', 'aktif'])]
class JamPelajaran extends Model
{
    protected $table = 'm_jam_pelajaran';

    protected function casts(): array
    {
        return [
            'aktif' => 'boolean',
        ];
    }
}
