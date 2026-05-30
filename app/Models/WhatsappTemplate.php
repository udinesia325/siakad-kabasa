<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nama', 'variabel', 'text'])]
class WhatsappTemplate extends Model
{
    protected $table = 'm_whatsapp_template';

    /** Kembalikan variabel sebagai array. */
    public function variabelArray(): array
    {
        if (empty($this->variabel)) {
            return [];
        }

        return array_map('trim', explode(',', $this->variabel));
    }
}
