<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\AnulirAbsensi;
use App\Models\HariLibur;
use App\Models\JadwalAbsensi;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class StatistikAbsensiController extends Controller
{
    private const STATUS = ['hadir', 'terlambat', 'sakit', 'izin', 'dispensasi', 'alpha'];

    public function index(): Response
    {
        $kelas = Kelas::whereHas('tahunAjaran', fn ($q) => $q->where('is_active', true))
            ->with('tahunAjaran:id,nama,is_active')
            ->withCount('siswa')
            ->orderBy('tingkat')
            ->orderBy('nama')
            ->get();

        return Inertia::render('akademik/statistik-absensi/index', [
            'kelas' => $kelas,
        ]);
    }

    public function show(Request $request, Kelas $kelas): Response
    {
        Carbon::setLocale('id');
        $kelas->load('tahunAjaran:id,nama');

        $now = Carbon::now();
        $bulan = (int) $request->get('bulan', $now->month);
        $tahun = (int) $request->get('tahun', $now->year);
        if ($bulan < 1 || $bulan > 12) {
            $bulan = $now->month;
        }
        if ($tahun < 2000 || $tahun > 2100) {
            $tahun = $now->year;
        }

        $dari = Carbon::create($tahun, $bulan, 1)->startOfMonth();
        $sampai = $dari->copy()->endOfMonth();
        if ($dari->isSameMonth($now)) {
            $sampai = $now->copy();
        }

        $statistik = $this->buildStatistik($kelas, $dari, $sampai);

        $tahunList = TahunAjaran::pluck('nama')
            ->flatMap(fn ($n) => preg_match_all('/\d{4}/', $n, $m) ? $m[0] : [])
            ->map(fn ($y) => (int) $y)
            ->push($now->year)
            ->unique()
            ->sort()
            ->values();

        return Inertia::render('akademik/statistik-absensi/show', [
            'kelas' => [
                'id' => $kelas->id,
                'nama' => $kelas->nama,
                'tingkat' => $kelas->tingkat,
                'tahun_ajaran' => $kelas->tahunAjaran?->nama,
            ],
            'statistik' => $statistik,
            'filters' => ['bulan' => $bulan, 'tahun' => $tahun],
            'tahunOptions' => $tahunList,
        ]);
    }

    private function buildStatistik(Kelas $kelas, Carbon $dari, Carbon $sampai): array
    {
        $siswaList = Siswa::query()
            ->whereHas('riwayatKelas', function ($q) use ($kelas, $dari, $sampai) {
                $q->where('kelas_id', $kelas->id)
                    ->where('mulai', '<=', $sampai->copy()->endOfDay())
                    ->where(function ($qq) use ($dari) {
                        $qq->whereNull('selesai')->orWhere('selesai', '>=', $dari->copy()->startOfDay());
                    });
            })
            ->orderBy('nama')
            ->get(['id', 'nama', 'nisn', 'jenis_kelamin']);
        $siswaIds = $siswaList->pluck('id');

        $absensiRows = Absensi::where('reff_type', 'm_siswa')
            ->whereIn('reff_id', $siswaIds)
            ->whereBetween('waktu_absen', [
                $dari->copy()->startOfDay()->toDateTimeString(),
                $sampai->copy()->endOfDay()->toDateTimeString(),
            ])
            ->get(['reff_id', 'tipe', 'waktu_absen']);

        $anulirRows = AnulirAbsensi::whereIn('siswa_id', $siswaIds)
            ->whereBetween('tanggal', [$dari->toDateString(), $sampai->toDateString()])
            ->with('anulirOleh:id,name')
            ->get();

        $jadwalMap = JadwalAbsensi::select(['hari', 'jam_masuk_max', 'is_libur'])->get()->keyBy('hari');

        $liburInsidental = HariLibur::whereBetween('tanggal', [$dari->toDateString(), $sampai->toDateString()])
            ->pluck('tanggal')
            ->map(fn ($t) => $t->toDateString())
            ->flip()
            ->map(fn () => true);

        $tanggalList = [];
        $current = $dari->copy();
        while ($current->lte($sampai)) {
            $tglStr = $current->toDateString();
            $jadwal = $jadwalMap->get($current->isoWeekday());
            $isLibur = ($jadwal && $jadwal->is_libur) || isset($liburInsidental[$tglStr]);
            if (! $isLibur) {
                $tanggalList[] = $tglStr;
            }
            $current->addDay();
        }

        $absensiIndex = [];
        foreach ($absensiRows as $row) {
            $date = Carbon::parse($row->waktu_absen)->toDateString();
            $absensiIndex[$row->reff_id][$date][$row->tipe] = Carbon::parse($row->waktu_absen)->format('H:i');
        }

        $anulirIndex = [];
        foreach ($anulirRows as $a) {
            $anulirIndex[$a->siswa_id][$a->tanggal->toDateString()] = $a;
        }

        $ringkasan = array_fill_keys(self::STATUS, 0);
        $chart = [];
        $jamMasukMenit = [];

        foreach ($tanggalList as $tgl) {
            $hari = Carbon::parse($tgl)->isoWeekday();
            $jadwal = $jadwalMap->get($hari);
            $perHari = ['hadir' => 0, 'alpha' => 0];

            foreach ($siswaList as $siswa) {
                $anulir = $anulirIndex[$siswa->id][$tgl] ?? null;
                $absenMasuk = $absensiIndex[$siswa->id][$tgl]['masuk'] ?? null;

                if ($anulir) {
                    $status = $anulir->status;
                } elseif ($absenMasuk) {
                    $terlambat = $jadwal && $jadwal->jam_masuk_max
                        && $absenMasuk > $jadwal->jam_masuk_max->format('H:i');
                    $status = $terlambat ? 'terlambat' : 'hadir';
                } else {
                    $status = 'alpha';
                }

                if (isset($ringkasan[$status])) {
                    $ringkasan[$status]++;
                }
                if ($status === 'hadir' || $status === 'terlambat') {
                    $perHari['hadir']++;
                } elseif ($status === 'alpha') {
                    $perHari['alpha']++;
                }
                if ($absenMasuk) {
                    [$h, $m] = explode(':', $absenMasuk);
                    $jamMasukMenit[] = (int) $h * 60 + (int) $m;
                }
            }

            $chart[] = [
                'tanggal' => $tgl,
                'label' => Carbon::parse($tgl)->translatedFormat('j M'),
                'hadir' => $perHari['hadir'],
                'alpha' => $perHari['alpha'],
            ];
        }

        $gender = [
            'L' => $siswaList->where('jenis_kelamin', 'L')->count(),
            'P' => $siswaList->where('jenis_kelamin', 'P')->count(),
        ];

        $donut = collect(self::STATUS)
            ->map(fn ($s) => ['status' => $s, 'total' => $ringkasan[$s]])
            ->values();

        $recentAnulir = $anulirRows
            ->sortByDesc('updated_at')
            ->take(10)
            ->map(fn ($a) => [
                'siswa' => $siswaList->firstWhere('id', $a->siswa_id)?->nama ?? '-',
                'status' => $a->status,
                'oleh' => $a->anulirOleh?->name ?? '-',
                'tanggal' => $a->tanggal->translatedFormat('j M Y'),
            ])
            ->values();

        $rataMenit = count($jamMasukMenit) ? (int) round(array_sum($jamMasukMenit) / count($jamMasukMenit)) : null;
        $rataJamMasuk = [
            'rata' => $rataMenit !== null
                ? sprintf('%02d:%02d', intdiv($rataMenit, 60), $rataMenit % 60)
                : null,
            'totalTerlambat' => $ringkasan['terlambat'],
        ];

        return [
            'chart' => $chart,
            'ringkasan' => $ringkasan,
            'gender' => $gender,
            'donut' => $donut,
            'recentAnulir' => $recentAnulir,
            'rataJamMasuk' => $rataJamMasuk,
        ];
    }
}
