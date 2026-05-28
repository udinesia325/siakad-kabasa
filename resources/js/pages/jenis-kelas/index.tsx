import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
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

type JenisKelas = { id: number; nama: string; urutan: number };

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    jenisKelas: Paginated<JenisKelas>;
    filters: { search?: string };
};

export default function JenisKelasIndex({ jenisKelas, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<JenisKelas | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<JenisKelas | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');

    const form = useForm({ nama: '', urutan: 0 });

    function openCreate() {
        form.reset();
        setEditing(null);
        setOpen(true);
    }

    function openEdit(j: JenisKelas) {
        form.setData({ nama: j.nama, urutan: j.urutan });
        setEditing(j);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/jenis-kelas/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/jenis-kelas', {
                onSuccess: () => setOpen(false),
            });
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/jenis-kelas/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Jenis Kelas" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Jenis Kelas</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                <Input
                    placeholder="Cari jenis kelas..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        router.get(
                            '/jenis-kelas',
                            { search: e.target.value || undefined },
                            { preserveState: true, replace: true },
                        );
                    }}
                    className="max-w-xs"
                />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Urutan</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jenisKelas.data.map((j) => (
                            <TableRow key={j.id}>
                                <TableCell className="font-medium">{j.nama}</TableCell>
                                <TableCell>{j.urutan}</TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openEdit(j)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => setDeleteTarget(j)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {jenisKelas.data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="text-center text-muted-foreground"
                                >
                                    Belum ada jenis kelas.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Jenis Kelas' : 'Tambah Jenis Kelas'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nama</Label>
                                <Input
                                    value={form.data.nama}
                                    onChange={(e) =>
                                        form.setData('nama', e.target.value)
                                    }
                                    placeholder="contoh: Regular"
                                />
                                {form.errors.nama && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.nama}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Urutan</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={form.data.urutan}
                                    onChange={(e) =>
                                        form.setData('urutan', Number(e.target.value))
                                    }
                                />
                                {form.errors.urutan && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.urutan}
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
                        <AlertDialogTitle>Hapus Jenis Kelas</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus jenis kelas{' '}
                            <span className="font-semibold">{deleteTarget?.nama}</span>?
                            Tindakan ini tidak dapat dibatalkan.
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

JenisKelasIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jenis Kelas', href: '/jenis-kelas' },
    ],
};
