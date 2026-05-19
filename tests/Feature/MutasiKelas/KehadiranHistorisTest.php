<?php

namespace Tests\Feature\MutasiKelas;

use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KehadiranHistorisTest extends TestCase
{
    use RefreshDatabase;

    public function test_rekap_kehadiran_kelas_lama_menampilkan_siswa_yang_sudah_pindah_untuk_tanggal_sebelum_pindah(): void
    {
        $user = User::factory()->create(['account_type' => 'superadmin']);
        $ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $kelasLama = Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $ta->id]);
        $kelasBaru = Kelas::create(['nama' => 'X RPL 2', 'tingkat' => 'X', 'tahun_ajaran_id' => $ta->id]);

        // Siswa pernah di kelasLama (2026-01-01 sd 2026-03-15), sekarang di kelasBaru
        $siswa = Siswa::create([
            'nik' => '300', 'nama' => 'Nadia', 'jenis_kelamin' => 'P', 'kelas_id' => $kelasBaru->id, 'status' => 'aktif',
        ]);
        KelasSiswa::create([
            'siswa_id' => $siswa->id, 'kelas_id' => $kelasLama->id,
            'mulai' => '2026-01-01', 'selesai' => '2026-03-15', 'alasan' => 'pendaftaran',
        ]);
        KelasSiswa::create([
            'siswa_id' => $siswa->id, 'kelas_id' => $kelasBaru->id,
            'mulai' => '2026-03-15', 'selesai' => null, 'alasan' => 'mutasi',
        ]);

        // Query rekap kelas LAMA untuk periode 2026-02-01..2026-02-28 (saat siswa masih di kelasLama)
        $response = $this->actingAs($user)
            ->get(route('kehadiran.show', $kelasLama).'?periode=custom&dari=2026-02-01&sampai=2026-02-28');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('kehadiran/show')
            ->where('siswa', fn ($list) => collect($list)->pluck('id')->contains($siswa->id))
        );
    }

    public function test_rekap_kehadiran_kelas_baru_tidak_menampilkan_siswa_untuk_tanggal_sebelum_dia_masuk(): void
    {
        $user = User::factory()->create(['account_type' => 'superadmin']);
        $ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $kelasLama = Kelas::create(['nama' => 'X RPL 1', 'tingkat' => 'X', 'tahun_ajaran_id' => $ta->id]);
        $kelasBaru = Kelas::create(['nama' => 'X RPL 2', 'tingkat' => 'X', 'tahun_ajaran_id' => $ta->id]);

        $siswa = Siswa::create([
            'nik' => '301', 'nama' => 'Omar', 'jenis_kelamin' => 'L', 'kelas_id' => $kelasBaru->id, 'status' => 'aktif',
        ]);
        KelasSiswa::create([
            'siswa_id' => $siswa->id, 'kelas_id' => $kelasLama->id,
            'mulai' => '2026-01-01', 'selesai' => '2026-03-15', 'alasan' => 'pendaftaran',
        ]);
        KelasSiswa::create([
            'siswa_id' => $siswa->id, 'kelas_id' => $kelasBaru->id,
            'mulai' => '2026-03-15', 'selesai' => null, 'alasan' => 'mutasi',
        ]);

        // Query rekap kelasBARU untuk Feb 2026 — siswa belum di sini, harusnya tidak muncul
        $response = $this->actingAs($user)
            ->get(route('kehadiran.show', $kelasBaru).'?periode=custom&dari=2026-02-01&sampai=2026-02-28');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('kehadiran/show')
            ->where('siswa', fn ($list) => ! collect($list)->pluck('id')->contains($siswa->id))
        );
    }
}
