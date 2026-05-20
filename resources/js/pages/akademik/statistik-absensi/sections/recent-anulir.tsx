import { FileClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { AnulirItem, StatusKehadiran } from '@/types/statistik';

const STATUS_STYLE: Record<StatusKehadiran, string> = {
    hadir: 'bg-primary/10 text-primary',
    terlambat: 'bg-amber-500/10 text-amber-600',
    sakit: 'bg-emerald-500/10 text-emerald-600',
    izin: 'bg-violet-500/10 text-violet-600',
    dispensasi: 'bg-sky-500/10 text-sky-600',
    alpha: 'bg-rose-500/10 text-rose-600',
};

function initials(nama: string): string {
    return nama
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');
}

type Props = { items: AnulirItem[]; loading: boolean };

export function RecentAnulir({ items, loading }: Props) {
    return (
        <Card className="flex h-full w-full flex-col overflow-hidden pt-0">
            <CardHeader className="flex flex-row items-center gap-2.5 border-b border-border/60 bg-primary/[0.07] pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                    <FileClock className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-base">Anulir Terbaru</CardTitle>
                    <p className="text-xs text-muted-foreground">
                        5 penyesuaian status kehadiran terbaru
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-1.5 pt-4">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-14 rounded-lg" />
                    ))
                ) : items.length === 0 ? (
                    <div className="py-10 text-center text-sm text-muted-foreground">
                        Belum ada anulir pada periode ini.
                    </div>
                ) : (
                    items.map((a, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 rounded-lg border border-transparent p-2.5 transition-colors hover:border-border/70 hover:bg-accent/40"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                                {initials(a.siswa)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-foreground">
                                    {a.siswa}
                                </p>
                                <p className="truncate text-[11px] text-muted-foreground">
                                    {a.tanggal} · oleh {a.oleh}
                                </p>
                            </div>
                            <span
                                className={cn(
                                    'shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize',
                                    STATUS_STYLE[a.status],
                                )}
                            >
                                {a.status}
                            </span>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
