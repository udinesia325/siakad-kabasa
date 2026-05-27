<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\AnulirAbsensi;
use App\Models\HariLibur;
use App\Models\JadwalAbsensiLog;
use App\Models\KelasAjaran;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class StatistikAbsensiController extends Controller
{
    private const STATUS = ['hadir', 'terlambat', 'sakit', 'izin', 'dispensasi', 'alpha'];

    public function index(): Response
    {
        $kelas = KelasAjaran::with(['kelas.jurusan', 'tingkat', 'tahunAjaran:id,nama,is_active'])
            ->withCount('siswa')
            ->aktif()
            ->orderBy('tingkat_id')
            ->orderBy('kelas_id')
            ->get()
            ->map(fn ($ka) => [
                'id' => $ka->id,
                'nama' => $ka->nama_lengkap,
                'tingkat' => $ka->tingkat?->nama,
                'siswa_count' => $ka->siswa_count,
                'tahun_ajaran' => $ka->tahunAjaran ? [
                    'id' => $ka->tahunAjaran->id,
                    'nama' => $ka->tahunAjaran->nama,
                    'is_active' => $ka->tahunAjaran->is_active,
                ] : null,
            ]);

        return Inertia::render('akademik/statistik-absensi/index', [
            'kelas' => $kelas,
        ]);
    }

    public function show(Request $request, KelasAjaran $kelasAjaran): Response
    {
        Carbon::setLocale('id');
        $kelasAjaran->load(['kelas', 'tingkat', 'tahunAjaran:id,nama']);

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

        $statistik = $this->buildStatistik($kelasAjaran, $dari, $sampai);

        $tahunList = TahunAjaran::pluck('nama')
            ->flatMap(fn ($n) => preg_match_all('/\d{4}/', $n, $m) ? $m[0] : [])
            ->map(fn ($y) => (int) $y)
            ->push($now->year)
            ->unique()
            ->sort()
            ->values();

        return Inertia::render('akademik/statistik-absensi/show', [
            'kelas' => [
                'id' => $kelasAjaran->id,
                'nama' => $kelasAjaran->nama_lengkap,
                'tingkat' => $kelasAjaran->tingkat?->nama ?? null,
                'tahun_ajaran' => $kelasAjaran->tahunAjaran?->nama,
            ],
            'statistik' => $statistik,
            'filters' => ['bulan' => $bulan, 'tahun' => $tahun],
            'tahunOptions' => $tahunList,
        ]);
    }

    private function buildStatistik(KelasAjaran $kelasAjaran, Carbon $dari, Carbon $sampai): array
    {
        $siswaList = Siswa::query()
            ->whereHas('riwayatKelas', function ($q) use ($kelasAjaran, $dari, $sampai) {
                $q->where('kelas_ajaran_id', $kelasAjaran->id)
                    ->where('mulai', '<=', $sampai->copy()->endOfDay())
                    ->where(function ($qq) use ($dari) {
                        $qq->whereNull('selesai')->orWhere('selesai', '>=', $dari->copy()->startOfDay());
                    });
            })
            ->orderBy('nama')
            ->get(['id', 'nama', 'nisn', 'jenis_kelamin']);
        $siswaIds = $siswaList->pluck('id');

        $absensiRows = Absensi::where('reff_type', 'm_siswa')
            ->whereBetween('waktu_absen', [
                $dari->copy()->startOfDay()->toDateTimeString(),
                $sampai->copy()->endOfDay()->toDateTimeString(),
            ])
            ->whereIn('reff_id', $siswaIds)
            ->get(['reff_id', 'tipe', 'waktu_absen']);

        $anulirRows = AnulirAbsensi::whereIn('siswa_id', $siswaIds)
            ->whereBetween('tanggal', [$dari->toDateString(), $sampai->toDateString()])
            ->with('anulirOleh:id,name')
            ->get();

        $jadwalLogs = JadwalAbsensiLog::preloadUntukRentang($sampai);

        $liburInsidental = HariLibur::whereBetween('tanggal', [$dari->toDateString(), $sampai->toDateString()])
            ->pluck('tanggal')
            ->map(fn ($t) => $t->toDateString())
            ->flip()
            ->map(fn () => true);

        $tanggalList = [];
        $tanggalCarbon = []; // [tglStr => Carbon] — hindari re-parse di loop berikutnya
        $current = $dari->copy();
        while ($current->lte($sampai)) {
            $tglStr = $current->toDateString();
            $jadwal = JadwalAbsensiLog::resolveUntukTanggal($jadwalLogs, $current);
            $isLibur = ($jadwal && $jadwal->is_libur) || isset($liburInsidental[$tglStr]);
            if (! $isLibur) {
                $tanggalList[] = $tglStr;
                $tanggalCarbon[$tglStr] = $current->copy();
            }
            $current->addDay();
        }

        // Parse waktu_absen sekali, ambil date string dan jam sekaligus
        $absensiIndex = [];
        foreach ($absensiRows as $row) {
            $waktu = Carbon::parse($row->waktu_absen);
            $absensiIndex[$row->reff_id][$waktu->toDateString()][$row->tipe] = $waktu->format('H:i');
        }

        $anulirIndex = [];
        foreach ($anulirRows as $a) {
            $anulirIndex[$a->siswa_id][$a->tanggal->toDateString()] = $a;
        }

        $ringkasan = array_fill_keys(self::STATUS, 0);
        $chart = [];
        $jamMasukMenit = [];
        $aktifSet = array_flip($tanggalList);

        // Akumulator per siswa: count tiap status + status harian (untuk streak)
        $perSiswa = [];
        foreach ($siswaList as $siswa) {
            $perSiswa[$siswa->id] = array_fill_keys(self::STATUS, 0);
        }
        $statusHarian = []; // [siswa_id][tgl] = status

        foreach ($tanggalList as $tgl) {
            $jadwal = JadwalAbsensiLog::resolveUntukTanggal($jadwalLogs, $tanggalCarbon[$tgl]);
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
                    $perSiswa[$siswa->id][$status]++;
                }
                $statusHarian[$siswa->id][$tgl] = $status;

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
                'label' => $tanggalCarbon[$tgl]->translatedFormat('j M'),
                'hadir' => $perHari['hadir'],
                'alpha' => $perHari['alpha'],
            ];
        }

        $jumlahHariAktif = count($tanggalList);
        $heatmap = $this->buildHeatmap($dari, $sampai, $jadwalLogs, $liburInsidental, $aktifSet, $chart, $siswaList->count());
        $leaderboard = $this->buildLeaderboard($siswaList, $perSiswa, $statusHarian, $tanggalList, $jumlahHariAktif);
        $alerts = $this->buildAlerts($siswaList, $perSiswa, $statusHarian, $tanggalList, $jumlahHariAktif);

        $gender = [
            'L' => $siswaList->where('jenis_kelamin', 'L')->count(),
            'P' => $siswaList->where('jenis_kelamin', 'P')->count(),
        ];

        $donut = collect(self::STATUS)
            ->map(fn ($s) => ['status' => $s, 'total' => $ringkasan[$s]])
            ->values();

        $recentAnulir = $anulirRows
            ->sortByDesc('updated_at')
            ->take(5)
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
            'heatmap' => $heatmap,
            'leaderboard' => $leaderboard,
            'alerts' => $alerts,
            'jumlahHariAktif' => $jumlahHariAktif,
        ];
    }

    /**
     * Tiga sinyal masalah kehadiran — masing-masing menyorot satu siswa terparah:
     *  1. Streak alpha berturut-turut terpanjang
     *  2. Persentase kehadiran terendah
     *  3. Jumlah keterlambatan terbanyak
     */
    private function buildAlerts(
        $siswaList,
        array $perSiswa,
        array $statusHarian,
        array $tanggalList,
        int $jumlahHariAktif,
    ): array {
        $worstStreak = null;   // ['nama', 'value']
        $worstRate = null;     // ['nama', 'value']
        $worstLate = null;     // ['nama', 'value']

        foreach ($siswaList as $siswa) {
            $c = $perSiswa[$siswa->id];

            // 1. Streak alpha berturut-turut
            $streak = 0;
            $maxAlphaStreak = 0;
            foreach ($tanggalList as $tgl) {
                $st = $statusHarian[$siswa->id][$tgl] ?? 'alpha';
                if ($st === 'alpha') {
                    $streak++;
                    $maxAlphaStreak = max($maxAlphaStreak, $streak);
                } else {
                    $streak = 0;
                }
            }
            if ($maxAlphaStreak > 0
                && ($worstStreak === null || $maxAlphaStreak > $worstStreak['value'])) {
                $worstStreak = ['nama' => $siswa->nama, 'value' => $maxAlphaStreak];
            }

            // 2. Persentase kehadiran
            $hadirTotal = $c['hadir'] + $c['terlambat'];
            $persen = $jumlahHariAktif > 0
                ? round(($hadirTotal / $jumlahHariAktif) * 100, 1)
                : 100.0;
            if ($jumlahHariAktif > 0
                && ($worstRate === null || $persen < $worstRate['value'])) {
                $worstRate = ['nama' => $siswa->nama, 'value' => $persen];
            }

            // 3. Keterlambatan
            if ($c['terlambat'] > 0
                && ($worstLate === null || $c['terlambat'] > $worstLate['value'])) {
                $worstLate = ['nama' => $siswa->nama, 'value' => $c['terlambat']];
            }
        }

        $alerts = [];

        // Alert 1 — streak alpha
        if ($worstStreak !== null) {
            $v = $worstStreak['value'];
            $tingkat = $v >= 5 ? 'urgent' : ($v >= 3 ? 'sedang' : 'ringan');
            $alerts[] = [
                'jenis' => 'streak_alpha',
                'judul' => 'Alpha Berturut-turut',
                'tingkat' => $tingkat,
                'siswa' => $worstStreak['nama'],
                'nilai' => $v,
                'satuan' => 'hari',
                'deskripsi' => "Alpha {$v} hari berturut-turut tanpa keterangan.",
            ];
        }

        // Alert 2 — attendance rate rendah
        if ($worstRate !== null && $worstRate['value'] < 90) {
            $v = $worstRate['value'];
            $tingkat = $v < 70 ? 'urgent' : ($v < 80 ? 'sedang' : 'ringan');
            $alerts[] = [
                'jenis' => 'rate_rendah',
                'judul' => 'Kehadiran Rendah',
                'tingkat' => $tingkat,
                'siswa' => $worstRate['nama'],
                'nilai' => $v,
                'satuan' => '%',
                'deskripsi' => "Tingkat kehadiran hanya {$v}% periode ini.",
            ];
        }

        // Alert 3 — terlambat terlalu sering (ambang 10/bulan)
        if ($worstLate !== null && $worstLate['value'] >= 3) {
            $v = $worstLate['value'];
            $tingkat = $v >= 10 ? 'urgent' : ($v >= 6 ? 'sedang' : 'ringan');
            $alerts[] = [
                'jenis' => 'sering_terlambat',
                'judul' => 'Sering Terlambat',
                'tingkat' => $tingkat,
                'siswa' => $worstLate['nama'],
                'nilai' => $v,
                'satuan' => 'kali',
                'deskripsi' => "Tercatat terlambat {$v} kali periode ini.",
            ];
        }

        return $alerts;
    }

    /**
     * Grid kalender: tiap tanggal dalam bulan + status (aktif/libur/akhir-pekan/
     * belum-berlalu) dan persen kehadiran untuk hari aktif yang sudah lewat.
     */
    private function buildHeatmap(
        Carbon $dari,
        Carbon $sampai,
        Collection $jadwalLogs,
        $liburInsidental,
        array $aktifSet,
        array $chart,
        int $totalSiswa,
    ): array {
        // Persen hadir per tanggal dari $chart (hanya berisi hari aktif)
        $persenMap = [];
        foreach ($chart as $c) {
            $persenMap[$c['tanggal']] = $totalSiswa > 0
                ? round(($c['hadir'] / $totalSiswa) * 100, 1)
                : 0.0;
        }

        $today = Carbon::today()->toDateString();
        $awalBulan = $dari->copy()->startOfMonth();
        $akhirBulan = $dari->copy()->endOfMonth();

        $cells = [];
        $cursor = $awalBulan->copy();
        while ($cursor->lte($akhirBulan)) {
            $tgl = $cursor->toDateString();
            $jadwal = JadwalAbsensiLog::resolveUntukTanggal($jadwalLogs, $cursor);
            $isWeekend = $jadwal && $jadwal->is_libur;
            $isLibur = isset($liburInsidental[$tgl]);
            $isAktif = isset($aktifSet[$tgl]);
            $isFuture = $tgl > $today || $tgl > $sampai->toDateString();

            $cells[] = [
                'tanggal' => $tgl,
                'nomor' => (int) $cursor->format('d'),
                'iso_weekday' => $cursor->isoWeekday(),
                'is_weekend' => (bool) $isWeekend,
                'is_libur' => $isLibur,
                'is_aktif' => $isAktif,
                'is_future' => $isFuture && $isAktif,
                'is_today' => $tgl === $today,
                'persen_hadir' => ($isAktif && ! $isFuture && isset($persenMap[$tgl]))
                    ? $persenMap[$tgl]
                    : null,
            ];
            $cursor->addDay();
        }

        return $cells;
    }

    /**
     * Peringkat siswa berdasar persentase kehadiran + streak hadir terpanjang.
     */
    private function buildLeaderboard(
        $siswaList,
        array $perSiswa,
        array $statusHarian,
        array $tanggalList,
        int $jumlahHariAktif,
    ): array {
        $rows = [];
        foreach ($siswaList as $siswa) {
            $c = $perSiswa[$siswa->id];
            $hadirTotal = $c['hadir'] + $c['terlambat'];
            $persen = $jumlahHariAktif > 0
                ? round(($hadirTotal / $jumlahHariAktif) * 100, 1)
                : 0.0;

            // Streak hadir terpanjang (hadir/terlambat dihitung hadir)
            $streak = 0;
            $maxStreak = 0;
            foreach ($tanggalList as $tgl) {
                $st = $statusHarian[$siswa->id][$tgl] ?? 'alpha';
                if ($st === 'hadir' || $st === 'terlambat') {
                    $streak++;
                    $maxStreak = max($maxStreak, $streak);
                } else {
                    $streak = 0;
                }
            }

            $rows[] = [
                'id' => $siswa->id,
                'nama' => $siswa->nama,
                'nisn' => $siswa->nisn,
                'hadir' => $hadirTotal,
                'alpha' => $c['alpha'],
                'persen' => $persen,
                'streak' => $maxStreak,
            ];
        }

        usort($rows, function ($a, $b) {
            if ($a['persen'] !== $b['persen']) {
                return $b['persen'] <=> $a['persen'];
            }
            if ($a['streak'] !== $b['streak']) {
                return $b['streak'] <=> $a['streak'];
            }

            return strcmp($a['nama'], $b['nama']);
        });

        return array_slice(array_map(function ($r, $i) {
            $r['peringkat'] = $i + 1;

            return $r;
        }, $rows, array_keys($rows)), 0, 5);
    }
}
