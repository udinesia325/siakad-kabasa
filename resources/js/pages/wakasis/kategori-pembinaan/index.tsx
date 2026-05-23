import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type KategoriPembinaan = { id: number; nama: string; deskripsi: string | null };
type Paginated<T> = { data: T[]; current_page: number; last_page: number; total: number };
type Props = { kategoriPembinaan: Paginated<KategoriPembinaan>; filters: { search?: string } };

export default function KategoriPembinaanIndex({ kategoriPembinaan, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<KategoriPembinaan | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<KategoriPembinaan | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);
    const form = useForm({ nama: '', deskripsi: '' });

    useEffect(() => {
        if (isFirstRender.current) {
 isFirstRender.current = false;

 return; 
}

        const handle = setTimeout(() => {
            router.get('/wakasis/kategori-pembinaan', { search: search || undefined }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
 form.reset(); setEditing(null); setOpen(true); 
}
    function openEdit(item: KategoriPembinaan) {
 form.setData({ nama: item.nama, deskripsi: item.deskripsi ?? '' }); setEditing(item); setOpen(true); 
}

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/wakasis/kategori-pembinaan/${editing.id}`, { preserveScroll: true, onSuccess: () => setOpen(false) });
        } else {
            form.post('/wakasis/kategori-pembinaan', { preserveScroll: true, onSuccess: () => setOpen(false) });
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/wakasis/kategori-pembinaan/${deleteTarget.id}`, { preserveScroll: true });
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Kategori Pembinaan" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Kategori Pembinaan</h1>
                    <Button onClick={openCreate}><PlusCircle className="mr-2 h-4 w-4" />Tambah</Button>
                </div>
                <Input placeholder="Cari nama…" className="w-72" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kategoriPembinaan.data.length === 0 && (
                                <TableRow><TableCell colSpan={3} className="py-10 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                            )}
                            {kategoriPembinaan.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.nama}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{item.deskripsi ?? '—'}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button size="icon" variant="ghost" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                                            <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(item)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {kategoriPembinaan.last_page > 1 && <p className="text-sm text-muted-foreground">Halaman {kategoriPembinaan.current_page} dari {kategoriPembinaan.last_page} · {kategoriPembinaan.total} total</p>}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>{editing ? 'Edit Kategori Pembinaan' : 'Tambah Kategori Pembinaan'}</DialogTitle></DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Nama</Label>
                            <Input value={form.data.nama} onChange={(e) => form.setData('nama', e.target.value)} placeholder="Konseling Individual" maxLength={100} />
                            {form.errors.nama && <p className="text-sm text-destructive">{form.errors.nama}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Deskripsi (opsional)</Label>
                            <Textarea rows={3} value={form.data.deskripsi} onChange={(e) => form.setData('deskripsi', e.target.value)} placeholder="Keterangan…" />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={form.processing}>Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus kategori pembinaan?</AlertDialogTitle>
                        <AlertDialogDescription><strong>{deleteTarget?.nama}</strong> akan dihapus permanen.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={hapus}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

KategoriPembinaanIndex.layout = {
    breadcrumbs: [{ title: 'Wakasis', href: '/wakasis' }, { title: 'Kategori Pembinaan', href: '/wakasis/kategori-pembinaan' }],
};
