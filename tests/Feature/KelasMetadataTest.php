<?php

namespace Tests\Feature;

use App\Models\JenisKelas;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\KelasAjaran;
use App\Models\TahunAjaran;
use App\Models\Tingkat;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KelasMetadataTest extends TestCase
{
    use RefreshDatabase;

    public function test_kelas_bisa_memiliki_rombel_dan_jenis()
    {
        $jenis = JenisKelas::firstOrCreate(['nama' => 'Regular'], ['urutan' => 1]);
        $jurusan = Jurusan::firstOrCreate(['nama' => 'RPL'], ['singkatan' => 'RPL']);

        $kelas = Kelas::create([
            'nama' => 'X RPL A Regular',
            'rombel' => 'A',
            'jurusan_id' => $jurusan->id,
            'jenis_kelas_id' => $jenis->id,
        ]);

        $this->assertSame('A', $kelas->rombel);
        $this->assertSame($jenis->id, $kelas->jenis_kelas_id);
        $this->assertSame('RPL', $kelas->jurusan->singkatan);
        $this->assertSame('Regular', $kelas->jenisKelas->nama);
    }

    public function test_nama_lengkap_kelas_ajaran_menggunakan_nama_kelas()
    {
        $ta = TahunAjaran::firstOrCreate(['nama' => '2025/2026'], ['is_active' => true]);
        $tingkat = Tingkat::firstOrCreate(['urutan' => 1, 'jenjang' => 'smk'], ['nama' => 'X']);
        $kelas = Kelas::create(['nama' => 'X RPL A']);

        $ka = KelasAjaran::create([
            'kelas_id' => $kelas->id,
            'tingkat_id' => $tingkat->id,
            'tahun_ajaran_id' => $ta->id,
            'pegawai_id' => null,
        ]);
        $ka->load('kelas');

        $this->assertSame('X RPL A', $ka->nama_lengkap);
    }
}
