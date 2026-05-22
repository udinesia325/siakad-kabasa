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
<h1>Laporan Inventaris Barang</h1>
<p class="subtitle">
Dicetak: {{ $generatedAt }}
@if(!empty($filters['kondisi'])) · Kondisi: {{ ucfirst(str_replace('_', ' ', $filters['kondisi'])) }}@endif
@if(!empty($kategoriNama)) · Kategori: {{ $kategoriNama }}@endif
</p>
<table>
<thead><tr>
<th>#</th><th>Kode</th><th>Nama Barang</th><th>Kategori</th><th>Lokasi</th><th>Kondisi</th><th>Jml</th><th>Thn Beli</th><th>Harga Beli</th>
</tr></thead>
<tbody>
@foreach($barangs as $i => $b)
<tr>
<td>{{ $i + 1 }}</td>
<td>{{ $b->kode }}</td>
<td>{{ $b->nama }}</td>
<td>{{ $b->kategori?->nama ?? '—' }}</td>
<td>{{ $b->lokasi?->nama ?? '—' }}</td>
<td>{{ ucfirst(str_replace('_', ' ', $b->kondisi)) }}</td>
<td>{{ $b->jumlah_unit }}</td>
<td>{{ $b->tahun_beli ?? '—' }}</td>
<td>{{ $b->harga_beli ? 'Rp ' . number_format($b->harga_beli, 0, ',', '.') : '—' }}</td>
</tr>
@endforeach
</tbody>
</table>
<p class="footer">Total: {{ count($barangs) }} barang</p>
</body>
</html>
