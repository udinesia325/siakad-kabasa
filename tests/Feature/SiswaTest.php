<?php

namespace Tests\Feature;

use App\Models\Kelas;
use App\Models\Rfid;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiswaTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Kelas $kelas;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $this->kelas = Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $ta->id]);
    }

    public function test_dapat_melihat_list_siswa()
    {
        $this->actingAs($this->user)
            ->get(route('siswa.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('akademik/siswa/index'));
    }

    public function test_dapat_membuat_siswa_baru()
    {
        $this->actingAs($this->user)
            ->post(route('siswa.store'), [
                'nik' => '3201234567890001',
                'nis' => null,
                'nama' => 'Ahmad Fauzi',
                'jenis_kelamin' => 'L',
                'email' => null,
                'alamat' => null,
                'kelas_id' => $this->kelas->id,
            ])
            ->assertRedirect(route('siswa.index'));

        $this->assertDatabaseHas('m_siswa', ['nik' => '3201234567890001', 'nama' => 'Ahmad Fauzi']);
    }

    public function test_nik_wajib_diisi_dan_unik()
    {
        Siswa::create(['nik' => '3201234567890001', 'nama' => 'Siswa Lama', 'jenis_kelamin' => 'L']);

        $this->actingAs($this->user)
            ->post(route('siswa.store'), [
                'nik' => '3201234567890001',
                'nama' => 'Siswa Baru',
                'jenis_kelamin' => 'L',
            ])
            ->assertSessionHasErrors('nik');
    }

    public function test_nis_unik_jika_diisi()
    {
        Siswa::create(['nik' => '3201111111111111', 'nis' => '12345', 'nama' => 'Siswa A', 'jenis_kelamin' => 'L']);

        $this->actingAs($this->user)
            ->post(route('siswa.store'), [
                'nik' => '3202222222222222',
                'nis' => '12345',
                'nama' => 'Siswa B',
                'jenis_kelamin' => 'P',
            ])
            ->assertSessionHasErrors('nis');
    }

    public function test_dapat_assign_rfid_ke_siswa()
    {
        $siswa = Siswa::create(['nik' => '3201234567890001', 'nama' => 'Ahmad', 'jenis_kelamin' => 'L']);

        $this->actingAs($this->user)
            ->post(route('siswa.assign-rfid', $siswa), ['kode_rfid' => 'A3F2B1C4'])
            ->assertRedirect();

        $this->assertDatabaseHas('t_rfid', [
            'kode_rfid' => 'A3F2B1C4',
            'reff_type' => 'm_siswa',
            'reff_id' => $siswa->id,
        ]);
    }

    public function test_mutasi_rfid_mengupdate_kode_tanpa_hapus_histori()
    {
        $siswa = Siswa::create(['nik' => '3201234567890001', 'nama' => 'Ahmad', 'jenis_kelamin' => 'L']);
        Rfid::create(['kode_rfid' => 'KARTU_LAMA', 'reff_type' => 'm_siswa', 'reff_id' => $siswa->id, 'dibuat_pada' => now()]);

        $this->actingAs($this->user)
            ->post(route('siswa.assign-rfid', $siswa), ['kode_rfid' => 'KARTU_BARU'])
            ->assertRedirect();

        $this->assertDatabaseHas('t_rfid', ['kode_rfid' => 'KARTU_BARU', 'reff_id' => $siswa->id]);
        $this->assertDatabaseMissing('t_rfid', ['kode_rfid' => 'KARTU_LAMA']);
        $this->assertDatabaseCount('t_rfid', 1);
    }

    public function test_dapat_menghapus_siswa()
    {
        $siswa = Siswa::create(['nik' => '3201234567890001', 'nama' => 'Ahmad', 'jenis_kelamin' => 'L']);

        $this->actingAs($this->user)
            ->delete(route('siswa.destroy', $siswa))
            ->assertRedirect(route('siswa.index'));

        $this->assertDatabaseMissing('m_siswa', ['id' => $siswa->id]);
    }
}
