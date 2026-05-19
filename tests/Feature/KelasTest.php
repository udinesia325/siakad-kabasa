<?php

namespace Tests\Feature;

use App\Models\Kelas;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KelasTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    private TahunAjaran $ta;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['account_type' => 'superadmin']);
        $this->ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
    }

    public function test_dapat_melihat_list_kelas()
    {
        $this->actingAs($this->user)
            ->get(route('kelas.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('akademik/kelas/index')
                ->has('kelas.data')
            );
    }

    public function test_dapat_membuat_kelas_baru()
    {
        $this->actingAs($this->user)
            ->post(route('kelas.store'), [
                'nama' => 'X RPL 1',
                'tingkat' => 'X',
                'tahun_ajaran_id' => $this->ta->id,
            ])
            ->assertRedirect(route('kelas.index'));

        $this->assertDatabaseHas('m_kelas', ['nama' => 'X RPL 1', 'tingkat' => 'X']);
    }

    public function test_tingkat_harus_valid()
    {
        $this->actingAs($this->user)
            ->post(route('kelas.store'), [
                'nama' => 'XII RPL 1',
                'tingkat' => 'XIII',
                'tahun_ajaran_id' => $this->ta->id,
            ])
            ->assertSessionHasErrors('tingkat');
    }

    public function test_dapat_menghapus_kelas()
    {
        $kelas = Kelas::create(['nama' => 'X TKJ 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $this->ta->id]);

        $this->actingAs($this->user)
            ->delete(route('kelas.destroy', $kelas))
            ->assertRedirect(route('kelas.index'));

        $this->assertDatabaseMissing('m_kelas', ['id' => $kelas->id]);
    }

    public function test_index_dapat_difilter_dengan_search()
    {
        Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $this->ta->id]);
        Kelas::create(['nama' => 'XI TKJ 1', 'tingkat' => 'XI', 'tahun_ajaran_id' => $this->ta->id]);

        $this->actingAs($this->user)
            ->get(route('kelas.index', ['search' => 'RPL']))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('akademik/kelas/index')
                ->where('kelas.data.0.nama', 'X RPL 1')
                ->where('kelas.total', 1)
            );
    }
}
