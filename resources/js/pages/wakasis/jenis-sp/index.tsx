import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type JenisSp = { id: number; nama: string; level: number; batas_poin: number; deskripsi: string | null };
type Paginated<T> = { data: T[]; current_page: number; last_page: number; total: number };
type Props = { jenisSp: Paginated<JenisSp>; filters: { search?: string } };

export default function JenisSpIndex({ jenisSp, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<JenisSp | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<JenisSp | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);
    const form = useForm({ nama: '', level: '1', batas_poin: '50', deskripsi: '' });

    useEffect(() => {
        if (isFirstRender.current) {
 isFirstRender.current = false;

 return; 
}

        const handle = setTimeout(() => {
            router.get('/wakasis/jenis-sp', { search: search || undefined }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
 form.reset(); form.setData({ nama: '', level: '1', batas_poin: '50', deskripsi: '' }); setEditing(null); setOpen(true); 
}
    function openEdit(item: JenisSp) {
        form.setData({ nama: item.nama, level: String(item.level), batas_poin: String(item.batas_poin), deskripsi: item.deskripsi ?? '' });
        setEditing(item); setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/wakasis/jenis-sp/${editing.id}`, { preserveScroll: true, onSuccess: () => setOpen(false) });
        } else {
            form.post('/wakasis/jenis-sp', { preserveScroll: true, onSuccess: () => setOpen(false) });
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/wakasis/jenis-sp/${deleteTarget.id}`, { preserveScroll: true });
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Jenis Surat Peringatan" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Jenis Surat Peringatan</h1>
                    <Button onClick={openCreate}><PlusCircle className="mr-2 h-4 w-4" />Tambah</Button>
                </div>
                <Input placeholder="Cari nama…" className="w-72" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead className="w-20 text-center">Level</TableHead>
                                <TableHead className="w-28 text-center">Batas Poin</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jenisSp.data.length === 0 && (
                                <TableRow><TableCell colSpan={5} className="py-10 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                            )}
                            {jenisSp.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.nama}</TableCell>
                                    <TableCell className="text-center"><Badge variant="secondary">Level {item.level}</Badge></TableCell>
                                    <TableCell className="text-center font-mono font-semibold">{item.batas_poin}</TableCell>
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
                {jenisSp.last_page > 1 && <p className="text-sm text-muted-foreground">Halaman {jenisSp.current_page} dari {jenisSp.last_page} · {jenisSp.total} total</p>}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>{editing ? 'Edit Jenis SP' : 'Tambah Jenis SP'}</DialogTitle></DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Nama</Label>
                            <Input value={form.data.nama} onChange={(e) => form.setData('nama', e.target.value)} placeholder="SP1" maxLength={50} />
                            {form.errors.nama && <p className="text-sm text-destructive">{form.errors.nama}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Level Eskalasi</Label>
                                <Input type="number" min={1} max={10} value={form.data.level} onChange={(e) => form.setData('level', e.target.value)} placeholder="1" />
                                {form.errors.level && <p className="text-sm text-destructive">{form.errors.level}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Batas Poin</Label>
                                <Input type="number" min={1} value={form.data.batas_poin} onChange={(e) => form.setData('batas_poin', e.target.value)} placeholder="50" />
                                {form.errors.batas_poin && <p className="text-sm text-destructive">{form.errors.batas_poin}</p>}
                            </div>
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
                        <AlertDialogTitle>Hapus jenis SP?</AlertDialogTitle>
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

JenisSpIndex.layout = {
    breadcrumbs: [{ title: 'Wakasis', href: '/wakasis' }, { title: 'Jenis SP', href: '/wakasis/jenis-sp' }],
};
