import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { KelasCard } from '@/components/custom/kelas-card';
import type { Kelas } from '@/types/akademik';

type Props = { kelas: Kelas[] };

function getAccentColor(tingkat: string) {
    if (tingkat === 'X') return '#3b82f6';
    if (tingkat === 'XI') return '#8b5cf6';
    return '#10b981';
}

function getBadgeClass(tingkat: string) {
    if (tingkat === 'X')
        return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900';
    if (tingkat === 'XI')
        return 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900';
    return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900';
}

function getHeaderClass(tingkat: string) {
    if (tingkat === 'X') return 'text-blue-600 dark:text-blue-400';
    if (tingkat === 'XI') return 'text-violet-600 dark:text-violet-400';
    return 'text-emerald-600 dark:text-emerald-400';
}

export default function StatistikAbsensiIndex({ kelas }: Props) {
    const byTahun = kelas.reduce<Record<string, Kelas[]>>((acc, k) => {
        const key = k.tahun_ajaran?.nama ?? 'Tanpa Tahun Ajaran';
        if (!acc[key]) acc[key] = [];
        acc[key].push(k);
        return acc;
    }, {});

    return (
        <>
            <Head title="Statistik Absensi" />
            <div className="flex flex-col gap-8 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Statistik Absensi</h1>
                    <p className="text-sm text-muted-foreground">
                        Pilih kelas untuk melihat statistik kehadiran siswa.
                    </p>
                </div>

                {Object.keys(byTahun).length === 0 && (
                    <div className="rounded-lg border p-10 text-center text-muted-foreground">
                        Belum ada kelas pada tahun ajaran aktif.
                    </div>
                )}

                {Object.entries(byTahun).map(([tahun, list]) => {
                    const groups = list.reduce<{ tingkat: string; tingkat_id: number; items: Kelas[] }[]>(
                        (acc, k) => {
                            const existing = acc.find((g) => g.tingkat_id === k.tingkat_id);
                            if (existing) {
                                existing.items.push(k);
                            } else {
                                acc.push({ tingkat: k.tingkat ?? '', tingkat_id: k.tingkat_id ?? 0, items: [k] });
                            }
                            return acc;
                        },
                        [],
                    );

                    return (
                        <div key={tahun} className="flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-semibold">{tahun}</h2>
                                {list[0]?.tahun_ajaran?.is_active && (
                                    <Badge variant="default">Aktif</Badge>
                                )}
                            </div>

                            {groups.map((group) => (
                                <div key={group.tingkat_id} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <h3 className={`text-sm font-semibold tracking-wide uppercase ${getHeaderClass(group.tingkat)}`}>
                                            Tingkat {group.tingkat}
                                        </h3>
                                        <div className="flex-1 border-t border-dashed border-border" />
                                        <span className="text-xs text-muted-foreground">
                                            {group.items.length} kelas
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {group.items.map((k) => (
                                            <Link key={k.id} href={`/statistik-absensi/${k.id}`}>
                                                <KelasCard
                                                    kelas={k}
                                                    accentColor={getAccentColor(group.tingkat)}
                                                    badgeClass={getBadgeClass(group.tingkat)}
                                                    showActions={false}
                                                    showFooterButtons={false}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

StatistikAbsensiIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Statistik Absensi', href: '/statistik-absensi' },
    ],
};
