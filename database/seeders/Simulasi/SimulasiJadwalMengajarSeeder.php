<?php

namespace Database\Seeders\Simulasi;

use App\Models\JadwalMengajar;
use App\Models\JamPelajaran;
use App\Models\Kelas;
use App\Models\MataPelajaran;
use App\Models\Pegawai;
use Illuminate\Database\Seeder;
use RuntimeException;

class SimulasiJadwalMengajarSeeder extends Seeder
{
    private const HARI = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];

    public function run(): void
    {
        $kelasList = Kelas::all();
        // Jam aktif: hanya jam tanpa keterangan istirahat/dhuhur
        $jamList = JamPelajaran::whereNull('keterangan')
            ->orderBy('nomor')
            ->pluck('id')
            ->toArray();

        if ($kelasList->isEmpty()) {
            throw new RuntimeException('Data kelas belum ada.');
        }

        if (count($jamList) < 4) {
            throw new RuntimeException('Data jam pelajaran aktif belum cukup.');
        }

        $mapelList = MataPelajaran::with('pengampu')->where('aktif', true)->get();

        if ($mapelList->isEmpty()) {
            throw new RuntimeException('Data mata pelajaran belum ada.');
        }

        // Lacak slot yang terpakai per guru: [pegawai_id][hari][jam_id] = true
        $slotGuru = [];
        // Lacak slot yang terpakai per kelas: [kelas_id][hari][jam_id] = true
        $slotKelas = [];

        // Buat slot grid: 6 hari × jam aktif
        $allSlots = [];
        foreach (self::HARI as $hari) {
            foreach ($jamList as $jamId) {
                $allSlots[] = ['hari' => $hari, 'jam_id' => $jamId];
            }
        }

        foreach ($kelasList as $kelas) {
            $slotKelas[$kelas->id] = [];
            $slotIndex = ($kelas->id - 1) * count($mapelList); // offset per kelas

            foreach ($mapelList as $mapelIndex => $mapel) {
                $pengampu = $mapel->pengampu->first();
                if (! $pengampu) {
                    continue;
                }

                if (! isset($slotGuru[$pengampu->id])) {
                    $slotGuru[$pengampu->id] = [];
                }

                // Cari 2 slot bebas untuk guru ini di kelas ini
                $assigned = 0;
                $checked = 0;
                $totalSlots = count($allSlots);

                while ($assigned < 2 && $checked < $totalSlots) {
                    $idx = ($slotIndex + $mapelIndex * 2 + $assigned + $checked) % $totalSlots;
                    $slot = $allSlots[$idx];
                    $hari = $slot['hari'];
                    $jamId = $slot['jam_id'];

                    $guruFree = ! isset($slotGuru[$pengampu->id][$hari][$jamId]);
                    $kelasFree = ! isset($slotKelas[$kelas->id][$hari][$jamId]);

                    if ($guruFree && $kelasFree) {
                        JadwalMengajar::create([
                            'kelas_id' => $kelas->id,
                            'hari' => $hari,
                            'jam_pelajaran_id' => $jamId,
                            'mata_pelajaran_id' => $mapel->id,
                            'pegawai_id' => $pengampu->id,
                        ]);

                        $slotGuru[$pengampu->id][$hari][$jamId] = true;
                        $slotKelas[$kelas->id][$hari][$jamId] = true;
                        $assigned++;
                    }

                    $checked++;
                }
            }
        }
    }
}
