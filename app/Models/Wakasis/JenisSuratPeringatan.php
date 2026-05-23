<?php

namespace App\Models\Wakasis;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nama', 'level', 'batas_poin', 'deskripsi'])]
class JenisSuratPeringatan extends Model
{
    protected $table = 'm_wakasis_jenis_sp';
}
