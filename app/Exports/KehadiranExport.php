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
        'hadir'       => 'H',
        'terlambat'   => 'T',
        'alpha'       => 'A',
        'sakit'       => 'S',
        'izin'        => 'I',
        'dispensasi'  => 'D',
    ];

    private const STATUS_WARNA = [
        'hadir'       => 'FFDCFCE7',
        'terlambat'   => 'FFFEF9C3',
        'alpha'       => 'FFFEE2E2',
        'sakit'       => 'FFE0F2FE',
        'izin'        => 'FFDBEAFE',
        'dispensasi'  => 'FFF3E8FF',
    ];

    // Row 1-7 are header rows, row 8 is the table header
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

        // Row 1: School name
        $rows[] = ['SMK Babussalam'];

        // Row 2: Kelas + Tahun Ajaran
        $tahunAjaran = $this->kelas->tahunAjaran->nama ?? '';
        $rows[] = ['Kelas: ' . $this->kelas->nama . '   Tahun Ajaran: ' . $tahunAjaran];

        // Row 3: Periode
        $dariFormatted   = Carbon::parse($this->dari)->translatedFormat('d F Y');
        $sampaiFormatted = Carbon::parse($this->sampai)->translatedFormat('d F Y');
        $rows[] = ['Periode: ' . $dariFormatted . ' – ' . $sampaiFormatted];

        // Row 4: Empty
        $rows[] = [];

        // Row 5: Legenda
        $rows[] = ['Legenda: H=Hadir  T=Terlambat  A=Alpha  S=Sakit  I=Izin  D=Dispensasi'];

        // Row 6: Keterangan anulir
        $rows[] = ['Ket: tanda (*) setelah huruf menunjukkan data hasil anulir. Contoh: H* = Hadir (anulir). Untuk informasi lebih detail mengenai anulir, hubungi staff Tata Usaha.'];

        // Row 7: Empty
        $rows[] = [];

        // Row 8: Table header
        $headerRow = ['No', 'Nama Siswa'];
        foreach ($this->tanggalList as $tgl) {
            $carbon = Carbon::parse($tgl);
            // Format: "Kam 7/5"
            $headerRow[] = $carbon->translatedFormat('D') . ' ' . $carbon->format('j/n');
        }
        $rows[] = $headerRow;

        // Data rows (starting at row 9)
        foreach ($this->siswaList as $i => $siswa) {
            $dataRow = [$i + 1, $siswa['nama']];
            foreach ($this->tanggalList as $tgl) {
                $cell = $this->matrix[$siswa['id']][$tgl] ?? null;
                if ($cell === null || $cell['status'] === '') {
                    $dataRow[] = '';
                } else {
                    $huruf      = self::STATUS_HURUF[$cell['status']] ?? $cell['status'];
                    $dataRow[]  = $cell['is_anulir'] ? $huruf . '*' : $huruf;
                }
            }
            $rows[] = $dataRow;
        }

        // Empty row after data
        $rows[] = [];

        $rows[] = ['No', 'Nama Siswa', 'H', 'T', 'A', 'S', 'I', 'D', 'Total Hari'];

        // Summary data rows
        foreach ($this->siswaList as $i => $siswa) {
            $counts = ['hadir' => 0, 'terlambat' => 0, 'alpha' => 0, 'sakit' => 0, 'izin' => 0, 'dispensasi' => 0];
            foreach ($this->tanggalList as $tgl) {
                $cell = $this->matrix[$siswa['id']][$tgl] ?? null;
                if ($cell && isset($counts[$cell['status']])) {
                    $counts[$cell['status']]++;
                }
            }
            $total = array_sum($counts);
            $rows[] = [
                $i + 1,
                $siswa['nama'],
                $counts['hadir'],
                $counts['terlambat'],
                $counts['alpha'],
                $counts['sakit'],
                $counts['izin'],
                $counts['dispensasi'],
                $total,
            ];
        }

        return $rows;
    }

    public function styles(Worksheet $sheet): void
    {
        $totalCols    = 2 + count($this->tanggalList);
        $lastCol      = $this->columnLetter($totalCols);
        $totalSiswa   = count($this->siswaList);
        $lastDataRow  = self::HEADER_ROW_COUNT + $totalSiswa;

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

        // ── Merge header info rows (A1:lastCol1, A2:..., A3:...) ──
        $sheet->mergeCells("A1:{$lastCol}1");
        $sheet->mergeCells("A2:{$lastCol}2");
        $sheet->mergeCells("A3:{$lastCol}3");
        $sheet->mergeCells("A5:{$lastCol}5");
        $sheet->mergeCells("A6:{$lastCol}6");

        // ── Row 8: Table header — green bg, white text, bold ──
        $headerRange = "A8:{$lastCol}8";
        $sheet->getStyle($headerRange)->applyFromArray([
            'font'      => ['bold' => true, 'color' => ['argb' => 'FFFFFFFF']],
            'fill'      => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FF16A34A']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
        ]);

        // ── Data rows: zebra striping + status cell coloring ──
        for ($row = self::HEADER_ROW_COUNT + 1; $row <= $lastDataRow; $row++) {
            $isEven    = ($row - self::HEADER_ROW_COUNT) % 2 === 0;
            $rowBg     = $isEven ? 'FFFFFFFF' : 'FFF8FAFC';

            // Apply row background to No and Nama
            $sheet->getStyle("A{$row}:B{$row}")->applyFromArray([
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $rowBg]],
            ]);

            // Apply status colors to date columns
            $siswaIdx = $row - self::HEADER_ROW_COUNT - 1;
            $siswa    = $this->siswaList[$siswaIdx] ?? null;

            for ($c = 3; $c <= $totalCols; $c++) {
                $colLetter = $this->columnLetter($c);
                $tgl       = $this->tanggalList[$c - 3] ?? null;
                $cell      = ($siswa && $tgl) ? ($this->matrix[$siswa['id']][$tgl] ?? null) : null;

                if ($cell && $cell['status'] !== '' && isset(self::STATUS_WARNA[$cell['status']])) {
                    $bg = self::STATUS_WARNA[$cell['status']];
                } else {
                    $bg = $rowBg;
                }

                $sheet->getStyle("{$colLetter}{$row}")->applyFromArray([
                    'fill'      => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $bg]],
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
                    'color'       => ['argb' => 'FFD1D5DB'],
                ],
            ],
        ]);

        // ── Summary table ──
        $summaryHeaderRow = $lastDataRow + 2;
        $summaryLastRow   = $summaryHeaderRow + $totalSiswa;
        $summaryLastCol   = 'I'; // Fixed: No, Nama, H, T, A, S, I, D, Total (9 cols)

        $sheet->getStyle("A{$summaryHeaderRow}:{$summaryLastCol}{$summaryHeaderRow}")->applyFromArray([
            'font'      => ['bold' => true, 'color' => ['argb' => 'FFFFFFFF']],
            'fill'      => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => 'FF16A34A']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
        ]);

        $sheet->getStyle("A{$summaryHeaderRow}:{$summaryLastCol}{$summaryLastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color'       => ['argb' => 'FFD1D5DB'],
                ],
            ],
        ]);

        for ($row = $summaryHeaderRow + 1; $row <= $summaryLastRow; $row++) {
            $isEven = ($row - $summaryHeaderRow) % 2 === 0;
            $rowBg  = $isEven ? 'FFFFFFFF' : 'FFF8FAFC';
            $sheet->getStyle("A{$row}:{$summaryLastCol}{$row}")->applyFromArray([
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $rowBg]],
            ]);
            $sheet->getStyle("A{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            // Center numeric summary columns (C-I)
            $sheet->getStyle("C{$row}:{$summaryLastCol}{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        }
    }

    private function columnLetter(int $index): string
    {
        $letter = '';
        while ($index > 0) {
            $index--;
            $letter  = chr(65 + ($index % 26)) . $letter;
            $index   = (int) ($index / 26);
        }

        return $letter;
    }
}
