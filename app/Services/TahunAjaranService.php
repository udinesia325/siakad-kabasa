<?php

namespace App\Services;

use App\Models\KelasAjaran;
use App\Models\TahunAjaran;
use App\Models\Tingkat;
use Illuminate\Support\Facades\DB;

class TahunAjaranService
{
    public function buatKelasAjaranUntukTahunBaru(TahunAjaran $tahunBaru, TahunAjaran $tahunAsal): int
    {
        return DB::transaction(function () use ($tahunBaru, $tahunAsal) {
            $kelasAjaranAsal = KelasAjaran::with('tingkat')
                ->where('tahun_ajaran_id', $tahunAsal->id)
                ->get();

            $dibuat = 0;

            foreach ($kelasAjaranAsal as $ka) {
                $tingkatSelanjutnya = Tingkat::where('urutan', $ka->tingkat->urutan + 1)
                    ->where('jenjang', $ka->tingkat->jenjang)
                    ->first();

                if (! $tingkatSelanjutnya) {
                    continue;
                }

                $sudahAda = KelasAjaran::where('kelas_id', $ka->kelas_id)
                    ->where('tingkat_id', $tingkatSelanjutnya->id)
                    ->where('tahun_ajaran_id', $tahunBaru->id)
                    ->exists();

                if ($sudahAda) {
                    continue;
                }

                KelasAjaran::create([
                    'kelas_id' => $ka->kelas_id,
                    'tingkat_id' => $tingkatSelanjutnya->id,
                    'tahun_ajaran_id' => $tahunBaru->id,
                    'pegawai_id' => null,
                ]);

                $dibuat++;
            }

            return $dibuat;
        });
    }
}
