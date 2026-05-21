<?php

namespace App\Models\Sarpras;

use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'kode', 'nama', 'kategori_id', 'lokasi_id', 'kondisi', 'satuan',
    'tahun_beli', 'harga_beli', 'jumlah_unit', 'penanggung_jawab_id',
    'foto_path', 'garansi_sampai', 'sumber_dana', 'vendor_id',
])]
class Barang extends Model
{
    use SoftDeletes;

    protected $table = 'm_sarpras_barang';

    protected function casts(): array
    {
        return [
            'tahun_beli' => 'integer',
            'harga_beli' => 'integer',
            'jumlah_unit' => 'integer',
            'garansi_sampai' => 'date',
        ];
    }

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class);
    }

    public function lokasi(): BelongsTo
    {
        return $this->belongsTo(Lokasi::class);
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function penanggungjawab(): BelongsTo
    {
        return $this->belongsTo(User::class, 'penanggung_jawab_id');
    }

    public static function generateKode(): string
    {
        $prefix = 'BRG';
        $last = static::withTrashed()->where('kode', 'like', $prefix.'%')->count();

        return $prefix.str_pad($last + 1, 5, '0', STR_PAD_LEFT);
    }
}
