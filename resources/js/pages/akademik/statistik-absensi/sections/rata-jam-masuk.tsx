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
        <Card className="w-full gap-0 overflow-hidden p-0">
            <CardHeader className="flex flex-row items-center gap-2.5 border-b border-border/60 bg-primary/[0.07] px-4 pt-4 pb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                    <Clock className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-base">Ketepatan Waktu</CardTitle>
                    <p className="text-xs text-muted-foreground">
                        Rata-rata masuk & total terlambat
                    </p>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {loading ? (
                    <div className="p-4">
                        <Skeleton className="h-16 rounded-lg" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 divide-x divide-border/50">
                        {/* Rata-rata jam masuk */}
                        <div className="flex items-center gap-3 px-4 py-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Clock className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                    Rata-rata masuk
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-primary tabular-nums">
                                        {rata ?? '—'}
                                    </span>
                                    {rata && (
                                        <span className="text-[11px] text-muted-foreground">
                                            WIB
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Total keterlambatan */}
                        <div className="flex items-center gap-3 px-4 py-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                                <AlarmClock className="h-4 w-4 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                    Total terlambat
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-amber-600 tabular-nums">
                                        {totalTerlambat}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground">
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
