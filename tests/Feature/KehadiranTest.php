<?php

// tests/Feature/KehadiranTest.php

namespace Tests\Feature;

use App\Models\Absensi;
use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KehadiranTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    private TahunAjaran $ta;

    private Kelas $kelas;

    private Siswa $siswa;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['account_type' => 'superadmin']);
        $this->ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $this->kelas = Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $this->ta->id]);
        $this->siswa = Siswa::create([
            'nik' => '3201010101010001',
            'nisn' => '0012345678',
            'nama' => 'Andi Saputra',
            'jenis_kelamin' => 'L',
            'kelas_id' => $this->kelas->id,
        ]);
        KelasSiswa::create([
            'siswa_id' => $this->siswa->id,
            'kelas_id' => $this->kelas->id,
            'mulai' => now()->subYear()->toDateString(),
            'selesai' => null,
            'alasan' => 'pendaftaran',
        ]);
    }

    public function test_dapat_melihat_list_kelas_kehadiran()
    {
        $this->actingAs($this->user)
            ->get(route('kehadiran.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('kehadiran/index')
                ->has('kelas.data')
            );
    }

    public function test_dapat_melihat_matrix_kehadiran()
    {
        $this->actingAs($this->user)
            ->get(route('kehadiran.show', $this->kelas))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('kehadiran/show')
                ->has('siswa')
                ->has('tanggal')
                ->has('matrix')
            );
    }

    public function test_siswa_tanpa_absensi_berstatus_alpha()
    {
        $response = $this->actingAs($this->user)
            ->get(route('kehadiran.show', $this->kelas).'?periode=hari_ini')
            ->assertOk();

        $matrix = $response->original->getData()['page']['props']['matrix'];
        $today = now()->toDateString();

        $this->assertEquals('alpha', $matrix[$this->siswa->id][$today]['status']);
    }

    public function test_siswa_dengan_absensi_berstatus_hadir()
    {
        Absensi::create([
            'reff_type' => 'm_siswa',
            'reff_id' => $this->siswa->id,
            'waktu_absen' => now()->setTime(7, 0),
            'tipe' => 'masuk',
        ]);

        $response = $this->actingAs($this->user)
            ->get(route('kehadiran.show', $this->kelas).'?periode=hari_ini')
            ->assertOk();

        $matrix = $response->original->getData()['page']['props']['matrix'];
        $today = now()->toDateString();

        $this->assertContains($matrix[$this->siswa->id][$today]['status'], ['hadir', 'terlambat']);
    }

    public function test_dapat_menyimpan_anulir()
    {
        $this->actingAs($this->user)
            ->post(route('kehadiran.anulir', $this->kelas), [
                'siswa_id' => $this->siswa->id,
                'tanggal' => now()->toDateString(),
                'status' => 'sakit',
                'keterangan' => 'Siswa sakit demam',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('t_anulir_absensi', [
            'siswa_id' => $this->siswa->id,
            'status' => 'sakit',
            'anulir_oleh' => $this->user->id,
        ]);
    }

    public function test_anulir_status_harus_valid()
    {
        $this->actingAs($this->user)
            ->post(route('kehadiran.anulir', $this->kelas), [
                'siswa_id' => $this->siswa->id,
                'tanggal' => now()->toDateString(),
                'status' => 'status_tidak_ada',
            ])
            ->assertSessionHasErrors('status');
    }

    public function test_anulir_kedua_menimpa_yang_pertama()
    {
        $tanggal = now()->toDateString();

        $this->actingAs($this->user)
            ->post(route('kehadiran.anulir', $this->kelas), [
                'siswa_id' => $this->siswa->id,
                'tanggal' => $tanggal,
                'status' => 'sakit',
            ])
            ->assertRedirect();

        $this->actingAs($this->user)
            ->post(route('kehadiran.anulir', $this->kelas), [
                'siswa_id' => $this->siswa->id,
                'tanggal' => $tanggal,
                'status' => 'izin',
            ])
            ->assertRedirect();

        $this->assertDatabaseCount('t_anulir_absensi', 1);
        $this->assertDatabaseHas('t_anulir_absensi', ['siswa_id' => $this->siswa->id, 'status' => 'izin']);
    }
}
