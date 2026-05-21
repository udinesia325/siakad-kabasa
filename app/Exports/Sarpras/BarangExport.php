<?php

namespace App\Exports\Sarpras;

use App\Models\Sarpras\Barang;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class BarangExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    public function __construct(private ?string $kondisi = null, private ?int $kategoriId = null) {}

    public function collection()
    {
        return Barang::with(['kategori:id,nama', 'lokasi:id,nama', 'vendor:id,nama'])
            ->when($this->kondisi, fn ($q) => $q->where('kondisi', $this->kondisi))
            ->when($this->kategoriId, fn ($q) => $q->where('kategori_id', $this->kategoriId))
            ->orderBy('nama')
            ->get();
    }

    public function headings(): array
    {
        return ['Kode', 'Nama Barang', 'Kategori', 'Lokasi', 'Kondisi', 'Satuan', 'Jumlah', 'Tahun Beli', 'Harga Beli (Rp)', 'Vendor', 'Sumber Dana'];
    }

    public function map($row): array
    {
        return [
            $row->kode,
            $row->nama,
            $row->kategori?->nama ?? '—',
            $row->lokasi?->nama ?? '—',
            ucfirst(str_replace('_', ' ', $row->kondisi)),
            $row->satuan,
            $row->jumlah_unit,
            $row->tahun_beli ?? '—',
            $row->harga_beli ?? 0,
            $row->vendor?->nama ?? '—',
            $row->sumber_dana ?? '—',
        ];
    }

    public function title(): string
    {
        return 'Inventaris Barang';
    }

    public function styles(Worksheet $sheet)
    {
        return [1 => ['font' => ['bold' => true]]];
    }
}
