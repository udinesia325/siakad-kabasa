import { Head } from '@inertiajs/react';
import { isCancel } from 'axios';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    CpuIcon,
    Database,
    HardDrive,
    MonitorCheck,
    RefreshCw,
    Server,
    Users,
    Zap,
} from 'lucide-react';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import axios from '@/lib/axios';

// ── Types ──────────────────────────────────────────────────────────────
type CpuInfo = { usage_percent: number | null; cores: number | null };
type RamInfo = {
    used_gb: number | null;
    total_gb: number | null;
    usage_percent: number | null;
};
type DiskPartition = {
    mount: string;
    used_gb: number | null;
    total_gb: number | null;
    usage_percent: number | null;
};
type UptimeInfo = {
    days: number | null;
    hours: number | null;
    minutes: number | null;
    hostname: string | null;
    os: string | null;
};

type SlowQuery = { sql: string; count: number; max_ms: number };
type ExceptionEntry = { class: string; count: number };
type CacheInfo = { hit_rate: number; hits: number; misses: number };
type RequestEntry = { endpoint: string; count: number; avg_ms: number };
type QueueInfo = { processed: number; failed: number };
type TopUser = { user_id: string; count: number };

type StatsData = {
    system: {
        cpu: CpuInfo;
        ram: RamInfo;
        disk: DiskPartition[];
        uptime: UptimeInfo;
    };
    pulse: {
        slow_queries: SlowQuery[];
        exceptions: ExceptionEntry[];
        cache: CacheInfo;
        requests: RequestEntry[];
        queue: QueueInfo;
        top_users: TopUser[];
    };
};

// ── Helpers ────────────────────────────────────────────────────────────
function pctColor(pct: number | null): string {
    if (pct === null) {
        return 'bg-muted';
    }

    if (pct >= 90) {
        return 'bg-red-500';
    }

    if (pct >= 70) {
        return 'bg-amber-500';
    }

    return 'bg-blue-500';
}

function pctTextColor(pct: number | null): string {
    if (pct === null) {
        return 'text-muted-foreground';
    }

    if (pct >= 90) {
        return 'text-red-500';
    }

    if (pct >= 70) {
        return 'text-amber-500';
    }

    return 'text-blue-500';
}

function severityBadge(pct: number | null) {
    if (pct === null) {
        return <Badge variant="outline">N/A</Badge>;
    }

    if (pct >= 90) {
        return <Badge className="bg-red-500 text-white">Kritis</Badge>;
    }

    if (pct >= 70) {
        return <Badge className="bg-amber-500 text-white">Peringatan</Badge>;
    }

    return <Badge className="bg-green-500 text-white">Normal</Badge>;
}

function RadialGauge({
    percent,
    label,
}: {
    percent: number | null;
    label: string;
}) {
    const r = 40;
    const circ = 2 * Math.PI * r;
    const offset = percent !== null ? circ - (percent / 100) * circ : circ;
    const strokeColorMap: Record<string, string> = {
        'bg-red-500': '#ef4444',
        'bg-amber-500': '#f59e0b',
        'bg-blue-500': '#3b82f6',
        'bg-muted': '#e5e7eb',
    };
    const stroke = strokeColorMap[pctColor(percent)] ?? '#3b82f6';

    return (
        <div className="flex flex-col items-center gap-1">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke={stroke}
                    strokeWidth="10"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
                <text
                    x="50"
                    y="54"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="currentColor"
                >
                    {percent !== null ? `${percent}%` : 'N/A'}
                </text>
            </svg>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    );
}

function ProgressBar({
    percent,
    colorClass,
}: {
    percent: number | null;
    colorClass: string;
}) {
    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
                className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                style={{
                    width:
                        percent !== null ? `${Math.min(percent, 100)}%` : '0%',
                }}
            />
        </div>
    );
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            {label}
        </div>
    );
}

type MonitorState = {
    data: StatsData | null;
    isLoading: boolean;
    error: { status?: number; message: string } | null;
};

type MonitorAction =
    | { type: 'RESET' }
    | { type: 'SUCCESS'; data: StatsData }
    | { type: 'AUTH_ERROR'; status: number }
    | { type: 'DONE' };

