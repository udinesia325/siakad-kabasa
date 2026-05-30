<?php

namespace App\Http\Controllers;

use App\Jobs\KirimSiaranWhatsappJob;
use App\Models\Absensi;
use App\Models\AnulirAbsensi;
use App\Models\HariLibur;
use App\Models\JadwalAbsensiLog;
use App\Models\KelasAjaran;
use App\Models\Siswa;
use App\Models\WhatsappTemplate;
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
            ->with([
                'kelas.jurusan:id,nama,singkatan',
                'kelas.jenisKelas:id,nama',
                'tingkat',
                'tahunAjaran:id,nama,is_active',
                'waliKelas:id,nama',
            ])
            ->withCount('siswa')
            ->orderBy('tingkat_id')
            ->get()
            ->map(fn ($k) => [
                'id'          => $k->id,
                'nama'        => $k->nama_lengkap,
                'tingkat'     => $k->tingkat?->nama,
                'tingkat_id'  => $k->tingkat_id,
                'rombel'      => $k->kelas?->rombel,
                'jurusan'     => $k->kelas?->jurusan
                    ? ['id' => $k->kelas->jurusan->id, 'nama' => $k->kelas->jurusan->nama, 'singkatan' => $k->kelas->jurusan->singkatan]
                    : null,
                'jenis_kelas' => $k->kelas?->jenisKelas
                    ? ['id' => $k->kelas->jenisKelas->id, 'nama' => $k->kelas->jenisKelas->nama]
                    : null,
                'wali_kelas'  => $k->waliKelas
                    ? ['id' => $k->waliKelas->id, 'nama' => $k->waliKelas->nama]
                    : null,
                'siswa_count' => $k->siswa_count,
                'tahun_ajaran' => $k->tahunAjaran ? [
                    'id'        => $k->tahunAjaran->id,
                    'nama'      => $k->tahunAjaran->nama,
                    'is_active' => $k->tahunAjaran->is_active,
                ] : null,
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

        $tipe = $request->tipe;
        $today = Carbon::today();

        // Ambil template berdasarkan tipe
        $namaTemplate = $tipe === 'alpha' ? 'Siaran Alpha' : 'Siaran Terlambat';
        $template = WhatsappTemplate::where('nama', $namaTemplate)->first();

        // Ambil data kelas
        $kelas = KelasAjaran::with(['kelas'])->findOrFail($request->kelas_id);

        // Ambil siswa yang dipilih
        $siswaList = Siswa::whereIn('id', $request->siswa_ids)
            ->get(['id', 'nama', 'no_telepon']);

        // Absensi masuk hari ini (polymorphic — query terpisah)
        $absensiHariIni = Absensi::where('reff_type', 'm_siswa')
            ->whereIn('reff_id', $request->siswa_ids)
            ->whereDate('waktu_absen', $today->toDateString())
            ->where('tipe', 'masuk')
            ->get(['reff_id', 'waktu_absen'])
            ->keyBy('reff_id');

        // Anulir hari ini — untuk deteksi terlambat via override manual (tanpa jam fisik)
        $anulirHariIni = AnulirAbsensi::whereIn('siswa_id', $request->siswa_ids)
            ->whereDate('tanggal', $today->toDateString())
            ->get(['siswa_id', 'status'])
            ->keyBy('siswa_id');

        $delaySeconds = 0;
        $jumlah = 0;

        foreach ($siswaList as $siswa) {
            if (! $siswa->no_telepon) {
                continue;
            }

            // Susun variabel untuk substitusi template
            $absen = $absensiHariIni->get($siswa->id);
            $isAnulir = $anulirHariIni->has($siswa->id);

            // Jika terlambat dari anulir (override manual), tidak ada jam absensi fisik
            $jamMasuk = match (true) {
                $isAnulir => 'dicatat terlambat oleh sekolah',
                $absen !== null => Carbon::parse($absen->waktu_absen)->format('H:i'),
                default => '-',
            };

            $variables = [
                'nama_siswa' => $siswa->nama,
                'nama_kelas' => $kelas->nama_lengkap,
                'tanggal' => $today->locale('id')->isoFormat('dddd, D MMMM Y'),
                'jam_masuk' => $jamMasuk,
            ];

            $text = $template
                ? preg_replace_callback(
                    '/\{\{(\w+)\}\}/',
                    fn ($m) => $variables[$m[1]] ?? $m[0],
                    $template->text,
                )
                : "Informasi kehadiran siswa {$siswa->nama} pada {$today->format('d/m/Y')}.";

            // Delay acak 10–15 detik per pesan, bertumpuk
            $delaySeconds += random_int(10, 15);

            KirimSiaranWhatsappJob::dispatch($siswa->no_telepon, $text)
                ->delay(now()->addSeconds($delaySeconds));

            $jumlah++;
        }

        return response()->json(['success' => true, 'jumlah' => $jumlah]);
    }
}
