<?php

namespace App\Models\Sarpras;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nama', 'deskripsi', 'warna'])]
class Kategori extends Model
{
    protected $table = 'm_sarpras_kategori';
}
