<?php

namespace App\Exports;

use App\Models\Kelas;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class KehadiranExport implements WithMultipleSheets
{
    public function __construct(
        private Kelas $kelas,
        private array $siswaList,
        private array $tanggalList,
        private array $matrix,
        private string $dari,
        private string $sampai,
    ) {}

    public function sheets(): array
    {
        return [
            new RekapKehadiranSheet(
                $this->kelas,
                $this->siswaList,
                $this->tanggalList,
                $this->matrix,
                $this->dari,
                $this->sampai,
            ),
            new RekapPerSiswaSheet(
                $this->siswaList,
                $this->tanggalList,
                $this->matrix,
            ),
        ];
    }
}
