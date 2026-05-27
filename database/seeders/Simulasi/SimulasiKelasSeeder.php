<?php

namespace Database\Seeders\Simulasi;

use App\Models\Kelas;
use App\Models\KelasAjaran;
use App\Models\TahunAjaran;
use App\Models\Tingkat;
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

        $tingkatList = Tingkat::where('jenjang', 'smk')->orderBy('urutan')->get();

        foreach ($tingkatList as $tingkat) {
            $namaKelas = $tingkat->nama . ' A';
            $masterKelas = Kelas::firstOrCreate(['nama' => $namaKelas, 'jurusan_id' => null]);

            KelasAjaran::firstOrCreate([
                'kelas_id' => $masterKelas->id,
                'tingkat_id' => $tingkat->id,
                'tahun_ajaran_id' => $tahunAjaran->id,
            ], ['pegawai_id' => null]);
        }
    }
}
