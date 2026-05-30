import { Head, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { KelasCard } from '@/components/custom/kelas-card';
import type { Kelas } from '@/types/akademik';

type Props = { kelas: Kelas[] };

function accentForTingkat(tingkat: string | null) {
    if (tingkat === 'X') return '#3b82f6';
    if (tingkat === 'XI') return '#8b5cf6';
    return '#10b981';
}

function badgeClassForTingkat(tingkat: string | null) {
    if (tingkat === 'X')
        return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900';
    if (tingkat === 'XI')
        return 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900';
    return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900';
}

export default function JadwalMengajarIndex({ kelas }: Props) {
    const groups = kelas.reduce<{ tingkat: string; tingkat_id: number; items: Kelas[] }[]>(
        (acc, k) => {
            const existing = acc.find((g) => g.tingkat_id === (k.tingkat_id ?? 0));
            if (existing) {
                existing.items.push(k);
            } else {
                acc.push({ tingkat: k.tingkat ?? '', tingkat_id: k.tingkat_id ?? 0, items: [k] });
            }
            return acc;
        },
        [],
    );

    const tahunAktif = kelas[0]?.tahun_ajaran;

    return (
        <>
            <Head title="Jadwal Mengajar" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Jadwal Mengajar</h1>
                        <p className="text-sm text-muted-foreground">
                            Pilih kelas untuk mengatur jadwal mata pelajaran dan guru pengajarnya.
                        </p>
                    </div>
                    {tahunAktif && (
                        <Badge variant="default" className="mt-1 shrink-0">
                            {tahunAktif.nama}
                        </Badge>
                    )}
                </div>

                {groups.length === 0 && (
                    <div className="rounded-lg border p-10 text-center text-muted-foreground">
                        Belum ada kelas aktif.
                    </div>
                )}

                {groups.map((group) => (
                    <div key={group.tingkat_id} className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <h2
                                className="text-sm font-semibold tracking-wide uppercase"
                                style={{ color: accentForTingkat(group.tingkat) }}
                            >
                                Tingkat {group.tingkat}
                            </h2>
                            <div className="flex-1 border-t border-dashed border-border" />
                            <span className="text-xs text-muted-foreground">
                                {group.items.length} kelas
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {group.items.map((k) => (
                                <div
                                    key={k.id}
                                    className="cursor-pointer"
                                    onClick={() => router.visit(`/jadwal-mengajar/${k.id}`)}
                                >
                                    <KelasCard
                                        kelas={k}
                                        accentColor={accentForTingkat(k.tingkat)}
                                        badgeClass={badgeClassForTingkat(k.tingkat)}
                                        showActions={false}
                                        showFooterButtons={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

JadwalMengajarIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jadwal Mengajar', href: '/jadwal-mengajar' },
    ],
};
