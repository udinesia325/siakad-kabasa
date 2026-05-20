import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { AnulirItem } from '@/types/statistik';

type Props = { items: AnulirItem[]; loading: boolean };

export function RecentAnulir({ items, loading }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Anulir Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 rounded-md" />
                    ))
                ) : items.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                        Belum ada anulir pada periode ini.
                    </div>
                ) : (
                    items.map((a, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between rounded-md border p-2 text-sm"
                        >
                            <div>
                                <div className="font-medium">{a.siswa}</div>
                                <div className="text-xs text-muted-foreground">
                                    {a.tanggal} · oleh {a.oleh}
                                </div>
                            </div>
                            <Badge variant="secondary">{a.status}</Badge>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
