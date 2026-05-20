import {
    CalendarCheck,
    CircleAlert,
    Clock4,
    HeartPulse,
    Mail,
    ShieldCheck,
    Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { RingkasanStatus } from '@/types/statistik';

type StatMeta = {
    label: string;
    icon: LucideIcon;
    tint: string;
    iconColor: string;
    bar: string;
};

const STATUS_META: Record<keyof RingkasanStatus, StatMeta> = {
    hadir: {
        label: 'Hadir',
        icon: CalendarCheck,
        tint: 'bg-primary/10',
        iconColor: 'text-primary',
        bar: 'bg-primary',
    },
    terlambat: {
        label: 'Terlambat',
        icon: Clock4,
        tint: 'bg-amber-500/10',
        iconColor: 'text-amber-600',
        bar: 'bg-amber-500',
    },
    sakit: {
        label: 'Sakit',
        icon: HeartPulse,
        tint: 'bg-emerald-500/10',
        iconColor: 'text-emerald-600',
        bar: 'bg-emerald-500',
    },
    izin: {
        label: 'Izin',
        icon: Mail,
        tint: 'bg-violet-500/10',
        iconColor: 'text-violet-600',
        bar: 'bg-violet-500',
    },
    dispensasi: {
        label: 'Dispensasi',
        icon: ShieldCheck,
        tint: 'bg-sky-500/10',
        iconColor: 'text-sky-600',
        bar: 'bg-sky-500',
    },
    alpha: {
        label: 'Alpha',
        icon: CircleAlert,
        tint: 'bg-rose-500/10',
        iconColor: 'text-rose-600',
        bar: 'bg-rose-500',
    },
};

const ORDER: (keyof RingkasanStatus)[] = [
    'hadir',
    'terlambat',
    'sakit',
    'izin',
    'dispensasi',
    'alpha',
];

type Props = {
    ringkasan: RingkasanStatus;
    gender: { L: number; P: number };
    loading: boolean;
};

function StatCard({
    meta,
    value,
    total,
}: {
    meta: StatMeta;
    value: number;
    total: number;
}) {
    const Icon = meta.icon;
    const pct = total > 0 ? Math.round((value / total) * 100) : 0;

    return (
        <div className="group relative overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <span
                className={cn(
                    'absolute inset-y-0 left-0 w-1 rounded-r',
                    meta.bar,
                )}
            />
            <div className="flex items-start justify-between gap-3 p-4 pl-5">
                <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                        {meta.label}
                    </span>
                    <span className="text-3xl leading-none font-bold text-foreground tabular-nums">
                        {value}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                        {pct}% dari total catatan
                    </span>
                </div>
                <div
                    className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110',
                        meta.tint,
                    )}
                >
                    <Icon className={cn('h-5 w-5', meta.iconColor)} />
                </div>
            </div>
            <div className="h-1 w-full bg-muted">
                <div
                    className={cn('h-full transition-all', meta.bar)}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

export function KartuRingkasan({ ringkasan, gender, loading }: Props) {
    if (loading) {
        return (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-[116px] rounded-xl" />
                ))}
            </div>
        );
    }

    const total = ORDER.reduce((acc, k) => acc + ringkasan[k], 0);
    const totalSiswa = gender.L + gender.P;
    const pctL = totalSiswa > 0 ? (gender.L / totalSiswa) * 100 : 0;

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ORDER.map((key) => (
                <StatCard
                    key={key}
                    meta={STATUS_META[key]}
                    value={ringkasan[key]}
                    total={total}
                />
            ))}

            <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-primary/5 via-card to-card p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                        Komposisi Siswa
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl leading-none font-bold text-sky-600 tabular-nums">
                        {gender.L}
                    </span>
                    <span className="text-lg font-medium text-muted-foreground">
                        /
                    </span>
                    <span className="text-3xl leading-none font-bold text-pink-600 tabular-nums">
                        {gender.P}
                    </span>
                    <span className="ml-auto text-[11px] text-muted-foreground">
                        {totalSiswa} siswa
                    </span>
                </div>
                <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-muted">
                    <div className="bg-sky-500" style={{ width: `${pctL}%` }} />
                    <div
                        className="bg-pink-500"
                        style={{ width: `${100 - pctL}%` }}
                    />
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] font-medium tracking-wide uppercase">
                    <span className="text-sky-600">Laki-laki</span>
                    <span className="text-pink-600">Perempuan</span>
                </div>
            </div>
        </div>
    );
}
