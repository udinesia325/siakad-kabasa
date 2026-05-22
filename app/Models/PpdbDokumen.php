<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PpdbDokumen extends Model
{
    protected $table = 't_ppdb_dokumen';

    public $fillable = ['ppdb_id', 'nama_dokumen', 'file_path'];

    public function ppdb(): BelongsTo
    {
        return $this->belongsTo(Ppdb::class, 'ppdb_id');
    }
}
