<?php

namespace App\Http\Controllers\Sarpras;

use App\Exports\Sarpras\BarangExport;
use App\Exports\Sarpras\KerusakanMaintenanceExport;
use App\Exports\Sarpras\PeminjamanExport;
use App\Http\Controllers\Controller;
use App\Models\Sarpras\Barang;
use App\Models\Sarpras\Kategori;
use App\Models\Sarpras\Kerusakan;
use App\Models\Sarpras\Maintenance;
use App\Models\Sarpras\Peminjaman;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LaporanController extends Controller
{
    public function index(): Response
    {
        $kategoris = Kategori::orderBy('nama')->get(['id', 'nama']);

        return Inertia::render('sarpras/laporan/index', [
            'kategoris' => $kategoris,
        ]);
    }

    public function exportExcel(Request $request): BinaryFileResponse
    {
        $jenis = $request->input('jenis', 'barang');

        return match ($jenis) {
            'peminjaman' => Excel::download(
                new PeminjamanExport($request->dari, $request->sampai, $request->status),
                'laporan-peminjaman-'.now()->format('Ymd').'.xlsx'
            ),
            'kerusakan' => Excel::download(
                new KerusakanMaintenanceExport($request->status),
                'laporan-kerusakan-maintenance-'.now()->format('Ymd').'.xlsx'
            ),
            default => Excel::download(
                new BarangExport($request->kondisi, $request->integer('kategori_id') ?: null),
                'laporan-barang-'.now()->format('Ymd').'.xlsx'
            ),
        };
    }

    public function exportPdf(Request $request): StreamedResponse
    {
        $jenis = $request->input('jenis', 'barang');
        $generatedAt = now()->translatedFormat('d F Y, H:i').' WIB';

        if ($jenis === 'peminjaman') {
            $peminjamans = Peminjaman::with(['barang:id,nama,kode', 'peminjam:id,name'])
                ->when($request->dari, fn ($q) => $q->where('tgl_pinjam', '>=', $request->dari))
                ->when($request->sampai, fn ($q) => $q->where('tgl_pinjam', '<=', $request->sampai))
                ->when($request->status, fn ($q) => $q->where('status', $request->status))
                ->orderBy('tgl_pinjam', 'desc')
                ->get();
            $pdf = Pdf::loadView('exports.sarpras.peminjaman', [
                'peminjamans' => $peminjamans,
                'filters' => $request->only(['dari', 'sampai', 'status']),
                'generatedAt' => $generatedAt,
            ])->setPaper('a4', 'portrait');

            return response()->streamDownload(
                fn () => print ($pdf->output()),
                'laporan-peminjaman-'.now()->format('Ymd').'.pdf'
            );
        }

        if ($jenis === 'kerusakan') {
            $kerusakans = Kerusakan::with(['barang:id,nama,kode', 'pelapor:id,name'])
                ->when($request->status, fn ($q) => $q->where('status', $request->status))
                ->orderBy('created_at', 'desc')
                ->get();
            $maintenances = Maintenance::with(['barang:id,nama,kode', 'vendor:id,nama'])
                ->orderBy('tgl_rencana', 'desc')
                ->get();
            $pdf = Pdf::loadView('exports.sarpras.kerusakan-maintenance', [
                'kerusakans' => $kerusakans,
                'maintenances' => $maintenances,
                'filters' => $request->only(['status']),
                'generatedAt' => $generatedAt,
            ])->setPaper('a4', 'landscape');

            return response()->streamDownload(
                fn () => print ($pdf->output()),
                'laporan-kerusakan-maintenance-'.now()->format('Ymd').'.pdf'
            );
        }

        $kategoriNama = null;
        if ((int) $request->kategori_id) {
            $kategoriNama = Kategori::find((int) $request->kategori_id)?->nama;
        }

        $barangs = Barang::with(['kategori:id,nama', 'lokasi:id,nama'])
            ->when($request->kondisi, fn ($q) => $q->where('kondisi', $request->kondisi))
            ->when($request->kategori_id, fn ($q) => $q->where('kategori_id', (int) $request->kategori_id))
            ->orderBy('nama')
            ->get();
        $pdf = Pdf::loadView('exports.sarpras.barang', [
            'barangs' => $barangs,
            'filters' => $request->only(['kondisi', 'kategori_id']),
            'kategoriNama' => $kategoriNama,
            'generatedAt' => $generatedAt,
        ])->setPaper('a4', 'portrait');

        return response()->streamDownload(
            fn () => print ($pdf->output()),
            'laporan-barang-'.now()->format('Ymd').'.pdf'
        );
    }
}
