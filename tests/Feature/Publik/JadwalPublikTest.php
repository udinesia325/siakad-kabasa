<?php

namespace Tests\Feature\Publik;

use App\Models\TahunAjaran;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class JadwalPublikTest extends TestCase
{
    use RefreshDatabase;

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
}
