<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RekapPerSiswaSheet implements FromArray, WithStyles, WithTitle
{
    private const STATUS_KEYS = ['hadir', 'terlambat', 'alpha', 'sakit', 'izin', 'dispensasi'];

    private const STATUS_LABEL = [
        'hadir' => 'Hadir',
        'terlambat' => 'Terlambat',
        'alpha' => 'Alpha',
        'sakit' => 'Sakit',
        'izin' => 'Izin',
        'dispensasi' => 'Dispensasi',
    ];

    private const STATUS_WARNA = [
        'hadir' => 'FFDCFCE7',
        'terlambat' => 'FFFEF9C3',
        'alpha' => 'FFFEE2E2',
        'sakit' => 'FFE0F2FE',
        'izin' => 'FFDBEAFE',
        'dispensasi' => 'FFF3E8FF',
    ];

    private const HEADER_WARNA = 'FFABDAFC';

    public function __construct(
        private array $siswaList,
        private array $tanggalList,
        private array $liburMap,
        private array $matrix,
    ) {}

    public function title(): string
    {
        return 'Rekap Per Siswa';
    }

    public function array(): array
    {
        $rows = [];

        $header = ['No', 'Nama Siswa'];
        foreach (self::STATUS_KEYS as $key) {
            $header[] = self::STATUS_LABEL[$key];
        }
        $header[] = 'Total';
        $rows[] = $header;

        foreach ($this->siswaList as $i => $siswa) {
            $counts = array_fill_keys(self::STATUS_KEYS, 0);
            foreach ($this->tanggalList as $tgl) {
                if ($this->liburMap[$tgl] ?? false) {
                    continue;
                }
                $cell = $this->matrix[$siswa['id']][$tgl] ?? null;
                if ($cell && isset($counts[$cell['status']])) {
                    $counts[$cell['status']]++;
                }
            }

            $row = [$i + 1, $siswa['nama']];
            $total = 0;
            foreach (self::STATUS_KEYS as $key) {
                $row[] = $counts[$key];
                $total += $counts[$key];
            }
            $row[] = $total;
            $rows[] = $row;
        }

        return $rows;
    }

    public function styles(Worksheet $sheet): void
    {
        $totalStatus = count(self::STATUS_KEYS);
        $totalCols = 2 + $totalStatus + 1;
        $lastCol = $this->columnLetter($totalCols);
        $totalSiswa = count($this->siswaList);
        $lastDataRow = 1 + $totalSiswa;

        $sheet->getColumnDimension('A')->setWidth(5);
        $sheet->getColumnDimension('B')->setWidth(35);
        for ($c = 3; $c <= $totalCols; $c++) {
            $sheet->getColumnDimension($this->columnLetter($c))->setWidth(13);
        }

        $sheet->getStyle("A1:{$lastCol}1")->applyFromArray([
            'font' => ['bold' => true, 'color' => ['argb' => 'FF000000']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => self::HEADER_WARNA]],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
        ]);
        $sheet->getRowDimension(1)->setRowHeight(28);

        for ($row = 2; $row <= $lastDataRow; $row++) {
            $isEven = ($row - 1) % 2 === 0;
            $rowBg = $isEven ? 'FFFFFFFF' : 'FFF8FAFC';

            $sheet->getStyle("A{$row}:B{$row}")->applyFromArray([
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $rowBg]],
            ]);
            $sheet->getStyle("A{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

            $col = 3;
            foreach (self::STATUS_KEYS as $key) {
                $colLetter = $this->columnLetter($col);
                $sheet->getStyle("{$colLetter}{$row}")->applyFromArray([
                    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => self::STATUS_WARNA[$key]]],
                    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
                ]);
                $col++;
            }

            $totalColLetter = $this->columnLetter($totalCols);
            $sheet->getStyle("{$totalColLetter}{$row}")->applyFromArray([
                'font' => ['bold' => true],
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $rowBg]],
                'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
            ]);
        }

        $sheet->getStyle("A1:{$lastCol}{$lastDataRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF9CA3AF'],
                ],
            ],
        ]);

        $sheet->freezePane('C2');
    }

    private function columnLetter(int $index): string
    {
        $letter = '';
        while ($index > 0) {
            $index--;
            $letter = chr(65 + ($index % 26)).$letter;
            $index = (int) ($index / 26);
        }

        return $letter;
    }
}
