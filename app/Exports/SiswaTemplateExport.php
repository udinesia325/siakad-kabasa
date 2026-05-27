<?php

namespace App\Exports;

use App\Models\KelasAjaran;
use App\Models\TahunAjaran;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SiswaTemplateExport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            new SiswaDataSheet,
            new SiswaKelasSheet,
        ];
    }
}

class SiswaDataSheet implements FromArray, WithStyles, WithTitle
{
    public function title(): string
    {
        return 'Data Siswa';
    }

    public function array(): array
    {
        return [
            ['Panduan Pengisian Import Siswa'],
            ['(*) Kolom bertanda bintang wajib diisi'],
            ['Kolom Kelas: salin nama kelas dari sheet "Daftar Kelas". Kosongkan jika siswa belum memiliki kelas.'],
            ['Kolom Jenis Kelamin: isi dengan L (Laki-laki) atau P (Perempuan).'],
            ['Kolom RFID: opsional, kosongkan jika belum ada.'],
            [],
            ['NIK*', 'NISN', 'Nama Siswa*', 'Jenis Kelamin*', 'Email', 'Alamat', 'Kelas', 'RFID'],
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 13]],
            7 => ['font' => ['bold' => true], 'fill' => ['fillType' => 'solid', 'startColor' => ['argb' => 'FFD9EAD3']]],
        ];
    }
}

class SiswaKelasSheet implements FromArray, WithStyles, WithTitle
{
    public function title(): string
    {
        return 'Daftar Kelas';
    }

    public function array(): array
    {
        $rows = [['Kelas']];

        $tahunAktif = TahunAjaran::where('is_active', true)->first();
        if ($tahunAktif) {
            $kelasList = KelasAjaran::with(['kelas', 'tingkat'])
                ->where('tahun_ajaran_id', $tahunAktif->id)
                ->orderBy('tingkat_id')
                ->orderBy('kelas_id')
                ->get();

            foreach ($kelasList as $ka) {
                $rows[] = [$ka->nama_lengkap];
            }
        }

        return $rows;
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true], 'fill' => ['fillType' => 'solid', 'startColor' => ['argb' => 'FFCFE2F3']]],
        ];
    }
}
