// resources/js/pages/jurnal/index.tsx
import { Head, Link, router } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type JurnalRow = {
    id: number;
    tanggal: string;
    guru: string;
    mata_pelajaran: string;
    kelas: string;
    tingkat: string | null;
    jam_mulai: string;
    jam_selesai: string;
    hadir: number;
    alpha: number;
    sakit: number;
    izin: number;
    dispensasi: number;
};

type PegawaiOption = { id: number; nama: string };
type MapelOption = { id: number; nama: string };
type JamOption = {
    id: number;
    nomor: number;
    jam_mulai: string;
    jam_selesai: string;
};

type Props = {
    jurnals: {
        data: JurnalRow[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        tanggal_dari?: string;
        tanggal_sampai?: string;
        pegawai_id?: string;
        mata_pelajaran_id?: string;
        jam_pelajaran_id?: string;
        tingkat?: string;
    };
    options: {
        pegawai: PegawaiOption[];
        mata_pelajaran: MapelOption[];
        jam_pelajaran: JamOption[];
        tingkat: string[];
        bisa_lihat_semua: boolean;
    };
};

export default function JurnalIndex({ jurnals, filters, options }: Props) {
    function handleFilter(key: string, value: string) {
        const current = { ...filters, [key]: value || undefined };
        router.get('/jurnal', current as Record<string, string>, {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <>
            <Head title="Jurnal Mengajar" />

            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Jurnal Mengajar
                </h1>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center gap-2">
                    <DateRangePicker
                        dari={filters.tanggal_dari}
                        sampai={filters.tanggal_sampai}
                        onChange={(dari, sampai) => {
                            router.get(
                                '/jurnal',
                                { ...filters, tanggal_dari: dari, tanggal_sampai: sampai } as Record<string, string>,
                                { preserveState: true, replace: true },
                            );
                        }}
                    />

                    {(filters.tanggal_dari || filters.tanggal_sampai) && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-muted-foreground"
                            onClick={() =>
                                router.get(
                                    '/jurnal',
                                    { ...filters, tanggal_dari: undefined, tanggal_sampai: undefined } as Record<string, string>,
                                    { preserveState: true, replace: true },
                                )
                            }
                        >
                            Hapus tanggal
                        </Button>
                    )}

                    {options.bisa_lihat_semua && (
                        <Select
                            value={filters.pegawai_id ?? ''}
                            onValueChange={(v) => handleFilter('pegawai_id', v === '_all' ? '' : v)}
                        >
                            <SelectTrigger size="sm" className="w-44">
                                <SelectValue placeholder="Semua Guru" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="_all">Semua Guru</SelectItem>
                                {options.pegawai.map((p) => (
                                    <SelectItem key={p.id} value={String(p.id)}>
                                        {p.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    <Select
                        value={filters.mata_pelajaran_id ?? ''}
                        onValueChange={(v) => handleFilter('mata_pelajaran_id', v === '_all' ? '' : v)}
                    >
                        <SelectTrigger size="sm" className="w-44">
                            <SelectValue placeholder="Semua Mapel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="_all">Semua Mapel</SelectItem>
                            {options.mata_pelajaran.map((m) => (
                                <SelectItem key={m.id} value={String(m.id)}>
                                    {m.nama}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filters.jam_pelajaran_id ?? ''}
                        onValueChange={(v) => handleFilter('jam_pelajaran_id', v === '_all' ? '' : v)}
                    >
                        <SelectTrigger size="sm" className="w-48">
                            <SelectValue placeholder="Semua Jam" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="_all">Semua Jam</SelectItem>
                            {options.jam_pelajaran.map((j) => (
                                <SelectItem key={j.id} value={String(j.id)}>
                                    Jam {j.nomor} · {j.jam_mulai}–{j.jam_selesai}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filters.tingkat ?? ''}
                        onValueChange={(v) => handleFilter('tingkat', v === '_all' ? '' : v)}
                    >
                        <SelectTrigger size="sm" className="w-36">
                            <SelectValue placeholder="Semua Tingkat" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="_all">Semua Tingkat</SelectItem>
                            {options.tingkat.map((t) => (
                                <SelectItem key={t} value={t}>
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tabel */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/60">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">
                                    Tanggal
                                </th>
                                {options.bisa_lihat_semua && (
                                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">
                                        Guru
                                    </th>
                                )}
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">
                                    Mapel
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">
                                    Kelas
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">
                                    Jam
                                </th>
                                <th className="px-3 py-3 text-center text-xs font-semibold text-green-600 uppercase">
                                    H
                                </th>
                                <th className="px-3 py-3 text-center text-xs font-semibold text-red-600 uppercase">
                                    A
                                </th>
                                <th className="px-3 py-3 text-center text-xs font-semibold text-yellow-600 uppercase">
                                    S
                                </th>
                                <th className="px-3 py-3 text-center text-xs font-semibold text-blue-600 uppercase">
                                    I
                                </th>
                                <th className="px-3 py-3 text-center text-xs font-semibold text-purple-600 uppercase">
                                    D
                                </th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                            {jurnals.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={11}
                                        className="px-4 py-10 text-center text-slate-400"
                                    >
                                        Belum ada jurnal
                                    </td>
                                </tr>
                            )}
                            {jurnals.data.map((j) => (
                                <tr
                                    key={j.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30"
                                >
                                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                                        {new Date(j.tanggal).toLocaleDateString(
                                            'id-ID',
                                            {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            },
                                        )}
                                    </td>
                                    {options.bisa_lihat_semua && (
                                        <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                                            {j.guru}
                                        </td>
                                    )}
                                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                                        {j.mata_pelajaran}
                                    </td>
                                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                                        {[j.tingkat, j.kelas]
                                            .filter(Boolean)
                                            .join(' ')}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">
                                        {j.jam_mulai}–{j.jam_selesai}
                                    </td>
                                    <td className="px-3 py-3 text-center font-medium text-green-700 dark:text-green-400">
                                        {j.hadir}
                                    </td>
                                    <td className="px-3 py-3 text-center font-medium text-red-700 dark:text-red-400">
                                        {j.alpha}
                                    </td>
                                    <td className="px-3 py-3 text-center font-medium text-yellow-700 dark:text-yellow-500">
                                        {j.sakit}
                                    </td>
                                    <td className="px-3 py-3 text-center font-medium text-blue-700 dark:text-blue-400">
                                        {j.izin}
                                    </td>
                                    <td className="px-3 py-3 text-center font-medium text-purple-700 dark:text-purple-400">
                                        {j.dispensasi}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Button asChild size="sm" variant="outline" className="cursor-pointer">
                                            <Link href={`/jurnal/${j.id}`}>
                                                <Eye />
                                                Detail
                                            </Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {jurnals.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>Total {jurnals.total} jurnal</span>
                        <div className="flex gap-1">
                            {jurnals.links.map((link, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() =>
                                        link.url && router.visit(link.url)
                                    }
                                    className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : link.url
                                              ? 'border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400'
                                              : 'cursor-not-allowed text-slate-300 dark:text-slate-600'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

JurnalIndex.layout = {
    breadcrumbs: [{ title: 'Jurnal Mengajar', href: '/jurnal' }],
};
