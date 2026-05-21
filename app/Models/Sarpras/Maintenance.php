<?php

namespace App\Models\Sarpras;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['barang_id', 'vendor_id', 'tgl_rencana', 'tgl_selesai', 'interval', 'biaya', 'catatan', 'status'])]
class Maintenance extends Model
{
    protected $table = 't_sarpras_maintenance';

    protected function casts(): array
    {
        return [
            'tgl_rencana' => 'date',
            'tgl_selesai' => 'date',
            'biaya' => 'integer',
        ];
    }

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'barang_id');
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class, 'vendor_id');
    }
}
