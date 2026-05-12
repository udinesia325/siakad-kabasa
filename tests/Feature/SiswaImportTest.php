<?php

namespace Tests\Feature;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Tests\TestCase;

class SiswaImportTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    private TahunAjaran $tahunAktif;

    private Kelas $kelas;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->tahunAktif = TahunAjaran::create(['nama' => '2025/2026', 'is_active' => true]);
        $this->kelas = Kelas::create(['nama' => 'XA RPL', 'tingkat' => 'X', 'tahun_ajaran_id' => $this->tahunAktif->id]);
    }

    public function test_download_template_berhasil()
    {
        Excel::fake();

        $this->actingAs($this->user)
            ->get(route('siswa.import.template'))
            ->assertOk();

        Excel::assertDownloaded('template-import-siswa.xlsx');
    }

    public function test_preview_gagal_jika_bukan_file_excel()
    {
        $file = UploadedFile::fake()->create('data.pdf', 100, 'application/pdf');

        $this->actingAs($this->user)
            ->postJson(route('siswa.import.preview'), ['file' => $file])
            ->assertStatus(422);
    }

    public function test_import_store_berhasil_insert_data_valid()
    {
        $this->actingAs($this->user)
            ->postJson(route('siswa.import.store'), [
                'data' => [
                    [
                        'nik' => '3201000000000001',
                        'nisn' => '0012345678',
                        'nama' => 'Budi Santoso',
                        'jenis_kelamin' => 'L',
                        'email' => null,
                        'alamat' => null,
                        'kelas_id' => $this->kelas->id,
                        'kelas_label' => 'XA RPL 2025/2026',
                        'rfid' => null,
                    ],
                ],
            ])
            ->assertRedirect(route('siswa.index'));

        $this->assertDatabaseHas('m_siswa', [
            'nik' => '3201000000000001',
            'nama' => 'Budi Santoso',
        ]);
    }

    public function test_import_store_juga_insert_rfid_jika_ada()
    {
        $this->actingAs($this->user)
            ->postJson(route('siswa.import.store'), [
                'data' => [
                    [
                        'nik' => '3201000000000002',
                        'nisn' => null,
                        'nama' => 'Siti Rahma',
                        'jenis_kelamin' => 'P',
                        'email' => null,
                        'alamat' => null,
                        'kelas_id' => null,
                        'kelas_label' => null,
                        'rfid' => 'ABCD1234',
                    ],
                ],
            ])
            ->assertRedirect(route('siswa.index'));

        $siswa = Siswa::where('nik', '3201000000000002')->first();
        $this->assertNotNull($siswa);
        $this->assertDatabaseHas('t_rfid', [
            'kode_rfid' => 'ABCD1234',
            'reff_type' => 'm_siswa',
            'reff_id' => $siswa->id,
        ]);
    }

    public function test_import_store_gagal_tanpa_data()
    {
        $this->actingAs($this->user)
            ->postJson(route('siswa.import.store'), ['data' => []])
            ->assertStatus(422);
    }
}
