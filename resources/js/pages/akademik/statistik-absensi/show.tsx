import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { StatistikAbsensi, StatistikKelas } from '@/types/statistik';
import { ChartKehadiran } from './sections/chart-kehadiran';
import { DonutStatus } from './sections/donut-status';
import { KartuRingkasan } from './sections/kartu-ringkasan';
import { RataJamMasuk } from './sections/rata-jam-masuk';
import { RecentAnulir } from './sections/recent-anulir';

const BULAN = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

type Props = {
    kelas: StatistikKelas;
    statistik: StatistikAbsensi;
    filters: { bulan: number; tahun: number };
    tahunOptions: number[];
};

export default function StatistikAbsensiShow({
    kelas,
    statistik,
    filters,
    tahunOptions,
}: Props) {
    const [loading, setLoading] = useState(false);

    const reload = (bulan: number, tahun: number) => {
        router.get(
            `/statistik-absensi/${kelas.id}`,
            { bulan, tahun },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['statistik', 'filters'],
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <>
            <Head title={`Statistik Absensi · ${kelas.nama}`} />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Statistik Absensi
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {kelas.nama} · Tingkat {kelas.tingkat}
                            {kelas.tahun_ajaran
                                ? ` · ${kelas.tahun_ajaran}`
                                : ''}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Select
                            value={String(filters.bulan)}
                            onValueChange={(v) =>
                                reload(Number(v), filters.tahun)
                            }
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {BULAN.map((nama, i) => (
                                    <SelectItem
                                        key={i}
                                        value={String(i + 1)}
                                    >
                                        {nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={String(filters.tahun)}
                            onValueChange={(v) =>
                                reload(filters.bulan, Number(v))
                            }
                        >
                            <SelectTrigger className="w-[110px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {tahunOptions.map((t) => (
                                    <SelectItem key={t} value={String(t)}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <ChartKehadiran chart={statistik.chart} loading={loading} />

                <KartuRingkasan
                    ringkasan={statistik.ringkasan}
                    gender={statistik.gender}
                    loading={loading}
                />

                <div className="grid gap-4 lg:grid-cols-3">
                    <DonutStatus donut={statistik.donut} loading={loading} />
                    <RecentAnulir
                        items={statistik.recentAnulir}
                        loading={loading}
                    />
                    <RataJamMasuk
                        rata={statistik.rataJamMasuk.rata}
                        totalTerlambat={statistik.rataJamMasuk.totalTerlambat}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    );
}

StatistikAbsensiShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Statistik Absensi', href: '/statistik-absensi' },
    ],
};
