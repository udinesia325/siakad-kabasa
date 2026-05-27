// resources/js/pages/jurnal/buat-slot.tsx
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types/navigation';

type StatusJurnal = 'hadir' | 'alpha' | 'sakit' | 'izin' | 'dispensasi';

const STATUS_LABELS: StatusJurnal[] = [
    'hadir',
    'alpha',
    'sakit',
    'izin',
    'dispensasi',
];
const STATUS_SHORT: Record<StatusJurnal, string> = {
    hadir: 'H',
    alpha: 'A',
    sakit: 'S',
    izin: 'I',
    dispensasi: 'D',
};
const STATUS_COLOR: Record<StatusJurnal, string> = {
    hadir: 'text-green-600 dark:text-green-400',
    alpha: 'text-red-600 dark:text-red-400',
    sakit: 'text-yellow-600 dark:text-yellow-500',
    izin: 'text-blue-600 dark:text-blue-400',
    dispensasi: 'text-purple-600 dark:text-purple-400',
};

type SiswaJurnal = {
    id: number;
    nama: string;
    status: StatusJurnal;
    keterangan: string | null;
};

type JadwalInfo = {
    id: number;
    mata_pelajaran: string;
    kelas: string;
    tingkat: string | null;
    jam_mulai: string;
    jam_selesai: string;
    tanggal: string;
};

type Props = {
    mode: 'create' | 'edit';
    jadwal: JadwalInfo;
    siswa: SiswaJurnal[];
    jurnal_id: number | null;
};

export default function JurnalBuatSlot({
    mode,
    jadwal,
    siswa: initialSiswa,
    jurnal_id,
}: Props) {
    const [details, setDetails] = useState<SiswaJurnal[]>(
        initialSiswa.map((s) => ({ ...s, keterangan: s.keterangan ?? '' })),
    );
    const [submitting, setSubmitting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Buat Jurnal', href: '/jurnal/buat' },
        { title: jadwal.mata_pelajaran, href: '#' },
    ];

    function setStatus(siswaId: number, status: StatusJurnal) {
        setDetails((prev) =>
            prev.map((d) => (d.id === siswaId ? { ...d, status } : d)),
        );
    }

    function setKeterangan(siswaId: number, keterangan: string) {
        setDetails((prev) =>
            prev.map((d) => (d.id === siswaId ? { ...d, keterangan } : d)),
        );
    }

    function handleReset() {
        setDetails(
            initialSiswa.map((s) => ({ ...s, keterangan: s.keterangan ?? '' })),
        );
    }

    function handleSubmit() {
        if (submitting) {
            return;
        }

        setSubmitting(true);
        const payload = {
            detail: details.map((d) => ({
                siswa_id: d.id,
                status: d.status,
                keterangan: d.keterangan || null,
            })),
        };

        if (mode === 'create') {
            router.post(`/jurnal/${jadwal.id}`, payload, {
                onFinish: () => setSubmitting(false),
            });
        } else {
            router.put(`/jurnal/${jurnal_id}`, payload, {
                onFinish: () => setSubmitting(false),
            });
        }
    }

    const tanggalFormatted = new Date(jadwal.tanggal).toLocaleDateString(
        'id-ID',
        {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        },
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Jurnal — ${jadwal.mata_pelajaran}`} />

            <div className="mx-auto max-w-5xl space-y-6 p-6">
                {/* Header info */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/60">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                                {jadwal.mata_pelajaran}
                            </h1>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                {[jadwal.tingkat, jadwal.kelas]
                                    .filter(Boolean)
                                    .join(' ')}{' '}
                                · {jadwal.jam_mulai}–{jadwal.jam_selesai} ·{' '}
                                {tanggalFormatted}
                            </p>
                        </div>
                        {mode === 'edit' && (
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                Mode Edit
                            </span>
                        )}
                    </div>
                </div>

                {/* Tabel */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/60">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">
                                    No
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">
                                    Nama Siswa
                                </th>
                                {STATUS_LABELS.map((s) => (
                                    <th
                                        key={s}
                                        className={`px-3 py-3 text-center text-xs font-semibold tracking-wider uppercase ${STATUS_COLOR[s]}`}
                                    >
                                        {STATUS_SHORT[s]}
                                    </th>
                                ))}
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">
                                    Keterangan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                            {details.map((siswa, idx) => (
                                <tr
                                    key={siswa.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30"
                                >
                                    <td className="px-4 py-3 text-slate-400">
                                        {idx + 1}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                                        {siswa.nama}
                                    </td>
                                    {STATUS_LABELS.map((s) => (
                                        <td
                                            key={s}
                                            className="px-3 py-3 text-center"
                                        >
                                            <input
                                                type="radio"
                                                name={`status-${siswa.id}`}
                                                checked={siswa.status === s}
                                                onChange={() =>
                                                    setStatus(siswa.id, s)
                                                }
                                                aria-label={`${s} untuk ${siswa.nama}`}
                                                className="h-4 w-4 cursor-pointer accent-blue-600"
                                            />
                                        </td>
                                    ))}
                                    <td className="px-4 py-3">
                                        <input
                                            type="text"
                                            value={siswa.keterangan ?? ''}
                                            onChange={(e) =>
                                                setKeterangan(
                                                    siswa.id,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Opsional"
                                            maxLength={500}
                                            className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-1.5 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none dark:border-slate-600 dark:text-slate-200"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        {submitting ? 'Menyimpan...' : 'Simpan Jurnal'}
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
