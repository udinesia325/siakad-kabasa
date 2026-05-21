import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type Kategori = {
    id: number;
    nama: string;
    deskripsi: string | null;
    warna: string | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    kategori: Paginated<Kategori>;
    filters: { search?: string };
};

export default function KategoriIndex({ kategori, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Kategori | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Kategori | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);

    const form = useForm({
        nama: '',
        deskripsi: '',
        warna: '#6366f1',
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/sarpras/kategori',
                { search: search || undefined },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
        form.reset();
        form.setData('warna', '#6366f1');
        setEditing(null);
        setOpen(true);
    }

    function openEdit(k: Kategori) {
        form.setData({
            nama: k.nama,
            deskripsi: k.deskripsi ?? '',
            warna: k.warna ?? '#6366f1',
        });
        setEditing(k);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/sarpras/kategori/${editing.id}`, {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/sarpras/kategori', {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        }
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/sarpras/kategori/${deleteTarget.id}`, {
            preserveScroll: true,
        });
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Kategori Barang" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Kategori Barang</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Cari nama kategori…"
                        className="w-72"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead className="w-24">Warna</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kategori.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Tidak ada kategori.
                                    </TableCell>
                                </TableRow>
                            )}
                            {kategori.data.map((k) => (
                                <TableRow key={k.id}>
                                    <TableCell className="font-medium">
                                        {k.nama}
                                    </TableCell>
                                    <TableCell>
                                        {k.warna ? (
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="inline-block h-5 w-5 rounded border"
                                                    style={{
                                                        backgroundColor: k.warna,
                                                    }}
                                                />
                                                <span className="text-xs text-muted-foreground">
                                                    {k.warna}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {k.deskripsi ?? '—'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => openEdit(k)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    setDeleteTarget(k)
                                                }
                                                title="Hapus"
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {kategori.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">
                            Halaman {kategori.current_page} dari{' '}
                            {kategori.last_page} · {kategori.total} total
                        </p>
                    </div>
                )}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Kategori' : 'Tambah Kategori'}
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={submit}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-2">
                            <Label>Nama</Label>
                            <Input
                                value={form.data.nama}
                                onChange={(e) =>
                                    form.setData('nama', e.target.value)
                                }
                                placeholder="Elektronik"
                                maxLength={100}
                            />
                            {form.errors.nama && (
                                <p className="text-sm text-destructive">
                                    {form.errors.nama}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Warna (opsional)</Label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={form.data.warna}
                                    onChange={(e) =>
                                        form.setData('warna', e.target.value)
                                    }
                                    className="h-10 w-10 cursor-pointer rounded border bg-transparent p-0.5"
                                />
                                <Input
                                    value={form.data.warna}
                                    onChange={(e) =>
                                        form.setData('warna', e.target.value)
                                    }
                                    placeholder="#6366f1"
                                    className="w-36 font-mono text-sm"
                                    maxLength={20}
                                />
                            </div>
                            {form.errors.warna && (
                                <p className="text-sm text-destructive">
                                    {form.errors.warna}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Deskripsi (opsional)</Label>
                            <Textarea
                                rows={3}
                                value={form.data.deskripsi}
                                onChange={(e) =>
                                    form.setData('deskripsi', e.target.value)
                                }
                                placeholder="Keterangan kategori…"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(v) => !v && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus kategori?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>{deleteTarget?.nama}</strong> akan dihapus
                            permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={hapus}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

KategoriIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Kategori Barang', href: '/sarpras/kategori' },
    ],
};
