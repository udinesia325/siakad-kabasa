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
        return $this->belongsTo(JadwalMengajar::class);
    }

    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class);
    }

    public function mataPelajaran(): BelongsTo
    {
        return $this->belongsTo(MataPelajaran::class);
    }

    public function kelasAjaran(): BelongsTo
    {
        return $this->belongsTo(KelasAjaran::class);
    }

    public function jamPelajaran(): BelongsTo
    {
        return $this->belongsTo(JamPelajaran::class);
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
