<?php

namespace Tests\Feature\MutasiKelas;

use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Services\MutasiKelasService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MutasiSiswaTest extends TestCase
{
    use RefreshDatabase;

    private TahunAjaran $ta;

    private Kelas $kelasA;

    private Kelas $kelasB;

    private Siswa $siswa;

    protected function setUp(): void
    {
        parent::setUp();
        $this->ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $this->kelasA = Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $this->ta->id]);
        $this->kelasB = Kelas::create(['nama' => 'X RPL 2', 'tingkat' => 'X', 'tahun_ajaran_id' => $this->ta->id]);
        $this->siswa = Siswa::create(['nik' => '200', 'nama' => 'M', 'jenis_kelamin' => 'L', 'kelas_id' => $this->kelasA->id, 'status' => 'aktif']);
        KelasSiswa::create(['siswa_id' => $this->siswa->id, 'kelas_id' => $this->kelasA->id, 'mulai' => now()->subMonth(), 'alasan' => 'pendaftaran']);
    }

    public function test_pindah_kelas_close_period_lama_buka_baru_cache_sinkron(): void
    {
        app(MutasiKelasService::class)->pindahKelas($this->siswa, $this->kelasB, keterangan: 'salah input');

        $this->assertSame($this->kelasB->id, $this->siswa->fresh()->kelas_id);
        $this->assertSame($this->kelasB->id, KelasSiswa::where('siswa_id', $this->siswa->id)->whereNull('selesai')->first()->kelas_id);
        $this->assertSame(1, KelasSiswa::where('siswa_id', $this->siswa->id)->whereNotNull('selesai')->count());
    }

    public function test_set_lulus_status_berubah_kelas_id_null_period_lama_close(): void
    {
        app(MutasiKelasService::class)->setLulus($this->siswa, keterangan: 'lulus akselerasi');

        $fresh = $this->siswa->fresh();
        $this->assertSame('lulus', $fresh->status);
        $this->assertNull($fresh->kelas_id);
        $this->assertSame(0, KelasSiswa::where('siswa_id', $fresh->id)->whereNull('selesai')->count());
    }

    public function test_set_keluar_status_keluar_kelas_id_null(): void
    {
        app(MutasiKelasService::class)->setKeluar($this->siswa, keterangan: 'pindah sekolah');

        $fresh = $this->siswa->fresh();
        $this->assertSame('keluar', $fresh->status);
        $this->assertNull($fresh->kelas_id);
    }

    public function test_reaktivasi_siswa_keluar_kembali_ke_aktif_di_kelas_tujuan(): void
    {
        app(MutasiKelasService::class)->setKeluar($this->siswa, keterangan: 'salah tandai');
        app(MutasiKelasService::class)->reaktivasi($this->siswa->fresh(), $this->kelasB, keterangan: 'koreksi');

        $fresh = $this->siswa->fresh();
        $this->assertSame('aktif', $fresh->status);
        $this->assertSame($this->kelasB->id, $fresh->kelas_id);
        $this->assertSame($this->kelasB->id, KelasSiswa::where('siswa_id', $fresh->id)->whereNull('selesai')->first()->kelas_id);
    }
}
