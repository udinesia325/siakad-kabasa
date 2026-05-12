import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
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
import type { Kelas, TahunAjaran } from '@/types/akademik';

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    total: number;
};

type Props = {
    kelas: Paginated<Kelas>;
    tahunAjaran: TahunAjaran[];
    filters: { search?: string };
};

export default function KelasIndex({
    kelas,
    tahunAjaran: tahunAjaranProp,
    filters,
}: Props) {
    const [tahunAjaran, setTahunAjaran] =
        useState<TahunAjaran[]>(tahunAjaranProp);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Kelas | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Kelas | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [items, setItems] = useState<Kelas[]>(kelas.data);
    const [currentPage, setCurrentPage] = useState(kelas.current_page);
    const [lastPage, setLastPage] = useState(kelas.last_page);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const form = useForm({
        nama: '',
        tingkat: '' as 'X' | 'XI' | 'XII',
        tahun_ajaran_id: 0,
    });

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        setItems(kelas.data);
        setCurrentPage(kelas.current_page);
        setLastPage(kelas.last_page);
    }, [kelas]);
    /* eslint-enable react-hooks/set-state-in-effect */

    function loadNextPage() {
        if (loading || currentPage >= lastPage) {
            return;
        }

        setLoading(true);
        router.get(
            '/kelas',
            { search: search || undefined, page: currentPage + 1 },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['kelas'],
                onSuccess: (page) => {
                    const next = (page.props as unknown as Props).kelas;
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
                '/kelas',
                { search: value || undefined },
                {
                    preserveState: true,
                    preserveScroll: false,
                    only: ['kelas', 'filters'],
                    onSuccess: (page) => {
                        const fresh = (page.props as unknown as Props).kelas;
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
        form.reset();
        setEditing(null);
        router.reload({
            only: ['tahunAjaran'],
            onSuccess: (page) => {
                setTahunAjaran((page.props as unknown as Props).tahunAjaran);
            },
        });
        setOpen(true);
    }

    function openEdit(k: Kelas) {
        form.setData({
            nama: k.nama,
            tingkat: k.tingkat,
            tahun_ajaran_id: k.tahun_ajaran_id,
        });
        setEditing(k);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/kelas/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/kelas', { onSuccess: () => setOpen(false) });
        }
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        form.delete(`/kelas/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Kelas" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Kelas</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                <Input
                    placeholder="Cari nama kelas..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="max-w-xs"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((k) => (
                        <Card key={k.id}>
                            <CardContent className="pt-4">
                                <div className="flex items-start justify-between gap-2">
                                    <span className="text-lg font-medium">
                                        {k.nama}
                                    </span>
                                    <Badge variant="outline">{k.tingkat}</Badge>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {k.tahun_ajaran?.nama}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEdit(k)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => setDeleteTarget(k)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    {items.length === 0 && !loading && (
                        <p className="col-span-full text-center text-muted-foreground">
                            Belum ada data kelas.
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

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Kelas' : 'Tambah Kelas'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nama Kelas</Label>
                                <Input
                                    placeholder="contoh: X RPL 1"
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
                                <Label>Tingkat</Label>
                                <Select
                                    value={form.data.tingkat}
                                    onValueChange={(v) =>
                                        form.setData(
                                            'tingkat',
                                            v as 'X' | 'XI' | 'XII',
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tingkat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="X">X</SelectItem>
                                        <SelectItem value="XI">XI</SelectItem>
                                        <SelectItem value="XII">XII</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.tingkat && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.tingkat}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Tahun Ajaran</Label>
                                <Select
                                    value={String(form.data.tahun_ajaran_id)}
                                    onValueChange={(v) =>
                                        form.setData(
                                            'tahun_ajaran_id',
                                            Number(v),
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tahun ajaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tahunAjaran.map((ta) => (
                                            <SelectItem
                                                key={ta.id}
                                                value={String(ta.id)}
                                            >
                                                {ta.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.tahun_ajaran_id && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.tahun_ajaran_id}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Kelas</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus kelas{' '}
                            <span className="font-semibold">
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
        </>
    );
}

KelasIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelas', href: '/kelas' },
    ],
};
