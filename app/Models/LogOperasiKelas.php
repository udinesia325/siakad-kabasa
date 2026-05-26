<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['tipe', 'kelas_ajaran_asal_id', 'kelas_ajaran_tujuan_id', 'tanggal_efektif', 'jumlah_siswa', 'dipaksa', 'oleh_user_id', 'keterangan'])]
class LogOperasiKelas extends Model
{
    protected $table = 't_log_operasi_kelas';

    protected function casts(): array
    {
        return [
            'tanggal_efektif' => 'datetime',
            'dipaksa' => 'boolean',
        ];
    }

    public function kelasAsal(): BelongsTo
    {
        return $this->belongsTo(KelasAjaran::class, 'kelas_ajaran_asal_id');
    }

    public function kelasTujuan(): BelongsTo
    {
        return $this->belongsTo(KelasAjaran::class, 'kelas_ajaran_tujuan_id');
    }

    public function oleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'oleh_user_id');
    }
}
