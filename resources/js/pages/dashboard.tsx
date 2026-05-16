import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    CalendarCheck2,
    CalendarDays,
    CalendarOff,
    Clock4,
    GraduationCap,
    History,
    PartyPopper,
    ScanLine,
    Sparkles,
    TrendingDown,
    TrendingUp,
    Trophy,
} from 'lucide-react';
import { useMemo } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

type WeeklyPoint = {
    label: string;
    persen_hadir: number | null;
    alpha: number | null;
    terlambat: number | null;
    sakit_izin: number | null;
    hari_aktif: number;
    hari_terlewati: number;
};

type StatusHariIni = {
    is_hari_aktif: boolean;
    tanggal: string;
    libur: string | null;
    total_siswa: number;
    hadir?: number;
    terlambat?: number;
    alpha?: number;
    sakit?: number;
    izin?: number;
    dispensasi?: number;
    belum_scan?: number;
};

type TahunAjaran = {
    nama: string;
    jumlah_kelas: number;
    jumlah_siswa: number;
    siswa_l: number;
    siswa_p: number;
} | null;

type SiswaItem = {
    id: number;
    nama: string;
    kelas: string | null;
    foto: string | null;
    alpha: number;
    terlambat: number;
    sakit: number;
    izin: number;
    hadir: number;
    dispensasi: number;
};

type KelasComp = {
    id: number;
    nama: string;
    tingkat: string;
    jumlah_siswa: number;
    total_hadir: number;
    total_alpha: number;
    total_kesempatan: number;
    persen_hadir: number;
    persen_alpha: number;
};

type HeatmapCell = {
    tanggal: string;
    tanggal_num: number;
    iso_weekday: number;
    is_weekend: boolean;
    is_libur: boolean;
    libur_keterangan: string | null;
    is_today: boolean;
    is_future: boolean;
    persen_hadir: number | null;
};

type LiburItem = {
    tanggal: string;
    tanggal_format: string;
    hari: string;
    keterangan: string;
    is_past: boolean;
    is_today: boolean;
};

type AnulirItem = {
    id: number;
    siswa_nama: string | null;
    siswa_kelas: string | null;
    tanggal: string;
    status: string;
    oleh: string | null;
    waktu: string;
};

type Props = {
    headline: {
        persen_hadir_bulan: number;
        total_alpha_bulan: number;
        total_terlambat_bulan: number;
        total_sakit_izin_bulan: number;
        hari_aktif_terlewati: number;
        hari_aktif_total: number;
        bulan_label: string;
    };
    weekly: WeeklyPoint[];
    statusHariIni: StatusHariIni;
    tahunAjaran: TahunAjaran;
    topAlpha: SiswaItem[];
    topHadir: SiswaItem[];
    kelasComparison: KelasComp[];
    heatmap: HeatmapCell[];
    liburList: LiburItem[];
    anulirTerbaru: AnulirItem[];
};

const chartConfig = {
    persen_hadir: { label: 'Kehadiran', color: 'oklch(0.546 0.245 262.9)' },
    alpha: { label: 'Alpha', color: 'oklch(0.577 0.245 27.325)' },
    terlambat: { label: 'Terlambat', color: 'oklch(0.7 0.18 50)' },
    sakit_izin: { label: 'Sakit/Izin', color: 'oklch(0.65 0.13 200)' },
} satisfies ChartConfig;

function initials(name: string) {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase();
}

function statusBadgeColor(status: string) {
    switch (status) {
        case 'sakit':
            return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-200';
        case 'izin':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200';
        case 'dispensasi':
            return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-200';
        case 'alpha':
            return 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-200';
        case 'terlambat':
            return 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-200';
        case 'hadir':
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200';
        default:
            return 'bg-muted text-muted-foreground';
    }
}

