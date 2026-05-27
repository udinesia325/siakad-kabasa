<?php

namespace App\Exports;

use App\Models\KelasAjaran;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class KehadiranExport implements WithMultipleSheets
{
    public function __construct(
        private KelasAjaran $kelasAjaran,
        private array $siswaList,
        private array $tanggalList,
        private array $liburMap,
        private array $matrix,
        private string $dari,
        private string $sampai,
    ) {}

    public function sheets(): array
    {
        return [
            new RekapKehadiranSheet(
                $this->kelasAjaran,
                $this->siswaList,
                $this->tanggalList,
                $this->liburMap,
                $this->matrix,
                $this->dari,
                $this->sampai,
            ),
            new RekapPerSiswaSheet(
                $this->siswaList,
                $this->tanggalList,
                $this->liburMap,
                $this->matrix,
            ),
        ];
    }
}
