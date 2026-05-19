<?php

namespace Tests\Feature\MutasiKelas;

use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\LogOperasiKelas;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Models\User;
use App\Services\KelasTujuanTidakKosongException;
use App\Services\MutasiKelasService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NaikKelasTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    private TahunAjaran $taLama;

    private TahunAjaran $taBaru;

    private Kelas $kelasX;

    private Kelas $kelasXI;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['account_type' => 'superadmin']);
        $this->taLama = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => false]);
        $this->taBaru = TahunAjaran::create(['nama' => '2026/2027', 'is_active' => true]);
        $this->kelasX = Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $this->taLama->id]);
        $this->kelasXI = Kelas::create(['nama' => 'XI RPL 1', 'tingkat' => 'XI', 'tahun_ajaran_id' => $this->taBaru->id]);
    }

    public function test_memindahkan_semua_siswa_aktif_ke_kelas_tujuan(): void
    {
        $siswa1 = Siswa::create(['nik' => '001', 'nama' => 'A', 'jenis_kelamin' => 'L', 'kelas_id' => $this->kelasX->id, 'status' => 'aktif']);
        $siswa2 = Siswa::create(['nik' => '002', 'nama' => 'B', 'jenis_kelamin' => 'L', 'kelas_id' => $this->kelasX->id, 'status' => 'aktif']);
        KelasSiswa::create(['siswa_id' => $siswa1->id, 'kelas_id' => $this->kelasX->id, 'mulai' => now()->subYear(), 'alasan' => 'pendaftaran']);
        KelasSiswa::create(['siswa_id' => $siswa2->id, 'kelas_id' => $this->kelasX->id, 'mulai' => now()->subYear(), 'alasan' => 'pendaftaran']);

        app(MutasiKelasService::class)->naikKelas($this->kelasX, $this->kelasXI, $this->user, paksa: false, keterangan: null);

        $this->assertSame($this->kelasXI->id, $siswa1->fresh()->kelas_id);
        $this->assertSame($this->kelasXI->id, $siswa2->fresh()->kelas_id);
        $this->assertSame($this->kelasXI->id, KelasSiswa::where('siswa_id', $siswa1->id)->whereNull('selesai')->first()->kelas_id);
        $this->assertSame(1, LogOperasiKelas::where('tipe', 'naik_kelas')->count());
    }

    public function test_throws_exception_ketika_kelas_tujuan_tidak_kosong_dan_paksa_false(): void
    {
        $siswaLama = Siswa::create(['nik' => '003', 'nama' => 'C', 'jenis_kelamin' => 'L', 'kelas_id' => $this->kelasXI->id, 'status' => 'aktif']);
        KelasSiswa::create(['siswa_id' => $siswaLama->id, 'kelas_id' => $this->kelasXI->id, 'mulai' => now()->subMonth(), 'alasan' => 'pendaftaran']);

        $siswaBaru = Siswa::create(['nik' => '004', 'nama' => 'D', 'jenis_kelamin' => 'L', 'kelas_id' => $this->kelasX->id, 'status' => 'aktif']);
        KelasSiswa::create(['siswa_id' => $siswaBaru->id, 'kelas_id' => $this->kelasX->id, 'mulai' => now()->subYear(), 'alasan' => 'pendaftaran']);

        $this->expectException(KelasTujuanTidakKosongException::class);

        app(MutasiKelasService::class)->naikKelas($this->kelasX, $this->kelasXI, $this->user, paksa: false, keterangan: null);
    }

    public function test_lanjut_eksekusi_dengan_paksa_true_meski_kelas_tujuan_terisi(): void
    {
        $siswaLama = Siswa::create(['nik' => '005', 'nama' => 'E', 'jenis_kelamin' => 'L', 'kelas_id' => $this->kelasXI->id, 'status' => 'aktif']);
        KelasSiswa::create(['siswa_id' => $siswaLama->id, 'kelas_id' => $this->kelasXI->id, 'mulai' => now()->subMonth(), 'alasan' => 'pendaftaran']);

        $siswaBaru = Siswa::create(['nik' => '006', 'nama' => 'F', 'jenis_kelamin' => 'L', 'kelas_id' => $this->kelasX->id, 'status' => 'aktif']);
        KelasSiswa::create(['siswa_id' => $siswaBaru->id, 'kelas_id' => $this->kelasX->id, 'mulai' => now()->subYear(), 'alasan' => 'pendaftaran']);

        app(MutasiKelasService::class)->naikKelas($this->kelasX, $this->kelasXI, $this->user, paksa: true, keterangan: 'darurat');

        $this->assertSame(1, LogOperasiKelas::where('dipaksa', true)->count());
        $this->assertSame(2, Siswa::where('kelas_id', $this->kelasXI->id)->count());
    }
}
