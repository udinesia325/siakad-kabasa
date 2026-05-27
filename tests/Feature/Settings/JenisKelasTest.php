<?php

namespace Tests\Feature\Settings;

use App\Models\JenisKelas;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JenisKelasTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['account_type' => 'superadmin']);
    }

    public function test_dapat_melihat_list_jenis_kelas()
    {
        JenisKelas::create(['nama' => 'Regular', 'urutan' => 1]);

        $this->actingAs($this->user)
            ->get(route('jenis-kelas.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('settings/jenis-kelas/index')
                ->has('jenisKelas.data')
            );
    }

    public function test_dapat_membuat_jenis_kelas_baru()
    {
        $this->actingAs($this->user)
            ->post(route('jenis-kelas.store'), ['nama' => 'Industri', 'urutan' => 2])
            ->assertRedirect(route('jenis-kelas.index'));

        $this->assertDatabaseHas('m_jenis_kelas', ['nama' => 'Industri']);
    }

    public function test_nama_harus_unik()
    {
        JenisKelas::create(['nama' => 'Regular', 'urutan' => 1]);

        $this->actingAs($this->user)
            ->post(route('jenis-kelas.store'), ['nama' => 'Regular', 'urutan' => 3])
            ->assertSessionHasErrors('nama');
    }

    public function test_dapat_mengupdate_jenis_kelas()
    {
        $jenis = JenisKelas::create(['nama' => 'Regular', 'urutan' => 1]);

        $this->actingAs($this->user)
            ->patch(route('jenis-kelas.update', $jenis), ['nama' => 'Regular Plus', 'urutan' => 1])
            ->assertRedirect(route('jenis-kelas.index'));

        $this->assertDatabaseHas('m_jenis_kelas', ['nama' => 'Regular Plus']);
    }

    public function test_dapat_menghapus_jenis_kelas_yang_tidak_digunakan()
    {
        $jenis = JenisKelas::create(['nama' => 'Custom', 'urutan' => 3]);

        $this->actingAs($this->user)
            ->delete(route('jenis-kelas.destroy', $jenis))
            ->assertRedirect(route('jenis-kelas.index'));

        $this->assertDatabaseMissing('m_jenis_kelas', ['id' => $jenis->id]);
    }

    public function test_tidak_bisa_hapus_jenis_kelas_yang_digunakan()
    {
        $jenis = JenisKelas::create(['nama' => 'Regular', 'urutan' => 1]);
        \App\Models\Kelas::create(['nama' => 'X RPL A', 'jenis_kelas_id' => $jenis->id]);

        $this->actingAs($this->user)
            ->delete(route('jenis-kelas.destroy', $jenis))
            ->assertRedirect(route('jenis-kelas.index'));

        $this->assertDatabaseHas('m_jenis_kelas', ['id' => $jenis->id]);
    }
}
