<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\AnulirAbsensi;
use App\Models\HariLibur;
use App\Models\JadwalAbsensiLog;
use App\Models\KelasAjaran;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        Carbon::setLocale('id');
        $today = Carbon::today();
        $bulanMulai = $today->copy()->startOfMonth();
        $bulanSelesai = $today->copy()->endOfMonth();

        $jadwalLogs = JadwalAbsensiLog::preloadUntukRentang($bulanSelesai);

        $liburBulanIni = HariLibur::whereBetween('tanggal', [$bulanMulai->toDateString(), $bulanSelesai->toDateString()])
            ->orderBy('tanggal')
            ->get();

        $liburBulanIniMap = $liburBulanIni->keyBy(fn ($h) => $h->tanggal->toDateString());

        // Daftar hari aktif bulan ini (bukan libur per log historis & bukan libur insidental)
        $hariAktifBulanIni = [];
        $cursor = $bulanMulai->copy();
        while ($cursor->lte($bulanSelesai)) {
            $jadwal = JadwalAbsensiLog::resolveUntukTanggal($jadwalLogs, $cursor);
            $isLibur = ($jadwal && $jadwal->is_libur) || $liburBulanIniMap->has($cursor->toDateString());
            if (! $isLibur) {
                $hariAktifBulanIni[] = $cursor->toDateString();
            }
            $cursor->addDay();
        }

        $siswaAktif = Siswa::aktif()->with('kelasAjaran.tingkat')->get(['id', 'nama', 'kelas_ajaran_id', 'jenis_kelamin', 'foto']);
        $totalSiswa = $siswaAktif->count();
        $siswaIds = $siswaAktif->pluck('id');

        // === Absensi & anulir bulan ini ===
        // whereBetween waktu_absen dahulu agar MySQL seek dari kolom ke-2 index
        // (reff_type, waktu_absen, reff_id, tipe) sebelum filter reff_id
        $absensiBulanRows = Absensi::where('reff_type', 'm_siswa')
            ->whereBetween('waktu_absen', [$bulanMulai->copy()->startOfDay(), $bulanSelesai->copy()->endOfDay()])
            ->whereIn('reff_id', $siswaIds)
            ->get(['reff_id', 'tipe', 'waktu_absen']);

        $anulirBulanRows = AnulirAbsensi::whereIn('siswa_id', $siswaIds)
            ->whereBetween('tanggal', [$bulanMulai->toDateString(), $bulanSelesai->toDateString()])
            ->get(['siswa_id', 'tanggal', 'status']);

        // Index absensi: [siswa_id][date][tipe] = 'H:i'
        // Parse waktu_absen sekali, ambil date string dan jam sekaligus
        $absensiIndex = [];
        foreach ($absensiBulanRows as $row) {
            $waktu = Carbon::parse($row->waktu_absen);
            $absensiIndex[$row->reff_id][$waktu->toDateString()][$row->tipe] = $waktu->format('H:i');
        }

        // Index anulir: [siswa_id][date] = status
        $anulirIndex = [];
        foreach ($anulirBulanRows as $row) {
            $anulirIndex[$row->siswa_id][$row->tanggal->toDateString()] = $row->status;
        }

        // === Hitung status per (siswa, hari aktif) untuk bulan ini ===
        // perDayCount[date] = ['hadir' => x, 'terlambat' => x, 'alpha' => x, ...]
        // perStudent[siswa_id] = ['alpha' => x, 'terlambat' => x, 'sakit' => x, 'izin' => x, 'hadir' => x]
        $perDayCount = [];
        $perStudent = [];
        foreach ($hariAktifBulanIni as $tgl) {
            $perDayCount[$tgl] = ['hadir' => 0, 'terlambat' => 0, 'alpha' => 0, 'sakit' => 0, 'izin' => 0, 'dispensasi' => 0];
        }

        $hari_aktif = collect($hariAktifBulanIni);
        $hari_aktif_hingga_hari_ini = $hari_aktif->filter(fn ($t) => $t <= $today->toDateString())->values();

        foreach ($siswaAktif as $siswa) {
            $perStudent[$siswa->id] = ['alpha' => 0, 'terlambat' => 0, 'sakit' => 0, 'izin' => 0, 'hadir' => 0, 'dispensasi' => 0];
            foreach ($hariAktifBulanIni as $tgl) {
                // Hari belum terjadi tidak dihitung sebagai apapun
                if ($tgl > $today->toDateString()) {
                    continue;
                }

                $status = $this->resolveStatus($siswa->id, $tgl, $absensiIndex, $anulirIndex, $jadwalLogs);
                $perDayCount[$tgl][$status]++;
                $perStudent[$siswa->id][$status]++;
            }
        }

        // === 3 line chart: agregasi per minggu (Sen-Min) bulan ini ===
        $weeklySeries = $this->buildWeeklySeries($hariAktifBulanIni, $perDayCount, $bulanMulai, $bulanSelesai, $totalSiswa);

        // === Status hari ini ===
        $todayStr = $today->toDateString();
        $isHariAktif = in_array($todayStr, $hariAktifBulanIni, true);
        $statusHariIni = [
            'is_hari_aktif' => $isHariAktif,
            'tanggal' => $today->translatedFormat('l, d F Y'),
            'libur' => $liburBulanIniMap->get($todayStr)?->keterangan,
            'total_siswa' => $totalSiswa,
        ];
        if ($isHariAktif) {
            $statusHariIni = array_merge($statusHariIni, $perDayCount[$todayStr]);
            $statusHariIni['belum_scan'] = $totalSiswa - $perDayCount[$todayStr]['hadir'] - $perDayCount[$todayStr]['terlambat']
                - $perDayCount[$todayStr]['sakit'] - $perDayCount[$todayStr]['izin'] - $perDayCount[$todayStr]['dispensasi'];
        }

        // === Tahun ajaran aktif + stat ===
        $taAktif = TahunAjaran::where('is_active', true)->first();
        $jumlahKelasTaAktif = $taAktif ? KelasAjaran::where('tahun_ajaran_id', $taAktif->id)->count() : 0;
        $tahunAjaran = $taAktif ? [
            'nama' => $taAktif->nama,
            'jumlah_kelas' => $jumlahKelasTaAktif,
            'jumlah_siswa' => $totalSiswa,
            'siswa_l' => $siswaAktif->where('jenis_kelamin', 'L')->count(),
            'siswa_p' => $siswaAktif->where('jenis_kelamin', 'P')->count(),
        ] : null;

        // === Top siswa alpha & top hadir ===
        $perStudentColl = collect($perStudent)->map(function ($v, $id) use ($siswaAktif) {
            $s = $siswaAktif->firstWhere('id', $id);
            if (! $s) {
                return null;
            }

            return [
                'id' => $s->id,
                'nama' => $s->nama,
                'kelas' => $s->kelasAjaran?->nama_lengkap,
                'foto' => $s->foto,
                'alpha' => $v['alpha'],
                'terlambat' => $v['terlambat'],
                'sakit' => $v['sakit'],
                'izin' => $v['izin'],
                'hadir' => $v['hadir'],
                'dispensasi' => $v['dispensasi'],
            ];
        })->filter()->values();

        $topAlpha = $perStudentColl->sortByDesc('alpha')->take(5)->filter(fn ($s) => $s['alpha'] > 0)->values();
        $topHadir = $perStudentColl
            ->filter(fn ($s) => $s['alpha'] === 0 && $s['terlambat'] === 0)
            ->sortByDesc(fn ($s) => $s['hadir'])
            ->take(5)
            ->values();

        // === Komparasi kehadiran antar kelas (bulan ini hingga hari ini) ===
        $hariAktifCount = $hari_aktif_hingga_hari_ini->count();
        $kelasComparison = KelasAjaran::with(['kelas', 'tingkat'])
            ->aktif()
            ->orderBy('tingkat_id')
            ->orderBy('kelas_id')
            ->get()
            ->map(function ($ka) use ($perStudent, $siswaAktif, $hariAktifCount) {
                $idsKelas = $siswaAktif->where('kelas_ajaran_id', $ka->id)->pluck('id');
                $jml = $idsKelas->count();
                if ($jml === 0 || $hariAktifCount === 0) {
                    return [
                        'id' => $ka->id,
                        'nama' => $ka->nama_lengkap,
                        'jumlah_siswa' => $jml,
                        'total_hadir' => 0,
                        'total_alpha' => 0,
                        'total_kesempatan' => 0,
                        'persen_hadir' => 0,
                        'persen_alpha' => 0,
                    ];
                }
                $totalHadir = 0;
                $totalAlpha = 0;
                foreach ($idsKelas as $id) {
                    $totalHadir += ($perStudent[$id]['hadir'] ?? 0) + ($perStudent[$id]['terlambat'] ?? 0);
                    $totalAlpha += $perStudent[$id]['alpha'] ?? 0;
                }
                $expected = $jml * $hariAktifCount;

                return [
                    'id' => $ka->id,
                    'nama' => $ka->nama_lengkap,
                    'jumlah_siswa' => $jml,
                    'total_hadir' => $totalHadir,
                    'total_alpha' => $totalAlpha,
                    'total_kesempatan' => $expected,
                    'persen_hadir' => $expected > 0 ? round(($totalHadir / $expected) * 100, 1) : 0,
                    'persen_alpha' => $expected > 0 ? round(($totalAlpha / $expected) * 100, 1) : 0,
                ];
            })
            ->values();

        // === Calendar heatmap bulan ini ===
        $heatmap = [];
        $cursor = $bulanMulai->copy();
        while ($cursor->lte($bulanSelesai)) {
            $tgl = $cursor->toDateString();
            $jadwal = JadwalAbsensiLog::resolveUntukTanggal($jadwalLogs, $cursor);
            $isWeekend = $jadwal && $jadwal->is_libur;
            $liburInsidental = $liburBulanIniMap->get($tgl);
            $isFuture = $tgl > $today->toDateString();

            $persenHadir = null;
            if (! $isWeekend && ! $liburInsidental && ! $isFuture && $totalSiswa > 0) {
                $p = $perDayCount[$tgl] ?? null;
                if ($p) {
                    $persenHadir = round((($p['hadir'] + $p['terlambat']) / $totalSiswa) * 100, 1);
                }
            }

            $heatmap[] = [
                'tanggal' => $tgl,
                'tanggal_num' => (int) $cursor->format('d'),
                'iso_weekday' => $cursor->isoWeekday(),
                'is_weekend' => (bool) $isWeekend,
                'is_libur' => (bool) $liburInsidental,
                'libur_keterangan' => $liburInsidental?->keterangan,
                'is_today' => $tgl === $today->toDateString(),
                'is_future' => $isFuture,
                'persen_hadir' => $persenHadir,
            ];
            $cursor->addDay();
        }

        // === Hari libur insidental bulan ini ===
        $liburList = $liburBulanIni->map(fn ($h) => [
            'tanggal' => $h->tanggal->toDateString(),
            'tanggal_format' => $h->tanggal->translatedFormat('d M Y'),
            'hari' => $h->tanggal->translatedFormat('l'),
            'keterangan' => $h->keterangan,
            'is_past' => $h->tanggal->lt($today),
            'is_today' => $h->tanggal->isSameDay($today),
        ])->values();

        // === Aktivitas anulir terbaru ===
        $anulirTerbaru = AnulirAbsensi::with(['siswa:id,nama,kelas_ajaran_id', 'siswa.kelasAjaran.kelas', 'siswa.kelasAjaran.tingkat', 'anulirOleh:id,name'])
            ->orderByDesc('updated_at')
            ->limit(6)
            ->get()
            ->map(fn ($a) => [
                'id' => $a->id,
                'siswa_nama' => $a->siswa?->nama,
                'siswa_kelas' => $a->siswa?->kelasAjaran?->nama_lengkap,
                'tanggal' => $a->tanggal->translatedFormat('d M Y'),
                'status' => $a->status,
                'oleh' => $a->anulirOleh?->name,
                'waktu' => $a->updated_at->diffForHumans(),
            ]);

        // === Headline stats ===
        $totalHadirBulan = 0;
        $totalAlphaBulan = 0;
        $totalTerlambatBulan = 0;
        $totalSakitIzinBulan = 0;
        foreach ($perStudent as $v) {
            $totalHadirBulan += $v['hadir'] + $v['terlambat'];
            $totalAlphaBulan += $v['alpha'];
            $totalTerlambatBulan += $v['terlambat'];
            $totalSakitIzinBulan += $v['sakit'] + $v['izin'];
        }
        $expectedBulan = $totalSiswa * $hari_aktif_hingga_hari_ini->count();
        $persenHadirBulan = $expectedBulan > 0 ? round(($totalHadirBulan / $expectedBulan) * 100, 1) : 0;

        $headline = [
            'persen_hadir_bulan' => $persenHadirBulan,
            'total_alpha_bulan' => $totalAlphaBulan,
            'total_terlambat_bulan' => $totalTerlambatBulan,
            'total_sakit_izin_bulan' => $totalSakitIzinBulan,
            'hari_aktif_terlewati' => $hari_aktif_hingga_hari_ini->count(),
            'hari_aktif_total' => count($hariAktifBulanIni),
            'bulan_label' => $today->translatedFormat('F Y'),
        ];

        return Inertia::render('dashboard', [
            'headline' => $headline,
            'weekly' => $weeklySeries,
            'statusHariIni' => $statusHariIni,
            'tahunAjaran' => $tahunAjaran,
            'topAlpha' => $topAlpha,
            'topHadir' => $topHadir,
            'kelasComparison' => $kelasComparison,
            'heatmap' => $heatmap,
            'liburList' => $liburList,
            'anulirTerbaru' => $anulirTerbaru,
        ]);
    }

    private function resolveStatus(int $siswaId, string $tgl, array $absensiIndex, array $anulirIndex, Collection $jadwalLogs): string
    {
        if (isset($anulirIndex[$siswaId][$tgl])) {
            return $anulirIndex[$siswaId][$tgl];
        }
        $absenMasuk = $absensiIndex[$siswaId][$tgl]['masuk'] ?? null;
        if (! $absenMasuk) {
            return 'alpha';
        }
        $jadwal = JadwalAbsensiLog::resolveUntukTanggal($jadwalLogs, Carbon::parse($tgl));
        if ($jadwal && $jadwal->jam_masuk_max && $absenMasuk > $jadwal->jam_masuk_max->format('H:i')) {
            return 'terlambat';
        }

        return 'hadir';
    }

    private function buildWeeklySeries(array $hariAktif, array $perDayCount, Carbon $bulanMulai, Carbon $bulanSelesai, int $totalSiswa): array
    {
        // Buat bucket per minggu (Senin-Minggu) yang menyentuh bulan ini.
        // Setiap bucket di-clamp ke dalam batas bulan ini supaya label tidak
        // bocor ke bulan lain (mis. "27–03 Mei" — itu kombinasi April + Mei).
        $weekStart = $bulanMulai->copy()->startOfWeek(Carbon::MONDAY);
        $weekEnd = $bulanSelesai->copy()->endOfWeek(Carbon::SUNDAY);

        $weeks = [];
        $cursor = $weekStart->copy();
        $today = Carbon::today();
        while ($cursor->lte($weekEnd)) {
            $rawStart = $cursor->copy();
            $rawEnd = $cursor->copy()->endOfWeek(Carbon::SUNDAY);

            // Clamp ke dalam bulan ini
            $start = $rawStart->lt($bulanMulai) ? $bulanMulai->copy() : $rawStart;
            $end = $rawEnd->gt($bulanSelesai) ? $bulanSelesai->copy() : $rawEnd;

            $startNum = (int) $start->format('d');
            $endNum = (int) $end->format('d');
            $label = $startNum === $endNum ? (string) $startNum : $startNum.'–'.$endNum;

            $weeks[] = [
                'key' => $start->toDateString(),
                'start' => $start->toDateString(),
                'end' => $end->toDateString(),
                'label' => $label,
                'hari_aktif' => 0,
                'hari_aktif_terlewati' => 0,
                'hadir' => 0,
                'alpha' => 0,
                'terlambat' => 0,
                'sakit' => 0,
                'izin' => 0,
            ];
            $cursor->addWeek();
        }

        foreach ($hariAktif as $tgl) {
            foreach ($weeks as &$w) {
                if ($tgl >= $w['start'] && $tgl <= $w['end']) {
                    $w['hari_aktif']++;
                    if ($tgl <= $today->toDateString()) {
                        $w['hari_aktif_terlewati']++;
                        $w['hadir'] += $perDayCount[$tgl]['hadir'] + $perDayCount[$tgl]['terlambat'];
                        $w['alpha'] += $perDayCount[$tgl]['alpha'];
                        $w['terlambat'] += $perDayCount[$tgl]['terlambat'];
                        $w['sakit'] += $perDayCount[$tgl]['sakit'];
                        $w['izin'] += $perDayCount[$tgl]['izin'];
                    }
                    break;
                }
            }
            unset($w);
        }

        $series = [];
        foreach ($weeks as $w) {
            $expected = $w['hari_aktif_terlewati'] * $totalSiswa;
            $series[] = [
                'label' => $w['label'],
                'persen_hadir' => $expected > 0 ? round(($w['hadir'] / $expected) * 100, 1) : null,
                'alpha' => $w['hari_aktif_terlewati'] > 0 ? $w['alpha'] : null,
                'terlambat' => $w['hari_aktif_terlewati'] > 0 ? $w['terlambat'] : null,
                'sakit_izin' => $w['hari_aktif_terlewati'] > 0 ? $w['sakit'] + $w['izin'] : null,
                'hari_aktif' => $w['hari_aktif'],
                'hari_terlewati' => $w['hari_aktif_terlewati'],
            ];
        }

        return $series;
    }
}
