<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Jurusan extends Model
{
    protected $table = 'm_jurusan';

    public $fillable = ['nama', 'singkatan'];

    public function ppdb(): HasMany
    {
        return $this->hasMany(Ppdb::class, 'jurusan_id');
    }
}
