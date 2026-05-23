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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type Tingkat = 'sekolah' | 'kabupaten' | 'provinsi' | 'nasional' | 'internasional';
type KategoriPrestasi = { id: number; nama: string; tingkat: Tingkat; deskripsi: string | null };
type Paginated<T> = { data: T[]; current_page: number; last_page: number; total: number };
type Props = { kategoriPrestasi: Paginated<KategoriPrestasi>; filters: { search?: string; tingkat?: string } };

const tingkatLabel: Record<Tingkat, string> = {
    sekolah: 'Sekolah', kabupaten: 'Kabupaten', provinsi: 'Provinsi', nasional: 'Nasional', internasional: 'Internasional',
};

const tingkatColor: Record<Tingkat, string> = {
    sekolah: 'bg-slate-100 text-slate-800', kabupaten: 'bg-blue-100 text-blue-800',
    provinsi: 'bg-indigo-100 text-indigo-800', nasional: 'bg-amber-100 text-amber-800', internasional: 'bg-emerald-100 text-emerald-800',
};

export default function KategoriPrestasiIndex({ kategoriPrestasi, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<KategoriPrestasi | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<KategoriPrestasi | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);
    const form = useForm({ nama: '', tingkat: 'sekolah', deskripsi: '' });

    useEffect(() => {
        if (isFirstRender.current) {
 isFirstRender.current = false;

 return; 
}

        const handle = setTimeout(() => {
            router.get('/wakasis/kategori-prestasi', { search: search || undefined }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
 form.reset(); form.setData('tingkat', 'sekolah'); setEditing(null); setOpen(true); 
}
    function openEdit(item: KategoriPrestasi) {
        form.setData({ nama: item.nama, tingkat: item.tingkat, deskripsi: item.deskripsi ?? '' });
        setEditing(item); setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/wakasis/kategori-prestasi/${editing.id}`, { preserveScroll: true, onSuccess: () => setOpen(false) });
        } else {
            form.post('/wakasis/kategori-prestasi', { preserveScroll: true, onSuccess: () => setOpen(false) });
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/wakasis/kategori-prestasi/${deleteTarget.id}`, { preserveScroll: true });
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Kategori Prestasi" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Kategori Prestasi</h1>
                    <Button onClick={openCreate}><PlusCircle className="mr-2 h-4 w-4" />Tambah</Button>
                </div>
                <Input placeholder="Cari nama…" className="w-72" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead className="w-32">Tingkat</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kategoriPrestasi.data.length === 0 && (
                                <TableRow><TableCell colSpan={4} className="py-10 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                            )}
                            {kategoriPrestasi.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.nama}</TableCell>
                                    <TableCell><Badge className={tingkatColor[item.tingkat]}>{tingkatLabel[item.tingkat]}</Badge></TableCell>
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
                {kategoriPrestasi.last_page > 1 && <p className="text-sm text-muted-foreground">Halaman {kategoriPrestasi.current_page} dari {kategoriPrestasi.last_page} · {kategoriPrestasi.total} total</p>}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>{editing ? 'Edit Kategori Prestasi' : 'Tambah Kategori Prestasi'}</DialogTitle></DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Nama</Label>
                            <Input value={form.data.nama} onChange={(e) => form.setData('nama', e.target.value)} placeholder="Olimpiade Sains" maxLength={100} />
                            {form.errors.nama && <p className="text-sm text-destructive">{form.errors.nama}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Tingkat</Label>
                            <Select value={form.data.tingkat} onValueChange={(v) => form.setData('tingkat', v)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {(Object.entries(tingkatLabel) as [Tingkat, string][]).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            {form.errors.tingkat && <p className="text-sm text-destructive">{form.errors.tingkat}</p>}
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
                        <AlertDialogTitle>Hapus kategori prestasi?</AlertDialogTitle>
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

KategoriPrestasiIndex.layout = {
    breadcrumbs: [{ title: 'Wakasis', href: '/wakasis' }, { title: 'Kategori Prestasi', href: '/wakasis/kategori-prestasi' }],
};
