<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<style>
body { font-family: sans-serif; font-size: 9px; color: #1a1a1a; }
h1 { font-size: 14px; font-weight: bold; margin: 0 0 2px; }
h2 { font-size: 11px; font-weight: bold; margin: 16px 0 4px; }
.subtitle { font-size: 9px; color: #666; margin-bottom: 8px; }
table { width: 100%; border-collapse: collapse; margin-top: 4px; }
th { background: #1e40af; color: white; padding: 4px 5px; text-align: left; font-size: 8px; }
td { padding: 3px 5px; border-bottom: 1px solid #e5e7eb; font-size: 8px; }
tr:nth-child(even) td { background: #f8fafc; }
.footer { margin-top: 8px; font-size: 8px; color: #999; }
</style>
</head>
<body>
<h1>Laporan Kerusakan &amp; Maintenance</h1>
<p class="subtitle">Dicetak: {{ $generatedAt }}</p>

<h2>Laporan Kerusakan</h2>
<table>
<thead><tr>
<th>#</th><th>Barang</th><th>Pelapor</th><th>Prioritas</th><th>Status</th><th>Tgl Laporan</th><th>Tgl Selesai</th>
</tr></thead>
<tbody>
@foreach($kerusakans as $i => $k)
<tr>
<td>{{ $i + 1 }}</td>
<td>{{ $k->barang?->nama ?? '—' }}</td>
<td>{{ $k->pelapor?->name ?? '—' }}</td>
<td>{{ ucfirst($k->prioritas) }}</td>
<td>{{ ucfirst(str_replace('_', ' ', $k->status)) }}</td>
<td>{{ $k->created_at->format('d/m/Y') }}</td>
<td>{{ $k->tgl_selesai?->format('d/m/Y') ?? '—' }}</td>
</tr>
@endforeach
</tbody>
</table>
<p class="footer">Total: {{ count($kerusakans) }} kerusakan</p>

<h2>Jadwal Maintenance</h2>
<table>
<thead><tr>
<th>#</th><th>Barang</th><th>Vendor</th><th>Tgl Rencana</th><th>Tgl Selesai</th><th>Interval</th><th>Status</th>
</tr></thead>
<tbody>
@foreach($maintenances as $i => $m)
<tr>
<td>{{ $i + 1 }}</td>
<td>{{ $m->barang?->nama ?? '—' }}</td>
<td>{{ $m->vendor?->nama ?? '—' }}</td>
<td>{{ $m->tgl_rencana?->format('d/m/Y') ?? '—' }}</td>
<td>{{ $m->tgl_selesai?->format('d/m/Y') ?? '—' }}</td>
<td>{{ ucfirst($m->interval) }}</td>
<td>{{ ucfirst($m->status) }}</td>
</tr>
@endforeach
</tbody>
</table>
<p class="footer">Total: {{ count($maintenances) }} jadwal maintenance</p>
</body>
</html>