function monitorReducer(
    state: MonitorState,
    action: MonitorAction,
): MonitorState {
    switch (action.type) {
        case 'RESET':
            return { data: null, isLoading: true, error: null };
        case 'SUCCESS':
            return { data: action.data, isLoading: false, error: null };
        case 'AUTH_ERROR':
            return {
                ...state,
                isLoading: false,
                error: {
                    status: action.status,
                    message:
                        action.status === 403
                            ? 'Anda tidak memiliki akses ke halaman ini.'
                            : 'Sesi habis. Silakan login ulang.',
                },
            };
        case 'DONE':
            return { ...state, isLoading: false };
        default:
            return state;
    }
}

// ── Main Component ─────────────────────────────────────────────────────
export default function ServerMonitorIndex() {
    const [state, dispatch] = useReducer(monitorReducer, {
        data: null,
        isLoading: true,
        error: null,
    });
    const [refreshKey, setRefreshKey] = useState(0);
    const isPolling = useRef(true);

    const fetchStats = useCallback(async (signal: AbortSignal) => {
        try {
            const res = await axios.get<StatsData>(
                '/sistem/server-monitor/stats',
                { signal },
            );
            dispatch({ type: 'SUCCESS', data: res.data });
        } catch (err: unknown) {
            if (isCancel(err)) {
                return;
            }

            const status = (err as { response?: { status?: number } })?.response
                ?.status;

            if (status === 401 || status === 403) {
                isPolling.current = false;
                dispatch({ type: 'AUTH_ERROR', status });
            } else {
                dispatch({ type: 'DONE' });
            }
        }
    }, []);

    useEffect(() => {
        isPolling.current = true;
        const controller = new AbortController();
        dispatch({ type: 'RESET' });

        fetchStats(controller.signal);

        const intervalId = setInterval(() => {
            if (!isPolling.current) {
                return;
            }

            fetchStats(controller.signal);
        }, 2000);

        return () => {
            isPolling.current = false;
            clearInterval(intervalId);
            controller.abort();
        };
    }, [fetchStats, refreshKey]);

    const { data, isLoading, error } = state;
    const sys = data?.system;
    const pulse = data?.pulse;

    return (
        <>
            <Head title="Server Monitor" />

            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <MonitorCheck className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-semibold">Server Monitor</h1>
                    {!error && (
                        <span className="flex items-center gap-1.5">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Live
                            </span>
                        </span>
                    )}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRefreshKey((k) => k + 1)}
                    className="gap-2"
                >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                </Button>
            </div>

            <div className="space-y-6 px-6 pb-8">
                {error && (
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="flex items-center gap-3 py-6">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-700">
                                {error.message}
                            </p>
                        </CardContent>
                    </Card>
                )}

                <section>
                    <h2 className="mb-3 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                        System Resources
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="gap-4 rounded-xl border bg-card py-6">
                            <CardHeader className="px-6 pb-0">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                        <CpuIcon className="h-4 w-4 text-primary" />
                                        CPU Usage
                                    </CardTitle>
                                    {isLoading ? (
                                        <Skeleton className="h-5 w-16" />
                                    ) : (
                                        severityBadge(
                                            sys?.cpu.usage_percent ?? null,
                                        )
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-3 px-6">
                                {isLoading ? (
                                    <Skeleton className="h-24 w-24 rounded-full" />
                                ) : (
                                    <RadialGauge
                                        percent={sys?.cpu.usage_percent ?? null}
                                        label="Penggunaan"
                                    />
                                )}
                                {isLoading ? (
                                    <Skeleton className="h-4 w-24" />
                                ) : (
                                    <p className="text-xs text-muted-foreground">
                                        {sys?.cpu.cores
                                            ? `${sys.cpu.cores} Core`
                                            : 'N/A'}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="gap-4 rounded-xl border bg-card py-6">
                            <CardHeader className="px-6 pb-0">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                        <Server className="h-4 w-4 text-primary" />
                                        RAM Usage
                                    </CardTitle>
                                    {isLoading ? (
                                        <Skeleton className="h-5 w-16" />
                                    ) : (
                                        severityBadge(
                                            sys?.ram.usage_percent ?? null,
                                        )
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6">
                                {isLoading ? (
                                    <>
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-2 w-full" />
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <p
                                                className={`text-3xl font-bold ${pctTextColor(sys?.ram.usage_percent ?? null)}`}
                                            >
                                                {sys?.ram.usage_percent !==
                                                    null &&
                                                sys?.ram.usage_percent !==
                                                    undefined
                                                    ? `${sys.ram.usage_percent}%`
                                                    : 'N/A'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {sys?.ram.used_gb ?? 'N/A'} GB /{' '}
                                                {sys?.ram.total_gb ?? 'N/A'} GB
                                            </p>
                                        </div>
                                        <ProgressBar
                                            percent={
                                                sys?.ram.usage_percent ?? null
                                            }
                                            colorClass={pctColor(
                                                sys?.ram.usage_percent ?? null,
                                            )}
                                        />
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="gap-4 rounded-xl border bg-card py-6">
                            <CardHeader className="px-6 pb-0">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                        <HardDrive className="h-4 w-4 text-primary" />
                                        Disk Usage
                                    </CardTitle>
                                    {isLoading ? (
                                        <Skeleton className="h-5 w-16" />
                                    ) : (
                                        severityBadge(
                                            sys?.disk[0]?.usage_percent ?? null,
                                        )
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6">
                                {isLoading ? (
                                    <>
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-2 w-full" />
                                    </>
                                ) : sys?.disk.length ? (
                                    sys.disk.map((d, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-baseline justify-between">
                                                <p
                                                    className={`text-3xl font-bold ${pctTextColor(d.usage_percent)}`}
                                                >
                                                    {d.usage_percent !== null
                                                        ? `${d.usage_percent}%`
                                                        : 'N/A'}
                                                </p>
                                                <span className="font-mono text-xs text-muted-foreground">
                                                    {d.mount}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {d.used_gb ?? 'N/A'} GB /{' '}
                                                {d.total_gb ?? 'N/A'} GB
                                            </p>
                                            <ProgressBar
                                                percent={d.usage_percent}
                                                colorClass={pctColor(
                                                    d.usage_percent,
                                                )}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        N/A
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="gap-4 rounded-xl border bg-card py-6">
                            <CardHeader className="px-6 pb-0">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                    <Clock className="h-4 w-4 text-primary" />
                                    Uptime
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 px-6">
                                {isLoading ? (
                                    <div className="space-y-2">
                                        <Skeleton className="h-8 w-36" />
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-2xl font-bold text-primary">
                                            {sys?.uptime.days !== null
                                                ? `${sys?.uptime.days}h ${sys?.uptime.hours}j ${sys?.uptime.minutes}m`
                                                : 'N/A'}
                                        </p>
                                        <div className="space-y-1 text-xs text-muted-foreground">
                                            <p className="flex items-center gap-1">
                                                <Server className="h-3 w-3" />
                                                {sys?.uptime.hostname ?? 'N/A'}
                                            </p>
                                            <p>{sys?.uptime.os ?? 'N/A'}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                            <span className="text-xs text-green-600">
                                                Online
                                            </span>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section>
                    <h2 className="mb-3 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                        Pulse Metrics (24 jam terakhir)
                    </h2>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <Card className="rounded-xl border bg-card">
                            <CardHeader className="px-6 pt-6 pb-3">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                    <Database className="h-4 w-4 text-primary" />
                                    Slow Queries
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                {isLoading ? (
                                    <div className="space-y-2">
                                        {[...Array(3)].map((_, i) => (
                                            <Skeleton
                                                key={i}
                                                className="h-8 w-full"
                                            />
                                        ))}
                                    </div>
                                ) : !pulse?.slow_queries.length ? (
                                    <EmptyState label="Tidak ada slow query" />
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Query</TableHead>
                                                <TableHead className="w-16 text-right">
                                                    Count
                                                </TableHead>
                                                <TableHead className="w-20 text-right">
                                                    Max ms
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {pulse.slow_queries.map((q, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="max-w-[160px] truncate font-mono text-xs">
                                                        {q.sql}
                                                    </TableCell>
                                                    <TableCell className="text-right text-xs">
                                                        {q.count}
                                                    </TableCell>
                                                    <TableCell className="text-right text-xs text-amber-600">
                                                        {q.max_ms}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-xl border bg-card">
                            <CardHeader className="px-6 pt-6 pb-3">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                    Exceptions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                {isLoading ? (
                                    <div className="space-y-2">
                                        {[...Array(3)].map((_, i) => (
                                            <Skeleton
                                                key={i}
                                                className="h-8 w-full"
                                            />
                                        ))}
                                    </div>
                                ) : !pulse?.exceptions.length ? (
                                    <EmptyState label="Tidak ada exception" />
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Class</TableHead>
                                                <TableHead className="w-16 text-right">
                                                    Count
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {pulse.exceptions.map((e, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="max-w-[200px] truncate font-mono text-xs">
                                                        {e.class}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Badge
                                                            variant="outline"
                                                            className="text-red-600"
                                                        >
                                                            {e.count}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-xl border bg-card">
                            <CardHeader className="px-6 pt-6 pb-3">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                    <Zap className="h-4 w-4 text-yellow-500" />
                                    Cache Hit Rate
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 pb-6">
                                {isLoading ? (
                                    <div className="space-y-3">
                                        <Skeleton className="h-12 w-24" />
                                        <Skeleton className="h-2 w-full" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ) : (
                                    <>
                                        <p
                                            className={`text-4xl font-bold ${pctTextColor(pulse?.cache.hit_rate ?? null)}`}
                                        >
                                            {pulse?.cache.hit_rate ?? 0}%
                                        </p>
                                        <ProgressBar
                                            percent={pulse?.cache.hit_rate ?? 0}
                                            colorClass={pctColor(
                                                pulse?.cache.hit_rate ?? null,
                                            )}
                                        />
                                        <div className="flex gap-4 text-xs text-muted-foreground">
                                            <span className="text-green-600">
                                                ✓ {pulse?.cache.hits ?? 0} hits
                                            </span>
                                            <span className="text-red-500">
                                                ✗ {pulse?.cache.misses ?? 0}{' '}
                                                misses
                                            </span>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-xl border bg-card">
                            <CardHeader className="px-6 pt-6 pb-3">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                    <Zap className="h-4 w-4 text-primary" />
                                    Slow HTTP Requests
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                {isLoading ? (
                                    <div className="space-y-2">
                                        {[...Array(3)].map((_, i) => (
                                            <Skeleton
                                                key={i}
                                                className="h-8 w-full"
                                            />
                                        ))}
                                    </div>
                                ) : !pulse?.requests.length ? (
                                    <EmptyState label="Tidak ada slow request" />
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Endpoint</TableHead>
                                                <TableHead className="w-16 text-right">
                                                    Count
                                                </TableHead>
                                                <TableHead className="w-20 text-right">
                                                    Avg ms
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {pulse.requests.map((r, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="max-w-[160px] truncate font-mono text-xs">
                                                        {r.endpoint}
                                                    </TableCell>
                                                    <TableCell className="text-right text-xs">
                                                        {r.count}
                                                    </TableCell>
                                                    <TableCell className="text-right text-xs text-amber-600">
                                                        {r.avg_ms}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-xl border bg-card">
                            <CardHeader className="px-6 pt-6 pb-3">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                    <RefreshCw className="h-4 w-4 text-primary" />
                                    Queue Jobs
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4 px-6 pb-6">
                                {isLoading ? (
                                    <>
                                        <Skeleton className="h-16" />
                                        <Skeleton className="h-16" />
                                    </>
                                ) : (
                                    <>
                                        <div className="rounded-lg bg-green-50 p-4 text-center">
                                            <p className="text-2xl font-bold text-green-600">
                                                {pulse?.queue.processed ?? 0}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Processed
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-red-50 p-4 text-center">
                                            <p className="text-2xl font-bold text-red-600">
                                                {pulse?.queue.failed ?? 0}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Failed
                                            </p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-xl border bg-card">
                            <CardHeader className="px-6 pt-6 pb-3">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                    <Users className="h-4 w-4 text-primary" />
                                    Top Users
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                {isLoading ? (
                                    <div className="space-y-2">
                                        {[...Array(3)].map((_, i) => (
                                            <Skeleton
                                                key={i}
                                                className="h-8 w-full"
                                            />
                                        ))}
                                    </div>
                                ) : !pulse?.top_users.length ? (
                                    <EmptyState label="Belum ada data user" />
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>User ID</TableHead>
                                                <TableHead className="w-20 text-right">
                                                    Requests
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {pulse.top_users.map((u, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="font-mono text-xs">
                                                        {u.user_id}
                                                    </TableCell>
                                                    <TableCell className="text-right text-xs">
                                                        {u.count}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </>
    );
}

ServerMonitorIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Server Monitor', href: '/sistem/server-monitor' },
    ],
};
