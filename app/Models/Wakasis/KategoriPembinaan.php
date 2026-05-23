<?php

namespace App\Models\Wakasis;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nama', 'deskripsi'])]
class KategoriPembinaan extends Model
{
    protected $table = 'm_wakasis_kategori_pembinaan';
}
