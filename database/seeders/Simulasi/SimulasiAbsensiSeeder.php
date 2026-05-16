<?php

namespace Database\Seeders\Simulasi;

use App\Models\Absensi;
use App\Models\AnulirAbsensi;
use App\Models\Siswa;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use RuntimeException;

class SimulasiAbsensiSeeder extends Seeder
{
    private const HARI_KE_BELAKANG = 30;

    public function run(): void
    {
        $admin = User::orderBy('id')->first();

        if (! $admin) {
            throw new RuntimeException('User admin belum ada. Jalankan SuperadminSeeder terlebih dahulu.');
        }

        $siswaList = Siswa::where('status', 'aktif')->get();
        $tanggalList = $this->buildTanggalKerja(self::HARI_KE_BELAKANG);

        $absensiRows = [];
        $anulirRows = [];
        $now = now();

        foreach ($siswaList as $siswa) {
            foreach ($tanggalList as $tgl) {
                $roll = random_int(1, 100);

                if ($roll <= 85) {
                    // Hadir tepat waktu
                    $absensiRows[] = $this->masukRow($siswa->id, $tgl, '06:30:00', '07:55:00', $now);
                    $absensiRows[] = $this->pulangRow($siswa->id, $tgl, '14:00:00', '15:30:00', $now);
                } elseif ($roll <= 93) {
                    // Terlambat
                    $absensiRows[] = $this->masukRow($siswa->id, $tgl, '08:01:00', '08:30:00', $now);
                    $absensiRows[] = $this->pulangRow($siswa->id, $tgl, '14:00:00', '15:30:00', $now);
                } elseif ($roll <= 96) {
                    // Sakit
                    $anulirRows[] = $this->anulirRow($siswa->id, $tgl, 'sakit', 'Surat keterangan dokter', $admin->id, $now);
                } elseif ($roll <= 98) {
                    // Izin
                    $anulirRows[] = $this->anulirRow($siswa->id, $tgl, 'izin', 'Keperluan keluarga', $admin->id, $now);
                }
                // Sisanya (~2%): alpha — tidak ada baris absen/anulir
            }
        }

        foreach (array_chunk($absensiRows, 500) as $chunk) {
            Absensi::insert($chunk);
        }

        foreach (array_chunk($anulirRows, 500) as $chunk) {
            AnulirAbsensi::insert($chunk);
        }
    }

    /**
     * @return list<string>
     */
    private function buildTanggalKerja(int $jumlahHari): array
    {
        $hasil = [];
        $cursor = CarbonImmutable::yesterday();

        while (count($hasil) < $jumlahHari) {
            if ($cursor->isWeekday()) {
                $hasil[] = $cursor->toDateString();
            }
            $cursor = $cursor->subDay();
        }

        return array_reverse($hasil);
    }

    /**
     * @return array<string, mixed>
     */
    private function masukRow(int $siswaId, string $tanggal, string $jamMin, string $jamMax, \DateTimeInterface $now): array
    {
        return [
            'reff_type' => 'm_siswa',
            'reff_id' => $siswaId,
            'waktu_absen' => $tanggal.' '.$this->jamAcak($jamMin, $jamMax),
            'tipe' => 'masuk',
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function pulangRow(int $siswaId, string $tanggal, string $jamMin, string $jamMax, \DateTimeInterface $now): array
    {
        return [
            'reff_type' => 'm_siswa',
            'reff_id' => $siswaId,
            'waktu_absen' => $tanggal.' '.$this->jamAcak($jamMin, $jamMax),
            'tipe' => 'pulang',
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function anulirRow(int $siswaId, string $tanggal, string $status, string $keterangan, int $userId, \DateTimeInterface $now): array
    {
        return [
            'siswa_id' => $siswaId,
            'tanggal' => $tanggal,
            'status' => $status,
            'keterangan' => $keterangan,
            'bukti' => null,
            'anulir_oleh' => $userId,
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }

    private function jamAcak(string $min, string $max): string
    {
        $minTs = strtotime('1970-01-01 '.$min);
        $maxTs = strtotime('1970-01-01 '.$max);
        $pick = random_int($minTs, $maxTs);

        return date('H:i:s', $pick);
    }
}
