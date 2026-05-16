<?php

namespace Database\Seeders;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Database\Seeders\Simulasi\SimulasiAbsensiSeeder;
use Database\Seeders\Simulasi\SimulasiKelasSeeder;
use Database\Seeders\Simulasi\SimulasiSiswaSeeder;
use Database\Seeders\Simulasi\SimulasiTahunAjaranSeeder;
use Illuminate\Database\Seeder;

class SimulasiSeeder extends Seeder
{
    public function run(): void
    {
        if (TahunAjaran::exists() || Kelas::exists() || Siswa::exists()) {
            $this->command->warn('Simulasi dilewati: tahun ajaran/kelas/siswa sudah berisi data.');

            return;
        }

        $this->call([
            SimulasiTahunAjaranSeeder::class,
            SimulasiKelasSeeder::class,
            SimulasiSiswaSeeder::class,
            SimulasiAbsensiSeeder::class,
        ]);

        $this->command->info('Simulasi selesai: 1 tahun ajaran, 3 kelas, 90 siswa, dan data absensi 30 hari kerja telah dibuat.');
    }
}
