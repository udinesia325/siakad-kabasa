<?php

namespace App\Models\Sarpras;

use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['kode', 'nama', 'kapasitas', 'jenis', 'penanggung_jawab_id'])]
class Lokasi extends Model
{
    protected $table = 'm_sarpras_lokasi';

    protected function casts(): array
    {
        return [
            'kapasitas' => 'integer',
        ];
    }

    public function penanggungjawab(): BelongsTo
    {
        return $this->belongsTo(User::class, 'penanggung_jawab_id');
    }
}
