<?php

namespace App\Models;

use App\Support\PhoneNormalizer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ppdb extends Model
{
    protected $table = 't_ppdb';

    public $fillable = [
        'tahun_ajaran_id', 'jurusan_id', 'nomor_registrasi', 'tanggal_daftar', 'status', 'siswa_id',
        'nama', 'nik', 'nisn', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir', 'agama',
        'sekolah_asal', 'no_telepon', 'penerima_kip', 'no_kip', 'no_registrasi_akta',
        'alamat', 'rt', 'rw', 'kelurahan', 'kecamatan', 'kabupaten', 'provinsi', 'kode_pos',
        'nama_ayah', 'pekerjaan_ayah', 'pendidikan_ayah', 'penghasilan_ayah',
        'nama_ibu', 'pekerjaan_ibu', 'pendidikan_ibu', 'penghasilan_ibu',
        'dicatat_oleh',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_daftar' => 'date',
            'tanggal_lahir' => 'date',
            'penerima_kip' => 'boolean',
        ];
    }

    public function setNoTeleponAttribute(?string $value): void
    {
        $this->attributes['no_telepon'] = PhoneNormalizer::normalize($value);
    }

    public function tahunAjaran(): BelongsTo
    {
        return $this->belongsTo(TahunAjaran::class, 'tahun_ajaran_id');
    }

    public function jurusan(): BelongsTo
    {
        return $this->belongsTo(Jurusan::class, 'jurusan_id');
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function dokumen(): HasMany
    {
        return $this->hasMany(PpdbDokumen::class, 'ppdb_id');
    }

    public function dicatatOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dicatat_oleh');
    }
}
