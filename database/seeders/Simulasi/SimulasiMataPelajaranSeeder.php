<?php

namespace Database\Seeders\Simulasi;

use App\Models\MataPelajaran;
use App\Models\Pegawai;
use Illuminate\Database\Seeder;
use RuntimeException;

class SimulasiMataPelajaranSeeder extends Seeder
{
    private const MAPEL = [
        ['kode' => 'MTK',  'nama' => 'Matematika',              'kelompok' => 'umum'],
        ['kode' => 'BIN',  'nama' => 'Bahasa Indonesia',         'kelompok' => 'umum'],
        ['kode' => 'BING', 'nama' => 'Bahasa Inggris',           'kelompok' => 'umum'],
        ['kode' => 'IPA',  'nama' => 'Ilmu Pengetahuan Alam',    'kelompok' => 'umum'],
        ['kode' => 'IPS',  'nama' => 'Ilmu Pengetahuan Sosial',  'kelompok' => 'umum'],
        ['kode' => 'PKN',  'nama' => 'Pendidikan Kewarganegaraan','kelompok' => 'umum'],
        ['kode' => 'PAI',  'nama' => 'Pendidikan Agama Islam',   'kelompok' => 'umum'],
        ['kode' => 'PJOK', 'nama' => 'Pendidikan Jasmani & OR', 'kelompok' => 'umum'],
        ['kode' => 'TIK',  'nama' => 'Teknologi Informasi',      'kelompok' => 'kejuruan'],
        ['kode' => 'MLOK', 'nama' => 'Muatan Lokal Bahasa Daerah','kelompok' => 'muatan_lokal'],
    ];

    public function run(): void
    {
        $guru = Pegawai::where('jenis', 'guru')->where('aktif', true)->get();

        if ($guru->count() < 10) {
            throw new RuntimeException('Minimal 10 guru diperlukan. Jalankan SimulasiPegawaiSeeder terlebih dahulu.');
        }

        foreach (self::MAPEL as $index => $data) {
            $mapel = MataPelajaran::updateOrCreate(
                ['kode' => $data['kode']],
                [
                    'nama' => $data['nama'],
                    'kelompok' => $data['kelompok'],
                    'aktif' => true,
                ]
            );

            // Assign each mapel to the corresponding guru (index 0-9)
            $mapel->pengampu()->attach($guru[$index]->id);
        }
    }
}
