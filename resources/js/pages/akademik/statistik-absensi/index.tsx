import { Head, Link } from '@inertiajs/react';
import { ChartColumn, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Kelas } from '@/types/akademik';

type Props = { kelas: Kelas[] };

export default function StatistikAbsensiIndex({ kelas }: Props) {
    const grouped = kelas.reduce<Record<string, Kelas[]>>((acc, k) => {
        const key = k.tahun_ajaran?.nama ?? 'Tanpa Tahun Ajaran';
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(k);
        return acc;
    }, {});

    return (
        <>
            <Head title="Statistik Absensi" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Statistik Absensi
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Pilih kelas untuk melihat statistik kehadiran siswa.
                    </p>
                </div>

                {Object.keys(grouped).length === 0 && (
                    <div className="rounded-lg border p-10 text-center text-muted-foreground">
                        Belum ada kelas pada tahun ajaran aktif.
                    </div>
                )}

                {Object.entries(grouped).map(([tahun, list]) => (
                    <div key={tahun} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-semibold text-muted-foreground">
                                {tahun}
                            </h2>
                            {list[0]?.tahun_ajaran?.is_active && (
                                <Badge variant="default">Aktif</Badge>
                            )}
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {list.map((k) => (
                                <Link
                                    key={k.id}
                                    href={`/statistik-absensi/${k.id}`}
                                    className="group flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-md bg-primary/10 p-2 text-primary">
                                            <ChartColumn className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">
                                                {k.nama}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                Tingkat {k.tingkat}
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
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
