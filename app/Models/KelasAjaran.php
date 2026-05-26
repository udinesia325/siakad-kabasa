<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['kelas_id', 'tingkat_id', 'tahun_ajaran_id', 'pegawai_id'])]
class KelasAjaran extends Model
{
    protected $table = 't_kelas_ajaran';

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function tingkat(): BelongsTo
    {
        return $this->belongsTo(Tingkat::class, 'tingkat_id');
    }

    public function tahunAjaran(): BelongsTo
    {
        return $this->belongsTo(TahunAjaran::class, 'tahun_ajaran_id');
    }

    public function waliKelas(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'pegawai_id');
    }

    public function siswa(): HasMany
    {
        return $this->hasMany(Siswa::class, 'kelas_ajaran_id');
    }

    public function riwayatSiswa(): HasMany
    {
        return $this->hasMany(KelasSiswa::class, 'kelas_ajaran_id');
    }

    public function keanggotaanAktif(): HasMany
    {
        return $this->hasMany(KelasSiswa::class, 'kelas_ajaran_id')->whereNull('selesai');
    }

    public function jadwalMengajar(): HasMany
    {
        return $this->hasMany(JadwalMengajar::class, 'kelas_ajaran_id');
    }

    public function getNamaLengkapAttribute(): string
    {
        $tingkat = $this->tingkat?->nama ?? '';
        $jurusan = $this->kelas?->jurusan?->singkatan;
        $kelas = $this->kelas?->nama ?? '';

        return $jurusan
            ? "{$tingkat} {$jurusan} {$kelas}"
            : "{$tingkat} {$kelas}";
    }

    public function scopeAktif(Builder $query): Builder
    {
        return $query->whereHas('tahunAjaran', fn ($q) => $q->where('is_active', true));
    }
}
