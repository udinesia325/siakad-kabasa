import { AlarmClock, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    rata: string | null;
    totalTerlambat: number;
    loading: boolean;
};

export function RataJamMasuk({ rata, totalTerlambat, loading }: Props) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-2.5 border-b border-border/60 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-4.5 w-4.5 text-primary" />
                </div>
                <CardTitle className="text-base">Ketepatan Waktu</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                {loading ? (
                    <Skeleton className="h-32 rounded-lg" />
                ) : (
                    <div className="flex flex-col gap-3">
                        {/* Jam rata-rata — sorotan utama */}
                        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-primary/10 to-transparent p-4">
                            <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                                Rata-rata jam masuk
                            </div>
                            <div className="mt-1 flex items-baseline gap-1.5">
                                <span className="text-4xl font-bold text-primary tabular-nums">
                                    {rata ?? '—'}
                                </span>
                                {rata && (
                                    <span className="text-sm font-medium text-muted-foreground">
                                        WIB
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Total keterlambatan */}
                        <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
                                <AlarmClock className="h-4.5 w-4.5 text-amber-600" />
                            </div>
                            <div>
                                <div className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                                    Total keterlambatan
                                </div>
                                <div className="text-xl font-bold text-amber-600 tabular-nums">
                                    {totalTerlambat}
                                    <span className="ml-1 text-xs font-medium text-muted-foreground">
                                        catatan
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
