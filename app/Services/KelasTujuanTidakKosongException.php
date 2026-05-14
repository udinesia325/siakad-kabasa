<?php

namespace App\Services;

use RuntimeException;

class KelasTujuanTidakKosongException extends RuntimeException
{
    public function __construct(public readonly int $jumlah)
    {
        parent::__construct("Kelas tujuan masih berisi {$jumlah} siswa aktif.");
    }
}
