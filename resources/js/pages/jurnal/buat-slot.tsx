// resources/js/pages/jurnal/buat-slot.tsx
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

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

const STATUS_CHECKBOX_CHECKED: Record<StatusJurnal, string> = {
    hadir: 'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-500',
    alpha: 'border-red-500 bg-red-500 dark:border-red-400 dark:bg-red-500',
    sakit: 'border-yellow-500 bg-yellow-500 dark:border-yellow-400 dark:bg-yellow-500',
    izin: 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-500',
    dispensasi: 'border-purple-500 bg-purple-500 dark:border-purple-400 dark:bg-purple-500',
};

const STATUS_CHECKBOX_HOVER: Record<StatusJurnal, string> = {
    hadir: 'hover:border-green-400',
    alpha: 'hover:border-red-400',
    sakit: 'hover:border-yellow-400',
    izin: 'hover:border-blue-400',
    dispensasi: 'hover:border-purple-400',
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
        <>
            <Head title={`Jurnal — ${jadwal.mata_pelajaran}`} />

            <div className="space-y-6 p-6">
                {/* Header info */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/60">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                                {jadwal.mata_pelajaran}
                            </h1>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                {jadwal.tingkat && (
                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                                        {jadwal.tingkat}
                                    </span>
                                )}
                                <span>{jadwal.kelas} · {jadwal.jam_mulai}–{jadwal.jam_selesai} · {tanggalFormatted}</span>
                            </div>
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
                                <th className="sticky left-0 z-10 w-48 min-w-[12rem] bg-white px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase dark:bg-slate-800">
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
                                    className="group hover:bg-slate-50 dark:hover:bg-slate-700/30"
                                >
                                    <td className="sticky left-0 z-10 w-48 min-w-[12rem] bg-white px-4 py-3 group-hover:bg-slate-50 dark:bg-slate-800 dark:group-hover:bg-slate-700/30">
                                        <span className="mr-2 text-xs text-slate-400">{idx + 1}.</span>
                                        <span className="font-medium text-slate-800 dark:text-slate-200">{siswa.nama}</span>
                                    </td>
                                    {STATUS_LABELS.map((s) => (
                                        <td
                                            key={s}
                                            className="px-3 py-3 text-center"
                                        >
                                            <button
                                                type="button"
                                                role="checkbox"
                                                aria-checked={siswa.status === s}
                                                aria-label={`${s} untuk ${siswa.nama}`}
                                                onClick={() => setStatus(siswa.id, s)}
                                                className={[
                                                    'mx-auto flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 transition-colors',
                                                    siswa.status === s
                                                        ? STATUS_CHECKBOX_CHECKED[s]
                                                        : `border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800 ${STATUS_CHECKBOX_HOVER[s]}`,
                                                ].join(' ')}
                                            >
                                                {siswa.status === s && (
                                                    <svg
                                                        className="h-3 w-3 text-white"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="2,6 5,9 10,3" />
                                                    </svg>
                                                )}
                                            </button>
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
                    <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="outline">
                            <Link href="/jurnal/buat">Kembali</Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline" className="cursor-pointer border-red-300 text-red-600 hover:bg-red-50 hover:text-red-600 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">
                                    Reset
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent size="sm">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Reset kehadiran?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Semua pilihan status dan keterangan akan dikembalikan ke kondisi awal. Perubahan ini belum tersimpan — data baru akan berlaku hanya setelah kamu menekan <strong>Simpan Jurnal</strong>.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel size="sm">Batal</AlertDialogCancel>
                                    <AlertDialogAction size="sm" variant="destructive" onClick={handleReset}>
                                        Ya, Reset
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <Button
                        size="sm"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="cursor-pointer"
                    >
                        {submitting ? 'Menyimpan...' : 'Simpan Jurnal'}
                    </Button>
                </div>
            </div>
        </>
    );
}

JurnalBuatSlot.layout = {
    breadcrumbs: [{ title: 'Buat Jurnal', href: '/jurnal/buat' }],
};
