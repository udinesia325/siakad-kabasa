<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['jadwal_mengajar_id', 'pegawai_id', 'mata_pelajaran_id', 'kelas_ajaran_id', 'jam_pelajaran_id', 'tanggal', 'dibuat_oleh'])]
class Jurnal extends Model
{
    protected $table = 't_jurnal';

    protected function casts(): array
    {
        return ['tanggal' => 'date'];
    }

    public function jadwalMengajar(): BelongsTo
    {
        return $this->belongsTo(JadwalMengajar::class, 'jadwal_mengajar_id');
    }

    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'pegawai_id');
    }

    public function mataPelajaran(): BelongsTo
    {
        return $this->belongsTo(MataPelajaran::class, 'mata_pelajaran_id');
    }

    public function kelasAjaran(): BelongsTo
    {
        return $this->belongsTo(KelasAjaran::class, 'kelas_ajaran_id');
    }

    public function jamPelajaran(): BelongsTo
    {
        return $this->belongsTo(JamPelajaran::class, 'jam_pelajaran_id');
    }

    public function details(): HasMany
    {
        return $this->hasMany(JurnalDetail::class, 'jurnal_id');
    }

    public function dibuatOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dibuat_oleh');
    }
}
