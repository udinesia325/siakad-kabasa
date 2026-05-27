<?php

namespace Database\Seeders\Simulasi;

use App\Models\KelasAjaran;
use App\Models\KelasSiswa;
use App\Models\Siswa;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SimulasiSiswaSeeder extends Seeder
{
    private const SISWA_PER_KELAS = 30;

    private const NAMA_DEPAN_L = [
        'Ahmad', 'Budi', 'Citra', 'Dimas', 'Eko', 'Fajar', 'Gilang', 'Hadi',
        'Iqbal', 'Joko', 'Krisna', 'Lukman', 'Maulana', 'Naufal', 'Oka',
        'Putra', 'Rangga', 'Surya', 'Taufik', 'Umar',
    ];

    private const NAMA_DEPAN_P = [
        'Aisyah', 'Bella', 'Cinta', 'Dewi', 'Elina', 'Farah', 'Gita', 'Hana',
        'Indah', 'Jihan', 'Kartika', 'Lina', 'Mira', 'Nadia', 'Olivia',
        'Putri', 'Ratih', 'Sari', 'Tania', 'Ulfa',
    ];

    private const NAMA_BELAKANG = [
        'Pratama', 'Saputra', 'Wijaya', 'Nugroho', 'Santoso', 'Hidayat',
        'Kurniawan', 'Setiawan', 'Permana', 'Ramadhan', 'Maulida', 'Anggraini',
        'Lestari', 'Sari', 'Putri', 'Wulandari', 'Rahmawati', 'Safitri',
    ];

    public function run(): void
    {
        $kelasList = KelasAjaran::aktif()->orderBy('tingkat_id')->get();
        $mulai = now()->startOfYear()->toDateString();

        foreach ($kelasList as $kelasAjaran) {
            for ($i = 1; $i <= self::SISWA_PER_KELAS; $i++) {
                $jk = $i % 2 === 0 ? 'P' : 'L';
                $depan = $jk === 'L'
                    ? self::NAMA_DEPAN_L[array_rand(self::NAMA_DEPAN_L)]
                    : self::NAMA_DEPAN_P[array_rand(self::NAMA_DEPAN_P)];
                $belakang = self::NAMA_BELAKANG[array_rand(self::NAMA_BELAKANG)];

                $siswa = Siswa::create([
                    'nik' => $this->generateNik($kelasAjaran->id, $i),
                    'nisn' => $this->generateNisn($kelasAjaran->id, $i),
                    'nama' => $depan.' '.$belakang,
                    'jenis_kelamin' => $jk,
                    'email' => Str::lower($depan).$i.'.'.$kelasAjaran->id.'@simulasi.test',
                    'kelas_ajaran_id' => $kelasAjaran->id,
                    'status' => 'aktif',
                ]);

                KelasSiswa::create([
                    'siswa_id' => $siswa->id,
                    'kelas_ajaran_id' => $kelasAjaran->id,
                    'mulai' => $mulai,
                    'selesai' => null,
                    'alasan' => 'pendaftaran',
                ]);
            }
        }
    }

    private function generateNik(int $kelasAjaranId, int $urutan): string
    {
        return 'SIM'.str_pad((string) $kelasAjaranId, 3, '0', STR_PAD_LEFT)
            .str_pad((string) $urutan, 4, '0', STR_PAD_LEFT);
    }

    private function generateNisn(int $kelasAjaranId, int $urutan): string
    {
        return '9'.str_pad((string) $kelasAjaranId, 4, '0', STR_PAD_LEFT)
            .str_pad((string) $urutan, 5, '0', STR_PAD_LEFT);
    }
}
