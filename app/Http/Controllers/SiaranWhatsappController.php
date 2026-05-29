<?php

namespace App\Http\Controllers;

use App\Models\KelasAjaran;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiaranWhatsappController extends Controller
{
    public function index(): Response
    {
        $kelas = KelasAjaran::aktif()
            ->with(['kelas', 'tingkat'])
            ->withCount('siswa')
            ->orderBy('tingkat_id')
            ->get()
            ->map(fn ($k) => [
                'id' => $k->id,
                'nama' => $k->nama_lengkap,
                'jumlah_siswa' => $k->siswa_count,
            ]);

        return Inertia::render('siaran-whatsapp/index', [
            'kelas' => $kelas,
        ]);
    }

    public function siswa(Request $request): JsonResponse
    {
        $request->validate([
            'kelas_id' => ['required', 'integer', 'exists:t_kelas_ajaran,id'],
            'tipe' => ['required', 'in:alpha,terlambat'],
        ]);

        // TODO: Replace with real query — filter siswa by t_absensi records
        // for today with tipe = $request->tipe, joined to kelas_ajaran_id = $request->kelas_id
        // Currently returns dummy data for frontend development
        $dummy = [
            ['id' => 1, 'nama' => 'Andi Pratama',  'no_telepon' => '081234567890'],
            ['id' => 2, 'nama' => 'Budi Santoso',   'no_telepon' => '082345678901'],
            ['id' => 3, 'nama' => 'Citra Dewi',     'no_telepon' => null],
            ['id' => 4, 'nama' => 'Doni Kurniawan', 'no_telepon' => '083456789012'],
            ['id' => 5, 'nama' => 'Eka Putri',      'no_telepon' => null],
        ];

        return response()->json(['data' => $dummy]);
    }

    public function kirim(Request $request): JsonResponse
    {
        $request->validate([
            'kelas_id' => ['required', 'integer', 'exists:t_kelas_ajaran,id'],
            'tipe' => ['required', 'in:alpha,terlambat'],
            'siswa_ids' => ['required', 'array', 'min:1'],
            'siswa_ids.*' => ['integer'],
        ]);

        // TODO: Integrate with WhatsApp service (WAHA) — to be continued
        // When ready: iterate $request->siswa_ids, get each Siswa, call WahaService::send()

        $jumlah = count($request->siswa_ids);

        return response()->json(['success' => true, 'jumlah' => $jumlah]);
    }
}
