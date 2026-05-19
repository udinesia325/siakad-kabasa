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

    public function test_guru_index_filter_pegawai_guru_dengan_jadwal_di_tahun_aktif(): void
    {
        $aktif = TahunAjaran::create(['nama' => '2026/2027', 'is_active' => true]);
        $lampau = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => false]);
        $kelasAktif = Kelas::create(['tahun_ajaran_id' => $aktif->id, 'nama' => 'X A', 'tingkat' => 'X']);
        $kelasLampau = Kelas::create(['tahun_ajaran_id' => $lampau->id, 'nama' => 'X B', 'tingkat' => 'X']);
        $jam = JamPelajaran::create(['nomor' => 1, 'jam_mulai' => '07:00:00', 'jam_selesai' => '07:45:00', 'aktif' => true]);
        $mapel = MataPelajaran::create(['kode' => 'MTK', 'nama' => 'Matematika', 'aktif' => true]);

        $guruPunyaJadwal = Pegawai::create(['nama' => 'Budi', 'jenis_kelamin' => 'L', 'jenis' => 'guru', 'aktif' => true]);
        Pegawai::create(['nama' => 'Andi', 'jenis_kelamin' => 'L', 'jenis' => 'guru', 'aktif' => true]);
        $guruJadwalLampau = Pegawai::create(['nama' => 'Citra', 'jenis_kelamin' => 'P', 'jenis' => 'guru', 'aktif' => true]);
        Pegawai::create(['nama' => 'Dewi', 'jenis_kelamin' => 'P', 'jenis' => 'staff_tu', 'aktif' => true]);

        JadwalMengajar::create([
            'kelas_id' => $kelasAktif->id, 'hari' => 'senin',
            'jam_pelajaran_id' => $jam->id, 'mata_pelajaran_id' => $mapel->id,
            'pegawai_id' => $guruPunyaJadwal->id,
        ]);
        JadwalMengajar::create([
            'kelas_id' => $kelasLampau->id, 'hari' => 'senin',
            'jam_pelajaran_id' => $jam->id, 'mata_pelajaran_id' => $mapel->id,
            'pegawai_id' => $guruJadwalLampau->id,
        ]);

        $response = $this->get('/jadwal/guru');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('publik/jadwal/guru/index')
            ->has('guru.data', 1)
            ->where('guru.data.0.id', $guruPunyaJadwal->id)
        );
    }

    public function test_guru_index_search_by_nama(): void
    {
        $aktif = TahunAjaran::create(['nama' => '2026/2027', 'is_active' => true]);
        $kelas = Kelas::create(['tahun_ajaran_id' => $aktif->id, 'nama' => 'X A', 'tingkat' => 'X']);
        $mapel = MataPelajaran::create(['kode' => 'MTK', 'nama' => 'Matematika', 'aktif' => true]);

        $budi = Pegawai::create(['nama' => 'Budi Santoso', 'jenis_kelamin' => 'L', 'jenis' => 'guru', 'aktif' => true]);
        $andi = Pegawai::create(['nama' => 'Andi Wijaya', 'jenis_kelamin' => 'L', 'jenis' => 'guru', 'aktif' => true]);

        $jam1 = JamPelajaran::create(['nomor' => 1, 'jam_mulai' => '07:00:00', 'jam_selesai' => '07:45:00', 'aktif' => true]);
        $jam2 = JamPelajaran::create(['nomor' => 2, 'jam_mulai' => '07:45:00', 'jam_selesai' => '08:30:00', 'aktif' => true]);

        foreach ([[$budi, $jam1], [$andi, $jam2]] as [$p, $jp]) {
            JadwalMengajar::create([
                'kelas_id' => $kelas->id, 'hari' => 'senin',
                'jam_pelajaran_id' => $jp->id, 'mata_pelajaran_id' => $mapel->id,
                'pegawai_id' => $p->id,
            ]);
        }

        $response = $this->get('/jadwal/guru?search=budi');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->has('guru.data', 1)
            ->where('guru.data.0.nama', 'Budi Santoso')
            ->where('filters.search', 'budi')
        );
    }

    public function test_guru_index_dipaginasi(): void
    {
        $aktif = TahunAjaran::create(['nama' => '2026/2027', 'is_active' => true]);
        $kelas = Kelas::create(['tahun_ajaran_id' => $aktif->id, 'nama' => 'X A', 'tingkat' => 'X']);
        $mapel = MataPelajaran::create(['kode' => 'MTK', 'nama' => 'Matematika', 'aktif' => true]);

        foreach (range(1, 25) as $i) {
            $g = Pegawai::create(['nama' => "Guru {$i}", 'jenis_kelamin' => 'L', 'jenis' => 'guru', 'aktif' => true]);
            $jp = JamPelajaran::create([
                'nomor' => $i,
                'jam_mulai' => '07:00:00',
                'jam_selesai' => '07:45:00',
                'aktif' => true,
            ]);
            JadwalMengajar::create([
                'kelas_id' => $kelas->id, 'hari' => 'senin',
                'jam_pelajaran_id' => $jp->id, 'mata_pelajaran_id' => $mapel->id,
                'pegawai_id' => $g->id,
            ]);
        }

        $response = $this->get('/jadwal/guru');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->has('guru.data', 20)
            ->where('guru.per_page', 20)
            ->where('guru.total', 25)
        );
    }

    public function test_guru_show_404_untuk_non_guru(): void
    {
        $staff = Pegawai::create(['nama' => 'Dewi', 'jenis_kelamin' => 'P', 'jenis' => 'staff_tu', 'aktif' => true]);

        $response = $this->get("/jadwal/guru/{$staff->id}");

        $response->assertNotFound();
    }

    public function test_guru_show_404_untuk_pegawai_non_aktif(): void
    {
        $guru = Pegawai::create(['nama' => 'Budi', 'jenis_kelamin' => 'L', 'jenis' => 'guru', 'aktif' => false]);

        $response = $this->get("/jadwal/guru/{$guru->id}");

        $response->assertNotFound();
    }

    public function test_guru_show_render_empty_state_jika_tanpa_jadwal(): void
    {
        $guru = Pegawai::create(['nama' => 'Pak Budi', 'jenis_kelamin' => 'L', 'jenis' => 'guru', 'aktif' => true]);

        $response = $this->get("/jadwal/guru/{$guru->id}");

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('publik/jadwal/guru/show')
            ->where('pegawai.nama', 'Pak Budi')
            ->has('jadwalPerHari')
        );
    }

    public function test_guru_show_render_jadwal_grouped_per_hari(): void
    {
        $aktif = TahunAjaran::create(['nama' => '2026/2027', 'is_active' => true]);
        $kelas = Kelas::create(['tahun_ajaran_id' => $aktif->id, 'nama' => 'X A', 'tingkat' => 'X']);
        $jam1 = JamPelajaran::create(['nomor' => 1, 'jam_mulai' => '07:00:00', 'jam_selesai' => '07:45:00', 'aktif' => true]);
        $jam2 = JamPelajaran::create(['nomor' => 2, 'jam_mulai' => '07:45:00', 'jam_selesai' => '08:30:00', 'aktif' => true]);
        $mapel = MataPelajaran::create(['kode' => 'MTK', 'nama' => 'Matematika', 'aktif' => true]);
        $guru = Pegawai::create(['nama' => 'Pak Budi', 'jenis_kelamin' => 'L', 'jenis' => 'guru', 'aktif' => true]);

        JadwalMengajar::create([
            'kelas_id' => $kelas->id, 'hari' => 'senin',
            'jam_pelajaran_id' => $jam1->id, 'mata_pelajaran_id' => $mapel->id,
            'pegawai_id' => $guru->id,
        ]);
        JadwalMengajar::create([
            'kelas_id' => $kelas->id, 'hari' => 'selasa',
            'jam_pelajaran_id' => $jam2->id, 'mata_pelajaran_id' => $mapel->id,
            'pegawai_id' => $guru->id,
        ]);

        $response = $this->get("/jadwal/guru/{$guru->id}");

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->has('jadwalPerHari.senin', 1)
            ->has('jadwalPerHari.selasa', 1)
        );
    }
}
