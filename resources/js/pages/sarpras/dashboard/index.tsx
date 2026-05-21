import { Head } from '@inertiajs/react';
import {
    AlertTriangle,
    CalendarClock,
    CheckCircle,
    Handshake,
    Package,
    Wrench,
} from 'lucide-react';
import {
    Bar,
    BarChart as RechartsBarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart as RechartsLineChart,
    Pie,
    PieChart as RechartsPieChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

type Stats = {
    totalBarang: number;
    totalBarangBaik: number;
    totalBarangRusak: number;
    totalBarangHilang: number;
    peminjamanAktif: number;
    peminjamanMenunggu: number;
    bookingAktif: number;
    bookingMenunggu: number;
    kerusakanDilaporkan: number;
    kerusakanTinggiPrioritas: number;
    maintenanceAkanDatang: number;
};

type KondisiItem = { kondisi: string; jumlah: number; fill: string };
type BulanItem = { label: string; total: number; dikembalikan: number };
type KerusakanBulan = { label: string; dilaporkan: number; selesai: number };
type ActivityItem = {
    type: 'peminjaman' | 'booking';
    id: number;
    label: string;
    sublabel: string;
    status: string;
    tgl: string;
};

type Props = {
    stats: Stats;
    kondisiData: KondisiItem[];
    peminjamanPerBulan: BulanItem[];
    kerusakanPerBulan: KerusakanBulan[];
    recentActivity: ActivityItem[];
};

const chartConfig = {
    total: { label: 'Total Peminjaman', color: 'oklch(0.546 0.245 262.9)' },
    dikembalikan: { label: 'Dikembalikan', color: 'oklch(0.527 0.154 150.069)' },
    dilaporkan: { label: 'Kerusakan Dilaporkan', color: 'oklch(0.7 0.18 50)' },
    selesai: { label: 'Selesai', color: 'oklch(0.527 0.154 150.069)' },
} satisfies ChartConfig;

function StatCard({
    label,
    value,
    icon,
    iconClass,
    bgClass,
    sublabel,
}: {
    label: string;
    value: number;
    icon: React.ReactNode;
    iconClass: string;
    bgClass: string;
    sublabel?: string;
}) {
    return (
        <Card className="flex flex-row items-center gap-4 px-6 py-4">
            <div className={cn('flex size-12 shrink-0 items-center justify-center rounded-xl', bgClass)}>
                <span className={iconClass}>{icon}</span>
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="font-mono text-3xl font-bold tabular-nums">{value}</p>
                {sublabel && (
                    <p className="text-[11px] text-muted-foreground">{sublabel}</p>
                )}
            </div>
        </Card>
    );
}

function statusColor(status: string) {
    switch (status) {
        case 'menunggu':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200';
        case 'disetujui':
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200';
        case 'ditolak':
            return 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-200';
        case 'dikembalikan':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200';
        case 'selesai':
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200';
        case 'dibatalkan':
            return 'bg-muted text-muted-foreground';
        default:
            return 'bg-muted text-muted-foreground';
    }
}

export default function SarprasDashboard({
    stats,
    kondisiData,
    peminjamanPerBulan,
    kerusakanPerBulan,
    recentActivity,
}: Props) {
    return (
        <>
            <Head title="Dashboard Sarpras" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* Header */}
                <div className="px-1">
                    <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                        Sarana & Prasarana
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Dashboard Sarpras
                    </h1>
                </div>

                {/* Row 1: Stat cards */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <StatCard
                        label="Total Barang"
                        value={stats.totalBarang}
                        icon={<Package className="size-5" />}
                        iconClass="text-blue-600 dark:text-blue-400"
                        bgClass="bg-blue-50 dark:bg-blue-950/30"
                    />
                    <StatCard
                        label="Barang Kondisi Baik"
                        value={stats.totalBarangBaik}
                        icon={<CheckCircle className="size-5" />}
                        iconClass="text-emerald-600 dark:text-emerald-400"
                        bgClass="bg-emerald-50 dark:bg-emerald-950/30"
                    />
                    <StatCard
                        label="Barang Bermasalah"
                        value={stats.totalBarangRusak + stats.totalBarangHilang}
                        icon={<AlertTriangle className="size-5" />}
                        iconClass="text-orange-600 dark:text-orange-400"
                        bgClass="bg-orange-50 dark:bg-orange-950/30"
                        sublabel={`hilang: ${stats.totalBarangHilang}`}
                    />
                    <StatCard
                        label="Peminjaman Aktif"
                        value={stats.peminjamanAktif}
                        icon={<Handshake className="size-5" />}
                        iconClass="text-blue-600 dark:text-blue-400"
                        bgClass="bg-blue-50 dark:bg-blue-950/30"
                        sublabel={`menunggu: ${stats.peminjamanMenunggu}`}
                    />
                    <StatCard
                        label="Kerusakan Aktif"
                        value={stats.kerusakanDilaporkan}
                        icon={<Wrench className="size-5" />}
                        iconClass="text-red-600 dark:text-red-400"
                        bgClass="bg-red-50 dark:bg-red-950/30"
                        sublabel={`prioritas tinggi: ${stats.kerusakanTinggiPrioritas}`}
                    />
                    <StatCard
                        label="Maintenance 30 Hari"
                        value={stats.maintenanceAkanDatang}
                        icon={<CalendarClock className="size-5" />}
                        iconClass="text-purple-600 dark:text-purple-400"
                        bgClass="bg-purple-50 dark:bg-purple-950/30"
                        sublabel="dijadwalkan"
                    />
                </div>

                {/* Row 2: Pie + Bar chart */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Kondisi Barang — Donut */}
                    <Card className="gap-3">
                        <div className="px-6 pt-4">
                            <p className="text-sm font-semibold">Kondisi Barang</p>
                            <p className="text-xs text-muted-foreground">
                                Distribusi kondisi seluruh inventaris
                            </p>
                        </div>
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-62.5"
                        >
                            <RechartsPieChart>
                                <Pie
                                    data={kondisiData}
                                    dataKey="jumlah"
                                    nameKey="kondisi"
                                    innerRadius={60}
                                    outerRadius={100}
                                >
                                    {kondisiData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.fill}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [
                                        `${value} barang`,
                                        name,
                                    ]}
                                />
                            </RechartsPieChart>
                        </ChartContainer>
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 px-6 pb-4 text-xs">
                            {kondisiData.map((item) => (
                                <span
                                    key={item.kondisi}
                                    className="inline-flex items-center gap-1.5"
                                >
                                    <span
                                        className="size-2.5 rounded-full"
                                        style={{ background: item.fill }}
                                    />
                                    <span className="text-muted-foreground">
                                        {item.kondisi}
                                    </span>
                                    <span className="font-mono font-semibold tabular-nums">
                                        {item.jumlah}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* Peminjaman per Bulan — Bar */}
                    <Card className="gap-3">
                        <div className="px-6 pt-4">
                            <p className="text-sm font-semibold">
                                Peminjaman per Bulan
                            </p>
                            <p className="text-xs text-muted-foreground">
                                6 bulan terakhir
                            </p>
                        </div>
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-50 w-full px-2 pb-4"
                        >
                            <RechartsBarChart
                                data={peminjamanPerBulan}
                                margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
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
                                    fontSize={10}
                                />
                                <YAxis hide />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="var(--color-total)"
                                    radius={[3, 3, 0, 0]}
                                />
                                <Bar
                                    dataKey="dikembalikan"
                                    fill="var(--color-dikembalikan)"
                                    radius={[3, 3, 0, 0]}
                                />
                            </RechartsBarChart>
                        </ChartContainer>
                    </Card>
                </div>

                {/* Row 3: Line chart + Recent Activity */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Kerusakan per Bulan — Line */}
                    <Card className="gap-3">
                        <div className="px-6 pt-4">
                            <p className="text-sm font-semibold">
                                Kerusakan per Bulan
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Dilaporkan vs selesai ditangani
                            </p>
                        </div>
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-50 w-full px-2 pb-4"
                        >
                            <RechartsLineChart
                                data={kerusakanPerBulan}
                                margin={{ left: 8, right: 8, top: 6, bottom: 0 }}
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
                                    fontSize={10}
                                />
                                <YAxis hide />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <Line
                                    dataKey="dilaporkan"
                                    type="monotone"
                                    stroke="var(--color-dilaporkan)"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: 'var(--color-dilaporkan)', strokeWidth: 0 }}
                                    activeDot={{ r: 5, strokeWidth: 2, stroke: 'var(--background)' }}
                                />
                                <Line
                                    dataKey="selesai"
                                    type="monotone"
                                    stroke="var(--color-selesai)"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: 'var(--color-selesai)', strokeWidth: 0 }}
                                    activeDot={{ r: 5, strokeWidth: 2, stroke: 'var(--background)' }}
                                />
                            </RechartsLineChart>
                        </ChartContainer>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="gap-3">
                        <div className="px-6 pt-4">
                            <p className="text-sm font-semibold">
                                Aktivitas Terbaru
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Peminjaman & booking terkini
                            </p>
                        </div>
                        <div className="px-6 pb-4">
                            {recentActivity.length === 0 ? (
                                <p className="py-6 text-center text-sm text-muted-foreground">
                                    Belum ada aktivitas
                                </p>
                            ) : (
                                <ul className="space-y-3">
                                    {recentActivity.map((item, i) => (
                                        <li
                                            key={`${item.type}-${item.id}-${i}`}
                                            className="flex items-start gap-3"
                                        >
                                            <span
                                                className={cn(
                                                    'mt-0.5 inline-flex shrink-0 items-center rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide uppercase',
                                                    item.type === 'peminjaman'
                                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                                                        : 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
                                                )}
                                            >
                                                {item.type === 'peminjaman'
                                                    ? 'Pinjam'
                                                    : 'Booking'}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {item.label}
                                                </p>
                                                <p className="truncate text-[11px] text-muted-foreground">
                                                    {item.sublabel}
                                                </p>
                                            </div>
                                            <div className="flex shrink-0 flex-col items-end gap-1">
                                                <span
                                                    className={cn(
                                                        'inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide uppercase',
                                                        statusColor(item.status),
                                                    )}
                                                >
                                                    {item.status}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {item.tgl}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

SarprasDashboard.layout = {
    breadcrumbs: [
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Dashboard', href: '/sarpras' },
    ],
};
