import { Head, router } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { StatistikAbsensi, StatistikKelas } from '@/types/statistik';
import { ChartKehadiran } from './sections/chart-kehadiran';
import { DonutStatus } from './sections/donut-status';
import { HeatmapKehadiran } from './sections/heatmap-kehadiran';
import { KartuRingkasan } from './sections/kartu-ringkasan';
import { LeaderboardSiswa } from './sections/leaderboard-siswa';
import { RataJamMasuk } from './sections/rata-jam-masuk';
import { RecentAnulir } from './sections/recent-anulir';

const BULAN = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

type Props = {
    kelas: StatistikKelas;
    statistik: StatistikAbsensi;
    filters: { bulan: number; tahun: number };
    tahunOptions: number[];
};

export default function StatistikAbsensiShow({
    kelas,
    statistik,
    filters,
    tahunOptions,
}: Props) {
    const [loading, setLoading] = useState(false);

    const reload = (bulan: number, tahun: number) => {
        router.get(
            `/statistik-absensi/${kelas.id}`,
            { bulan, tahun },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['statistik', 'filters'],
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <TooltipProvider delayDuration={120}>
            <Head title={`Statistik Absensi · ${kelas.nama}`} />
            <div className="flex flex-col gap-5 p-4">
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-sm">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-10 -right-8 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
                    />
                    <div className="relative flex flex-wrap items-end justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                                Statistik Kehadiran
                            </span>
                            <h1 className="text-2xl leading-tight font-bold text-foreground">
                                {kelas.nama}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                                    Tingkat {kelas.tingkat}
                                </span>
                                {kelas.tahun_ajaran && (
                                    <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
                                        {kelas.tahun_ajaran}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-1">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    {statistik.jumlahHariAktif} hari aktif
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Select
                                value={String(filters.bulan)}
                                onValueChange={(v) =>
                                    reload(Number(v), filters.tahun)
                                }
                            >
                                <SelectTrigger className="w-[140px] bg-card">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {BULAN.map((nama, i) => (
                                        <SelectItem
                                            key={i}
                                            value={String(i + 1)}
                                        >
                                            {nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={String(filters.tahun)}
                                onValueChange={(v) =>
                                    reload(filters.bulan, Number(v))
                                }
                            >
                                <SelectTrigger className="w-[110px] bg-card">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {tahunOptions.map((t) => (
                                        <SelectItem key={t} value={String(t)}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Kartu ringkasan */}
                <KartuRingkasan
                    ringkasan={statistik.ringkasan}
                    gender={statistik.gender}
                    loading={loading}
                />

                {/* Chart tren harian — full width */}
                <ChartKehadiran chart={statistik.chart} loading={loading} />

                {/* Heatmap — full width */}
                <HeatmapKehadiran
                    heatmap={statistik.heatmap}
                    loading={loading}
                />

                {/* Leaderboard + Donut */}
                <div className="grid gap-5 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <LeaderboardSiswa
                            items={statistik.leaderboard}
                            loading={loading}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <DonutStatus
                            donut={statistik.donut}
                            loading={loading}
                        />
                    </div>
                </div>

                {/* Anulir + ketepatan waktu */}
                <div className="grid gap-5 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <RecentAnulir
                            items={statistik.recentAnulir}
                            loading={loading}
                        />
                    </div>
                    <RataJamMasuk
                        rata={statistik.rataJamMasuk.rata}
                        totalTerlambat={statistik.rataJamMasuk.totalTerlambat}
                        loading={loading}
                    />
                </div>
            </div>
        </TooltipProvider>
    );
}

StatistikAbsensiShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Statistik Absensi', href: '/statistik-absensi' },
    ],
};
