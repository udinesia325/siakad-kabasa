<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\AnulirAbsensi;
use App\Models\HariLibur;
use App\Models\JadwalAbsensiLog;
use App\Models\KelasAjaran;
use App\Models\Siswa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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

        $today = Carbon::today();
        $tglStr = $today->toDateString();
        $tipe = $request->tipe;

        // Hari libur insidental
        $liburInsidental = HariLibur::whereDate('tanggal', $tglStr)->first();

        // Hari libur dari jadwal absensi
        $jadwal = JadwalAbsensiLog::untukHariIni();
        $isLiburJadwal = $jadwal && $jadwal->is_libur;

        if ($liburInsidental || $isLiburJadwal) {
            $keterangan = $liburInsidental?->keterangan ?? null;

            return response()->json([
                'data' => [],
                'libur' => true,
                'libur_keterangan' => $keterangan,
            ]);
        }

        // Siswa aktif di kelas ini per hari ini
        $siswaList = Siswa::query()
            ->whereHas('riwayatKelas', function ($q) use ($request, $today) {
                $q->where('kelas_ajaran_id', $request->kelas_id)
                    ->where('mulai', '<=', $today->copy()->endOfDay())
                    ->where(function ($qq) use ($today) {
                        $qq->whereNull('selesai')->orWhere('selesai', '>=', $today->copy()->startOfDay());
                    });
            })
            ->orderBy('nama')
            ->get(['id', 'nama', 'no_telepon']);

        $siswaIds = $siswaList->pluck('id');

        // Absensi masuk hari ini
        $absensiHariIni = Absensi::where('reff_type', 'm_siswa')
            ->whereIn('reff_id', $siswaIds)
            ->whereDate('waktu_absen', $tglStr)
            ->where('tipe', 'masuk')
            ->get(['reff_id', 'waktu_absen'])
            ->keyBy('reff_id');

        // Anulir hari ini
        $anulirHariIni = AnulirAbsensi::whereIn('siswa_id', $siswaIds)
            ->whereDate('tanggal', $tglStr)
            ->get(['siswa_id', 'status'])
            ->keyBy('siswa_id');

        $jamMasukMax = $jadwal?->jam_masuk_max?->format('H:i');

        $filtered = $siswaList->filter(function ($siswa) use ($absensiHariIni, $anulirHariIni, $jamMasukMax, $tipe) {
            // Anulir override status otomatis
            if ($anulirHariIni->has($siswa->id)) {
                return $anulirHariIni[$siswa->id]->status === $tipe;
            }

            $absen = $absensiHariIni->get($siswa->id);

            if (! $absen) {
                return $tipe === 'alpha';
            }

            $jamMasuk = Carbon::parse($absen->waktu_absen)->format('H:i');
            $statusOtomatis = ($jamMasukMax && $jamMasuk > $jamMasukMax) ? 'terlambat' : 'hadir';

            return $statusOtomatis === $tipe;
        });

        $data = $filtered->values()->map(fn ($s) => [
            'id' => $s->id,
            'nama' => $s->nama,
            'no_telepon' => $s->no_telepon,
        ]);

        return response()->json(['data' => $data, 'libur' => false, 'libur_keterangan' => null]);
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
