<?php

namespace App\Models\Sarpras;

use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'barang_id', 'pelapor_id', 'deskripsi', 'foto_path',
    'prioritas', 'status', 'catatan_progres', 'tgl_selesai', 'vendor_id',
])]
class Kerusakan extends Model
{
    protected $table = 't_sarpras_kerusakan';

    protected function casts(): array
    {
        return ['tgl_selesai' => 'date'];
    }

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class);
    }

    public function pelapor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pelapor_id');
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }
}
