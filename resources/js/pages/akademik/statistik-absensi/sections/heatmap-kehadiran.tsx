import { CalendarRange } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { HeatmapCell } from '@/types/statistik';

const HARI_LABEL = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

/** Warna sel berdasar persentase kehadiran kelas pada hari itu. */
function cellTone(persen: number | null): string {
    if (persen === null) {
        return 'bg-muted';
    }

    if (persen >= 95) {
        return 'bg-emerald-500 text-white';
    }

    if (persen >= 85) {
        return 'bg-emerald-400 text-white';
    }

    if (persen >= 70) {
        return 'bg-amber-400 text-amber-950';
    }

    if (persen >= 50) {
        return 'bg-orange-400 text-white';
    }

    return 'bg-rose-500 text-white';
}

type Props = { heatmap: HeatmapCell[]; loading: boolean };

export function HeatmapKehadiran({ heatmap, loading }: Props) {
    // Susun ke grid mingguan: kolom = Sen..Min, baris = minggu.
    const weeks: (HeatmapCell | null)[][] = [];

    if (heatmap.length > 0) {
        const firstWeekday = heatmap[0].iso_weekday; // 1..7
        let current: (HeatmapCell | null)[] = Array.from(
            { length: firstWeekday - 1 },
            () => null,
        );

        for (const cell of heatmap) {
            current.push(cell);

            if (current.length === 7) {
                weeks.push(current);
                current = [];
            }
        }

        if (current.length > 0) {
            while (current.length < 7) {
                current.push(null);
            }

            weeks.push(current);
        }
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between gap-2 border-b border-border/60 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <CalendarRange className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-base">
                            Heatmap Kehadiran
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                            Intensitas warna = persentase kehadiran kelas per
                            hari
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-5">
                {loading ? (
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                ) : heatmap.length === 0 ? (
                    <div className="flex h-[160px] items-center justify-center text-sm text-muted-foreground">
                        Tidak ada data periode ini.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="overflow-x-auto">
                            <div className="inline-flex flex-col gap-1.5">
                                {/* header hari */}
                                <div className="grid grid-cols-7 gap-1.5">
                                    {HARI_LABEL.map((h) => (
                                        <div
                                            key={h}
                                            className="text-center text-[10px] font-semibold tracking-wide text-muted-foreground uppercase"
                                        >
                                            {h}
                                        </div>
                                    ))}
                                </div>
                                {weeks.map((week, wi) => (
                                    <div
                                        key={wi}
                                        className="grid grid-cols-7 gap-1.5"
                                    >
                                        {week.map((cell, ci) => {
                                            if (!cell) {
                                                return (
                                                    <div
                                                        key={ci}
                                                        className="aspect-square min-w-9"
                                                    />
                                                );
                                            }

                                            const isInactive =
                                                cell.is_weekend ||
                                                cell.is_libur ||
                                                cell.is_future;

                                            return (
                                                <Tooltip key={ci}>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            className={cn(
                                                                'flex aspect-square min-w-9 items-center justify-center rounded-md text-xs font-semibold transition-transform hover:scale-110 hover:ring-2 hover:ring-primary/40',
                                                                isInactive
                                                                    ? 'bg-muted/60 text-muted-foreground/50'
                                                                    : cellTone(
                                                                          cell.persen_hadir,
                                                                      ),
                                                                cell.is_today &&
                                                                    'ring-2 ring-primary ring-offset-1 ring-offset-card',
                                                            )}
                                                        >
                                                            {cell.nomor}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="font-medium">
                                                            Tanggal {cell.nomor}
                                                        </p>
                                                        <p className="text-xs">
                                                            {cell.is_weekend
                                                                ? 'Akhir pekan / libur tetap'
                                                                : cell.is_libur
                                                                  ? 'Libur insidental'
                                                                  : cell.is_future
                                                                    ? 'Belum berlalu'
                                                                    : cell.persen_hadir !==
                                                                        null
                                                                      ? `${cell.persen_hadir}% kehadiran`
                                                                      : 'Tidak ada data'}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* legenda */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
                            <span className="font-medium">Kehadiran:</span>
                            <div className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded bg-rose-500" />
                                <span>&lt;50%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded bg-orange-400" />
                                <span>50–69%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded bg-amber-400" />
                                <span>70–84%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded bg-emerald-400" />
                                <span>85–94%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded bg-emerald-500" />
                                <span>≥95%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded bg-muted/60" />
                                <span>Libur / belum berlalu</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
