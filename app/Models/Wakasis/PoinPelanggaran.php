<?php

namespace App\Models\Wakasis;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['jenis_pelanggaran_id', 'nama', 'poin', 'deskripsi'])]
class PoinPelanggaran extends Model
{
    protected $table = 'm_wakasis_poin_pelanggaran';

    public function jenisPelanggaran(): BelongsTo
    {
        return $this->belongsTo(JenisPelanggaran::class, 'jenis_pelanggaran_id');
    }
}
