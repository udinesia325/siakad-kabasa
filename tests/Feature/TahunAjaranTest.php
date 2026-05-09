<?php

namespace Tests\Feature;

use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TahunAjaranTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_dapat_melihat_list_tahun_ajaran()
    {
        TahunAjaran::create(['nama' => '2024/2025', 'is_active' => true]);
        $this->actingAs($this->user)
            ->get(route('tahun-ajaran.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('akademik/tahun-ajaran/index'));
    }

    public function test_dapat_membuat_tahun_ajaran_baru()
    {
        $this->actingAs($this->user)
            ->post(route('tahun-ajaran.store'), ['nama' => '2025/2026', 'is_active' => false])
            ->assertRedirect(route('tahun-ajaran.index'));

        $this->assertDatabaseHas('m_tahun_ajaran', ['nama' => '2025/2026']);
    }

    public function test_nama_tahun_ajaran_wajib_diisi()
    {
        $this->actingAs($this->user)
            ->post(route('tahun-ajaran.store'), ['nama' => '', 'is_active' => false])
            ->assertSessionHasErrors('nama');
    }

    public function test_set_aktif_menonaktifkan_yang_lain()
    {
        $lama = TahunAjaran::create(['nama' => '2024/2025', 'is_active' => true]);
        $baru = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => false]);

        $this->actingAs($this->user)
            ->patch(route('tahun-ajaran.set-aktif', $baru))
            ->assertRedirect();

        $this->assertDatabaseHas('m_tahun_ajaran', ['id' => $lama->id, 'is_active' => false]);
        $this->assertDatabaseHas('m_tahun_ajaran', ['id' => $baru->id, 'is_active' => true]);
    }

    public function test_dapat_menghapus_tahun_ajaran_tidak_aktif()
    {
        $ta = TahunAjaran::create(['nama' => '2023/2024', 'is_active' => false]);

        $this->actingAs($this->user)
            ->delete(route('tahun-ajaran.destroy', $ta))
            ->assertRedirect();

        $this->assertDatabaseMissing('m_tahun_ajaran', ['id' => $ta->id]);
    }
}
