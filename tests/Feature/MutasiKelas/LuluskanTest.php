<?php

namespace Tests\Feature\MutasiKelas;

use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\LogOperasiKelas;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Models\User;
use App\Services\MutasiKelasService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LuluskanTest extends TestCase
{
    use RefreshDatabase;

    public function test_meluluskan_semua_siswa_aktif_di_kelas_xii(): void
    {
        $user = User::factory()->create(['account_type' => 'superadmin']);
        $ta = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $kelasXII = Kelas::create(['nama' => 'XII RPL 1', 'tingkat' => 'XII', 'tahun_ajaran_id' => $ta->id]);

        $siswa = Siswa::create(['nik' => '101', 'nama' => 'L', 'jenis_kelamin' => 'L', 'kelas_id' => $kelasXII->id, 'status' => 'aktif']);
        KelasSiswa::create(['siswa_id' => $siswa->id, 'kelas_id' => $kelasXII->id, 'mulai' => now()->subYear(), 'alasan' => 'pendaftaran']);

        app(MutasiKelasService::class)->luluskan($kelasXII, $user, keterangan: 'wisuda 2026');

        $this->assertSame('lulus', $siswa->fresh()->status);
        $this->assertNull($siswa->fresh()->kelas_id);
        $this->assertSame(0, KelasSiswa::where('siswa_id', $siswa->id)->whereNull('selesai')->count());
        $this->assertSame(1, LogOperasiKelas::where('tipe', 'lulus_angkatan')->count());
    }
}
