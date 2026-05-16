<?php

namespace Database\Seeders\Simulasi;

use App\Models\TahunAjaran;
use Illuminate\Database\Seeder;

class SimulasiTahunAjaranSeeder extends Seeder
{
    public function run(): void
    {
        $tahun = now()->year;
        $nama = $tahun.'/'.($tahun + 1);

        TahunAjaran::where('is_active', true)->update(['is_active' => false]);

        TahunAjaran::create([
            'nama' => $nama,
            'is_active' => true,
        ]);
    }
}
