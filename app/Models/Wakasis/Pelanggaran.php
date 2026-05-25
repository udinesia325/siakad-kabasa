<?php

namespace App\Models\Wakasis;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['siswa_id', 'poin_pelanggaran_id', 'tanggal', 'keterangan', 'input_oleh'])]
class Pelanggaran extends Model
{
    use SoftDeletes;

    protected $table = 't_wakasis_pelanggaran';

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function poinPelanggaran(): BelongsTo
    {
        return $this->belongsTo(PoinPelanggaran::class, 'poin_pelanggaran_id');
    }

    public function inputOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'input_oleh');
    }

    public function bukti(): HasMany
    {
        return $this->hasMany(PelanggaranBukti::class, 'pelanggaran_id');
    }
}
