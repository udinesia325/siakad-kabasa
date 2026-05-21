<?php

namespace App\Exports\Sarpras;

use App\Models\Sarpras\Kerusakan;
use App\Models\Sarpras\Maintenance;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class KerusakanMaintenanceExport implements WithMultipleSheets
{
    public function __construct(private ?string $status = null) {}

    public function sheets(): array
    {
        return [
            new KerusakanSheet($this->status),
            new MaintenanceSheet,
        ];
    }
}

class KerusakanSheet implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    public function __construct(private ?string $status = null) {}

    public function collection()
    {
        return Kerusakan::with(['barang:id,nama,kode', 'pelapor:id,name', 'vendor:id,nama'])
            ->when($this->status, fn ($q) => $q->where('status', $this->status))
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return ['Barang', 'Kode', 'Pelapor', 'Deskripsi', 'Prioritas', 'Status', 'Vendor', 'Tgl Selesai', 'Tgl Laporan'];
    }

    public function map($row): array
    {
        return [
            $row->barang?->nama ?? '—',
            $row->barang?->kode ?? '—',
            $row->pelapor?->name ?? '—',
            $row->deskripsi,
            ucfirst($row->prioritas),
            ucfirst(str_replace('_', ' ', $row->status)),
            $row->vendor?->nama ?? '—',
            $row->tgl_selesai?->format('d/m/Y') ?? '—',
            $row->created_at->format('d/m/Y'),
        ];
    }

    public function title(): string
    {
        return 'Laporan Kerusakan';
    }

    public function styles(Worksheet $sheet)
    {
        return [1 => ['font' => ['bold' => true]]];
    }
}

class MaintenanceSheet implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    public function collection()
    {
        return Maintenance::with(['barang:id,nama,kode', 'vendor:id,nama'])
            ->orderBy('tgl_rencana', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return ['Barang', 'Kode', 'Vendor', 'Tgl Rencana', 'Tgl Selesai', 'Interval', 'Biaya (Rp)', 'Status', 'Catatan'];
    }

    public function map($row): array
    {
        return [
            $row->barang?->nama ?? '—',
            $row->barang?->kode ?? '—',
            $row->vendor?->nama ?? '—',
            $row->tgl_rencana?->format('d/m/Y') ?? '—',
            $row->tgl_selesai?->format('d/m/Y') ?? '—',
            ucfirst($row->interval),
            $row->biaya ?? 0,
            ucfirst($row->status),
            $row->catatan ?? '—',
        ];
    }

    public function title(): string
    {
        return 'Maintenance';
    }

    public function styles(Worksheet $sheet)
    {
        return [1 => ['font' => ['bold' => true]]];
    }
}
