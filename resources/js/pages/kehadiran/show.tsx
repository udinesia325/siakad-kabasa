import { Head, router, useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Ban, FileSpreadsheet, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type {
    KelasKehadiran,
    KehadiranMatrix,
    MatrixCell,
    SiswaKehadiran,
    StatusKehadiran,
} from '@/types/akademik';

// ---------------------------------------------------------------- types
type Filters = { periode: string; dari?: string; sampai?: string };

type Props = {
    kelas: KelasKehadiran;
    siswa: SiswaKehadiran[];
    tanggal: string[];
    liburMap: Record<string, boolean>;
    matrix: KehadiranMatrix;
    filters: Filters;
};

// ---------------------------------------------------------------- status config
const STATUS_CONFIG: Record<StatusKehadiran, { label: string; color: string }> =
    {
        hadir: {
            label: 'Hadir',
            color: 'bg-green-100 text-green-800 border-green-200',
        },
        terlambat: {
            label: 'Terlambat',
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        },
        alpha: {
            label: 'Alpha',
            color: 'bg-red-100 text-red-800 border-red-200',
        },
        sakit: {
            label: 'Sakit',
            color: 'bg-sky-100 text-sky-800 border-sky-200',
        },
        izin: {
            label: 'Izin',
            color: 'bg-blue-100 text-blue-800 border-blue-200',
        },
        dispensasi: {
            label: 'Dispensasi',
            color: 'bg-purple-100 text-purple-800 border-purple-200',
        },
    };

const PERIODE_OPTIONS = [
    { value: 'hari_ini', label: 'Hari Ini' },
    { value: 'kemarin', label: 'Kemarin' },
    { value: '7_hari', label: '7 Hari' },
    { value: '30_hari', label: '30 Hari' },
    { value: 'bulan_ini', label: 'Bulan Ini' },
];

// ---------------------------------------------------------------- LiburCell
function LiburCell({ tanggal }: { tanggal: string }) {
    return (
        <div
            className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-slate-100 text-slate-400"
            title={`Libur — ${format(parseISO(tanggal), 'EEEE, d MMMM yyyy', { locale: localeId })}`}
        >
            <Ban className="h-3.5 w-3.5" />
        </div>
    );
}

// ---------------------------------------------------------------- CellPopover
function CellPopover({
    cell,
    siswa,
    tanggal,
    onAnulir,
}: {
    cell: MatrixCell;
    siswa: SiswaKehadiran;
    tanggal: string;
    onAnulir: (
        siswa: SiswaKehadiran,
        tanggal: string,
        existing: MatrixCell,
    ) => void;
}) {
    const cfg = STATUS_CONFIG[cell.status];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className={`relative flex h-8 w-8 items-center justify-center rounded border text-xs font-medium transition-opacity hover:opacity-80 ${cfg.color}`}
                    title={cfg.label}
                >
                    {cell.status.slice(0, 2).toUpperCase()}
                    {cell.is_anulir && (
                        <Pencil className="absolute -top-1 -right-1 h-2.5 w-2.5 text-muted-foreground" />
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 text-sm">
                <p className="font-semibold">{siswa.nama}</p>
                <p className="mb-2 text-xs text-muted-foreground">
                    {format(parseISO(tanggal), 'EEEE, d MMMM yyyy', {
                        locale: localeId,
                    })}
                </p>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                            className={`text-xs ${cfg.color}`}
                            variant="outline"
                        >
                            {cfg.label}
                        </Badge>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Jam Masuk</span>
                        <span>{cell.jam_masuk ?? '—'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Jam Pulang
                        </span>
                        <span>{cell.jam_pulang ?? '—'}</span>
                    </div>
                    {cell.anulir && (
                        <div className="mt-2 border-t pt-2 text-xs text-muted-foreground">
                            <p>
                                Dianulir oleh:{' '}
                                <span className="font-medium text-foreground">
                                    {cell.anulir.anulir_oleh}
                                </span>
                            </p>
                            <p>{cell.anulir.updated_at}</p>
                            {cell.anulir.keterangan && (
                                <p className="mt-1 italic">
                                    "{cell.anulir.keterangan}"
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => onAnulir(siswa, tanggal, cell)}
                >
                    {cell.is_anulir ? 'Edit Anulir' : 'Anulir'}
                </Button>
            </PopoverContent>
        </Popover>
    );
}

// ---------------------------------------------------------------- AnulirModal
function AnulirModal({
    open,
    onClose,
    siswa,
    tanggal,
    cell,
    kelasId,
}: {
    open: boolean;
    onClose: () => void;
    siswa: SiswaKehadiran | null;
    tanggal: string | null;
    cell: MatrixCell | null;
    kelasId: number;
}) {
    const form = useForm({
        siswa_id: siswa?.id ?? 0,
        tanggal: tanggal ?? '',
        status: (cell?.anulir?.status ?? '') as StatusKehadiran | '',
        keterangan: cell?.anulir?.keterangan ?? '',
        bukti: [] as File[],
    });

    useEffect(() => {
        if (siswa && tanggal) {
            form.setData({
                siswa_id: siswa.id,
                tanggal: tanggal,
                status: cell?.anulir?.status ?? '',
                keterangan: cell?.anulir?.keterangan ?? '',
                bukti: [],
            });
        }
    }, [siswa?.id, tanggal]);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const fd = new FormData();
        fd.append('siswa_id', String(form.data.siswa_id));
        fd.append('tanggal', form.data.tanggal);
        fd.append('status', form.data.status);

        if (form.data.keterangan) {
            fd.append('keterangan', form.data.keterangan);
        }

        form.data.bukti.forEach((f) => fd.append('bukti[]', f));

        router.post(`/kehadiran/${kelasId}/anulir`, fd, {
            forceFormData: true,
            onSuccess: () => {
                form.reset();
                onClose();
            },
            onError: (e) => form.setError(e as never),
        });
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Anulir Kehadiran</DialogTitle>
                </DialogHeader>
                {siswa && tanggal && (
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="rounded bg-muted px-3 py-2 text-sm">
                                <p className="font-medium">{siswa.nama}</p>
                                <p className="text-muted-foreground">
                                    {format(
                                        parseISO(tanggal),
                                        'EEEE, d MMMM yyyy',
                                        { locale: localeId },
                                    )}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>Status Baru</Label>
                                <Select
                                    value={form.data.status}
                                    onValueChange={(v) =>
                                        form.setData(
                                            'status',
                                            v as StatusKehadiran,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(STATUS_CONFIG).map(
                                            ([val, cfg]) => (
                                                <SelectItem
                                                    key={val}
                                                    value={val}
                                                >
                                                    {cfg.label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                {form.errors.status && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Keterangan{' '}
                                    <span className="text-muted-foreground">
                                        (opsional)
                                    </span>
                                </Label>
                                <Textarea
                                    value={form.data.keterangan}
                                    onChange={(e) =>
                                        form.setData(
                                            'keterangan',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Tambahkan catatan..."
                                    rows={3}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Bukti{' '}
                                    <span className="text-muted-foreground">
                                        (opsional, maks. 5 gambar)
                                    </span>
                                </Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(
                                            e.target.files ?? [],
                                        ).slice(0, 5);
                                        form.setData('bukti', files);
                                    }}
                                />
                                {cell?.anulir?.bukti &&
                                    cell.anulir.bukti.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {cell.anulir.bukti.map((url, i) => (
                                                <img
                                                    key={i}
                                                    src={url}
                                                    alt="bukti"
                                                    className="h-16 w-16 rounded object-cover"
                                                />
                                            ))}
                                        </div>
                                    )}
                                {form.errors.bukti && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.bukti}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    form.reset();
                                    onClose();
                                }}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={!form.data.status}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

// ---------------------------------------------------------------- Main Page
export default function KehadiranShow({
    kelas,
    siswa,
    tanggal,
    liburMap,
    matrix,
    filters,
}: Props) {
    const [anulirTarget, setAnulirTarget] = useState<{
        siswa: SiswaKehadiran;
        tanggal: string;
        cell: MatrixCell;
    } | null>(null);

    function applyFilter(params: Record<string, string | undefined>) {
        router.get(`/kehadiran/${kelas.id}`, params, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function handleExport() {
        const params = new URLSearchParams();

        params.set('export', '1');

        if (filters.periode) {
            params.set('periode', filters.periode);
        }

        if (filters.dari) {
            params.set('dari', filters.dari);
        }

        if (filters.sampai) {
            params.set('sampai', filters.sampai);
        }

        window.open(
            `/kehadiran/${kelas.id}?${params.toString()}`,
            '_blank',
            'noopener,noreferrer',
        );
    }

    return (
        <>
            <Head title={`Kehadiran — ${kelas.nama}`} />
            <div className="flex flex-col gap-4 p-4">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold">{kelas.nama}</h1>
                    <p className="text-sm text-muted-foreground">
                        {kelas.tahun_ajaran}
                    </p>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center gap-2">
                    {PERIODE_OPTIONS.map((opt) => (
                        <Button
                            key={opt.value}
                            size="sm"
                            variant={
                                filters.periode === opt.value
                                    ? 'default'
                                    : 'outline'
                            }
                            onClick={() => applyFilter({ periode: opt.value })}
                        >
                            {opt.label}
                        </Button>
                    ))}
                    <DateRangePicker
                        dari={
                            filters.periode === 'custom'
                                ? filters.dari
                                : undefined
                        }
                        sampai={
                            filters.periode === 'custom'
                                ? filters.sampai
                                : undefined
                        }
                        onChange={(dari, sampai) =>
                            applyFilter({ periode: 'custom', dari, sampai })
                        }
                    />
                    <Button
                        onClick={handleExport}
                        className="ml-auto gap-2 bg-green-600 text-white hover:bg-green-700"
                    >
                        <FileSpreadsheet className="h-4 w-4" />
                        Export Excel
                    </Button>
                </div>

                {/* Matrix table */}
                <div className="overflow-auto rounded border">
                    <table className="min-w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-muted">
                                <th className="sticky left-0 z-10 min-w-[160px] bg-zinc-100 dark:bg-zinc-800 px-3 py-2 text-left font-medium shadow-[1px_0_0_0_#e4e4e7] dark:shadow-[1px_0_0_0_#3f3f46]">
                                    Nama Siswa
                                </th>
                                {tanggal.map((tgl) => {
                                    const isLibur = liburMap[tgl];
                                    return (
                                        <th
                                            key={tgl}
                                            className={`min-w-[44px] px-1 py-2 text-center font-medium ${isLibur ? 'bg-slate-200/60 text-slate-400' : ''}`}
                                        >
                                            <div className="text-xs">
                                                {format(parseISO(tgl), 'EEE', {
                                                    locale: localeId,
                                                })}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {format(parseISO(tgl), 'd/M')}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {siswa.map((s, i) => {
                                const isEven = i % 2 === 0;
                                const rowBg = isEven ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-800';
                                return (
                                    <tr key={s.id} className={isEven ? '' : 'bg-zinc-50 dark:bg-zinc-800'}>
                                        <td
                                            className={`sticky left-0 z-10 px-3 py-1.5 font-medium shadow-[1px_0_0_0_#e4e4e7] dark:shadow-[1px_0_0_0_#3f3f46] ${rowBg}`}
                                        >
                                            <div>{s.nama}</div>
                                            {s.nisn && (
                                                <div className="text-xs text-muted-foreground">
                                                    {s.nisn}
                                                </div>
                                            )}
                                        </td>
                                        {tanggal.map((tgl) => {
                                            const cell = matrix[s.id]?.[tgl];
                                            const isLibur = liburMap[tgl];

                                            if (!cell || isLibur) {
                                                return (
                                                    <td
                                                        key={tgl}
                                                        className={`px-1 py-1.5 text-center ${isLibur ? 'bg-slate-100/60' : ''}`}
                                                    >
                                                        {isLibur ? (
                                                            <LiburCell tanggal={tgl} />
                                                        ) : (
                                                            '—'
                                                        )}
                                                    </td>
                                                );
                                            }

                                            return (
                                                <td
                                                    key={tgl}
                                                    className="px-1 py-1.5 text-center"
                                                >
                                                    <CellPopover
                                                        cell={cell}
                                                        siswa={s}
                                                        tanggal={tgl}
                                                        onAnulir={(sw, tg, c) =>
                                                            setAnulirTarget({
                                                                siswa: sw,
                                                                tanggal: tg,
                                                                cell: c,
                                                            })
                                                        }
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                            {siswa.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={tanggal.length + 1}
                                        className="py-8 text-center text-muted-foreground"
                                    >
                                        Tidak ada siswa di kelas ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnulirModal
                open={!!anulirTarget}
                onClose={() => setAnulirTarget(null)}
                siswa={anulirTarget?.siswa ?? null}
                tanggal={anulirTarget?.tanggal ?? null}
                cell={anulirTarget?.cell ?? null}
                kelasId={kelas.id}
            />
        </>
    );
}

KehadiranShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kehadiran', href: '/kehadiran' },
        { title: 'Detail', href: '#' },
    ],
};
