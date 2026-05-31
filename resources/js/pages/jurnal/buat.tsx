import { Head, router } from '@inertiajs/react';
import { BookMarked, Clock, GraduationCap, Layers } from 'lucide-react';

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

type Blok = {
    ids: number[];
    mata_pelajaran: string;
    kelas: string;
    tingkat: string | null;
    nomor_jam_dari: number;
    nomor_jam_sampai: number;
    jam_mulai: string;
    jam_selesai: string;
};

type Props = {
    jadwals: JadwalSlot[];
    error: string | null;
};

function detectBloks(jadwals: JadwalSlot[]): Blok[] {
    const bloks: Blok[] = [];
    let i = 0;

    while (i < jadwals.length) {
        const start = jadwals[i];
        if (start.sudah_dibuat) { i++; continue; }

        let j = i + 1;
        while (
            j < jadwals.length &&
            !jadwals[j].sudah_dibuat &&
            jadwals[j].mata_pelajaran === start.mata_pelajaran &&
            jadwals[j].kelas === start.kelas &&
            jadwals[j].nomor_jam === jadwals[j - 1].nomor_jam + 1
        ) {
            j++;
        }

        if (j - i >= 2) {
            const group = jadwals.slice(i, j);
            bloks.push({
                ids: group.map((s) => s.id),
                mata_pelajaran: start.mata_pelajaran,
                kelas: start.kelas,
                tingkat: start.tingkat,
                nomor_jam_dari: start.nomor_jam,
                nomor_jam_sampai: jadwals[j - 1].nomor_jam,
                jam_mulai: start.jam_mulai,
                jam_selesai: jadwals[j - 1].jam_selesai,
            });
        }
        i = j;
    }

    return bloks;
}

export default function JurnalBuat({ jadwals, error }: Props) {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

    const bloks = detectBloks(jadwals);
    const blokIds = new Set(bloks.flatMap((b) => b.ids));

    return (
        <>
            <Head title="Buat Jurnal" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Buat Jurnal</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{today}</p>
                </div>

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                        {error}
                    </div>
                )}

                {!error && jadwals.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center dark:border-slate-700 dark:bg-slate-900/40">
                        <BookMarked className="mx-auto mb-3 h-10 w-10 text-slate-400" />
                        <p className="font-medium text-slate-600 dark:text-slate-300">Tidak ada jadwal mengajar hari ini</p>
                        <p className="mt-1 text-sm text-slate-400">Jurnal hanya bisa dibuat untuk hari yang ada jadwal mengajarnya</p>
                    </div>
                )}

                {/* Banner blok serentak */}
                {bloks.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {bloks.map((blok) => (
                            <button
                                key={blok.ids.join('-')}
                                type="button"
                                onClick={() => router.visit(`/jurnal/serentak?ids=${blok.ids.join(',')}`)}
                                className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 text-left transition hover:border-blue-400 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/30 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
                            >
                                <Layers className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                                        Isi Sekaligus — {blok.mata_pelajaran}
                                    </p>
                                    <p className="mt-0.5 text-xs text-blue-600 dark:text-blue-400">
                                        {blok.kelas} · Jam {blok.nomor_jam_dari}–{blok.nomor_jam_sampai} · {blok.jam_mulai}–{blok.jam_selesai}
                                    </p>
                                </div>
                                <span className="shrink-0 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-blue-500">
                                    {blok.ids.length} jam
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Card individual per slot */}
                {jadwals.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {jadwals.map((slot) => (
                            <button
                                key={slot.id}
                                type="button"
                                onClick={() => router.visit(`/jurnal/buat/${slot.id}`)}
                                className={[
                                    'group relative flex flex-col gap-3 rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md dark:bg-slate-800/60',
                                    blokIds.has(slot.id) && !slot.sudah_dibuat
                                        ? 'border-blue-100 hover:border-blue-300 dark:border-blue-900 dark:hover:border-blue-700'
                                        : 'border-slate-200 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-600',
                                ].join(' ')}
                            >
                                {slot.sudah_dibuat && (
                                    <span className="absolute top-4 right-4 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
                                        Sudah Dibuat
                                    </span>
                                )}
                                {blokIds.has(slot.id) && !slot.sudah_dibuat && (
                                    <span className="absolute top-4 right-4 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                                        Bagian Blok
                                    </span>
                                )}
                                <p className="pr-32 font-semibold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                                    {slot.mata_pelajaran}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <GraduationCap className="h-4 w-4" />
                                        {slot.kelas}
                                    </span>
                                    {slot.tingkat && (
                                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                                            {slot.tingkat}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4" />
                                        Jam {slot.nomor_jam} · {slot.jam_mulai}–{slot.jam_selesai}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

JurnalBuat.layout = {
    breadcrumbs: [{ title: 'Buat Jurnal', href: '/jurnal/buat' }],
};
