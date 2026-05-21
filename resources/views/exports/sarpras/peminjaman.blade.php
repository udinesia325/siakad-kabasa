<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<style>
body { font-family: sans-serif; font-size: 10px; color: #1a1a1a; }
h1 { font-size: 14px; font-weight: bold; margin: 0 0 2px; }
.subtitle { font-size: 10px; color: #666; margin-bottom: 12px; }
table { width: 100%; border-collapse: collapse; margin-top: 8px; }
th { background: #1e40af; color: white; padding: 5px 6px; text-align: left; font-size: 9px; }
td { padding: 4px 6px; border-bottom: 1px solid #e5e7eb; font-size: 9px; }
tr:nth-child(even) td { background: #f8fafc; }
.footer { margin-top: 12px; font-size: 8px; color: #999; }
</style>
</head>
<body>
<h1>Laporan Peminjaman Barang</h1>
<p class="subtitle">Dicetak: {{ $generatedAt }}@if(!empty($filters['dari'])) &middot; Periode: {{ $filters['dari'] }} s/d {{ $filters['sampai'] ?? 'sekarang' }}@endif</p>
<table>
<thead><tr>
<th>#</th><th>Barang</th><th>Peminjam</th><th>Tgl Pinjam</th><th>Tgl Kembali Rencana</th><th>Tgl Kembali Aktual</th><th>Status</th><th>Keperluan</th>
</tr></thead>
<tbody>
@foreach($peminjamans as $i => $p)
<tr>
<td>{{ $i + 1 }}</td>
<td>{{ $p->barang?->nama ?? '—' }} ({{ $p->barang?->kode ?? '—' }})</td>
<td>{{ $p->peminjam?->name ?? '—' }}</td>
<td>{{ $p->tgl_pinjam?->format('d/m/Y') ?? '—' }}</td>
<td>{{ $p->tgl_kembali_rencana?->format('d/m/Y') ?? '—' }}</td>
<td>{{ $p->tgl_kembali_aktual?->format('d/m/Y') ?? '—' }}</td>
<td>{{ ucfirst($p->status) }}</td>
<td>{{ Str::limit($p->keperluan, 40) }}</td>
</tr>
@endforeach
</tbody>
</table>
<p class="footer">Total: {{ count($peminjamans) }} record</p>
</body>
</html>
