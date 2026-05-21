<?php

namespace App\Http\Controllers\Sarpras;

use App\Http\Controllers\Controller;
use App\Models\Sarpras\Barang;
use App\Models\Sarpras\BookingRuangan;
use App\Models\Sarpras\Kerusakan;
use App\Models\Sarpras\Maintenance;
use App\Models\Sarpras\Peminjaman;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class SarprasDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $totalBarang = Barang::count();
        $totalBarangBaik = Barang::where('kondisi', 'baik')->count();
        $totalBarangRusak = Barang::whereIn('kondisi', ['rusak_ringan', 'rusak_berat'])->count();
        $totalBarangHilang = Barang::where('kondisi', 'hilang')->count();

        $peminjamanAktif = Peminjaman::where('status', 'disetujui')->count();
        $peminjamanMenunggu = Peminjaman::where('status', 'menunggu')->count();

        $bookingAktif = BookingRuangan::where('status', 'disetujui')->count();
        $bookingMenunggu = BookingRuangan::where('status', 'menunggu')->count();

        $kerusakanDilaporkan = Kerusakan::whereIn('status', ['dilaporkan', 'diproses', 'menunggu_sparepart'])->count();
        $kerusakanTinggiPrioritas = Kerusakan::where('prioritas', 'tinggi')
            ->whereIn('status', ['dilaporkan', 'diproses', 'menunggu_sparepart'])
            ->count();

        $maintenanceAkanDatang = Maintenance::where('status', 'dijadwalkan')
            ->whereBetween('tgl_rencana', [now()->toDateString(), now()->addDays(30)->toDateString()])
            ->count();

        $kondisiData = [
            ['kondisi' => 'Baik', 'jumlah' => $totalBarangBaik, 'fill' => 'oklch(0.527 0.154 150.069)'],
            ['kondisi' => 'Rusak Ringan', 'jumlah' => Barang::where('kondisi', 'rusak_ringan')->count(), 'fill' => 'oklch(0.7 0.18 50)'],
            ['kondisi' => 'Rusak Berat', 'jumlah' => Barang::where('kondisi', 'rusak_berat')->count(), 'fill' => 'oklch(0.577 0.245 27.325)'],
            ['kondisi' => 'Hilang', 'jumlah' => $totalBarangHilang, 'fill' => 'oklch(0.4 0.1 270)'],
        ];

        Carbon::setLocale('id');

        $peminjamanPerBulan = [];
        for ($i = 5; $i >= 0; $i--) {
            $bulan = now()->subMonths($i);
            $peminjamanPerBulan[] = [
                'label' => $bulan->translatedFormat('M Y'),
                'total' => Peminjaman::whereYear('tgl_pinjam', $bulan->year)
                    ->whereMonth('tgl_pinjam', $bulan->month)
                    ->count(),
                'dikembalikan' => Peminjaman::where('status', 'dikembalikan')
                    ->whereYear('tgl_pinjam', $bulan->year)
                    ->whereMonth('tgl_pinjam', $bulan->month)
                    ->count(),
            ];
        }

        $kerusakanPerBulan = [];
        for ($i = 5; $i >= 0; $i--) {
            $bulan = now()->subMonths($i);
            $kerusakanPerBulan[] = [
                'label' => $bulan->translatedFormat('M Y'),
                'dilaporkan' => Kerusakan::whereYear('created_at', $bulan->year)
                    ->whereMonth('created_at', $bulan->month)
                    ->count(),
                'selesai' => Kerusakan::where('status', 'selesai')
                    ->whereYear('created_at', $bulan->year)
                    ->whereMonth('created_at', $bulan->month)
                    ->count(),
            ];
        }

        $recentPeminjaman = Peminjaman::with(['barang:id,nama,kode', 'peminjam:id,name'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($p) => [
                'type' => 'peminjaman',
                'id' => $p->id,
                'label' => $p->barang?->nama ?? '—',
                'sublabel' => $p->peminjam?->name ?? '—',
                'status' => $p->status,
                'tgl' => $p->created_at->diffForHumans(),
            ]);

        $recentBooking = BookingRuangan::with(['lokasi:id,nama', 'pemohon:id,name'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($b) => [
                'type' => 'booking',
                'id' => $b->id,
                'label' => $b->lokasi?->nama ?? '—',
                'sublabel' => $b->pemohon?->name ?? '—',
                'status' => $b->status,
                'tgl' => $b->created_at->diffForHumans(),
            ]);

        $recentActivity = collect([...$recentPeminjaman, ...$recentBooking])
            ->sortByDesc('tgl')
            ->values()
            ->take(8);

        return Inertia::render('sarpras/dashboard/index', [
            'stats' => compact(
                'totalBarang', 'totalBarangBaik', 'totalBarangRusak', 'totalBarangHilang',
                'peminjamanAktif', 'peminjamanMenunggu',
                'bookingAktif', 'bookingMenunggu',
                'kerusakanDilaporkan', 'kerusakanTinggiPrioritas',
                'maintenanceAkanDatang'
            ),
            'kondisiData' => $kondisiData,
            'peminjamanPerBulan' => $peminjamanPerBulan,
            'kerusakanPerBulan' => $kerusakanPerBulan,
            'recentActivity' => $recentActivity,
        ]);
    }
}
