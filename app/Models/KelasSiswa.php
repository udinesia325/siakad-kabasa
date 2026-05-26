<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['siswa_id', 'kelas_ajaran_id', 'mulai', 'selesai', 'alasan', 'keterangan'])]
class KelasSiswa extends Model
{
    protected $table = 't_kelas_siswa';

    protected function casts(): array
    {
        return [
            'mulai' => 'date',
            'selesai' => 'date',
        ];
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function kelasAjaran(): BelongsTo
    {
        return $this->belongsTo(KelasAjaran::class, 'kelas_ajaran_id');
    }
}
