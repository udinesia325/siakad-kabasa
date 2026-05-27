<?php

namespace Tests\Feature;

use App\Models\Kelas;
use App\Models\KelasAjaran;
use App\Models\TahunAjaran;
use App\Models\Tingkat;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KelasTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    private TahunAjaran $ta;

    private Tingkat $tingkat;

    private Kelas $kelas;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['account_type' => 'superadmin']);
        $this->ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $this->tingkat = Tingkat::where('urutan', 1)->where('jenjang', 'smk')->first() ?? Tingkat::create(['nama' => 'X', 'urutan' => 10, 'jenjang' => 'smk']);
        $this->kelas = Kelas::create(['nama' => 'X RPL A']);
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

    public function test_dapat_membuat_kelas_ajaran_baru()
    {
        $this->actingAs($this->user)
            ->post(route('kelas.store'), [
                'kelas_id' => $this->kelas->id,
                'tingkat_id' => $this->tingkat->id,
                'tahun_ajaran_id' => $this->ta->id,
                'pegawai_id' => null,
            ])
            ->assertRedirect(route('kelas.index'));

        $this->assertDatabaseHas('t_kelas_ajaran', [
            'kelas_id' => $this->kelas->id,
            'tingkat_id' => $this->tingkat->id,
            'tahun_ajaran_id' => $this->ta->id,
        ]);
    }

    public function test_kelas_id_harus_ada()
    {
        $this->actingAs($this->user)
            ->post(route('kelas.store'), [
                'kelas_id' => 9999,
                'tingkat_id' => $this->tingkat->id,
                'tahun_ajaran_id' => $this->ta->id,
            ])
            ->assertSessionHasErrors('kelas_id');
    }

    public function test_dapat_menghapus_kelas_ajaran()
    {
        $ka = KelasAjaran::create([
            'kelas_id' => $this->kelas->id,
            'tingkat_id' => $this->tingkat->id,
            'tahun_ajaran_id' => $this->ta->id,
        ]);

        $this->actingAs($this->user)
            ->delete(route('kelas.destroy', $ka))
            ->assertRedirect(route('kelas.index'));

        $this->assertDatabaseMissing('t_kelas_ajaran', ['id' => $ka->id]);
    }

    public function test_index_dapat_difilter_dengan_search()
    {
        $kelasB = Kelas::create(['nama' => 'XI TKJ B']);
        KelasAjaran::create([
            'kelas_id' => $this->kelas->id, 'tingkat_id' => $this->tingkat->id, 'tahun_ajaran_id' => $this->ta->id,
        ]);
        KelasAjaran::create([
            'kelas_id' => $kelasB->id, 'tingkat_id' => $this->tingkat->id, 'tahun_ajaran_id' => $this->ta->id,
        ]);

        $this->actingAs($this->user)
            ->get(route('kelas.index', ['search' => 'RPL']))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('akademik/kelas/index')
                ->where('kelas.total', 1)
                ->where('kelas.data.0.nama', 'X RPL A')
            );
    }
}
