<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['nik', 'nisn', 'nama', 'jenis_kelamin', 'email', 'alamat', 'foto', 'kelas_id'])]
class Siswa extends Model
{
    protected $table = 'm_siswa';

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function rfid(): HasOne
    {
        return $this->hasOne(Rfid::class, 'reff_id')->where('reff_type', 'm_siswa');
    }
}