export default function Dashboard({
    headline,
    weekly,
    statusHariIni,
    tahunAjaran,
    topAlpha,
    topHadir,
    kelasComparison,
    heatmap,
    liburList,
    anulirTerbaru,
}: Props) {
    const maxKelasHadir = useMemo(
        () => Math.max(100, ...kelasComparison.map((k) => k.persen_hadir)),
        [kelasComparison],
    );

    // Padding minggu untuk align calendar (Senin = isoWeekday 1)
    const firstCell = heatmap[0];
    const leadingPad = firstCell ? firstCell.iso_weekday - 1 : 0;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* Headline bar */}
                <div className="flex flex-wrap items-end justify-between gap-3 px-1">
                    <div>
                        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                            Ringkasan Eksekutif · {headline.bulan_label}
                        </p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                            {tahunAjaran
                                ? `Tahun Ajaran ${tahunAjaran.nama}`
                                : 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
                            <Sparkles className="size-3.5" />
                            {headline.hari_aktif_terlewati} /{' '}
                            {headline.hari_aktif_total} hari aktif terlewati
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 font-medium text-muted-foreground">
                            <CalendarDays className="size-3.5" />
                            {statusHariIni.tanggal}
                        </span>
                    </div>
                </div>

                {/* Row 1: 3 line chart cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <MetricChartCard
                        label="Tingkat Kehadiran"
                        sublabel="% siswa hadir per minggu"
                        value={`${headline.persen_hadir_bulan}%`}
                        trend={computeTrend(weekly.map((w) => w.persen_hadir))}
                        accent="text-primary"
                        dotColor="oklch(0.546 0.245 262.9)"
                        data={weekly}
                        dataKey="persen_hadir"
                        suffix="%"
                        icon={<CalendarCheck2 className="size-4" />}
                    />
                    <MetricChartCard
                        label="Total Alpha"
                        sublabel="Siswa tanpa keterangan / minggu"
                        value={headline.total_alpha_bulan.toString()}
                        trend={computeTrend(weekly.map((w) => w.alpha))}
                        accent="text-red-600 dark:text-red-400"
                        dotColor="oklch(0.577 0.245 27.325)"
                        data={weekly}
                        dataKey="alpha"
                        invertTrend
                        icon={<AlertCircle className="size-4" />}
                    />
                    <MetricChartCard
                        label="Total Terlambat"
                        sublabel="Pelanggaran jam masuk / minggu"
                        value={headline.total_terlambat_bulan.toString()}
                        trend={computeTrend(weekly.map((w) => w.terlambat))}
                        accent="text-orange-600 dark:text-orange-400"
                        dotColor="oklch(0.7 0.18 50)"
                        data={weekly}
                        dataKey="terlambat"
                        invertTrend
                        icon={<Clock4 className="size-4" />}
                    />
                </div>

                {/* Row 2: 12-col grid executive */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    {/* === KIRI BESAR: Status hari ini + Heatmap + Komparasi kelas === */}
                    <div className="space-y-4 lg:col-span-8">
                        {/* Status hari ini */}
                        <Card className="overflow-hidden py-0">
                            <div className="grid gap-0 md:grid-cols-[1fr_2fr]">
                                <div className="relative flex flex-col justify-between gap-3 overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-5 text-primary-foreground">
                                    <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:14px_14px] opacity-10" />
                                    <div className="relative">
                                        <p className="text-[11px] font-medium tracking-wider uppercase opacity-80">
                                            Status Absensi Hari Ini
                                        </p>
                                        <p className="mt-1 text-lg font-semibold">
                                            {statusHariIni.tanggal}
                                        </p>
                                    </div>
                                    <div className="relative">
                                        {statusHariIni.is_hari_aktif ? (
                                            <>
                                                <p className="font-mono text-4xl font-bold tabular-nums">
                                                    {(statusHariIni.hadir ??
                                                        0) +
                                                        (statusHariIni.terlambat ??
                                                            0)}
                                                    <span className="ml-1 text-lg font-medium opacity-70">
                                                        /{' '}
                                                        {
                                                            statusHariIni.total_siswa
                                                        }
                                                    </span>
                                                </p>
                                                <p className="mt-1 text-xs opacity-80">
                                                    siswa sudah scan masuk
                                                </p>
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <PartyPopper className="size-5" />
                                                <span className="text-sm font-medium">
                                                    {statusHariIni.libur ??
                                                        'Hari libur'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
                                    <TodayCell
                                        label="Hadir"
                                        value={statusHariIni.hadir ?? 0}
                                        active={statusHariIni.is_hari_aktif}
                                        accent="text-emerald-600 dark:text-emerald-400"
                                        icon={<ScanLine className="size-3.5" />}
                                    />
                                    <TodayCell
                                        label="Terlambat"
                                        value={statusHariIni.terlambat ?? 0}
                                        active={statusHariIni.is_hari_aktif}
                                        accent="text-orange-600 dark:text-orange-400"
                                        icon={<Clock4 className="size-3.5" />}
                                    />
                                    <TodayCell
                                        label="Sakit/Izin"
                                        value={
                                            (statusHariIni.sakit ?? 0) +
                                            (statusHariIni.izin ?? 0)
                                        }
                                        active={statusHariIni.is_hari_aktif}
                                        accent="text-cyan-600 dark:text-cyan-400"
                                        icon={<Activity className="size-3.5" />}
                                    />
                                    <TodayCell
                                        label="Belum Scan"
                                        value={statusHariIni.belum_scan ?? 0}
                                        active={statusHariIni.is_hari_aktif}
                                        accent="text-red-600 dark:text-red-400"
                                        icon={
                                            <AlertCircle className="size-3.5" />
                                        }
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Calendar heatmap */}
                        <Card className="gap-3">
                            <div className="flex flex-wrap items-start justify-between gap-3 px-6 pt-2">
                                <div>
                                    <p className="text-sm font-semibold">
                                        Peta Kehadiran Harian
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {headline.bulan_label}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                    <span>kurang</span>
                                    <div className="flex h-2 overflow-hidden rounded-full">
                                        {[0.1, 0.3, 0.55, 0.78, 1].map((o) => (
                                            <div
                                                key={o}
                                                className="h-2 w-3"
                                                style={{
                                                    background: `oklch(0.546 0.245 262.9 / ${o})`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span>penuh</span>
                                </div>
                            </div>
                            {/* Legend warna box */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-6 text-[10px] text-muted-foreground">
                                <LegendSwatch
                                    swatch={
                                        <span
                                            className="size-3 rounded-sm"
                                            style={{
                                                background:
                                                    'oklch(0.546 0.245 262.9 / 0.78)',
                                            }}
                                        />
                                    }
                                    label="Hari aktif (gradasi = % hadir)"
                                />
                                <LegendSwatch
                                    swatch={
                                        <span className="relative size-3 rounded-sm border border-amber-300/60 bg-amber-100/70 dark:border-amber-500/30 dark:bg-amber-950/40">
                                            <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-amber-500" />
                                        </span>
                                    }
                                    label="Libur insidental"
                                />
                                <LegendSwatch
                                    swatch={
                                        <span className="size-3 rounded-sm bg-muted/40" />
                                    }
                                    label="Akhir pekan / libur tetap"
                                />
                                <LegendSwatch
                                    swatch={
                                        <span className="size-3 rounded-sm border border-dashed border-border bg-card" />
                                    }
                                    label="Belum berlalu"
                                />
                                <LegendSwatch
                                    swatch={
                                        <span className="size-3 rounded-sm ring-2 ring-foreground ring-offset-1 ring-offset-background" />
                                    }
                                    label="Hari ini"
                                />
                            </div>
                            <div className="px-6 pb-6">
                                <div className="mb-2 grid grid-cols-7 gap-1.5 text-center text-[10px] font-medium text-muted-foreground uppercase">
                                    {[
                                        'Sen',
                                        'Sel',
                                        'Rab',
                                        'Kam',
                                        'Jum',
                                        'Sab',
                                        'Min',
                                    ].map((d) => (
                                        <div key={d}>{d}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1.5">
                                    {Array.from({ length: leadingPad }).map(
                                        (_, i) => (
                                            <div
                                                key={`pad-${i}`}
                                                className="aspect-square"
                                            />
                                        ),
                                    )}
                                    {heatmap.map((cell) => (
                                        <HeatmapTile
                                            key={cell.tanggal}
                                            cell={cell}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Komparasi kelas */}
                        <Card className="gap-3">
                            <div className="px-6 pt-2">
                                <p className="text-sm font-semibold">
                                    Kehadiran per Kelas
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Persentase hadir bulan ini ·{' '}
                                    {headline.hari_aktif_terlewati} hari aktif
                                </p>
                            </div>
                            <div className="space-y-3 px-6 pb-6">
                                {kelasComparison.length === 0 && (
                                    <p className="py-6 text-center text-sm text-muted-foreground">
                                        Belum ada data kelas
                                    </p>
                                )}
                                {kelasComparison.map((k) => (
                                    <div key={k.id} className="group">
                                        <div className="mb-1 flex items-baseline justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex h-5 items-center rounded bg-muted px-1.5 font-mono text-[10px] font-semibold text-muted-foreground">
                                                    {k.tingkat}
                                                </span>
                                                <span className="font-medium">
                                                    {k.nama}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    · {k.jumlah_siswa} siswa
                                                </span>
                                            </div>
                                            <div className="flex items-baseline gap-3 font-mono tabular-nums">
                                                <span className="text-red-600 dark:text-red-400">
                                                    {k.total_alpha} alpha
                                                    <span className="ml-1 text-[10px] opacity-70">
                                                        ({k.persen_alpha}%)
                                                    </span>
                                                </span>
                                                <span className="font-semibold text-foreground">
                                                    {k.total_hadir}
                                                    <span className="text-muted-foreground/60">
                                                        /{k.total_kesempatan}
                                                    </span>
                                                    <span className="ml-1 text-[10px] text-muted-foreground">
                                                        ({k.persen_hadir}%)
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/70 to-primary transition-all"
                                                style={{
                                                    width: `${Math.min(100, (k.persen_hadir / maxKelasHadir) * 100)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* === KANAN: TA, Hari Libur, Top Alpha, Top Hadir, Anulir === */}
                    <div className="space-y-4 lg:col-span-4">
                        {/* TA aktif */}
                        {tahunAjaran && (
                            <Card className="relative gap-2 overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                                <div className="absolute -top-8 -right-8 size-32 rounded-full bg-primary/10 blur-2xl" />
                                <div className="relative px-6 pt-2">
                                    <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-primary uppercase">
                                        <GraduationCap className="size-3.5" />
                                        Tahun Ajaran Aktif
                                    </div>
                                    <p className="mt-2 font-mono text-3xl font-bold tracking-tight">
                                        {tahunAjaran.nama}
                                    </p>
                                </div>
                                <div className="relative grid grid-cols-3 divide-x divide-border/60 px-6 pt-3 pb-2 text-center">
                                    <div>
                                        <p className="font-mono text-xl font-semibold tabular-nums">
                                            {tahunAjaran.jumlah_kelas}
                                        </p>
                                        <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                            Kelas
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-xl font-semibold tabular-nums">
                                            {tahunAjaran.jumlah_siswa}
                                        </p>
                                        <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                            Siswa
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-xl font-semibold tabular-nums">
                                            <span className="text-primary">
                                                {tahunAjaran.siswa_l}
                                            </span>
                                            <span className="text-muted-foreground/60">
                                                /
                                            </span>
                                            <span className="text-pink-500">
                                                {tahunAjaran.siswa_p}
                                            </span>
                                        </p>
                                        <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                            L / P
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Hari libur insidental */}
                        <Card className="gap-2">
                            <div className="flex items-center justify-between px-6 pt-2">
                                <p className="flex items-center gap-2 text-sm font-semibold">
                                    <CalendarOff className="size-4 text-amber-500" />
                                    Libur Insidental
                                </p>
                                <Badge
                                    variant="secondary"
                                    className="font-mono text-[10px]"
                                >
                                    {liburList.length}
                                </Badge>
                            </div>
                            <div className="px-6 pb-4">
                                {liburList.length === 0 ? (
                                    <p className="py-4 text-center text-xs text-muted-foreground">
                                        Tidak ada libur insidental bulan ini
                                    </p>
                                ) : (
                                    <ul className="divide-y divide-border/60">
                                        {liburList.map((l) => (
                                            <li
                                                key={l.tanggal}
                                                className="flex items-center gap-3 py-2.5"
                                            >
                                                <div
                                                    className={cn(
                                                        'flex w-12 shrink-0 flex-col items-center rounded-md px-1 py-1.5 text-center font-mono',
                                                        l.is_today
                                                            ? 'bg-amber-500 text-white'
                                                            : l.is_past
                                                              ? 'bg-muted/60 text-muted-foreground'
                                                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-200',
                                                    )}
                                                >
                                                    <span className="text-base leading-none font-bold">
                                                        {l.tanggal.slice(8, 10)}
                                                    </span>
                                                    <span className="mt-0.5 text-[9px] tracking-wider uppercase opacity-80">
                                                        {l.hari.slice(0, 3)}
                                                    </span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium">
                                                        {l.keterangan}
                                                    </p>
                                                    <p className="text-[11px] text-muted-foreground">
                                                        {l.tanggal_format}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Card>

                        {/* Top Alpha */}
                        <Card className="gap-2">
                            <div className="flex items-center justify-between px-6 pt-2">
                                <p className="flex items-center gap-2 text-sm font-semibold">
                                    <TrendingDown className="size-4 text-red-500" />
                                    Sering Alpha
                                </p>
                                <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                    Bulan ini
                                </span>
                            </div>
                            <div className="px-6 pb-4">
                                {topAlpha.length === 0 ? (
                                    <p className="py-4 text-center text-xs text-muted-foreground">
                                        Belum ada siswa alpha bulan ini ·{' '}
                                        <span className="text-emerald-600">
                                            apresiasi!
                                        </span>
                                    </p>
                                ) : (
                                    <ul className="space-y-1">
                                        {topAlpha.map((s, i) => (
                                            <SiswaRow
                                                key={s.id}
                                                rank={i + 1}
                                                nama={s.nama}
                                                kelas={s.kelas}
                                                metricValue={s.alpha}
                                                metricLabel="alpha"
                                                metricClass="text-red-600 dark:text-red-400"
                                            />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Card>

                        {/* Top Hadir */}
                        <Card className="gap-2">
                            <div className="flex items-center justify-between px-6 pt-2">
                                <p className="flex items-center gap-2 text-sm font-semibold">
                                    <Trophy className="size-4 text-amber-500" />
                                    Kehadiran Sempurna
                                </p>
                                <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                    0 alpha · 0 terlambat
                                </span>
                            </div>
                            <div className="px-6 pb-4">
                                {topHadir.length === 0 ? (
                                    <p className="py-4 text-center text-xs text-muted-foreground">
                                        Belum ada siswa dengan kehadiran
                                        sempurna
                                    </p>
                                ) : (
                                    <ul className="space-y-1">
                                        {topHadir.map((s, i) => (
                                            <SiswaRow
                                                key={s.id}
                                                rank={i + 1}
                                                nama={s.nama}
                                                kelas={s.kelas}
                                                metricValue={s.hadir}
                                                metricLabel="hadir"
                                                metricClass="text-emerald-600 dark:text-emerald-400"
                                                positive
                                            />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Card>

                        {/* Anulir terbaru */}
                        <Card className="gap-2">
                            <div className="flex items-center justify-between px-6 pt-2">
                                <p className="flex items-center gap-2 text-sm font-semibold">
                                    <History className="size-4 text-muted-foreground" />
                                    Aktivitas Anulir
                                </p>
                                <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                    Terbaru
                                </span>
                            </div>
                            <div className="px-6 pb-4">
                                {anulirTerbaru.length === 0 ? (
                                    <p className="py-4 text-center text-xs text-muted-foreground">
                                        Belum ada aktivitas anulir
                                    </p>
                                ) : (
                                    <ul className="space-y-2.5">
                                        {anulirTerbaru.map((a) => (
                                            <li
                                                key={a.id}
                                                className="flex items-start gap-2.5 text-xs"
                                            >
                                                <span
                                                    className={cn(
                                                        'mt-0.5 inline-flex shrink-0 items-center rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide uppercase',
                                                        statusBadgeColor(
                                                            a.status,
                                                        ),
                                                    )}
                                                >
                                                    {a.status}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-medium">
                                                        {a.siswa_nama}
                                                    </p>
                                                    <p className="truncate text-[11px] text-muted-foreground">
                                                        {a.siswa_kelas
                                                            ? `${a.siswa_kelas} · `
                                                            : ''}
                                                        {a.tanggal} · oleh{' '}
                                                        {a.oleh ?? '—'}
                                                    </p>
                                                </div>
                                                <span className="shrink-0 text-[10px] text-muted-foreground">
                                                    {a.waktu}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

function computeTrend(data: (number | null)[]): {
    dir: 'up' | 'down' | 'flat';
    pct: number;
} {
    const points = data.filter((d): d is number => d !== null);

    if (points.length < 2) {
        return { dir: 'flat', pct: 0 };
    }

    const last = points[points.length - 1];
    const prev = points[points.length - 2];

    if (prev === 0 && last === 0) {
        return { dir: 'flat', pct: 0 };
    }

    const diff = last - prev;
    const pct = prev === 0 ? 100 : Math.abs((diff / prev) * 100);

    return {
        dir: diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat',
        pct: Math.round(pct),
    };
}

type MetricChartCardProps = {
    label: string;
    sublabel: string;
    value: string;
    trend: { dir: 'up' | 'down' | 'flat'; pct: number };
    invertTrend?: boolean;
    accent: string;
    dotColor: string;
    data: WeeklyPoint[];
    dataKey: keyof WeeklyPoint;
    suffix?: string;
    icon: React.ReactNode;
};

function MetricChartCard({
    label,
    sublabel,
    value,
    trend,
    invertTrend,
    accent,
    dotColor,
    data,
    dataKey,
    suffix,
    icon,
}: MetricChartCardProps) {
    const isGood = invertTrend ? trend.dir === 'down' : trend.dir === 'up';
    const TrendIcon =
        trend.dir === 'up'
            ? TrendingUp
            : trend.dir === 'down'
              ? TrendingDown
              : Activity;

    return (
        <Card className="gap-3 overflow-hidden pt-4 pb-0">
            <div className="flex items-start justify-between px-6">
                <div>
                    <div
                        className={cn(
                            'flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase',
                            accent,
                        )}
                    >
                        {icon}
                        {label}
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                        {sublabel}
                    </p>
                </div>
                {trend.dir !== 'flat' && (
                    <span
                        className={cn(
                            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold',
                            isGood
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300',
                        )}
                    >
                        <TrendIcon className="size-3" />
                        {trend.pct}%
                    </span>
                )}
            </div>
            <div className="flex items-baseline gap-1 px-6">
                <span className="font-mono text-4xl font-bold tracking-tight tabular-nums">
                    {value}
                </span>
            </div>
            <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[120px] w-full px-4"
            >
                <LineChart
                    accessibilityLayer
                    data={data}
                    margin={{ left: 12, right: 12, top: 6, bottom: 8 }}
                >
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        opacity={0.4}
                    />
                    <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={6}
                        fontSize={10}
                        interval="preserveStartEnd"
                    />
                    <YAxis hide domain={['dataMin', 'dataMax']} />
                    <ChartTooltip
                        cursor={{
                            stroke: dotColor,
                            strokeOpacity: 0.3,
                            strokeWidth: 1,
                        }}
                        content={
                            <ChartTooltipContent
                                indicator="dot"
                                formatter={(val) => `${val}${suffix ?? ''}`}
                            />
                        }
                    />
                    <Line
                        dataKey={dataKey as string}
                        type="monotone"
                        stroke={dotColor}
                        strokeWidth={2}
                        dot={{ r: 3.5, fill: dotColor, strokeWidth: 0 }}
                        activeDot={{
                            r: 5,
                            strokeWidth: 2,
                            stroke: 'var(--background)',
                        }}
                        connectNulls
                    />
                </LineChart>
            </ChartContainer>
        </Card>
    );
}

function TodayCell({
    label,
    value,
    accent,
    icon,
    active,
}: {
    label: string;
    value: number;
    accent: string;
    icon: React.ReactNode;
    active: boolean;
}) {
    return (
        <div className="flex flex-col gap-1 bg-card p-4">
            <div
                className={cn(
                    'flex items-center gap-1.5 text-[10px] font-medium tracking-wider uppercase',
                    accent,
                )}
            >
                {icon}
                {label}
            </div>
            <p
                className={cn(
                    'font-mono text-2xl font-bold tabular-nums',
                    active ? 'text-foreground' : 'text-muted-foreground/40',
                )}
            >
                {active ? value : '—'}
            </p>
        </div>
    );
}

function LegendSwatch({
    swatch,
    label,
}: {
    swatch: React.ReactNode;
    label: string;
}) {
    return (
        <span className="inline-flex items-center gap-1.5">
            {swatch}
            <span>{label}</span>
        </span>
    );
}

function HeatmapTile({ cell }: { cell: HeatmapCell }) {
    if (cell.is_weekend) {
        return (
            <div
                className="relative flex aspect-square items-center justify-center rounded-md bg-muted/40 text-[10px] font-medium text-muted-foreground/50"
                title={`${cell.tanggal} · weekend`}
            >
                {cell.tanggal_num}
            </div>
        );
    }

    if (cell.is_libur) {
        return (
            <div
                className="group relative flex aspect-square items-center justify-center rounded-md border border-amber-300/60 bg-amber-100/70 text-[10px] font-semibold text-amber-700 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300"
                title={`${cell.tanggal} · ${cell.libur_keterangan}`}
            >
                {cell.tanggal_num}
                <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-amber-500" />
            </div>
        );
    }

    if (cell.is_future) {
        return (
            <div
                className="relative flex aspect-square items-center justify-center rounded-md border border-dashed border-border bg-card text-[10px] text-muted-foreground/40"
                title={cell.tanggal}
            >
                {cell.tanggal_num}
            </div>
        );
    }

    const p = cell.persen_hadir ?? 0;
    const opacity = Math.max(0.1, Math.min(1, p / 100));

    return (
        <div
            className={cn(
                'relative flex aspect-square items-center justify-center rounded-md font-mono text-[10px] font-semibold transition-all hover:z-10 hover:scale-[1.05] hover:shadow-md',
                cell.is_today &&
                    'ring-2 ring-foreground ring-offset-1 ring-offset-background',
                p >= 50 ? 'text-white' : 'text-foreground',
            )}
            style={{ background: `oklch(0.546 0.245 262.9 / ${opacity})` }}
            title={`${cell.tanggal} · ${p}% hadir`}
        >
            {cell.tanggal_num}
        </div>
    );
}

function SiswaRow({
    rank,
    nama,
    kelas,
    metricValue,
    metricLabel,
    metricClass,
    positive,
}: {
    rank: number;
    nama: string;
    kelas: string | null;
    metricValue: number;
    metricLabel: string;
    metricClass: string;
    positive?: boolean;
}) {
    return (
        <li className="flex items-center gap-2.5 rounded-md py-1.5 transition-colors hover:bg-muted/50">
            <span
                className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded font-mono text-[10px] font-bold',
                    rank === 1
                        ? positive
                            ? 'bg-amber-500 text-white'
                            : 'bg-red-500 text-white'
                        : 'bg-muted text-muted-foreground',
                )}
            >
                {rank}
            </span>
            <Avatar className="size-7">
                <AvatarFallback className="text-[10px]">
                    {initials(nama)}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm leading-tight font-medium">
                    {nama}
                </p>
                {kelas && (
                    <p className="truncate text-[11px] leading-tight text-muted-foreground">
                        {kelas}
                    </p>
                )}
            </div>
            <div
                className={cn(
                    'font-mono text-sm font-bold tabular-nums',
                    metricClass,
                )}
            >
                {metricValue}
                <span className="ml-0.5 text-[9px] font-medium tracking-wider uppercase opacity-70">
                    {metricLabel}
                </span>
            </div>
        </li>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
