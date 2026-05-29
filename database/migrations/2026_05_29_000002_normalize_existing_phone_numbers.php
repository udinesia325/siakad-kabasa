<?php

use App\Support\PhoneNormalizer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('t_ppdb')->whereNotNull('no_telepon')->orderBy('id')->each(function ($row) {
            $normalized = PhoneNormalizer::normalize($row->no_telepon);
            if ($normalized !== $row->no_telepon) {
                DB::table('t_ppdb')->where('id', $row->id)->update(['no_telepon' => $normalized]);
            }
        });

        DB::table('m_pegawai')->whereNotNull('no_hp')->orderBy('id')->each(function ($row) {
            $normalized = PhoneNormalizer::normalize($row->no_hp);
            if ($normalized !== $row->no_hp) {
                DB::table('m_pegawai')->where('id', $row->id)->update(['no_hp' => $normalized]);
            }
        });
    }

    public function down(): void
    {
        // normalisasi tidak bisa di-reverse
    }
};
