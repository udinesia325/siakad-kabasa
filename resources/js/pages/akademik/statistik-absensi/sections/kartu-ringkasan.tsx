import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { RingkasanStatus } from '@/types/statistik';

const STATUS_LABEL: Record<keyof RingkasanStatus, string> = {
    hadir: 'Hadir',
    terlambat: 'Terlambat',
    sakit: 'Sakit',
    izin: 'Izin',
    dispensasi: 'Dispensasi',
    alpha: 'Alpha',
};

type Props = {
    ringkasan: RingkasanStatus;
    gender: { L: number; P: number };
    loading: boolean;
};

export function KartuRingkasan({ ringkasan, gender, loading }: Props) {
    if (loading) {
        return (
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-lg" />
                ))}
            </div>
        );
    }

    const totalSiswa = gender.L + gender.P;

    return (
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {(Object.keys(STATUS_LABEL) as (keyof RingkasanStatus)[]).map(
                (key) => (
                    <Card key={key}>
                        <CardContent className="p-4">
                            <div className="text-xs text-muted-foreground">
                                {STATUS_LABEL[key]}
                            </div>
                            <div className="text-2xl font-semibold">
                                {ringkasan[key]}
                            </div>
                        </CardContent>
                    </Card>
                ),
            )}
            <Card>
                <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground">
                        Siswa L / P
                    </div>
                    <div className="text-2xl font-semibold">
                        {gender.L} / {gender.P}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Total {totalSiswa} siswa
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
