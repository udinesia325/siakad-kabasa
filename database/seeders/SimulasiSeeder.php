<?php

namespace Database\Seeders;

use App\Models\JadwalMengajar;
use App\Models\JamPelajaran;
use App\Models\Kelas;
use App\Models\MataPelajaran;
use App\Models\Pegawai;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Database\Seeders\Simulasi\SimulasiAbsensiSeeder;
use Database\Seeders\Simulasi\SimulasiJadwalMengajarSeeder;
use Database\Seeders\Simulasi\SimulasiJamPelajaranSeeder;
use Database\Seeders\Simulasi\SimulasiKelasSeeder;
use Database\Seeders\Simulasi\SimulasiMataPelajaranSeeder;
use Database\Seeders\Simulasi\SimulasiPegawaiSeeder;
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

        if (! Pegawai::where('jenis', 'guru')->exists()) {
            $this->call(SimulasiPegawaiSeeder::class);
        } else {
            $this->command->warn('Pegawai: sudah ada data guru, lewati SimulasiPegawaiSeeder.');
        }

        if (! JamPelajaran::exists()) {
            $this->call(SimulasiJamPelajaranSeeder::class);
        } else {
            $this->command->warn('Jam pelajaran: sudah ada data, lewati SimulasiJamPelajaranSeeder.');
        }

        if (! MataPelajaran::exists()) {
            $this->call(SimulasiMataPelajaranSeeder::class);
        } else {
            $this->command->warn('Mata pelajaran: sudah ada data, lewati SimulasiMataPelajaranSeeder.');
        }

        if (! JadwalMengajar::exists()) {
            $this->call(SimulasiJadwalMengajarSeeder::class);
        } else {
            $this->command->warn('Jadwal mengajar: sudah ada data, lewati SimulasiJadwalMengajarSeeder.');
        }

        $guruCount = Pegawai::where('jenis', 'guru')->count();
        $staffCount = Pegawai::where('jenis', 'staff_tu')->count();
        $jamCount = JamPelajaran::count();
        $mapelCount = MataPelajaran::count();
        $jadwalCount = JadwalMengajar::count();

        $this->command->info("Simulasi selesai: 1 tahun ajaran, 3 kelas, 90 siswa, data absensi 30 hari kerja,");
        $this->command->info("{$guruCount} guru, {$staffCount} staff TU, {$jamCount} jam pelajaran, {$mapelCount} mata pelajaran, {$jadwalCount} jadwal mengajar.");
    }
}
