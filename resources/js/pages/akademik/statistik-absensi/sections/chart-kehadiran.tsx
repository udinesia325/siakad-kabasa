import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import type { ChartPoint } from '@/types/statistik';

const config: ChartConfig = {
    hadir: { label: 'Hadir', color: 'var(--chart-1)' },
    alpha: { label: 'Alpha', color: 'var(--chart-5)' },
};

type Props = { chart: ChartPoint[]; loading: boolean };

export function ChartKehadiran({ chart, loading }: Props) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-2.5 border-b border-border/60 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-base">
                        Kehadiran Harian
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                        Jumlah siswa hadir & alpha tiap hari aktif
                    </p>
                </div>
            </CardHeader>
            <CardContent className="pt-5">
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
                        <AreaChart data={chart} margin={{ left: 4, right: 8 }}>
                            <defs>
                                <linearGradient
                                    id="fillHadir"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-hadir)"
                                        stopOpacity={0.35}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-hadir)"
                                        stopOpacity={0.02}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="fillAlpha"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-alpha)"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-alpha)"
                                        stopOpacity={0.02}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                            />
                            <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                fontSize={11}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                width={32}
                                allowDecimals={false}
                                fontSize={11}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Area
                                dataKey="hadir"
                                type="monotone"
                                stroke="var(--color-hadir)"
                                strokeWidth={2.5}
                                fill="url(#fillHadir)"
                            />
                            <Area
                                dataKey="alpha"
                                type="monotone"
                                stroke="var(--color-alpha)"
                                strokeWidth={2.5}
                                fill="url(#fillAlpha)"
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
