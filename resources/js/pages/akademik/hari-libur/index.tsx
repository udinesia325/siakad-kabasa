import { Head, router, useForm } from '@inertiajs/react';
import { differenceInDays, format, parseISO, startOfDay } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import {
    AlertTriangle,
    CalendarOff,
    Pencil,
    PlusCircle,
    Trash2,
    X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type HariLibur = {
    id: number;
    tanggal: string;
    keterangan: string;
    dibuat_oleh: number | null;
    dibuat_oleh_nama: string | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    total: number;
};

type Props = {
    hariLibur: Paginated<HariLibur>;
    filters: { tahun?: string; dari?: string; sampai?: string };
};

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);

export default function HariLiburIndex({ hariLibur, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<HariLibur | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<HariLibur | null>(null);
    const [deleteStep, setDeleteStep] = useState<1 | 2>(1);
    const [tahun, setTahun] = useState(filters.tahun ?? String(currentYear));
    const [dateFrom, setDateFrom] = useState(filters.dari ?? '');
    const [dateTo, setDateTo] = useState(filters.sampai ?? '');

    // Infinite scroll state
    const [items, setItems] = useState<HariLibur[]>(hariLibur.data);
    const [currentPage, setCurrentPage] = useState(hariLibur.current_page);
    const [lastPage, setLastPage] = useState(hariLibur.last_page);
    const [total, setTotal] = useState(hariLibur.total);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const form = useForm({
        mode: 'tunggal' as 'tunggal' | 'rentang',
        tanggal: '',
        dari: '',
        sampai: '',
        keterangan: '',
    });

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        setItems(hariLibur.data);
        setCurrentPage(hariLibur.current_page);
        setLastPage(hariLibur.last_page);
        setTotal(hariLibur.total);
    }, [hariLibur]);
    /* eslint-enable react-hooks/set-state-in-effect */

    // Saat filter berubah, kirim request baru (reset ke page 1)
    const applyFilters = useCallback(
        (opts: { tahun?: string; dari?: string; sampai?: string }) => {
            const params: Record<string, string | undefined> = {};

            if (opts.dari && opts.sampai) {
                // Rentang tanggal aktif — abaikan filter tahun
                params.dari = opts.dari;
                params.sampai = opts.sampai;
            } else {
                params.tahun = opts.tahun;
            }

            router.get('/hari-libur', params, {
                preserveState: true,
                preserveScroll: false,
                only: ['hariLibur', 'filters'],
            });
        },
        [],
    );

    function handleTahunChange(val: string) {
        // Saat ganti tahun, clear date range
        setTahun(val);
        setDateFrom('');
        setDateTo('');
        applyFilters({ tahun: val });
    }

    function handleDateRange(dari: string, sampai: string) {
        setDateFrom(dari);
        setDateTo(sampai);
        applyFilters({ dari, sampai });
    }

    function clearDateRange() {
        setDateFrom('');
        setDateTo('');
        applyFilters({ tahun });
    }

    function loadNextPage() {
        if (loading || currentPage >= lastPage) {
            return;
        }

        setLoading(true);
        const params: Record<string, string | number | undefined> = {
            page: currentPage + 1,
        };

        if (dateFrom && dateTo) {
            params.dari = dateFrom;
            params.sampai = dateTo;
        } else {
            params.tahun = tahun;
        }

        router.get('/hari-libur', params, {
            preserveState: true,
            preserveScroll: true,
            only: ['hariLibur'],
            onSuccess: (page) => {
                const next = (page.props as unknown as Props).hariLibur;
                setItems((prev) => [...prev, ...next.data]);
                setCurrentPage(next.current_page);
                setLastPage(next.last_page);
                setLoading(false);
            },
        });
    }

    useEffect(() => {
        const sentinel = sentinelRef.current;

        if (!sentinel) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadNextPage();
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [currentPage, lastPage, loading, dateFrom, dateTo, tahun]);

    function openCreate() {
        form.reset();
        form.setData('mode', 'tunggal');
        setEditing(null);
        setOpen(true);
    }

    function openEdit(hl: HariLibur) {
        form.setData({
            mode: 'tunggal',
            tanggal: hl.tanggal,
            dari: '',
            sampai: '',
            keterangan: hl.keterangan,
        });
        setEditing(hl);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/hari-libur/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/hari-libur', { onSuccess: () => setOpen(false) });
        }
    }

    const jumlahHari =
        form.data.mode === 'rentang' && form.data.dari && form.data.sampai
            ? differenceInDays(
                  parseISO(form.data.sampai),
                  parseISO(form.data.dari),
              ) + 1
            : null;

    function isLiburLampau(hl: HariLibur) {
        return parseISO(hl.tanggal) < startOfDay(new Date());
    }

    function openDelete(hl: HariLibur) {
        setDeleteTarget(hl);
        setDeleteStep(1);
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        const lampau = isLiburLampau(deleteTarget);

        if (lampau && deleteStep === 1) {
            setDeleteStep(2);

            return;
        }

        router.delete(`/hari-libur/${deleteTarget.id}`, {
            data: lampau ? { confirmed_past: true } : {},
            onSuccess: () => setDeleteTarget(null),
        });
    }

    // Group by bulan
    const grouped = items.reduce<Record<string, HariLibur[]>>((acc, hl) => {
        const bulan = hl.tanggal.slice(0, 7);

        if (!acc[bulan]) {
            acc[bulan] = [];
        }

        acc[bulan].push(hl);

        return acc;
    }, {});

    const isDateRangeActive = !!(dateFrom && dateTo);

    return (
        <>
            <Head title="Hari Libur" />
            <div className="flex flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Hari Libur</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center gap-2">
                    <Label className="text-sm">Tahun:</Label>
                    <Select
                        value={tahun}
                        onValueChange={handleTahunChange}
                        disabled={isDateRangeActive}
                    >
                        <SelectTrigger
                            className={`w-28 ${isDateRangeActive ? 'opacity-40' : ''}`}
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {yearOptions.map((y) => (
                                <SelectItem key={y} value={String(y)}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-1">
                        <DateRangePicker
                            dari={dateFrom || undefined}
                            sampai={dateTo || undefined}
                            onChange={handleDateRange}
                        />
                        {isDateRangeActive && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                                onClick={clearDateRange}
                                title="Hapus filter rentang tanggal"
                            >
                                <X className="h-3.5 w-3.5" />
                            </Button>
                        )}
                    </div>

                    <span className="text-sm text-muted-foreground">
                        {total} hari libur
                        {isDateRangeActive && (
                            <span className="ml-1 text-xs">(filter aktif)</span>
                        )}
                    </span>
                </div>

                {/* List grouped by bulan */}
                {items.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
                        <CalendarOff className="h-10 w-10 opacity-30" />
                        <p>
                            {isDateRangeActive
                                ? 'Tidak ada hari libur pada rentang tanggal yang dipilih.'
                                : `Belum ada hari libur untuk tahun ${tahun}.`}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {Object.entries(grouped).map(([bulan, bulanItems]) => (
                            <div key={bulan}>
                                <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                                    {format(
                                        parseISO(bulan + '-01'),
                                        'MMMM yyyy',
                                        { locale: localeId },
                                    )}
                                </h2>
                                <div className="overflow-hidden rounded-lg border">
                                    {bulanItems.map((hl, i) => (
                                        <div
                                            key={hl.id}
                                            className={`flex items-center gap-4 px-4 py-3 ${
                                                i !== bulanItems.length - 1
                                                    ? 'border-b'
                                                    : ''
                                            } ${i % 2 === 0 ? '' : 'bg-muted/30'}`}
                                        >
                                            {/* Tanggal badge */}
                                            <div className="flex w-16 shrink-0 flex-col items-center rounded-md bg-slate-100 py-1.5 text-center dark:bg-slate-800">
                                                <span className="text-xs font-medium text-muted-foreground uppercase">
                                                    {format(
                                                        parseISO(hl.tanggal),
                                                        'EEE',
                                                        { locale: localeId },
                                                    )}
                                                </span>
                                                <span className="text-lg leading-tight font-bold">
                                                    {format(
                                                        parseISO(hl.tanggal),
                                                        'd',
                                                    )}
                                                </span>
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-1 flex-col">
                                                <span className="font-medium">
                                                    {hl.keterangan}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {format(
                                                        parseISO(hl.tanggal),
                                                        'EEEE, d MMMM yyyy',
                                                        { locale: localeId },
                                                    )}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => openEdit(hl)}
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                    onClick={() =>
                                                        openDelete(hl)
                                                    }
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Sentinel untuk infinite scroll */}
                        <div
                            ref={sentinelRef}
                            className="py-2 text-center text-xs text-muted-foreground"
                        >
                            {loading && 'Memuat...'}
                            {!loading &&
                                currentPage >= lastPage &&
                                items.length > 0 &&
                                currentPage > 1 && (
                                    <span className="opacity-40">
                                        Semua data sudah ditampilkan
                                    </span>
                                )}
                        </div>
                    </div>
                )}
            </div>

            {/* Form Dialog */}
            <Dialog open={open} onOpenChange={(v) => !v && setOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Hari Libur' : 'Tambah Hari Libur'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            {/* Mode selector — hanya untuk tambah baru */}
                            {!editing && (
                                <div className="flex gap-1 rounded-md border p-1">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            form.setData('mode', 'tunggal')
                                        }
                                        className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                                            form.data.mode === 'tunggal'
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        Tanggal Tunggal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            form.setData('mode', 'rentang')
                                        }
                                        className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                                            form.data.mode === 'rentang'
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        Rentang Tanggal
                                    </button>
                                </div>
                            )}

                            {/* Field tanggal: tunggal atau rentang */}
                            {form.data.mode === 'tunggal' ? (
                                <div className="flex flex-col gap-2">
                                    <Label>Tanggal</Label>
                                    <Input
                                        type="date"
                                        value={form.data.tanggal}
                                        onChange={(e) =>
                                            form.setData(
                                                'tanggal',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {form.errors.tanggal && (
                                        <p className="text-sm text-destructive">
                                            {form.errors.tanggal}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-2">
                                            <Label>Dari</Label>
                                            <Input
                                                type="date"
                                                value={form.data.dari}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'dari',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {form.errors.dari && (
                                                <p className="text-sm text-destructive">
                                                    {form.errors.dari}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Sampai</Label>
                                            <Input
                                                type="date"
                                                value={form.data.sampai}
                                                min={
                                                    form.data.dari || undefined
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        'sampai',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {form.errors.sampai && (
                                                <p className="text-sm text-destructive">
                                                    {form.errors.sampai}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {jumlahHari !== null && jumlahHari > 0 && (
                                        <p className="text-sm text-muted-foreground">
                                            Akan menambahkan{' '}
                                            <span className="font-medium text-foreground">
                                                {jumlahHari} hari
                                            </span>{' '}
                                            libur. Tanggal yang sudah ada akan
                                            dilewati.
                                        </p>
                                    )}
                                    {jumlahHari !== null && jumlahHari <= 0 && (
                                        <p className="text-sm text-destructive">
                                            Tanggal sampai harus setelah tanggal
                                            dari.
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <Label>Keterangan</Label>
                                <Input
                                    placeholder="cth: Libur Semester, Hari Raya Idul Fitri"
                                    value={form.data.keterangan}
                                    onChange={(e) =>
                                        form.setData(
                                            'keterangan',
                                            e.target.value,
                                        )
                                    }
                                />
                                {form.errors.keterangan && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.keterangan}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    form.processing ||
                                    !form.data.keterangan ||
                                    (form.data.mode === 'tunggal'
                                        ? !form.data.tanggal
                                        : !form.data.dari ||
                                          !form.data.sampai ||
                                          (jumlahHari ?? 0) <= 0)
                                }
                            >
                                {form.data.mode === 'rentang' &&
                                jumlahHari &&
                                jumlahHari > 0
                                    ? `Simpan (${jumlahHari} hari)`
                                    : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Hapus Dialog */}
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(v) => {
                    if (!v) {
                        setDeleteTarget(null);
                        setDeleteStep(1);
                    }
                }}
            >
                <AlertDialogContent>
                    {deleteTarget &&
                    isLiburLampau(deleteTarget) &&
                    deleteStep === 1 ? (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                                    <AlertTriangle className="h-5 w-5 shrink-0" />
                                    Peringatan — Hari Libur Sudah Terlewati
                                </AlertDialogTitle>
                                <AlertDialogDescription asChild>
                                    <div className="flex flex-col gap-3 text-sm">
                                        <p>
                                            Hari libur{' '}
                                            <span className="font-semibold text-foreground">
                                                {deleteTarget.keterangan}
                                            </span>{' '}
                                            (
                                            {format(
                                                parseISO(deleteTarget.tanggal),
                                                'd MMMM yyyy',
                                                { locale: localeId },
                                            )}
                                            ) sudah terlewati dan berdampak pada
                                            rekap kehadiran.
                                        </p>
                                        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 dark:border-amber-900/50 dark:bg-amber-950/30">
                                            <p className="font-medium text-amber-800 dark:text-amber-300">
                                                Jika dihapus, semua siswa yang
                                                hadir pada tanggal tersebut akan
                                                dianggap{' '}
                                                <span className="underline">
                                                    Alpha
                                                </span>{' '}
                                                di rekap kehadiran dan harus
                                                dikoreksi satu per satu.
                                            </p>
                                        </div>
                                        <p className="text-muted-foreground">
                                            Apakah kamu yakin ingin melanjutkan?
                                        </p>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        hapus();
                                    }}
                                >
                                    Lanjutkan
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </>
                    ) : (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {deleteTarget && isLiburLampau(deleteTarget)
                                        ? 'Konfirmasi Akhir — Hapus Hari Libur'
                                        : 'Hapus Hari Libur'}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {deleteTarget &&
                                    isLiburLampau(deleteTarget) ? (
                                        <>
                                            Kamu sudah membaca peringatannya.
                                            Ketik konfirmasi di bawah atau
                                            langsung klik{' '}
                                            <span className="font-semibold text-destructive">
                                                Hapus Sekarang
                                            </span>{' '}
                                            untuk benar-benar menghapus{' '}
                                            <span className="font-semibold text-foreground">
                                                {deleteTarget.keterangan}
                                            </span>
                                            . Tindakan ini tidak dapat
                                            dibatalkan.
                                        </>
                                    ) : (
                                        <>
                                            Yakin ingin menghapus{' '}
                                            <span className="font-semibold text-foreground">
                                                {deleteTarget?.keterangan}
                                            </span>{' '}
                                            (
                                            {deleteTarget &&
                                                format(
                                                    parseISO(
                                                        deleteTarget.tanggal,
                                                    ),
                                                    'd MMMM yyyy',
                                                    { locale: localeId },
                                                )}
                                            )? Tindakan ini tidak dapat
                                            dibatalkan.
                                        </>
                                    )}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        hapus();
                                    }}
                                >
                                    Hapus Sekarang
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </>
                    )}
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

HariLiburIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hari Libur', href: '/hari-libur' },
    ],
};
