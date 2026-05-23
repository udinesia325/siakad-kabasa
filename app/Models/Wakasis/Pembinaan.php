<?php

namespace App\Models\Wakasis;

use App\Models\Pegawai;
use App\Models\Siswa;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['siswa_id', 'surat_peringatan_id', 'kategori_pembinaan_id', 'pembina_id', 'tanggal_mulai', 'tanggal_selesai', 'status', 'catatan'])]
class Pembinaan extends Model
{
    protected $table = 't_wakasis_pembinaan';

    protected $casts = [
        'tanggal_mulai'   => 'date',
        'tanggal_selesai' => 'date',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function suratPeringatan(): BelongsTo
    {
        return $this->belongsTo(SuratPeringatan::class, 'surat_peringatan_id');
    }

    public function kategoriPembinaan(): BelongsTo
    {
        return $this->belongsTo(KategoriPembinaan::class, 'kategori_pembinaan_id');
    }

    public function pembina(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'pembina_id');
    }
}
