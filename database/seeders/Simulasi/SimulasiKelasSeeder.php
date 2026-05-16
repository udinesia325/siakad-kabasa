<?php

namespace Database\Seeders\Simulasi;

use App\Models\Kelas;
use App\Models\TahunAjaran;
use Illuminate\Database\Seeder;
use RuntimeException;

class SimulasiKelasSeeder extends Seeder
{
    public function run(): void
    {
        $tahunAjaran = TahunAjaran::where('is_active', true)->first()
            ?? TahunAjaran::orderByDesc('id')->first();

        if (! $tahunAjaran) {
            throw new RuntimeException('Tahun ajaran belum ada. Jalankan SimulasiTahunAjaranSeeder terlebih dahulu.');
        }

        foreach (['X', 'XI', 'XII'] as $tingkat) {
            Kelas::create([
                'nama' => $tingkat.' A',
                'tingkat' => $tingkat,
                'tahun_ajaran_id' => $tahunAjaran->id,
            ]);
        }
    }
}
