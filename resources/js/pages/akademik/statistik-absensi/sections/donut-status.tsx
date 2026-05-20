import { Cell, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import type { DonutPoint, StatusKehadiran } from '@/types/statistik';

const COLORS: Record<StatusKehadiran, string> = {
    hadir: 'var(--chart-1)',
    terlambat: 'var(--chart-2)',
    sakit: 'var(--chart-3)',
    izin: 'var(--chart-5)',
    dispensasi: 'var(--chart-2)',
    alpha: 'var(--chart-4)',
};

const LABEL: Record<StatusKehadiran, string> = {
    hadir: 'Hadir',
    terlambat: 'Terlambat',
    sakit: 'Sakit',
    izin: 'Izin',
    dispensasi: 'Dispensasi',
    alpha: 'Alpha',
};

const config: ChartConfig = {
    total: { label: 'Total' },
};

type Props = { donut: DonutPoint[]; loading: boolean };

export function DonutStatus({ donut, loading }: Props) {
    const data = donut
        .filter((d) => d.total > 0)
        .map((d) => ({ ...d, label: LABEL[d.status] }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Komposisi Status</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="mx-auto h-[200px] w-[200px] rounded-full" />
                ) : data.length === 0 ? (
                    <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
                        Belum ada data.
                    </div>
                ) : (
                    <ChartContainer
                        config={config}
                        className="mx-auto h-[200px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent nameKey="label" />
                                }
                            />
                            <Pie
                                data={data}
                                dataKey="total"
                                nameKey="label"
                                innerRadius={50}
                                outerRadius={80}
                            >
                                {data.map((d) => (
                                    <Cell
                                        key={d.status}
                                        fill={COLORS[d.status]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
