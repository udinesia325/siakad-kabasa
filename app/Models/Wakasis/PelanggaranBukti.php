<?php

namespace App\Models\Wakasis;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['pelanggaran_id', 'file_path'])]
class PelanggaranBukti extends Model
{
    protected $table = 't_wakasis_pelanggaran_bukti';

    public function pelanggaran(): BelongsTo
    {
        return $this->belongsTo(Pelanggaran::class, 'pelanggaran_id');
    }
}
