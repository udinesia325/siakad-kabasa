import { Head, router, useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { BookUser, Pencil, PlusCircle, Trash2 } from 'lucide-react';
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

type BukuTamu = {
    id: number;
    tanggal: string;
    jam_masuk: string;
    jam_keluar: string | null;
    nama: string;
    instansi: string | null;
    keperluan: string;
    bertemu_dengan: string | null;
    dicatat_oleh: number | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    total: number;
};

type Props = {
    bukuTamu: Paginated<BukuTamu>;
    filters: { bulan?: string; tahun?: string; nama?: string };
};

const currentYear = new Date().getFullYear();
const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 2 + i);
const monthOptions = [
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

const emptyForm = {
    tanggal: '',
    jam_masuk: '',
    jam_keluar: '',
    nama: '',
    instansi: '',
    keperluan: '',
    bertemu_dengan: '',
};

export default function BukuTamuIndex({ bukuTamu, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<BukuTamu | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<BukuTamu | null>(null);
    const [bulan, setBulan] = useState(filters.bulan ?? currentMonth);
    const [tahun, setTahun] = useState(filters.tahun ?? String(currentYear));
    const [nama, setNama] = useState(filters.nama ?? '');
    const [namaInput, setNamaInput] = useState(filters.nama ?? '');

    const [items, setItems] = useState<BukuTamu[]>(bukuTamu.data);
    const [currentPage, setCurrentPage] = useState(bukuTamu.current_page);
    const [lastPage, setLastPage] = useState(bukuTamu.last_page);
    const [total, setTotal] = useState(bukuTamu.total);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const form = useForm(emptyForm);

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        setItems(bukuTamu.data);
        setCurrentPage(bukuTamu.current_page);
        setLastPage(bukuTamu.last_page);
        setTotal(bukuTamu.total);
    }, [bukuTamu]);
    /* eslint-enable react-hooks/set-state-in-effect */

    const applyFilters = useCallback(
        (opts: { bulan?: string; tahun?: string; nama?: string }) => {
            router.get('/buku-tamu', opts, {
                preserveState: true,
                preserveScroll: false,
                only: ['bukuTamu', 'filters'],
            });
        },
        [],
    );

    function handleBulanChange(val: string) {
        setBulan(val);
        applyFilters({ bulan: val, tahun, nama });
    }

    function handleTahunChange(val: string) {
        setTahun(val);
        applyFilters({ bulan, tahun: val, nama });
    }

    function handleNamaSearch(e: React.FormEvent) {
        e.preventDefault();
        setNama(namaInput);
        applyFilters({ bulan, tahun, nama: namaInput });
    }

    function loadNextPage() {
        if (loading || currentPage >= lastPage) {
            return;
        }

        setLoading(true);
        router.get(
            '/buku-tamu',
            { page: currentPage + 1, bulan, tahun, nama },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['bukuTamu'],
                onSuccess: (page) => {
                    const next = (page.props as unknown as Props).bukuTamu;
                    setItems((prev) => [...prev, ...next.data]);
                    setCurrentPage(next.current_page);
                    setLastPage(next.last_page);
                    setLoading(false);
                },
            },
        );
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, lastPage, loading, bulan, tahun, nama]);

    function openCreate() {
        form.reset();
        setEditing(null);
        setOpen(true);
    }

    function openEdit(item: BukuTamu) {
        form.setData({
            tanggal: item.tanggal,
            jam_masuk: item.jam_masuk.slice(0, 5),
            jam_keluar: item.jam_keluar ? item.jam_keluar.slice(0, 5) : '',
            nama: item.nama,
            instansi: item.instansi ?? '',
            keperluan: item.keperluan,
            bertemu_dengan: item.bertemu_dengan ?? '',
        });
        setEditing(item);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/buku-tamu/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/buku-tamu', { onSuccess: () => setOpen(false) });
        }
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/buku-tamu/${deleteTarget.id}`, {
            onSuccess: () => setDeleteTarget(null),
        });
    }

    const grouped = items.reduce<Record<string, BukuTamu[]>>((acc, item) => {
        const key = item.tanggal.slice(0, 10);

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);

        return acc;
    }, {});

    const selectedBulanLabel =
        monthOptions.find((m) => m.value === bulan)?.label ?? '';

    return (
        <>
            <Head title="Buku Tamu" />
            <div className="flex flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Buku Tamu</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center gap-2">
                    <Select value={bulan} onValueChange={handleBulanChange}>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                            {monthOptions.map((m) => (
                                <SelectItem key={m.value} value={m.value}>
                                    {m.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={tahun} onValueChange={handleTahunChange}>
                        <SelectTrigger className="w-28">
                            <SelectValue placeholder="Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            {yearOptions.map((y) => (
                                <SelectItem key={y} value={String(y)}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <form
                        onSubmit={handleNamaSearch}
                        className="flex items-center gap-1"
                    >
                        <Input
                            placeholder="Cari nama tamu..."
                            value={namaInput}
                            onChange={(e) => setNamaInput(e.target.value)}
                            className="w-48"
                        />
                        <Button type="submit" variant="outline" size="sm">
                            Cari
                        </Button>
                    </form>

                    <span className="text-sm text-muted-foreground">
                        {total} kunjungan
                        {nama && (
                            <span className="ml-1 text-xs">
                                (filter: "{nama}")
                            </span>
                        )}
                    </span>
                </div>

                {/* List grouped by tanggal */}
                {items.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
                        <BookUser className="h-10 w-10 opacity-30" />
                        <p>
                            {nama
                                ? `Tidak ada tamu dengan nama "${nama}".`
                                : `Belum ada kunjungan untuk ${selectedBulanLabel} ${tahun}.`}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {Object.entries(grouped).map(([tgl, tglItems]) => (
                            <div key={tgl}>
                                <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                                    {format(
                                        parseISO(tgl),
                                        'EEEE, d MMMM yyyy',
                                        { locale: localeId },
                                    )}
                                </h2>
                                <div className="overflow-hidden rounded-lg border">
                                    {tglItems.map((item, i) => (
                                        <div
                                            key={item.id}
                                            className={`flex items-start gap-4 px-4 py-3 ${
                                                i !== tglItems.length - 1
                                                    ? 'border-b'
                                                    : ''
                                            } ${i % 2 === 0 ? '' : 'bg-muted/30'}`}
                                        >
                                            {/* Tanggal badge besar */}
                                            <div className="flex w-16 shrink-0 flex-col items-center rounded-md bg-slate-100 py-2 text-center dark:bg-slate-800">
                                                <span className="text-xs font-medium text-muted-foreground uppercase">
                                                    {format(
                                                        parseISO(tgl),
                                                        'EEE',
                                                        {
                                                            locale: localeId,
                                                        },
                                                    )}
                                                </span>
                                                <span className="text-2xl leading-tight font-bold">
                                                    {format(parseISO(tgl), 'd')}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {format(
                                                        parseISO(tgl),
                                                        'MMM',
                                                        {
                                                            locale: localeId,
                                                        },
                                                    )}
                                                </span>
                                            </div>

                                            {/* Info tamu */}
                                            <div className="flex flex-1 flex-col gap-1">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-semibold">
                                                        {item.nama}
                                                    </span>
                                                    {item.instansi && (
                                                        <span className="text-xs text-muted-foreground">
                                                            — {item.instansi}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm">
                                                    {item.keperluan}
                                                </span>
                                                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                                                    <span>
                                                        {item.jam_masuk.slice(
                                                            0,
                                                            5,
                                                        )}
                                                        {item.jam_keluar
                                                            ? ` – ${item.jam_keluar.slice(0, 5)}`
                                                            : ' (belum keluar)'}
                                                    </span>
                                                    {item.bertemu_dengan && (
                                                        <span>
                                                            Menemui:{' '}
                                                            {
                                                                item.bertemu_dengan
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex shrink-0 items-center gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() =>
                                                        openEdit(item)
                                                    }
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                    onClick={() =>
                                                        setDeleteTarget(item)
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

                        {/* Infinite scroll sentinel */}
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
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Data Tamu' : 'Tambah Tamu'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label>
                                        Tanggal{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
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
                                <div className="flex flex-col gap-2">
                                    <Label>
                                        Jam Masuk{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        type="time"
                                        value={form.data.jam_masuk}
                                        onChange={(e) =>
                                            form.setData(
                                                'jam_masuk',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {form.errors.jam_masuk && (
                                        <p className="text-sm text-destructive">
                                            {form.errors.jam_masuk}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Jam Keluar{' '}
                                    <span className="text-xs text-muted-foreground">
                                        (opsional)
                                    </span>
                                </Label>
                                <Input
                                    type="time"
                                    value={form.data.jam_keluar}
                                    onChange={(e) =>
                                        form.setData(
                                            'jam_keluar',
                                            e.target.value,
                                        )
                                    }
                                />
                                {form.errors.jam_keluar && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.jam_keluar}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Nama Tamu{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    placeholder="cth: Budi Santoso"
                                    value={form.data.nama}
                                    onChange={(e) =>
                                        form.setData('nama', e.target.value)
                                    }
                                />
                                {form.errors.nama && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.nama}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Instansi / Asal{' '}
                                    <span className="text-xs text-muted-foreground">
                                        (opsional)
                                    </span>
                                </Label>
                                <Input
                                    placeholder="cth: Dinas Pendidikan, Orang Tua Siswa"
                                    value={form.data.instansi}
                                    onChange={(e) =>
                                        form.setData('instansi', e.target.value)
                                    }
                                />
                                {form.errors.instansi && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.instansi}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Keperluan{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    placeholder="cth: Rapat koordinasi, Antar siswa, Inspeksi"
                                    value={form.data.keperluan}
                                    onChange={(e) =>
                                        form.setData(
                                            'keperluan',
                                            e.target.value,
                                        )
                                    }
                                />
                                {form.errors.keperluan && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.keperluan}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Bertemu Dengan{' '}
                                    <span className="text-xs text-muted-foreground">
                                        (opsional)
                                    </span>
                                </Label>
                                <Input
                                    placeholder="cth: Pak Ahmad, Bu Sari"
                                    value={form.data.bertemu_dengan}
                                    onChange={(e) =>
                                        form.setData(
                                            'bertemu_dengan',
                                            e.target.value,
                                        )
                                    }
                                />
                                {form.errors.bertemu_dengan && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.bertemu_dengan}
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
                                    !form.data.tanggal ||
                                    !form.data.jam_masuk ||
                                    !form.data.nama ||
                                    !form.data.keperluan
                                }
                            >
                                Simpan
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
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Data Tamu</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus data kunjungan{' '}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.nama}
                            </span>
                            {deleteTarget?.tanggal && (
                                <>
                                    {' '}
                                    pada{' '}
                                    {format(
                                        parseISO(deleteTarget.tanggal),
                                        'd MMMM yyyy',
                                        { locale: localeId },
                                    )}
                                </>
                            )}
                            ? Tindakan ini tidak dapat dibatalkan.
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
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

BukuTamuIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Buku Tamu', href: '/buku-tamu' },
    ],
};
