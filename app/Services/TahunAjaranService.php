<?php

namespace App\Services;

use App\Models\KelasAjaran;
use App\Models\TahunAjaran;
use Illuminate\Support\Facades\DB;

class TahunAjaranService
{
    public function buatKelasAjaranUntukTahunBaru(TahunAjaran $tahunBaru, TahunAjaran $tahunAsal): int
    {
        return DB::transaction(function () use ($tahunBaru, $tahunAsal) {
            $kelasAjaranAsal = KelasAjaran::where('tahun_ajaran_id', $tahunAsal->id)->get();

            $dibuat = 0;

            foreach ($kelasAjaranAsal as $ka) {
                $sudahAda = KelasAjaran::where('kelas_id', $ka->kelas_id)
                    ->where('tingkat_id', $ka->tingkat_id)
                    ->where('tahun_ajaran_id', $tahunBaru->id)
                    ->exists();

                if ($sudahAda) {
                    continue;
                }

                KelasAjaran::create([
                    'kelas_id' => $ka->kelas_id,
                    'tingkat_id' => $ka->tingkat_id,
                    'tahun_ajaran_id' => $tahunBaru->id,
                    'pegawai_id' => null,
                ]);

                $dibuat++;
            }

            return $dibuat;
        });
    }
}
