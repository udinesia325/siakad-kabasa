import { Flame, Medal, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { LeaderboardItem } from '@/types/statistik';

/** Gaya khusus tiga peringkat teratas. */
const PODIUM: Record<number, { ring: string; badge: string; medal: string }> = {
    1: {
        ring: 'ring-amber-400/60',
        badge: 'bg-amber-400 text-amber-950',
        medal: 'text-amber-500',
    },
    2: {
        ring: 'ring-slate-300/70',
        badge: 'bg-slate-300 text-slate-800',
        medal: 'text-slate-400',
    },
    3: {
        ring: 'ring-orange-400/60',
        badge: 'bg-orange-400 text-orange-950',
        medal: 'text-orange-500',
    },
};

function initials(nama: string): string {
    return nama
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');
}

type Props = { items: LeaderboardItem[]; loading: boolean };

export function LeaderboardSiswa({ items, loading }: Props) {
    const isMobile = useIsMobile();

    return (
        <Card className="flex h-full w-full min-w-0 flex-col overflow-hidden pt-0">
            <CardHeader className="flex flex-row items-center gap-2.5 border-b border-border/60 bg-amber-400/15 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/25">
                    <Trophy className="h-4.5 w-4.5 text-amber-500" />
                </div>
                <div>
                    <CardTitle className="text-base">
                        Peringkat Kehadiran
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                        Siswa dengan kehadiran terbaik & streak terpanjang
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col pt-4">
                {loading ? (
                    <div className="flex flex-col gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-14 rounded-lg" />
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center py-10 text-center text-sm text-muted-foreground">
                        Belum ada data siswa pada periode ini.
                    </div>
                ) : (
                    <ol className="flex flex-1 flex-col justify-between gap-1.5">
                        {items.map((s) => {
                            const podium = PODIUM[s.peringkat];

                            return (
                                <li
                                    key={s.id}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg border border-transparent p-2.5 md:transition-colors md:hover:border-border/70 md:hover:bg-accent/40',
                                        podium && (
                                            isMobile
                                                ? 'bg-card'
                                                : 'border-border/60 bg-linear-to-r from-muted/50 to-card'
                                        ),
                                    )}
                                >
                                    {/* peringkat */}
                                    <div className="flex w-7 shrink-0 justify-center">
                                        {podium ? (
                                            <Medal
                                                className={cn(
                                                    'h-5 w-5',
                                                    podium.medal,
                                                )}
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-muted-foreground tabular-nums">
                                                {s.peringkat}
                                            </span>
                                        )}
                                    </div>

                                    {/* avatar inisial */}
                                    <div
                                        className={cn(
                                            'flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary ring-2 ring-transparent',
                                            'h-8 w-8 text-xs md:h-10 md:w-10 md:text-sm',
                                            podium?.ring,
                                        )}
                                    >
                                        {initials(s.nama)}
                                    </div>

                                    {/* nama + badge tingkat/jurusan + streak (mobile: streak inline) */}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-foreground">
                                            {s.nama}
                                        </p>
                                        <div className="mt-0.5 flex items-center gap-1">
                                            {s.tingkat && (
                                                <span className="shrink-0 rounded bg-primary/10 px-1.5 py-px text-[10px] font-semibold text-primary">
                                                    {s.tingkat}
                                                </span>
                                            )}
                                            {s.jurusan && (
                                                <span className="shrink-0 rounded bg-muted px-1.5 py-px text-[10px] font-semibold text-muted-foreground">
                                                    {s.jurusan}
                                                </span>
                                            )}
                                            <span className="truncate text-[10px] text-muted-foreground">
                                                · {s.hadir} hari
                                            </span>
                                            {s.streak > 0 && isMobile && (
                                                <span className="inline-flex shrink-0 items-center gap-0.5 text-orange-500">
                                                    <Flame className="h-3 w-3" />
                                                    {s.streak}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* streak — desktop only */}
                                    {s.streak > 0 && !isMobile && (
                                        <div className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[11px] font-semibold text-orange-600">
                                            <Flame className="h-3.5 w-3.5" />
                                            {s.streak}
                                        </div>
                                    )}

                                    {/* persen */}
                                    <div className="flex shrink-0 flex-col items-end">
                                        <span
                                            className={cn(
                                                'font-bold tabular-nums',
                                                'text-sm md:text-base',
                                                s.persen >= 90
                                                    ? 'text-emerald-600'
                                                    : s.persen >= 75
                                                      ? 'text-amber-600'
                                                      : 'text-rose-600',
                                            )}
                                        >
                                            {s.persen}%
                                        </span>
                                        {!isMobile && (
                                            <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
                                                hadir
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </CardContent>
        </Card>
    );
}
