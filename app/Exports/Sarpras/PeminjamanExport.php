<?php

namespace App\Exports\Sarpras;

use App\Models\Sarpras\Peminjaman;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PeminjamanExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    public function __construct(
        private ?string $dari = null,
        private ?string $sampai = null,
        private ?string $status = null,
    ) {}

    public function collection()
    {
        return Peminjaman::with(['barang:id,nama,kode', 'peminjam:id,name', 'approvedBy:id,name'])
            ->when($this->dari, fn ($q) => $q->where('tgl_pinjam', '>=', $this->dari))
            ->when($this->sampai, fn ($q) => $q->where('tgl_pinjam', '<=', $this->sampai))
            ->when($this->status, fn ($q) => $q->where('status', $this->status))
            ->orderBy('tgl_pinjam', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return ['Barang', 'Kode Barang', 'Peminjam', 'Tgl Pinjam', 'Tgl Kembali Rencana', 'Tgl Kembali Aktual', 'Status', 'Keperluan', 'Disetujui Oleh'];
    }

    public function map($row): array
    {
        return [
            $row->barang?->nama ?? '—',
            $row->barang?->kode ?? '—',
            $row->peminjam?->name ?? '—',
            $row->tgl_pinjam?->format('d/m/Y') ?? '—',
            $row->tgl_kembali_rencana?->format('d/m/Y') ?? '—',
            $row->tgl_kembali_aktual?->format('d/m/Y') ?? '—',
            ucfirst($row->status),
            $row->keperluan,
            $row->approvedBy?->name ?? '—',
        ];
    }

    public function title(): string
    {
        return 'Peminjaman';
    }

    public function styles(Worksheet $sheet)
    {
        return [1 => ['font' => ['bold' => true]]];
    }
}
