<?php

namespace App\Models\Wakasis;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['siswa_id', 'jenis_prestasi_id', 'kategori_prestasi_id', 'tanggal', 'nama_kejuaraan', 'peringkat', 'sertifikat_path', 'keterangan', 'input_oleh', 'divalidasi_oleh', 'validated_at'])]
class Prestasi extends Model
{
    protected $table = 't_wakasis_prestasi';

    protected $casts = [
        'validated_at' => 'datetime',
        'tanggal'      => 'date',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function jenisPrestasi(): BelongsTo
    {
        return $this->belongsTo(JenisPrestasi::class, 'jenis_prestasi_id');
    }

    public function kategoriPrestasi(): BelongsTo
    {
        return $this->belongsTo(KategoriPrestasi::class, 'kategori_prestasi_id');
    }

    public function inputOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'input_oleh');
    }

    public function divalidasiOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'divalidasi_oleh');
    }
}
