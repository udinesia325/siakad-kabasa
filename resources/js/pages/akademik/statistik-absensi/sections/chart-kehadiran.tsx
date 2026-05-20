import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import type { ChartPoint } from '@/types/statistik';

const config: ChartConfig = {
    hadir: { label: 'Hadir', color: 'var(--chart-1)' },
    alpha: { label: 'Alpha', color: 'var(--chart-4)' },
};

type Props = { chart: ChartPoint[]; loading: boolean };

export function ChartKehadiran({ chart, loading }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Kehadiran Harian</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="h-[260px] w-full rounded-lg" />
                ) : chart.length === 0 ? (
                    <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
                        Tidak ada hari aktif pada periode ini.
                    </div>
                ) : (
                    <ChartContainer
                        config={config}
                        className="h-[260px] w-full"
                    >
                        <LineChart data={chart} margin={{ left: 4, right: 8 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                width={32}
                                allowDecimals={false}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Line
                                dataKey="hadir"
                                type="monotone"
                                stroke="var(--color-hadir)"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey="alpha"
                                type="monotone"
                                stroke="var(--color-alpha)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
