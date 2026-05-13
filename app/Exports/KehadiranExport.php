<?php

namespace App\Exports;

use App\Models\Kelas;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class KehadiranExport implements FromArray, WithStyles, WithTitle
{
    private const STATUS_HURUF = [
        'hadir' => 'H',
        'terlambat' => 'T',
        'alpha' => 'A',
        'sakit' => 'S',
        'izin' => 'I',
        'dispensasi' => 'D',
    ];

    private const STATUS_WARNA = [
        'hadir' => 'FFDCFCE7',
        'terlambat' => 'FFFEF9C3',
        'alpha' => 'FFFEE2E2',
        'sakit' => 'FFE0F2FE',
        'izin' => 'FFDBEAFE',
        'dispensasi' => 'FFF3E8FF',
    ];

    // Row 1: SMK, Row 2: Kelas+TA, Row 3: Periode, Row 4: empty,
    // Row 5: Legenda, Row 6: Ket, Row 7: empty, Row 8: table header
    private const HEADER_ROW_COUNT = 8;

    public function __construct(
        private Kelas $kelas,
        private array $siswaList,
        private array $tanggalList,
        private array $matrix,
        private string $dari,
        private string $sampai,
    ) {}

    public function title(): string
    {
        return 'Rekap Kehadiran';
    }

    public function array(): array
    {
        $rows = [];

        $tahunAjaran = $this->kelas->tahunAjaran?->nama ?? '';
        $dariFormatted = Carbon::parse($this->dari)->translatedFormat('d F Y');
        $sampaiFormatted = Carbon::parse($this->sampai)->translatedFormat('d F Y');

        $rows[] = ['SMK Babussalam'];
        $rows[] = ['Kelas: '.$this->kelas->nama.'   Tahun Ajaran: '.$tahunAjaran];
        $rows[] = ['Periode: '.$dariFormatted.' – '.$sampaiFormatted];
        $rows[] = [''];
        $rows[] = ['Simbol: H=Hadir  T=Terlambat  A=Alpha  S=Sakit  I=Izin  D=Dispensasi'];
        $rows[] = ['Ket: tanda (*) setelah huruf menunjukkan data hasil anulir. Contoh: H* = Hadir (anulir). Untuk informasi lebih detail mengenai anulir, hubungi staff Tata Usaha.'];
        $rows[] = [''];

        // Row 8: table header — "No" di col A, "Nama Siswa" di col B, hari\ntanggal di col C dst
        $hariId = ['Mon' => 'Sen', 'Tue' => 'Sel', 'Wed' => 'Rab', 'Thu' => 'Kam', 'Fri' => 'Jum', 'Sat' => 'Sab', 'Sun' => 'Min'];
        $headerRow = ['No', 'Nama Siswa'];
        foreach ($this->tanggalList as $tgl) {
            $carbon = Carbon::parse($tgl);
            $hari = $hariId[$carbon->format('D')] ?? $carbon->format('D');
            $headerRow[] = $hari."\n".$carbon->format('j/n');
        }
        $rows[] = $headerRow;

        // Data rows
        foreach ($this->siswaList as $i => $siswa) {
            $dataRow = [$i + 1, $siswa['nama']];
            foreach ($this->tanggalList as $tgl) {
                $cell = $this->matrix[$siswa['id']][$tgl] ?? null;
                if ($cell === null || $cell['status'] === '') {
                    $dataRow[] = '';
                } else {
                    $huruf = self::STATUS_HURUF[$cell['status']] ?? $cell['status'];
                    $dataRow[] = $cell['is_anulir'] ? $huruf.'*' : $huruf;
                }
            }
            $rows[] = $dataRow;
        }

        // Baris kosong pemisah
        $rows[] = [''];

        // Hitung total semua siswa per status
        $totals = ['hadir' => 0, 'terlambat' => 0, 'alpha' => 0, 'sakit' => 0, 'izin' => 0, 'dispensasi' => 0];
        foreach ($this->siswaList as $siswa) {
            foreach ($this->tanggalList as $tgl) {
                $cell = $this->matrix[$siswa['id']][$tgl] ?? null;
                if ($cell && isset($totals[$cell['status']])) {
                    $totals[$cell['status']]++;
                }
            }
        }

        // Summary header
        $rows[] = ['Status', 'Total'];

        // Summary rows — satu baris per status
        $labelMap = [
            'hadir'       => 'H — Hadir',
            'terlambat'   => 'T — Terlambat',
            'alpha'       => 'A — Alpha',
            'sakit'       => 'S — Sakit',
            'izin'        => 'I — Izin',
            'dispensasi'  => 'D — Dispensasi',
        ];
        foreach ($labelMap as $status => $label) {
            $rows[] = [$label, $totals[$status]];
        }

        return $rows;
    }

    public function styles(Worksheet $sheet): void
    {
        $totalCols = 2 + count($this->tanggalList);
        $lastCol = $this->columnLetter($totalCols);
        $totalSiswa = count($this->siswaList);
        $lastDataRow = self::HEADER_ROW_COUNT + $totalSiswa;

        // ── Column Widths ──
        $sheet->getColumnDimension('A')->setWidth(5);
        $sheet->getColumnDimension('B')->setWidth(35);
        for ($c = 3; $c <= $totalCols; $c++) {
            $sheet->getColumnDimension($this->columnLetter($c))->setAutoSize(true);
        }

        // ── Row 1: School name — bold, font 14 ──
        $sheet->getStyle('A1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 14],
        ]);

        // ── Merge header info rows ──
        // Use max(totalCols, 9) to ensure merge covers at least summary width
        $mergeLastCol = $this->columnLetter(max($totalCols, 9));
        $sheet->mergeCells("A1:{$mergeLastCol}1");
        $sheet->mergeCells("A2:{$mergeLastCol}2");
        $sheet->mergeCells("A3:{$mergeLastCol}3");
        $sheet->mergeCells("A5:{$mergeLastCol}5");
        $sheet->mergeCells("A6:{$mergeLastCol}6");

        // ── Row 8: Table header — apply style cell-by-cell to avoid merge conflicts ──
        $headerStyle = [
            'font' => ['bold' => true, 'color' => ['argb' => 'FF000000']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFDCFCE7']],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
        ];
        for ($c = 1; $c <= $totalCols; $c++) {
            $sheet->getStyle($this->columnLetter($c).'8')->applyFromArray($headerStyle);
        }
        $sheet->getRowDimension(8)->setRowHeight(32);

        // ── Data rows: zebra striping + status cell coloring ──
        for ($row = self::HEADER_ROW_COUNT + 1; $row <= $lastDataRow; $row++) {
            $isEven = ($row - self::HEADER_ROW_COUNT) % 2 === 0;
            $rowBg = $isEven ? 'FFFFFFFF' : 'FFF8FAFC';

            // Apply row background to No and Nama
            $sheet->getStyle("A{$row}:B{$row}")->applyFromArray([
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $rowBg]],
            ]);

            // Apply status colors to date columns
            $siswaIdx = $row - self::HEADER_ROW_COUNT - 1;
            $siswa = $this->siswaList[$siswaIdx] ?? null;

            for ($c = 3; $c <= $totalCols; $c++) {
                $colLetter = $this->columnLetter($c);
                $tgl = $this->tanggalList[$c - 3] ?? null;
                $cell = ($siswa && $tgl) ? ($this->matrix[$siswa['id']][$tgl] ?? null) : null;

                if ($cell && $cell['status'] !== '' && isset(self::STATUS_WARNA[$cell['status']])) {
                    $bg = self::STATUS_WARNA[$cell['status']];
                } else {
                    $bg = $rowBg;
                }

                $sheet->getStyle("{$colLetter}{$row}")->applyFromArray([
                    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $bg]],
                    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
                ]);
            }

            // Center No column
            $sheet->getStyle("A{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        }

        // ── Borders on data table ──
        $dataTableRange = "A8:{$lastCol}{$lastDataRow}";
        $sheet->getStyle($dataTableRange)->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF9CA3AF'],
                ],
            ],
        ]);

        // ── Summary table — 2 kolom: Status | Total ──
        // +1 baris kosong, +1 summary header = offset 2
        $summaryHeaderRow = $lastDataRow + 2;
        $summaryLastRow = $summaryHeaderRow + 6; // 6 status

        // Header summary
        $sheet->getStyle("A{$summaryHeaderRow}:B{$summaryHeaderRow}")->applyFromArray([
            'font' => ['bold' => true, 'color' => ['argb' => 'FF000000']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FFDCFCE7']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
        ]);

        // Data rows summary: zebra + warna status di kolom A + center angka di B
        $statusWarna = [
            $summaryHeaderRow + 1 => self::STATUS_WARNA['hadir'],
            $summaryHeaderRow + 2 => self::STATUS_WARNA['terlambat'],
            $summaryHeaderRow + 3 => self::STATUS_WARNA['alpha'],
            $summaryHeaderRow + 4 => self::STATUS_WARNA['sakit'],
            $summaryHeaderRow + 5 => self::STATUS_WARNA['izin'],
            $summaryHeaderRow + 6 => self::STATUS_WARNA['dispensasi'],
        ];
        for ($row = $summaryHeaderRow + 1; $row <= $summaryLastRow; $row++) {
            $bg = $statusWarna[$row];
            $sheet->getStyle("A{$row}:B{$row}")->applyFromArray([
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $bg]],
            ]);
            $sheet->getStyle("B{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        }

        // Lebar kolom A dan B summary
        $sheet->getColumnDimension('A')->setWidth(max(20, $sheet->getColumnDimension('A')->getWidth()));
        $sheet->getColumnDimension('B')->setWidth(10);

        // Border summary table
        $sheet->getStyle("A{$summaryHeaderRow}:B{$summaryLastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF9CA3AF'],
                ],
            ],
        ]);
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
