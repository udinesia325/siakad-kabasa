<?php

namespace App\Models\Wakasis;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nama', 'tingkat', 'deskripsi'])]
class KategoriPrestasi extends Model
{
    protected $table = 'm_wakasis_kategori_prestasi';
}
