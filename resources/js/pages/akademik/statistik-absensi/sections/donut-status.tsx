import { PieChartIcon } from 'lucide-react';
import { useRef } from 'react';
import { Cell, Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useContainerWidth } from '@/hooks/use-container-width';
import type { DonutPoint, StatusKehadiran } from '@/types/statistik';

/** Selaras dengan warna kartu ringkasan. */
const COLORS: Record<StatusKehadiran, string> = {
    hadir: 'var(--primary)',
    terlambat: 'oklch(0.75 0.16 70)',
    sakit: 'oklch(0.7 0.15 162)',
    izin: 'oklch(0.6 0.2 295)',
    dispensasi: 'oklch(0.68 0.15 240)',
    alpha: 'oklch(0.63 0.22 18)',
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

const CHART_HEIGHT = 200;

type Props = { donut: DonutPoint[]; loading: boolean };

export function DonutStatus({ donut, loading }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const width = useContainerWidth(containerRef, 260);

    const data = donut
        .filter((d) => d.total > 0)
        .map((d) => ({ ...d, label: LABEL[d.status] }));
    const total = data.reduce((acc, d) => acc + d.total, 0);

    return (
        <Card className="paint-isolate flex h-full w-full min-w-0 flex-col gap-0 overflow-hidden p-0">
            <CardHeader className="flex flex-row items-center gap-2.5 border-b border-border/60 bg-primary/[0.07] pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
                    <PieChartIcon className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-base">Komposisi Status</CardTitle>
                    <p className="text-xs text-muted-foreground">
                        Distribusi status kehadiran bulan ini
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-center pt-4">
                {loading ? (
                    <Skeleton className="mx-auto h-[180px] w-[180px] rounded-full" />
                ) : data.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                        Belum ada data.
                    </div>
                ) : (
                    <>
                        <div ref={containerRef} className="w-full">
                            <ChartContainer
                                config={config}
                                chartWidth={width}
                                chartHeight={CHART_HEIGHT}
                                className="aspect-auto"
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
                                        innerRadius={56}
                                        outerRadius={84}
                                        paddingAngle={2}
                                        strokeWidth={2}
                                    >
                                        {data.map((d) => (
                                            <Cell
                                                key={d.status}
                                                fill={COLORS[d.status]}
                                            />
                                        ))}
                                        <Label
                                            content={({ viewBox }) => {
                                                if (
                                                    !viewBox ||
                                                    !('cx' in viewBox)
                                                ) {
                                                    return null;
                                                }

                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-2xl font-bold"
                                                        >
                                                            {total}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={
                                                                (viewBox.cy ??
                                                                    0) + 20
                                                            }
                                                            className="fill-muted-foreground text-[11px]"
                                                        >
                                                            catatan
                                                        </tspan>
                                                    </text>
                                                );
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </div>
                        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                            {data.map((d) => (
                                <li
                                    key={d.status}
                                    className="flex items-center gap-2 text-xs"
                                >
                                    <span
                                        className="h-2.5 w-2.5 shrink-0 rounded-sm"
                                        style={{
                                            backgroundColor: COLORS[d.status],
                                        }}
                                    />
                                    <span className="text-muted-foreground">
                                        {d.label}
                                    </span>
                                    <span className="ml-auto font-semibold text-foreground tabular-nums">
                                        {d.total}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
