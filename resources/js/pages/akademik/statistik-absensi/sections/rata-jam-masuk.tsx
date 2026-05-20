import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    rata: string | null;
    totalTerlambat: number;
    loading: boolean;
};

export function RataJamMasuk({ rata, totalTerlambat, loading }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ketepatan Waktu</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="h-24 rounded-lg" />
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="rounded-md bg-primary/10 p-2 text-primary">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">
                                    Rata-rata jam masuk
                                </div>
                                <div className="text-2xl font-semibold">
                                    {rata ?? '—'}
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Total keterlambatan:{' '}
                            <span className="font-semibold text-foreground">
                                {totalTerlambat}
                            </span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
