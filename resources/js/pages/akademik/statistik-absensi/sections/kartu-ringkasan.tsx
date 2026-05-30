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
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { RingkasanStatus } from '@/types/statistik';

type StatMeta = {
    label: string;
    icon: LucideIcon;
    tint: string;
    iconColor: string;
    bar: string;
    /** Warna solid untuk versi mobile — tanpa opacity/alpha agar tidak memaksa GPU layer */
    mobileAccent: string;
    mobileBorder: string;
    mobileText: string;
};

const STATUS_META: Record<keyof RingkasanStatus, StatMeta> = {
    hadir: {
        label: 'Hadir',
        icon: CalendarCheck,
        tint: 'bg-primary/10',
        iconColor: 'text-primary',
        bar: 'bg-primary',
        mobileAccent: 'bg-primary',
        mobileBorder: 'border-l-primary',
        mobileText: 'text-primary',
    },
    terlambat: {
        label: 'Terlambat',
        icon: Clock4,
        tint: 'bg-amber-500/10',
        iconColor: 'text-amber-600',
        bar: 'bg-amber-500',
        mobileAccent: 'bg-amber-500',
        mobileBorder: 'border-l-amber-500',
        mobileText: 'text-amber-500',
    },
    sakit: {
        label: 'Sakit',
        icon: HeartPulse,
        tint: 'bg-emerald-500/10',
        iconColor: 'text-emerald-600',
        bar: 'bg-emerald-500',
        mobileAccent: 'bg-emerald-500',
        mobileBorder: 'border-l-emerald-500',
        mobileText: 'text-emerald-500',
    },
    izin: {
        label: 'Izin',
        icon: Mail,
        tint: 'bg-violet-500/10',
        iconColor: 'text-violet-600',
        bar: 'bg-violet-500',
        mobileAccent: 'bg-violet-500',
        mobileBorder: 'border-l-violet-500',
        mobileText: 'text-violet-500',
    },
    dispensasi: {
        label: 'Dispensasi',
        icon: ShieldCheck,
        tint: 'bg-sky-500/10',
        iconColor: 'text-sky-600',
        bar: 'bg-sky-500',
        mobileAccent: 'bg-sky-500',
        mobileBorder: 'border-l-sky-500',
        mobileText: 'text-sky-500',
    },
    alpha: {
        label: 'Alpha',
        icon: CircleAlert,
        tint: 'bg-rose-500/10',
        iconColor: 'text-rose-600',
        bar: 'bg-rose-500',
        mobileAccent: 'bg-rose-500',
        mobileBorder: 'border-l-rose-500',
        mobileText: 'text-rose-500',
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
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-shadow hover:shadow-md">
            <span
                className={cn(
                    'absolute inset-y-0 left-0 w-1 rounded-r',
                    meta.bar,
                )}
            />
            <div className="flex flex-1 items-start justify-between gap-3 p-4 pl-5">
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
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                        meta.tint,
                    )}
                >
                    <Icon className={cn('h-5 w-5', meta.iconColor)} />
                </div>
            </div>
            <div className="px-4 pb-4 pl-5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                        className={cn(
                            'h-full rounded-full transition-[width]',
                            meta.bar,
                        )}
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

/** Versi mobile — semua warna solid, tanpa opacity alpha, tanpa shadow,
 *  tanpa overflow-hidden/rounded kombinasi yang memicu GPU compositing layer. */
function StatCardMobile({
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
    const barWidth = Math.max(pct, pct > 0 ? 4 : 0);

    return (
        <div
            className={cn(
                'flex items-center gap-3 rounded-xl border border-border/40 border-l-4 bg-card p-3 shadow-md',
                meta.mobileBorder,
            )}
        >
            <Icon className={cn('h-5 w-5 shrink-0', meta.mobileText)} />
            <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {meta.label}
                </span>
                <span className="text-2xl leading-none font-bold text-foreground tabular-nums">
                    {value}
                </span>
                <div className="mt-1 flex items-center gap-2">
                    <div className="h-1 flex-1 bg-muted">
                        <div
                            className={cn('h-full', meta.mobileAccent)}
                            style={{ width: `${barWidth}%` }}
                        />
                    </div>
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                        {pct}%
                    </span>
                </div>
            </div>
        </div>
    );
}

export function KartuRingkasan({ ringkasan, gender, loading }: Props) {
    const isMobile = useIsMobile();

    if (loading) {
        return isMobile ? (
            <div className="flex flex-col gap-1.5">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-14" />
                ))}
            </div>
        ) : (
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

    if (isMobile) {
        return (
            <div className="flex flex-col gap-1.5">
                {ORDER.map((key) => (
                    <StatCardMobile
                        key={key}
                        meta={STATUS_META[key]}
                        value={ringkasan[key]}
                        total={total}
                    />
                ))}
                {/* Komposisi siswa — flat, tanpa gradient/rounded/overflow */}
                <div className="flex items-center gap-3 rounded-xl border border-border/40 border-l-4 border-l-sky-500 bg-card p-3 shadow-md">
                    <Users className="h-5 w-5 shrink-0 text-sky-500" />
                    <div className="flex flex-1 flex-col gap-0.5">
                        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                            Komposisi Siswa
                        </span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl leading-none font-bold text-sky-500 tabular-nums">
                                {gender.L}L
                            </span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-2xl leading-none font-bold text-pink-500 tabular-nums">
                                {gender.P}P
                            </span>
                            <span className="ml-auto text-[10px] text-muted-foreground">
                                {totalSiswa} siswa
                            </span>
                        </div>
                        <div className="mt-1 flex h-1">
                            <div
                                className="bg-sky-500"
                                style={{ width: `${pctL}%` }}
                            />
                            <div
                                className="bg-pink-500"
                                style={{ width: `${100 - pctL}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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

            <div className="relative overflow-hidden rounded-xl border border-border/70 bg-linear-to-br from-primary/5 via-card to-card p-4 shadow-sm">
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
