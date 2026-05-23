<?php

namespace App\Models\Wakasis;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['siswa_id', 'jenis_sp_id', 'tanggal', 'total_poin_saat_itu', 'keterangan', 'divalidasi_oleh', 'validated_at'])]
class SuratPeringatan extends Model
{
    protected $table = 't_wakasis_surat_peringatan';

    protected $casts = [
        'validated_at' => 'datetime',
        'tanggal'      => 'date',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function jenisSp(): BelongsTo
    {
        return $this->belongsTo(JenisSuratPeringatan::class, 'jenis_sp_id');
    }

    public function divalidasiOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'divalidasi_oleh');
    }
}
