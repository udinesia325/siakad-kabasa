import { Head } from '@inertiajs/react';
import {
    AlertTriangle,
    BookOpen,
    HeartHandshake,
    LayoutGrid,
    Mail,
    Trophy,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Stats = {
    totalPelanggaran: number;
    totalPrestasi: number;
    totalKasus: number;
    totalPembinaan: number;
    siswaAktifPembinaan: number;
    suratPeringatanBulanIni: number;
};

type Props = {
    stats: Stats;
};

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
            <div
                className={cn(
                    'flex size-12 shrink-0 items-center justify-center rounded-xl',
                    bgClass,
                )}
            >
                <span className={iconClass}>{icon}</span>
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">
                    {label}
                </p>
                <p className="font-mono text-3xl font-bold tabular-nums">
                    {value}
                </p>
                {sublabel && (
                    <p className="text-[11px] text-muted-foreground">
                        {sublabel}
                    </p>
                )}
            </div>
        </Card>
    );
}

export default function WakasisDashboard({ stats }: Props) {
    return (
        <>
            <Head title="Dashboard Wakasis" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="px-1">
                    <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                        Kesiswaan
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Dashboard Wakasis
                    </h1>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                    <StatCard
                        label="Total Pelanggaran"
                        value={stats.totalPelanggaran}
                        icon={<AlertTriangle size={22} />}
                        iconClass="text-red-600"
                        bgClass="bg-red-50 dark:bg-red-950/40"
                    />
                    <StatCard
                        label="Surat Peringatan Bulan Ini"
                        value={stats.suratPeringatanBulanIni}
                        icon={<Mail size={22} />}
                        iconClass="text-amber-600"
                        bgClass="bg-amber-50 dark:bg-amber-950/40"
                    />
                    <StatCard
                        label="Total Prestasi"
                        value={stats.totalPrestasi}
                        icon={<Trophy size={22} />}
                        iconClass="text-yellow-600"
                        bgClass="bg-yellow-50 dark:bg-yellow-950/40"
                    />
                    <StatCard
                        label="Kasus Aktif"
                        value={stats.totalKasus}
                        icon={<BookOpen size={22} />}
                        iconClass="text-blue-600"
                        bgClass="bg-blue-50 dark:bg-blue-950/40"
                    />
                    <StatCard
                        label="Dalam Pembinaan"
                        value={stats.totalPembinaan}
                        icon={<HeartHandshake size={22} />}
                        iconClass="text-purple-600"
                        bgClass="bg-purple-50 dark:bg-purple-950/40"
                    />
                    <StatCard
                        label="Siswa Aktif Pembinaan"
                        value={stats.siswaAktifPembinaan}
                        icon={<LayoutGrid size={22} />}
                        iconClass="text-indigo-600"
                        bgClass="bg-indigo-50 dark:bg-indigo-950/40"
                    />
                </div>

                <Card className="p-6">
                    <p className="text-sm text-muted-foreground">
                        Modul Wakasis sedang dalam pengembangan. Fitur lengkap tersedia setelah semua sub-modul diimplementasikan.
                    </p>
                </Card>
            </div>
        </>
    );
}

WakasisDashboard.layout = {
    breadcrumbs: [
        { title: 'Wakasis', href: '/wakasis' },
        { title: 'Dashboard', href: '/wakasis' },
    ],
};
