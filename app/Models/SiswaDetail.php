<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiswaDetail extends Model
{
    protected $table = 'm_siswa_detail';

    public $fillable = [
        'siswa_id', 'ppdb_id',
        'tempat_lahir', 'tanggal_lahir', 'agama', 'sekolah_asal', 'no_telepon',
        'penerima_kip', 'nama_kip', 'no_registrasi_akta',
        'rt', 'rw', 'kelurahan', 'kecamatan', 'kabupaten', 'provinsi', 'kode_pos',
        'nama_ayah', 'pekerjaan_ayah', 'pendidikan_ayah', 'penghasilan_ayah',
        'nama_ibu', 'pekerjaan_ibu', 'pendidikan_ibu', 'penghasilan_ibu',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_lahir' => 'date',
            'penerima_kip' => 'boolean',
        ];
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function ppdb(): BelongsTo
    {
        return $this->belongsTo(Ppdb::class, 'ppdb_id');
    }
}
