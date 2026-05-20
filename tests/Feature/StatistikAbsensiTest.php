<?php

namespace Tests\Feature;

use App\Models\Kelas;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatistikAbsensiTest extends TestCase
{
    use RefreshDatabase;

    private function superadmin(): User
    {
        return User::factory()->create(['account_type' => 'superadmin']);
    }

    public function test_index_ditolak_tanpa_login(): void
    {
        $this->get('/statistik-absensi')->assertRedirect('/login');
    }

    public function test_index_menampilkan_kelas_tahun_ajaran_aktif(): void
    {
        $taAktif = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $taLama = TahunAjaran::create(['nama' => '2024/2025', 'is_active' => false]);
        $kelasAktif = Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $taAktif->id]);
        Kelas::create(['nama' => 'XI TKJ 1', 'tingkat' => 'XI', 'tahun_ajaran_id' => $taLama->id]);

        $this->actingAs($this->superadmin())
            ->get('/statistik-absensi')
            ->assertOk()
            ->assertInertia(fn ($p) => $p
                ->component('akademik/statistik-absensi/index')
                ->has('kelas', 1)
                ->where('kelas.0.id', $kelasAktif->id));
    }

    public function test_show_mengembalikan_struktur_statistik(): void
    {
        $ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $kelas = Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $ta->id]);

        $this->actingAs($this->superadmin())
            ->get("/statistik-absensi/{$kelas->id}")
            ->assertOk()
            ->assertInertia(fn ($p) => $p
                ->component('akademik/statistik-absensi/show')
                ->has('statistik.chart')
                ->has('statistik.ringkasan')
                ->has('statistik.gender')
                ->has('statistik.donut')
                ->has('statistik.recentAnulir')
                ->has('statistik.rataJamMasuk')
                ->has('filters.bulan')
                ->has('filters.tahun')
                ->has('tahunOptions'));
    }

    public function test_show_kelas_kosong_agregat_nol(): void
    {
        $ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $kelas = Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $ta->id]);

        $this->actingAs($this->superadmin())
            ->get("/statistik-absensi/{$kelas->id}")
            ->assertOk()
            ->assertInertia(fn ($p) => $p
                ->where('statistik.ringkasan.hadir', 0)
                ->where('statistik.ringkasan.alpha', 0));
    }
}
