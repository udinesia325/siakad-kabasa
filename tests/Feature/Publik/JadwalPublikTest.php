<?php

namespace Tests\Feature\Publik;

use App\Models\JadwalMengajar;
use App\Models\JamPelajaran;
use App\Models\Kelas;
use App\Models\MataPelajaran;
use App\Models\Pegawai;
use App\Models\TahunAjaran;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class JadwalPublikTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
    }

    public function test_kelas_index_hanya_menampilkan_kelas_tahun_aktif(): void
    {
        $aktif = TahunAjaran::create(['nama' => '2026/2027', 'is_active' => true]);
        $lampau = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => false]);

        $kelasAktif = Kelas::create([
            'tahun_ajaran_id' => $aktif->id,
            'nama' => 'X A',
            'tingkat' => 'X',
        ]);
        Kelas::create([
            'tahun_ajaran_id' => $lampau->id,
            'nama' => 'X Lama',
            'tingkat' => 'X',
        ]);

        $response = $this->get('/jadwal/kelas');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('publik/jadwal/kelas/index')
            ->has('kelas', 1)
            ->where('kelas.0.id', $kelasAktif->id)
        );
    }

    public function test_kelas_show_404_jika_tahun_non_aktif(): void
    {
        $lampau = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => false]);
        $kelas = Kelas::create([
            'tahun_ajaran_id' => $lampau->id,
            'nama' => 'X A',
            'tingkat' => 'X',
        ]);

        $response = $this->get("/jadwal/kelas/{$kelas->id}");

        $response->assertNotFound();
    }

    public function test_kelas_show_render_grid_jadwal(): void
    {
        $aktif = TahunAjaran::create(['nama' => '2026/2027', 'is_active' => true]);
        $kelas = Kelas::create([
            'tahun_ajaran_id' => $aktif->id,
            'nama' => 'X A',
            'tingkat' => 'X',
        ]);
        $jam = JamPelajaran::create([
            'nomor' => 1,
            'jam_mulai' => '07:00:00',
            'jam_selesai' => '07:45:00',
            'aktif' => true,
        ]);
        $mapel = MataPelajaran::create([
            'kode' => 'MTK',
            'nama' => 'Matematika',
            'aktif' => true,
        ]);
        $pegawai = Pegawai::create([
            'nama' => 'Pak Budi',
            'jenis_kelamin' => 'L',
            'jenis' => 'guru',
            'aktif' => true,
        ]);

        JadwalMengajar::create([
            'kelas_id' => $kelas->id,
            'hari' => 'senin',
            'jam_pelajaran_id' => $jam->id,
            'mata_pelajaran_id' => $mapel->id,
            'pegawai_id' => $pegawai->id,
        ]);

        $response = $this->get("/jadwal/kelas/{$kelas->id}");

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('publik/jadwal/kelas/show')
            ->where('kelas.id', $kelas->id)
            ->has('jamPelajaran', 1)
            ->has('jadwal')
            ->has('hariList', 7)
        );
    }

    public function test_landing_dapat_diakses_tanpa_login(): void
    {
        TahunAjaran::create([
            'nama' => '2026/2027',
            'is_active' => true,
        ]);

        $response = $this->get('/jadwal');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('publik/jadwal/index')
            ->where('tahunAjaranAktif.nama', '2026/2027')
            ->has('namaSekolah')
        );
    }
}
