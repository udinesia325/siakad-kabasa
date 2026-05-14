import { Head, router, useForm } from '@inertiajs/react';
import {
    AlertTriangle,
    CalendarCheck2,
    CalendarDays,
    Pencil,
    PlusCircle,
    Trash2,
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import type { TahunAjaran } from '@/types/akademik';

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    total: number;
};

type Props = {
    tahunAjaran: Paginated<TahunAjaran>;
    filters: { search?: string };
};

export default function TahunAjaranIndex({ tahunAjaran, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<TahunAjaran | null>(null);
    const [aktivasiTarget, setAktivasiTarget] = useState<TahunAjaran | null>(
        null,
    );
    const [deleteTarget, setDeleteTarget] = useState<TahunAjaran | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [items, setItems] = useState<TahunAjaran[]>(tahunAjaran.data);
    const [currentPage, setCurrentPage] = useState(tahunAjaran.current_page);
    const [lastPage, setLastPage] = useState(tahunAjaran.last_page);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 2 + i);

    const form = useForm({ tahun_mulai: 0, tahun_selesai: 0 });

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        setItems(tahunAjaran.data);
        setCurrentPage(tahunAjaran.current_page);
        setLastPage(tahunAjaran.last_page);
    }, [tahunAjaran]);
    /* eslint-enable react-hooks/set-state-in-effect */

    function loadNextPage() {
        if (loading || currentPage >= lastPage) {
            return;
        }

        setLoading(true);
        router.get(
            '/tahun-ajaran',
            { search: search || undefined, page: currentPage + 1 },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['tahunAjaran'],
                onSuccess: (page) => {
                    const next = (page.props as unknown as Props).tahunAjaran;
                    setItems((prev) => [...prev, ...next.data]);
                    setCurrentPage(next.current_page);
                    setLastPage(next.last_page);
                    setLoading(false);
                },
            },
        );
    }

    const handleSearch = useCallback((value: string) => {
        setSearch(value);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            router.get(
                '/tahun-ajaran',
                { search: value || undefined },
                {
                    preserveState: true,
                    preserveScroll: false,
                    only: ['tahunAjaran', 'filters'],
                    onSuccess: (page) => {
                        const fresh = (page.props as unknown as Props)
                            .tahunAjaran;
                        setItems(fresh.data);
                        setCurrentPage(fresh.current_page);
                        setLastPage(fresh.last_page);
                    },
                },
            );
        }, 300);
    }, []);

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
    }, [currentPage, lastPage, loading, search]);

    function openCreate() {
        form.setData({ tahun_mulai: currentYear, tahun_selesai: currentYear + 1 });
        setEditing(null);
        setOpen(true);
    }

    function openEdit(ta: TahunAjaran) {
        const [mulai, selesai] = ta.nama.split('/').map(Number);
        form.setData({ tahun_mulai: mulai ?? currentYear, tahun_selesai: selesai ?? currentYear + 1 });
        setEditing(ta);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/tahun-ajaran/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/tahun-ajaran', { onSuccess: () => setOpen(false) });
        }
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        form.delete(`/tahun-ajaran/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    function konfirmasiAktif() {
        if (!aktivasiTarget) {
            return;
        }

        form.patch(`/tahun-ajaran/${aktivasiTarget.id}/set-aktif`);
        setAktivasiTarget(null);
    }

    return (
        <>
            <Head title="Tahun Ajaran" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Tahun Ajaran</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                <Input
                    placeholder="Cari tahun ajaran..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="max-w-xs"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((ta) =>
                        ta.is_active ? (
                            <Card
                                key={ta.id}
                                className="relative overflow-hidden border-blue-200 bg-blue-50/50 dark:border-blue-800/50 dark:bg-blue-950/20"
                            >
                                <div className="absolute top-0 right-0 left-0 h-0.5 bg-blue-500" />
                                <CardContent className="px-4 pt-4 pb-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <CalendarCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                            <span className="text-base font-semibold">
                                                {ta.nama}
                                            </span>
                                        </div>
                                        <Badge className="bg-blue-500 text-white hover:bg-blue-500">
                                            Aktif
                                        </Badge>
                                    </div>
                                    <p className="mt-1.5 ml-6 text-xs text-blue-600/70 dark:text-blue-400/70">
                                        Tahun ajaran berjalan
                                    </p>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-0.5 border-t border-blue-200/60 px-3 py-2 dark:border-blue-800/30">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 opacity-60 transition-opacity hover:opacity-100"
                                        onClick={() => openEdit(ta)}
                                        title="Edit"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ) : (
                            <Card
                                key={ta.id}
                                className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                            >
                                <CardContent className="px-4 pt-4 pb-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                            <span className="text-base font-semibold">
                                                {ta.nama}
                                            </span>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="text-xs text-muted-foreground"
                                        >
                                            Tidak Aktif
                                        </Badge>
                                    </div>
                                    <div className="mt-3 ml-6">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 gap-1.5 border-blue-200 px-2.5 text-xs cursor-pointer text-blue-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
                                            onClick={() =>
                                                setAktivasiTarget(ta)
                                            }
                                        >
                                            <CalendarCheck2 className="h-3 w-3" />
                                            Jadikan aktif
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-0.5 border-t px-3 py-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 opacity-60 transition-opacity group-hover:opacity-100"
                                        onClick={() => openEdit(ta)}
                                        title="Edit"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-destructive opacity-60 transition-opacity hover:text-destructive group-hover:opacity-100"
                                        onClick={() => setDeleteTarget(ta)}
                                        title="Hapus"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ),
                    )}

                    {items.length === 0 && !loading && (
                        <p className="col-span-full text-center text-muted-foreground">
                            Belum ada data tahun ajaran.
                        </p>
                    )}
                </div>

                {loading && (
                    <p className="text-center text-sm text-muted-foreground">
                        Memuat...
                    </p>
                )}

                <div ref={sentinelRef} className="h-1" />
            </div>

            <AlertDialog
                open={!!aktivasiTarget}
                onOpenChange={(v) => !v && setAktivasiTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-blue-500" />
                            Ganti Tahun Ajaran Aktif?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Tahun ajaran{' '}
                            <span className="font-semibold text-foreground">
                                {aktivasiTarget?.nama}
                            </span>{' '}
                            akan dijadikan tahun ajaran aktif. Tahun ajaran yang
                            sebelumnya aktif akan dinonaktifkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-blue-500 text-white hover:bg-blue-600"
                            onClick={konfirmasiAktif}
                        >
                            Ya, Aktifkan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(v) => !v && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Tahun Ajaran</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus tahun ajaran{' '}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.nama}
                            </span>
                            ? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={hapus}
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing
                                ? 'Edit Tahun Ajaran'
                                : 'Tambah Tahun Ajaran'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex items-end gap-2">
                                <div className="flex w-36 flex-col gap-2">
                                    <Label>Tahun Mulai</Label>
                                    <Select
                                        value={String(form.data.tahun_mulai || '')}
                                        onValueChange={(v) =>
                                            form.setData('tahun_mulai', Number(v))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih tahun" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {yearOptions.map((y) => (
                                                <SelectItem key={y} value={String(y)}>
                                                    {y}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <span className="mb-2.5 text-muted-foreground">/</span>
                                <div className="flex w-36 flex-col gap-2">
                                    <Label>Tahun Selesai</Label>
                                    <Select
                                        value={String(form.data.tahun_selesai || '')}
                                        onValueChange={(v) =>
                                            form.setData('tahun_selesai', Number(v))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih tahun" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {yearOptions.map((y) => (
                                                <SelectItem key={y} value={String(y)}>
                                                    {y}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {form.data.tahun_mulai > 0 && form.data.tahun_selesai > 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Nama tahun ajaran:{' '}
                                    <span className="font-medium text-foreground">
                                        {form.data.tahun_mulai}/{form.data.tahun_selesai}
                                    </span>
                                </p>
                            )}
                            {form.errors.tahun_mulai && (
                                <p className="text-sm text-destructive">
                                    {form.errors.tahun_mulai}
                                </p>
                            )}
                            {form.errors.tahun_selesai && (
                                <p className="text-sm text-destructive">
                                    {form.errors.tahun_selesai}
                                </p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

TahunAjaranIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tahun Ajaran', href: '/tahun-ajaran' },
    ],
};
