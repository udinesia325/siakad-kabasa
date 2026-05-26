<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['nik', 'nisn', 'nama', 'jenis_kelamin', 'email', 'alamat', 'foto', 'kelas_ajaran_id', 'status', 'status_tanggal', 'status_keterangan'])]
class Siswa extends Model
{
    use HasFactory;

    protected $table = 'm_siswa';

    protected function casts(): array
    {
        return [
            'status_tanggal' => 'date',
        ];
    }

    public function kelasAjaran(): BelongsTo
    {
        return $this->belongsTo(KelasAjaran::class, 'kelas_ajaran_id');
    }

    public function rfid(): HasOne
    {
        return $this->hasOne(Rfid::class, 'reff_id')->where('reff_type', 'm_siswa');
    }

    public function riwayatKelas(): HasMany
    {
        return $this->hasMany(KelasSiswa::class, 'siswa_id')->orderByDesc('mulai');
    }

    public function keanggotaanAktif(): HasOne
    {
        return $this->hasOne(KelasSiswa::class, 'siswa_id')->whereNull('selesai');
    }

    public function detail(): HasOne
    {
        return $this->hasOne(SiswaDetail::class, 'siswa_id');
    }

    public function scopeAktif(Builder $query): Builder
    {
        return $query->where('status', 'aktif');
    }
}
