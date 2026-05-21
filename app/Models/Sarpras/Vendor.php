<?php

namespace App\Models\Sarpras;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nama', 'pic_nama', 'pic_kontak', 'alamat', 'spesialisasi'])]
class Vendor extends Model
{
    protected $table = 'm_sarpras_vendor';
}
