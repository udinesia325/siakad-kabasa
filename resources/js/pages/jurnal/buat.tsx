// resources/js/pages/jurnal/buat.tsx
import { Head, router } from '@inertiajs/react';
import { BookMarked, Clock, GraduationCap } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types/navigation';

type JadwalSlot = {
    id: number;
    mata_pelajaran: string;
    kelas: string;
    tingkat: string | null;
    jam_mulai: string;
    jam_selesai: string;
    nomor_jam: number;
    sudah_dibuat: boolean;
    jurnal_id: number | null;
};

type Props = {
    jadwals: JadwalSlot[];
    error: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Buat Jurnal', href: '/jurnal/buat' },
];

export default function JurnalBuat({ jadwals, error }: Props) {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Jurnal" />

            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Buat Jurnal
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {today}
                    </p>
                </div>

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                        {error}
                    </div>
                )}

                {!error && jadwals.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center dark:border-slate-700 dark:bg-slate-900/40">
                        <BookMarked className="mx-auto mb-3 h-10 w-10 text-slate-400" />
                        <p className="font-medium text-slate-600 dark:text-slate-300">
                            Tidak ada jadwal mengajar hari ini
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                            Jurnal hanya bisa dibuat untuk hari yang ada jadwal
                            mengajarnya
                        </p>
                    </div>
                )}

                {jadwals.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {jadwals.map((slot) => (
                            <button
                                key={slot.id}
                                type="button"
                                onClick={() =>
                                    router.visit(`/jurnal/buat/${slot.id}`)
                                }
                                className="group relative flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-blue-600"
                            >
                                {slot.sudah_dibuat && (
                                    <span className="absolute top-4 right-4 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
                                        Jurnal Sudah Dibuat
                                    </span>
                                )}
                                <p className="pr-32 font-semibold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                                    {slot.mata_pelajaran}
                                </p>
                                <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <GraduationCap className="h-4 w-4" />
                                        {[slot.tingkat, slot.kelas]
                                            .filter(Boolean)
                                            .join(' ')}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4" />
                                        Jam {slot.nomor_jam} · {slot.jam_mulai}–
                                        {slot.jam_selesai}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
