<?php

namespace Database\Seeders\Simulasi;

use App\Models\Pegawai;
use Illuminate\Database\Seeder;

class SimulasiPegawaiSeeder extends Seeder
{
    private const GURU = [
        ['nama' => 'Andi Firmansyah', 'jenis_kelamin' => 'L', 'nip' => '198501012010011001'],
        ['nama' => 'Badriyah Hasanah', 'jenis_kelamin' => 'P', 'nip' => '198703052011012002'],
        ['nama' => 'Choirul Anam', 'jenis_kelamin' => 'L', 'nip' => '198902142012011003'],
        ['nama' => 'Dewi Rahmawati', 'jenis_kelamin' => 'P', 'nip' => '199001182013012004'],
        ['nama' => 'Eko Prasetyo', 'jenis_kelamin' => 'L', 'nip' => '198806272014011005'],
        ['nama' => 'Fatimah Zahra', 'jenis_kelamin' => 'P', 'nip' => '199204122015012006'],
        ['nama' => 'Gunawan Hadi', 'jenis_kelamin' => 'L', 'nip' => '198712032016011007'],
        ['nama' => 'Halimah Nurdiana', 'jenis_kelamin' => 'P', 'nip' => '199308092017012008'],
        ['nama' => 'Irfan Maulana', 'jenis_kelamin' => 'L', 'nip' => '199105252018011009'],
        ['nama' => 'Julaikha Safitri', 'jenis_kelamin' => 'P', 'nip' => '199407162019012010'],
    ];

    private const STAFF = [
        ['nama' => 'Khoirul Anwar', 'jenis_kelamin' => 'L', 'nip' => '199510082020011011'],
        ['nama' => 'Lailatul Fitriyah', 'jenis_kelamin' => 'P', 'nip' => '199612192021012012'],
    ];

    public function run(): void
    {
        foreach (self::GURU as $data) {
            Pegawai::create([
                'nip' => $data['nip'],
                'nama' => $data['nama'],
                'jenis_kelamin' => $data['jenis_kelamin'],
                'jenis' => 'guru',
                'status_kepegawaian' => 'honorer',
                'aktif' => true,
            ]);
        }

        foreach (self::STAFF as $data) {
            Pegawai::create([
                'nip' => $data['nip'],
                'nama' => $data['nama'],
                'jenis_kelamin' => $data['jenis_kelamin'],
                'jenis' => 'staff_tu',
                'status_kepegawaian' => 'honorer',
                'aktif' => true,
            ]);
        }
    }
}
