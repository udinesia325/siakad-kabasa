<?php

namespace Tests\Feature;

use App\Models\JadwalAbsensi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JadwalAbsensiTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        // Data 7 hari sudah di-seed oleh migration
    }

    public function test_dapat_melihat_halaman_jadwal()
    {
        $this->actingAs($this->user)
            ->get(route('jadwal-absensi.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('akademik/jadwal-absensi/index'));
    }

    public function test_dapat_update_jadwal_senin()
    {
        $senin = JadwalAbsensi::where('hari', 1)->first();

        $this->actingAs($this->user)
            ->patch(route('jadwal-absensi.update', $senin), [
                'is_libur' => false,
                'jam_masuk_min' => '06:30',
                'jam_masuk_max' => '07:30',
                'jam_pulang_min' => '13:00',
                'jam_pulang_max' => '15:00',
            ])
            ->assertRedirect(route('jadwal-absensi.index'));

        $jadwal = JadwalAbsensi::where('hari', 1)->first();
        $this->assertEquals('06:30', $jadwal->jam_masuk_min->format('H:i'));
    }

    public function test_ketika_is_libur_jam_boleh_null()
    {
        $sabtu = JadwalAbsensi::where('hari', 6)->first();

        $this->actingAs($this->user)
            ->patch(route('jadwal-absensi.update', $sabtu), [
                'is_libur' => true,
                'jam_masuk_min' => null,
                'jam_masuk_max' => null,
                'jam_pulang_min' => null,
                'jam_pulang_max' => null,
            ])
            ->assertRedirect(route('jadwal-absensi.index'));

        $this->assertDatabaseHas('m_jadwal_absensi', ['hari' => 6, 'is_libur' => true]);
    }
}
