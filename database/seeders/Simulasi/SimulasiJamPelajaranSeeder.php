<?php

namespace Database\Seeders\Simulasi;

use App\Models\JamPelajaran;
use Illuminate\Database\Seeder;

class SimulasiJamPelajaranSeeder extends Seeder
{
    private const JAM = [
        ['nomor' => 1,  'jam_mulai' => '07:00', 'jam_selesai' => '07:45', 'keterangan' => null],
        ['nomor' => 2,  'jam_mulai' => '07:45', 'jam_selesai' => '08:30', 'keterangan' => null],
        ['nomor' => 3,  'jam_mulai' => '08:30', 'jam_selesai' => '09:15', 'keterangan' => null],
        ['nomor' => 4,  'jam_mulai' => '09:15', 'jam_selesai' => '09:45', 'keterangan' => 'Istirahat'],
        ['nomor' => 5,  'jam_mulai' => '09:45', 'jam_selesai' => '10:30', 'keterangan' => null],
        ['nomor' => 6,  'jam_mulai' => '10:30', 'jam_selesai' => '11:15', 'keterangan' => null],
        ['nomor' => 7,  'jam_mulai' => '11:15', 'jam_selesai' => '12:00', 'keterangan' => null],
        ['nomor' => 8,  'jam_mulai' => '12:00', 'jam_selesai' => '12:30', 'keterangan' => 'Sholat Dhuhur Berjamaah'],
    ];

    public function run(): void
    {
        foreach (self::JAM as $data) {
            JamPelajaran::updateOrCreate(
                ['nomor' => $data['nomor']],
                [
                    'jam_mulai' => $data['jam_mulai'],
                    'jam_selesai' => $data['jam_selesai'],
                    'keterangan' => $data['keterangan'],
                    'aktif' => true,
                ]
            );
        }
    }
}
