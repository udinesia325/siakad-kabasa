<?php

namespace App\Services;

use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\LogOperasiKelas;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MutasiKelasService
{
    public function naikKelas(Kelas $asal, Kelas $tujuan, User $oleh, bool $paksa, ?string $keterangan): LogOperasiKelas
    {
        return DB::transaction(function () use ($asal, $tujuan, $oleh, $paksa, $keterangan) {
            $jumlahDiTujuan = KelasSiswa::where('kelas_id', $tujuan->id)->whereNull('selesai')->count();
            if ($jumlahDiTujuan > 0 && ! $paksa) {
                throw new KelasTujuanTidakKosongException($jumlahDiTujuan);
            }

            $tanggal = now();
            $siswaIds = Siswa::aktif()->where('kelas_id', $asal->id)->pluck('id');

            foreach ($siswaIds as $siswaId) {
                KelasSiswa::where('siswa_id', $siswaId)->whereNull('selesai')->update(['selesai' => $tanggal]);

                KelasSiswa::create([
                    'siswa_id' => $siswaId,
                    'kelas_id' => $tujuan->id,
                    'mulai' => $tanggal,
                    'alasan' => 'naik_kelas',
                    'keterangan' => $keterangan,
                ]);

                Siswa::where('id', $siswaId)->update(['kelas_id' => $tujuan->id]);
            }

            return LogOperasiKelas::create([
                'tipe' => 'naik_kelas',
                'kelas_asal_id' => $asal->id,
                'kelas_tujuan_id' => $tujuan->id,
                'tanggal_efektif' => $tanggal,
                'jumlah_siswa' => $siswaIds->count(),
                'dipaksa' => $paksa,
                'oleh_user_id' => $oleh->id,
                'keterangan' => $keterangan,
            ]);
        });
    }

    public function luluskan(Kelas $kelas, User $oleh, ?string $keterangan): LogOperasiKelas
    {
        return DB::transaction(function () use ($kelas, $oleh, $keterangan) {
            $tanggal = now();
            $siswaIds = Siswa::aktif()->where('kelas_id', $kelas->id)->pluck('id');

            foreach ($siswaIds as $siswaId) {
                KelasSiswa::where('siswa_id', $siswaId)->whereNull('selesai')->update(['selesai' => $tanggal]);

                Siswa::where('id', $siswaId)->update([
                    'kelas_id' => null,
                    'status' => 'lulus',
                    'status_tanggal' => $tanggal,
                    'status_keterangan' => $keterangan,
                ]);
            }

            return LogOperasiKelas::create([
                'tipe' => 'lulus_angkatan',
                'kelas_asal_id' => $kelas->id,
                'kelas_tujuan_id' => null,
                'tanggal_efektif' => $tanggal,
                'jumlah_siswa' => $siswaIds->count(),
                'dipaksa' => false,
                'oleh_user_id' => $oleh->id,
                'keterangan' => $keterangan,
            ]);
        });
    }

    public function pindahKelas(Siswa $siswa, Kelas $tujuan, ?string $keterangan, string $alasan = 'mutasi'): void
    {
        DB::transaction(function () use ($siswa, $tujuan, $keterangan, $alasan) {
            $tanggal = now();
            KelasSiswa::where('siswa_id', $siswa->id)->whereNull('selesai')->update(['selesai' => $tanggal]);
            KelasSiswa::create([
                'siswa_id' => $siswa->id,
                'kelas_id' => $tujuan->id,
                'mulai' => $tanggal,
                'alasan' => $alasan,
                'keterangan' => $keterangan,
            ]);
            $siswa->update(['kelas_id' => $tujuan->id]);
        });
    }

    public function turunkanTingkat(Siswa $siswa, Kelas $tujuan, ?string $keterangan): void
    {
        $this->pindahKelas($siswa, $tujuan, $keterangan, alasan: 'koreksi');
    }

    public function setLulus(Siswa $siswa, ?string $keterangan): void
    {
        DB::transaction(function () use ($siswa, $keterangan) {
            $tanggal = now();
            KelasSiswa::where('siswa_id', $siswa->id)->whereNull('selesai')->update(['selesai' => $tanggal]);
            $siswa->update([
                'status' => 'lulus',
                'status_tanggal' => $tanggal,
                'status_keterangan' => $keterangan,
                'kelas_id' => null,
            ]);
        });
    }

    public function setKeluar(Siswa $siswa, ?string $keterangan): void
    {
        DB::transaction(function () use ($siswa, $keterangan) {
            $tanggal = now();
            KelasSiswa::where('siswa_id', $siswa->id)->whereNull('selesai')->update(['selesai' => $tanggal]);
            $siswa->update([
                'status' => 'keluar',
                'status_tanggal' => $tanggal,
                'status_keterangan' => $keterangan,
                'kelas_id' => null,
            ]);
        });
    }

    public function reaktivasi(Siswa $siswa, Kelas $tujuan, ?string $keterangan): void
    {
        DB::transaction(function () use ($siswa, $tujuan, $keterangan) {
            $tanggal = now();
            KelasSiswa::create([
                'siswa_id' => $siswa->id,
                'kelas_id' => $tujuan->id,
                'mulai' => $tanggal,
                'alasan' => 'koreksi',
                'keterangan' => $keterangan,
            ]);
            $siswa->update([
                'status' => 'aktif',
                'status_tanggal' => $tanggal,
                'status_keterangan' => $keterangan,
                'kelas_id' => $tujuan->id,
            ]);
        });
    }
}
