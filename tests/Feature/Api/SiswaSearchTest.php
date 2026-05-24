<?php

namespace Tests\Feature\Api;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiswaSearchTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['account_type' => 'superadmin']);
    }

    public function test_unauthenticated_user_cannot_search(): void
    {
        $this->get('/api/siswa/search?q=test')
            ->assertRedirect('/login');
    }

    public function test_returns_empty_array_when_query_too_short(): void
    {
        $this->actingAs($this->user)
            ->getJson('/api/siswa/search?q=ab')
            ->assertOk()
            ->assertExactJson([]);
    }

    public function test_returns_empty_array_when_no_query(): void
    {
        $this->actingAs($this->user)
            ->getJson('/api/siswa/search')
            ->assertOk()
            ->assertExactJson([]);
    }

    public function test_returns_matching_siswa_by_nama(): void
    {
        $kelas = Kelas::factory()->create(['nama' => 'XII IPA 1']);
        Siswa::factory()->create(['nama' => 'Ahmad Fauzi', 'nisn' => '0051234567', 'kelas_id' => $kelas->id, 'status' => 'aktif']);
        Siswa::factory()->create(['nama' => 'Budi Santoso', 'nisn' => '0059999999', 'kelas_id' => $kelas->id, 'status' => 'aktif']);

        $response = $this->actingAs($this->user)
            ->getJson('/api/siswa/search?q=ahm')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['nama' => 'Ahmad Fauzi', 'nisn' => '0051234567', 'kelas' => 'XII IPA 1']);

        $response->assertJsonStructure([['id', 'nama', 'nisn', 'kelas_id', 'kelas', 'status']]);
    }

    public function test_returns_matching_siswa_by_nisn(): void
    {
        $kelas = Kelas::factory()->create(['nama' => 'X IPS 2']);
        Siswa::factory()->create(['nama' => 'Dewi Rahayu', 'nisn' => '0041112222', 'kelas_id' => $kelas->id, 'status' => 'aktif']);

        $this->actingAs($this->user)
            ->getJson('/api/siswa/search?q=004')
            ->assertOk()
            ->assertJsonFragment(['nama' => 'Dewi Rahayu']);
    }

    public function test_excludes_non_aktif_siswa_by_default(): void
    {
        $kelas = Kelas::factory()->create();
        Siswa::factory()->create(['nama' => 'Lulus Test', 'nisn' => '0011111111', 'kelas_id' => $kelas->id, 'status' => 'lulus']);

        $this->actingAs($this->user)
            ->getJson('/api/siswa/search?q=lulu')
            ->assertOk()
            ->assertExactJson([]);
    }

    public function test_limits_results_to_15(): void
    {
        $kelas = Kelas::factory()->create();
        Siswa::factory()->count(20)->create(['nama' => 'Ahmad Test', 'kelas_id' => $kelas->id, 'status' => 'aktif']);

        $this->actingAs($this->user)
            ->getJson('/api/siswa/search?q=ahm')
            ->assertOk()
            ->assertJsonCount(15);
    }

    public function test_returns_lulus_siswa_when_status_param_is_lulus(): void
    {
        $kelas = Kelas::factory()->create();
        Siswa::factory()->create(['nama' => 'Wisuda Santoso', 'nisn' => '0031234567', 'kelas_id' => $kelas->id, 'status' => 'lulus']);
        Siswa::factory()->create(['nama' => 'Budi Aktif', 'nisn' => '0039999999', 'kelas_id' => $kelas->id, 'status' => 'aktif']);

        $this->actingAs($this->user)
            ->getJson('/api/siswa/search?q=wis&status=lulus')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['nama' => 'Wisuda Santoso', 'status' => 'lulus']);
    }

    public function test_invalid_status_param_falls_back_to_aktif(): void
    {
        $kelas = Kelas::factory()->create();
        Siswa::factory()->create(['nama' => 'Ahmad Aktif', 'nisn' => '0021234567', 'kelas_id' => $kelas->id, 'status' => 'aktif']);
        Siswa::factory()->create(['nama' => 'Ahmad Lulus', 'nisn' => '0029999999', 'kelas_id' => $kelas->id, 'status' => 'lulus']);

        $this->actingAs($this->user)
            ->getJson('/api/siswa/search?q=ahm&status=invalid_value')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['nama' => 'Ahmad Aktif']);
    }

    public function test_filter_by_kelas_id(): void
    {
        $kelas1 = Kelas::factory()->create(['nama' => 'XII IPA 1']);
        $kelas2 = Kelas::factory()->create(['nama' => 'XI IPS 1']);
        Siswa::factory()->create(['nama' => 'Ahmad Kelas1', 'nisn' => '0001', 'kelas_id' => $kelas1->id, 'status' => 'aktif']);
        Siswa::factory()->create(['nama' => 'Ahmad Kelas2', 'nisn' => '0002', 'kelas_id' => $kelas2->id, 'status' => 'aktif']);

        $this->actingAs($this->user)
            ->getJson("/api/siswa/search?q=ahm&kelas_id={$kelas1->id}")
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['nama' => 'Ahmad Kelas1']);
    }
}
