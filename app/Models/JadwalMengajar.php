<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['kelas_ajaran_id', 'hari', 'jam_pelajaran_id', 'mata_pelajaran_id', 'pegawai_id'])]
class JadwalMengajar extends Model
{
    protected $table = 't_jadwal_mengajar';

    public function kelasAjaran(): BelongsTo
    {
        return $this->belongsTo(KelasAjaran::class, 'kelas_ajaran_id');
    }

    public function jamPelajaran(): BelongsTo
    {
        return $this->belongsTo(JamPelajaran::class, 'jam_pelajaran_id');
    }

    public function mataPelajaran(): BelongsTo
    {
        return $this->belongsTo(MataPelajaran::class, 'mata_pelajaran_id');
    }

    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'pegawai_id');
    }
}
