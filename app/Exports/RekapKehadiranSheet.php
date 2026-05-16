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

class RekapKehadiranSheet implements FromArray, WithStyles, WithTitle
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

    private const HEADER_WARNA = 'FFABDAFC';

    private const LIBUR_WARNA = 'FFE5E7EB';

    private const HEADER_ROW_COUNT = 8;

    // Nama Siswa di-merge B:C; tanggal mulai dari kolom D (index 4)
    private const TANGGAL_START_COL = 4;

    public function __construct(
        private Kelas $kelas,
        private array $siswaList,
        private array $tanggalList,
        private array $liburMap,
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

        $hariId = ['Mon' => 'Sen', 'Tue' => 'Sel', 'Wed' => 'Rab', 'Thu' => 'Kam', 'Fri' => 'Jum', 'Sat' => 'Sab', 'Sun' => 'Min'];
        // A=No, B=Nama Siswa (merged B:C), C=(placeholder kosong), D..=tanggal
        $headerRow = ['No', 'Nama Siswa', ''];
        foreach ($this->tanggalList as $tgl) {
            $carbon = Carbon::parse($tgl);
            $hari = $hariId[$carbon->format('D')] ?? $carbon->format('D');
            $headerRow[] = $hari."\n".$carbon->format('j/n');
        }
        $rows[] = $headerRow;

        foreach ($this->siswaList as $i => $siswa) {
            $dataRow = [$i + 1, $siswa['nama'], ''];
            foreach ($this->tanggalList as $tgl) {
                if ($this->liburMap[$tgl] ?? false) {
                    $dataRow[] = '';
                    continue;
                }
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

        $rows[] = [''];

        $totals = ['hadir' => 0, 'terlambat' => 0, 'alpha' => 0, 'sakit' => 0, 'izin' => 0, 'dispensasi' => 0];
        foreach ($this->siswaList as $siswa) {
            foreach ($this->tanggalList as $tgl) {
                if ($this->liburMap[$tgl] ?? false) {
                    continue;
                }
                $cell = $this->matrix[$siswa['id']][$tgl] ?? null;
                if ($cell && isset($totals[$cell['status']])) {
                    $totals[$cell['status']]++;
                }
            }
        }

        // Summary table: A=Status, B=Total (tidak merge — width terpisah)
        $rows[] = ['Status', 'Total'];

        $labelMap = [
            'hadir' => 'H — Hadir',
            'terlambat' => 'T — Terlambat',
            'alpha' => 'A — Alpha',
            'sakit' => 'S — Sakit',
            'izin' => 'I — Izin',
            'dispensasi' => 'D — Dispensasi',
        ];
        foreach ($labelMap as $status => $label) {
            $rows[] = [$label, $totals[$status]];
        }

        return $rows;
    }

    public function styles(Worksheet $sheet): void
    {
        // Total kolom data table: No + Nama(merged 2 cols) + tanggal
        $totalCols = 3 + count($this->tanggalList);
        $lastCol = $this->columnLetter($totalCols);
        $totalSiswa = count($this->siswaList);
        $lastDataRow = self::HEADER_ROW_COUNT + $totalSiswa;

        // ── Column Widths ──
        // A=No (sempit), B+C merged untuk Nama Siswa.
        // B dipakai untuk "Total" di tabel summary — buat sempit.
        // C kompensasi agar Nama Siswa (merged) tetap lebar total ~45.
        $sheet->getColumnDimension('A')->setWidth(5);          // No
        $sheet->getColumnDimension('B')->setWidth(12);         // Total (di summary) / Nama part 1
        $sheet->getColumnDimension('C')->setWidth(33);         // Nama part 2 (merged dengan B = 45)
        for ($c = self::TANGGAL_START_COL; $c <= $totalCols; $c++) {
            $sheet->getColumnDimension($this->columnLetter($c))->setWidth(9);
        }

        // ── School name ──
        $sheet->getStyle('A1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 14],
        ]);

        // ── Merge header info rows ──
        $mergeLastCol = $this->columnLetter(max($totalCols, 9));
        $sheet->mergeCells("A1:{$mergeLastCol}1");
        $sheet->mergeCells("A2:{$mergeLastCol}2");
        $sheet->mergeCells("A3:{$mergeLastCol}3");
        $sheet->mergeCells("A5:{$mergeLastCol}5");
        $sheet->mergeCells("A6:{$mergeLastCol}6");

        // ── Table header (row 8) ──
        // Merge B8:C8 untuk Nama Siswa
        $sheet->mergeCells('B8:C8');

        $headerStyle = [
            'font' => ['bold' => true, 'color' => ['argb' => 'FF000000']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => self::HEADER_WARNA]],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
        ];
        // Apply header style: A8, B8:C8 (merged), D8 dst
        $sheet->getStyle('A8')->applyFromArray($headerStyle);
        $sheet->getStyle('B8:C8')->applyFromArray($headerStyle);
        for ($c = self::TANGGAL_START_COL; $c <= $totalCols; $c++) {
            $tgl = $this->tanggalList[$c - self::TANGGAL_START_COL] ?? null;
            $isLibur = $tgl && ($this->liburMap[$tgl] ?? false);
            $colStyle = $isLibur
                ? array_merge($headerStyle, ['fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => self::LIBUR_WARNA]]])
                : $headerStyle;
            $sheet->getStyle($this->columnLetter($c).'8')->applyFromArray($colStyle);
        }
        $sheet->getRowDimension(8)->setRowHeight(32);

        // ── Data rows ──
        for ($row = self::HEADER_ROW_COUNT + 1; $row <= $lastDataRow; $row++) {
            // Merge Nama Siswa untuk row ini
            $sheet->mergeCells("B{$row}:C{$row}");

            $isEven = ($row - self::HEADER_ROW_COUNT) % 2 === 0;
            $rowBg = $isEven ? 'FFFFFFFF' : 'FFF8FAFC';

            // Background No + Nama (B:C)
            $sheet->getStyle("A{$row}:C{$row}")->applyFromArray([
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $rowBg]],
            ]);

            $siswaIdx = $row - self::HEADER_ROW_COUNT - 1;
            $siswa = $this->siswaList[$siswaIdx] ?? null;

            for ($c = self::TANGGAL_START_COL; $c <= $totalCols; $c++) {
                $colLetter = $this->columnLetter($c);
                $tgl = $this->tanggalList[$c - self::TANGGAL_START_COL] ?? null;
                $isLibur = $tgl && ($this->liburMap[$tgl] ?? false);
                $cell = ($siswa && $tgl && ! $isLibur) ? ($this->matrix[$siswa['id']][$tgl] ?? null) : null;

                if ($isLibur) {
                    $bg = self::LIBUR_WARNA;
                } elseif ($cell && $cell['status'] !== '' && isset(self::STATUS_WARNA[$cell['status']])) {
                    $bg = self::STATUS_WARNA[$cell['status']];
                } else {
                    $bg = $rowBg;
                }

                $sheet->getStyle("{$colLetter}{$row}")->applyFromArray([
                    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => $bg]],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                ]);
            }

            $sheet->getStyle("A{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle("A{$row}")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);
            $sheet->getStyle("B{$row}")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);
            $sheet->getRowDimension($row)->setRowHeight(24);
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

        // ── Summary table: A=Status, B=Total (tidak merge) ──
        $summaryHeaderRow = $lastDataRow + 2;
        $summaryLastRow = $summaryHeaderRow + 6;

        // Kolom A perlu lebar untuk label "D — Dispensasi" — override width No (5)
        // menjadi 20. Kolom No tetap terlihat OK karena angka pendek + center-aligned.
        $sheet->getColumnDimension('A')->setWidth(20);

        $sheet->getStyle("A{$summaryHeaderRow}:B{$summaryHeaderRow}")->applyFromArray([
            'font' => ['bold' => true, 'color' => ['argb' => 'FF000000']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['argb' => self::HEADER_WARNA]],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
        ]);

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
