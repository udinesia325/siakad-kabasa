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
import { Badge } from '@/components/ui/badge';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type JenisOpt = { id: number; nama: string; warna: string | null };

type PoinPelanggaran = {
    id: number;
    jenis_pelanggaran_id: number;
    nama: string;
    poin: number;
    deskripsi: string | null;
    jenis_pelanggaran: JenisOpt | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    poinPelanggaran: Paginated<PoinPelanggaran>;
    filters: { search?: string; jenis_pelanggaran_id?: string };
    jenisList: JenisOpt[];
};

export default function PoinPelanggaranIndex({ poinPelanggaran, filters, jenisList }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<PoinPelanggaran | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<PoinPelanggaran | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);

    const form = useForm({
        jenis_pelanggaran_id: '',
        nama: '',
        poin: '5',
        deskripsi: '',
    });

    useEffect(() => {
        if (isFirstRender.current) {
 isFirstRender.current = false;

 return; 
}

        const handle = setTimeout(() => {
            router.get('/wakasis/poin-pelanggaran', { search: search || undefined, jenis_pelanggaran_id: filters.jenis_pelanggaran_id || undefined }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
        form.reset();
        form.setData('poin', '5');
        setEditing(null);
        setOpen(true);
    }

    function openEdit(item: PoinPelanggaran) {
        form.setData({
            jenis_pelanggaran_id: String(item.jenis_pelanggaran_id),
            nama: item.nama,
            poin: String(item.poin),
            deskripsi: item.deskripsi ?? '',
        });
        setEditing(item);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/wakasis/poin-pelanggaran/${editing.id}`, { preserveScroll: true, onSuccess: () => setOpen(false) });
        } else {
            form.post('/wakasis/poin-pelanggaran', { preserveScroll: true, onSuccess: () => setOpen(false) });
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/wakasis/poin-pelanggaran/${deleteTarget.id}`, { preserveScroll: true });
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Poin Pelanggaran" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Poin Pelanggaran</h1>
                    <Button onClick={openCreate}><PlusCircle className="mr-2 h-4 w-4" />Tambah</Button>
                </div>

                <div className="flex items-center gap-3">
                    <Input placeholder="Cari nama…" className="w-72" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Jenis</TableHead>
                                <TableHead className="w-20 text-center">Poin</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {poinPelanggaran.data.length === 0 && (
                                <TableRow><TableCell colSpan={5} className="py-10 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                            )}
                            {poinPelanggaran.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.nama}</TableCell>
                                    <TableCell>
                                        {item.jenis_pelanggaran ? (
                                            <Badge style={{ backgroundColor: item.jenis_pelanggaran.warna ?? undefined }} className="text-white">{item.jenis_pelanggaran.nama}</Badge>
                                        ) : '—'}
                                    </TableCell>
                                    <TableCell className="text-center font-mono font-semibold">{item.poin}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{item.deskripsi ?? '—'}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button size="icon" variant="ghost" onClick={() => openEdit(item)} title="Edit"><Pencil className="h-4 w-4" /></Button>
                                            <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(item)} title="Hapus"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {poinPelanggaran.last_page > 1 && (
                    <div className="text-sm">
                        <p className="text-muted-foreground">Halaman {poinPelanggaran.current_page} dari {poinPelanggaran.last_page} · {poinPelanggaran.total} total</p>
                    </div>
                )}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>{editing ? 'Edit Poin Pelanggaran' : 'Tambah Poin Pelanggaran'}</DialogTitle></DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Jenis Pelanggaran</Label>
                            <Select value={form.data.jenis_pelanggaran_id} onValueChange={(v) => form.setData('jenis_pelanggaran_id', v)}>
                                <SelectTrigger><SelectValue placeholder="Pilih jenis…" /></SelectTrigger>
                                <SelectContent>
                                    {jenisList.map((j) => <SelectItem key={j.id} value={String(j.id)}>{j.nama}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            {form.errors.jenis_pelanggaran_id && <p className="text-sm text-destructive">{form.errors.jenis_pelanggaran_id}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Nama Pelanggaran</Label>
                            <Input value={form.data.nama} onChange={(e) => form.setData('nama', e.target.value)} placeholder="Terlambat masuk kelas" maxLength={150} />
                            {form.errors.nama && <p className="text-sm text-destructive">{form.errors.nama}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Poin</Label>
                            <Input type="number" min={1} max={100} value={form.data.poin} onChange={(e) => form.setData('poin', e.target.value)} placeholder="5" />
                            {form.errors.poin && <p className="text-sm text-destructive">{form.errors.poin}</p>}
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
                        <AlertDialogTitle>Hapus poin pelanggaran?</AlertDialogTitle>
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

PoinPelanggaranIndex.layout = {
    breadcrumbs: [
        { title: 'Wakasis', href: '/wakasis' },
        { title: 'Poin Pelanggaran', href: '/wakasis/poin-pelanggaran' },
    ],
};
