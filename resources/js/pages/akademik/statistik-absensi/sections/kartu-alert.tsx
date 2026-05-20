import { CalendarX, Clock4, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { AlertItem, AlertJenis, AlertTingkat } from '@/types/statistik';

const JENIS_ICON: Record<AlertJenis, LucideIcon> = {
    streak_alpha: CalendarX,
    rate_rendah: ShieldAlert,
    sering_terlambat: Clock4,
};

type TingkatStyle = {
    label: string;
    card: string;
    iconWrap: string;
    icon: string;
    badge: string;
    nilai: string;
};

const TINGKAT_STYLE: Record<AlertTingkat, TingkatStyle> = {
    ringan: {
        label: 'Perhatian',
        card: 'border-amber-400/40 bg-amber-400/5',
        iconWrap: 'bg-amber-400/15',
        icon: 'text-amber-600',
        badge: 'bg-amber-400/20 text-amber-700',
        nilai: 'text-amber-600',
    },
    sedang: {
        label: 'Peringatan',
        card: 'border-orange-500/40 bg-orange-500/5',
        iconWrap: 'bg-orange-500/15',
        icon: 'text-orange-600',
        badge: 'bg-orange-500/20 text-orange-700',
        nilai: 'text-orange-600',
    },
    urgent: {
        label: 'Mendesak',
        card: 'border-rose-500/45 bg-rose-500/5',
        iconWrap: 'bg-rose-500/15',
        icon: 'text-rose-600',
        badge: 'bg-rose-500/20 text-rose-700',
        nilai: 'text-rose-600',
    },
};

type Props = { alerts: AlertItem[]; loading: boolean };

export function KartuAlert({ alerts, loading }: Props) {
    return (
        <Card className="flex h-full w-full flex-col overflow-hidden pt-0">
            <CardHeader className="flex flex-row items-center gap-2.5 border-b border-border/60 bg-rose-500/[0.09] pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/15">
                    <ShieldAlert className="h-4.5 w-4.5 text-rose-600" />
                </div>
                <div>
                    <CardTitle className="text-base">
                        Peringatan Kehadiran
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                        Siswa yang perlu tindak lanjut segera
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-2.5 pt-4">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-[88px] rounded-xl" />
                    ))
                ) : alerts.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-2 py-8 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                            <ShieldCheck className="h-6 w-6 text-emerald-600" />
                        </div>
                        <p className="text-sm font-medium text-foreground">
                            Tidak ada peringatan
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Semua siswa dalam kondisi kehadiran wajar.
                        </p>
                    </div>
                ) : (
                    alerts.map((a) => {
                        const Icon = JENIS_ICON[a.jenis];
                        const style = TINGKAT_STYLE[a.tingkat];

                        return (
                            <div
                                key={a.jenis}
                                className={cn(
                                    'flex flex-1 items-start gap-3 rounded-xl border p-3',
                                    style.card,
                                )}
                            >
                                <div
                                    className={cn(
                                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                                        style.iconWrap,
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            'h-4.5 w-4.5',
                                            style.icon,
                                        )}
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-foreground">
                                            {a.judul}
                                        </span>
                                        <span
                                            className={cn(
                                                'rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase',
                                                style.badge,
                                            )}
                                        >
                                            {style.label}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 truncate text-xs font-medium text-foreground">
                                        {a.siswa}
                                    </p>
                                    <p className="truncate text-[11px] text-muted-foreground">
                                        {a.deskripsi}
                                    </p>
                                </div>
                                <div className="flex shrink-0 flex-col items-end">
                                    <span
                                        className={cn(
                                            'text-xl leading-none font-bold tabular-nums',
                                            style.nilai,
                                        )}
                                    >
                                        {a.nilai}
                                    </span>
                                    <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
                                        {a.satuan}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
}
