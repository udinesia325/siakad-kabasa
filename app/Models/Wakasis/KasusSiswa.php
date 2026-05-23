<?php

namespace App\Models\Wakasis;

use App\Models\Pegawai;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['siswa_id', 'tanggal', 'judul', 'deskripsi', 'status', 'ditangani_oleh', 'catatan_penanganan', 'dicatat_oleh'])]
class KasusSiswa extends Model
{
    protected $table = 't_wakasis_kasus_siswa';

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function ditanganiOlehPegawai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'ditangani_oleh');
    }

    public function dicatatOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dicatat_oleh');
    }
}
