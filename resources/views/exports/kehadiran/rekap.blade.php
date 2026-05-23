<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<style>
@page { size: A4 landscape; margin: 10mm 10mm 10mm 10mm; }
* { box-sizing: border-box; }
body { font-family: sans-serif; font-size: 8px; color: #1a1a1a; margin: 0; }
h1 { font-size: 13px; font-weight: bold; margin: 0 0 2px; }
.subtitle { font-size: 8px; color: #555; margin-bottom: 2px; }
.keterangan { font-size: 7.5px; color: #555; margin-bottom: 10px; }

table { width: 100%; border-collapse: collapse; }
th { background: #1e40af; color: white; padding: 4px 3px; text-align: center; font-size: 7.5px; border: 1px solid #1e3a8a; }
th.col-nama { text-align: left; }
td { padding: 3px 3px; border: 1px solid #d1d5db; font-size: 7.5px; vertical-align: middle; }
td.col-no { text-align: center; width: 22px; }
td.col-nama { min-width: 110px; }
td.col-tgl { text-align: center; min-width: 22px; }
tr:nth-child(even) td.col-no, tr:nth-child(even) td.col-nama { background: #f8fafc; }
td.libur { background: #e5e7eb !important; }

/* status colors */
td.s-hadir      { background: #dcfce7; text-align: center; }
td.s-terlambat  { background: #fef9c3; text-align: center; }
td.s-alpha      { background: #fee2e2; text-align: center; }
td.s-sakit      { background: #e0f2fe; text-align: center; }
td.s-izin       { background: #dbeafe; text-align: center; }
td.s-dispensasi { background: #f3e8ff; text-align: center; }

.summary { margin-top: 12px; display: inline-block; }
.summary table { width: auto; }
.summary th { font-size: 7.5px; min-width: 80px; }
.summary td { font-size: 7.5px; text-align: center; min-width: 50px; }
.summary td.label { text-align: left; padding-left: 5px; }
.footer { margin-top: 8px; font-size: 7px; color: #999; }

/* Sheet 2 */
.sheet2 { margin-top: 20px; }
.sheet2 th.col-nama2 { text-align: left; min-width: 140px; }
.sheet2 td.col-nama2 { min-width: 140px; }
.sheet2 td.cnt { text-align: center; }
.sheet2 td.cnt-hadir      { background: #dcfce7; text-align: center; }
.sheet2 td.cnt-terlambat  { background: #fef9c3; text-align: center; }
.sheet2 td.cnt-alpha      { background: #fee2e2; text-align: center; }
.sheet2 td.cnt-sakit      { background: #e0f2fe; text-align: center; }
.sheet2 td.cnt-izin       { background: #dbeafe; text-align: center; }
.sheet2 td.cnt-dispensasi { background: #f3e8ff; text-align: center; }
.sheet2 td.cnt-total      { font-weight: bold; text-align: center; }
</style>
</head>
<body>

{{-- ── Sheet 1: Rekap harian ── --}}
<h1>SMK Babussalam — Rekap Kehadiran</h1>
<p class="subtitle">Kelas: <strong>{{ $kelas->nama }}</strong> &nbsp;·&nbsp; Tahun Ajaran: {{ $kelas->tahunAjaran?->nama ?? '—' }}</p>
<p class="subtitle">Periode: {{ $dariFormatted }} – {{ $sampaiFormatted }}</p>
<p class="keterangan">Simbol: H=Hadir &nbsp; T=Terlambat &nbsp; A=Alpha &nbsp; S=Sakit &nbsp; I=Izin &nbsp; D=Dispensasi &nbsp;|&nbsp; Tanda (*) = data hasil anulir</p>

<table>
    <thead>
        <tr>
            <th style="width:22px">#</th>
            <th class="col-nama">Nama Siswa</th>
            @foreach($tanggalList as $tgl)
                @php $carbon = \Illuminate\Support\Carbon::parse($tgl); @endphp
                <th class="{{ ($liburMap[$tgl] ?? false) ? 'libur' : '' }}" style="width:22px; font-size:6.5px;">
                    {{ $hariId[$carbon->format('D')] ?? $carbon->format('D') }}<br>{{ $carbon->format('j/n') }}
                </th>
            @endforeach
        </tr>
    </thead>
    <tbody>
        @foreach($siswaList as $i => $siswa)
        <tr>
            <td class="col-no">{{ $i + 1 }}</td>
            <td class="col-nama">{{ $siswa['nama'] }}</td>
            @foreach($tanggalList as $tgl)
                @if($liburMap[$tgl] ?? false)
                    <td class="col-tgl libur"></td>
                @else
                    @php
                        $cell = $matrix[$siswa['id']][$tgl] ?? null;
                        $status = $cell['status'] ?? '';
                        $huruf = $statusHuruf[$status] ?? '';
                        $label = $cell ? ($cell['is_anulir'] ? $huruf.'*' : $huruf) : '';
                    @endphp
                    <td class="col-tgl s-{{ $status }}">{{ $label }}</td>
                @endif
            @endforeach
        </tr>
        @endforeach
    </tbody>
</table>

<div class="summary">
    <table>
        <thead>
            <tr>
                <th class="col-nama label" style="text-align:left;">Status</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($totals as $status => $total)
            <tr>
                <td class="label s-{{ $status }}">{{ $statusLabel[$status] }}</td>
                <td class="s-{{ $status }}">{{ $total }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

{{-- ── Sheet 2: Rekap per siswa ── --}}
<div class="sheet2">
    <h1 style="font-size:11px; margin-top:0;">Rekap Per Siswa</h1>
    <table>
        <thead>
            <tr>
                <th style="width:22px">#</th>
                <th class="col-nama2" style="text-align:left;">Nama Siswa</th>
                <th style="min-width:55px;">Hadir</th>
                <th style="min-width:65px;">Terlambat</th>
                <th style="min-width:45px;">Alpha</th>
                <th style="min-width:45px;">Sakit</th>
                <th style="min-width:40px;">Izin</th>
                <th style="min-width:65px;">Dispensasi</th>
                <th style="min-width:40px;">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($siswaList as $i => $siswa)
            @php
                $counts = ['hadir'=>0,'terlambat'=>0,'alpha'=>0,'sakit'=>0,'izin'=>0,'dispensasi'=>0];
                foreach($tanggalList as $tgl) {
                    if($liburMap[$tgl] ?? false) continue;
                    $cell = $matrix[$siswa['id']][$tgl] ?? null;
                    if($cell && isset($counts[$cell['status']])) $counts[$cell['status']]++;
                }
                $total = array_sum($counts);
            @endphp
            <tr>
                <td class="col-no">{{ $i + 1 }}</td>
                <td class="col-nama2">{{ $siswa['nama'] }}</td>
                <td class="cnt-hadir">{{ $counts['hadir'] }}</td>
                <td class="cnt-terlambat">{{ $counts['terlambat'] }}</td>
                <td class="cnt-alpha">{{ $counts['alpha'] }}</td>
                <td class="cnt-sakit">{{ $counts['sakit'] }}</td>
                <td class="cnt-izin">{{ $counts['izin'] }}</td>
                <td class="cnt-dispensasi">{{ $counts['dispensasi'] }}</td>
                <td class="cnt-total">{{ $total }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

<p class="footer">Dicetak: {{ $generatedAt }}</p>

</body>
</html>
