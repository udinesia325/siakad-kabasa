// resources/js/pages/jurnal/show.tsx
import { Head, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types/navigation';

type StatusJurnal = 'hadir' | 'alpha' | 'sakit' | 'izin' | 'dispensasi';

const STATUS_LABEL: Record<StatusJurnal, string> = {
    hadir: 'Hadir', alpha: 'Alpha', sakit: 'Sakit', izin: 'Izin', dispensasi: 'Dispensasi',
};

const STATUS_BADGE: Record<StatusJurnal, string> = {
    hadir: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    alpha: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    sakit: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500',
    izin: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    dispensasi: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

type DetailRow = {
    siswa_id: number;
    nama: string;
    status: StatusJurnal;
    keterangan: string | null;
};

type JurnalDetail = {
    id: number;
    tanggal: string;
    guru: string;
    mata_pelajaran: string;
    kelas: string;
    tingkat: string | null;
    jam_mulai: string;
    jam_selesai: string;
    dibuat_oleh: string;
    created_at: string;
    updated_at: string;
    details: DetailRow[];
};

type Props = { jurnal: JurnalDetail };

export default function JurnalShow({ jurnal }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Jurnal Mengajar', href: '/jurnal' },
        { title: `${jurnal.mata_pelajaran} — ${new Date(jurnal.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, href: '#' },
    ];

    const tanggalFormatted = new Date(jurnal.tanggal).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Jurnal — ${jurnal.mata_pelajaran}`} />

            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <button
                    type="button"
                    onClick={() => router.visit('/jurnal')}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Rekap
                </button>

                {/* Info card */}
                <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/60 sm:grid-cols-2">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Mata Pelajaran</p>
                        <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{jurnal.mata_pelajaran}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Kelas</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{[jurnal.tingkat, jurnal.kelas].filter(Boolean).join(' ')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Guru</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{jurnal.guru}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Jam Pelajaran</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{jurnal.jam_mulai}–{jurnal.jam_selesai}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Tanggal</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{tanggalFormatted}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Dibuat Oleh</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{jurnal.dibuat_oleh}</p>
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-xs text-slate-400">
                            Dibuat: {jurnal.created_at}
                            {jurnal.created_at !== jurnal.updated_at && ` · Terakhir diubah: ${jurnal.updated_at}`}
                        </p>
                    </div>
                </div>

                {/* Tabel detail */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/60">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">No</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Nama Siswa</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                            {jurnal.details.map((d, idx) => (
                                <tr key={d.siswa_id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                                    <td className="px-4 py-3 text-slate-400">{idx + 1}</td>
                                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{d.nama}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[d.status]}`}>
                                            {STATUS_LABEL[d.status]}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                                        {d.keterangan ?? <span className="italic text-slate-300 dark:text-slate-600">—</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
