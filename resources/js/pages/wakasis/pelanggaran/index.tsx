import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PlusCircle, Trash2 } from 'lucide-react';
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
import type { Auth } from '@/types';

type SiswaOpt = { id: number; nama: string; nisn: string | null };

type JenisOpt = { id: number; nama: string; warna: string | null };

type PoinOpt = {
    id: number;
    nama: string;
    poin: number;
    jenis_pelanggaran_id: number;
    jenis_pelanggaran: JenisOpt | null;
};

type Pelanggaran = {
    id: number;
    siswa_id: number;
    poin_pelanggaran_id: number;
    tanggal: string;
    keterangan: string | null;
    siswa: SiswaOpt | null;
    poin_pelanggaran: (PoinOpt & { jenis_pelanggaran: JenisOpt | null }) | null;
    input_oleh: { id: number; name: string } | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    pelanggaran: Paginated<Pelanggaran>;
    filters: { search?: string; siswa_id?: string };
    siswaList: SiswaOpt[];
    poinList: PoinOpt[];
};

export default function PelanggaranIndex({ pelanggaran, filters, siswaList, poinList }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const canCreate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.pelanggaran.create'));
    const canDelete = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.pelanggaran.delete'));

    const [open, setOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Pelanggaran | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);

    const form = useForm({
        siswa_id: '',
        poin_pelanggaran_id: '',
        tanggal: new Date().toISOString().slice(0, 10),
        keterangan: '',
    });

    useEffect(() => {
        if (isFirstRender.current) {
 isFirstRender.current = false;

 return; 
}

        const handle = setTimeout(() => {
            router.get('/wakasis/pelanggaran', { search: search || undefined, siswa_id: filters.siswa_id || undefined }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post('/wakasis/pelanggaran', { preserveScroll: true, onSuccess: () => {
 setOpen(false); form.reset(); 
} });
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/wakasis/pelanggaran/${deleteTarget.id}`, { preserveScroll: true });
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Pelanggaran Siswa" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Pelanggaran Siswa</h1>
                    {canCreate && (
                        <Button onClick={() => {
 form.reset(); form.setData('tanggal', new Date().toISOString().slice(0, 10)); setOpen(true); 
}}>
                            <PlusCircle className="mr-2 h-4 w-4" />Catat Pelanggaran
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Input placeholder="Cari nama/NISN siswa…" className="w-72" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Siswa</TableHead>
                                <TableHead>Pelanggaran</TableHead>
                                <TableHead className="w-20 text-center">Poin</TableHead>
                                <TableHead className="w-28">Tanggal</TableHead>
                                <TableHead>Keterangan</TableHead>
                                <TableHead className="w-20"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pelanggaran.data.length === 0 && (
                                <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                            )}
                            {pelanggaran.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.siswa?.nama ?? '—'}</div>
                                        <div className="text-xs text-muted-foreground">{item.siswa?.nisn ?? ''}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div>{item.poin_pelanggaran?.nama ?? '—'}</div>
                                        {item.poin_pelanggaran?.jenis_pelanggaran && (
                                            <Badge
                                                className="mt-1 text-xs text-white"
                                                style={{ backgroundColor: item.poin_pelanggaran.jenis_pelanggaran.warna ?? undefined }}
                                            >
                                                {item.poin_pelanggaran.jenis_pelanggaran.nama}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center font-mono font-semibold">
                                        {item.poin_pelanggaran?.poin ?? '—'}
                                    </TableCell>
                                    <TableCell className="text-sm">{item.tanggal}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{item.keterangan ?? '—'}</TableCell>
                                    <TableCell>
                                        {canDelete && (
                                            <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(item)} title="Hapus">
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {pelanggaran.last_page > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {pelanggaran.current_page} dari {pelanggaran.last_page} · {pelanggaran.total} total
                    </p>
                )}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>Catat Pelanggaran</DialogTitle></DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Siswa</Label>
                            <Select value={form.data.siswa_id} onValueChange={(v) => form.setData('siswa_id', v)}>
                                <SelectTrigger><SelectValue placeholder="Pilih siswa…" /></SelectTrigger>
                                <SelectContent>
                                    {siswaList.map((s) => (
                                        <SelectItem key={s.id} value={String(s.id)}>{s.nama} {s.nisn ? `(${s.nisn})` : ''}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.siswa_id && <p className="text-sm text-destructive">{form.errors.siswa_id}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Jenis Pelanggaran</Label>
                            <Select value={form.data.poin_pelanggaran_id} onValueChange={(v) => form.setData('poin_pelanggaran_id', v)}>
                                <SelectTrigger><SelectValue placeholder="Pilih pelanggaran…" /></SelectTrigger>
                                <SelectContent>
                                    {poinList.map((p) => (
                                        <SelectItem key={p.id} value={String(p.id)}>
                                            {p.nama} — {p.poin} poin
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.poin_pelanggaran_id && <p className="text-sm text-destructive">{form.errors.poin_pelanggaran_id}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Tanggal</Label>
                            <Input type="date" value={form.data.tanggal} onChange={(e) => form.setData('tanggal', e.target.value)} />
                            {form.errors.tanggal && <p className="text-sm text-destructive">{form.errors.tanggal}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Keterangan (opsional)</Label>
                            <Textarea rows={3} value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} placeholder="Keterangan tambahan…" />
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
                        <AlertDialogTitle>Hapus catatan pelanggaran?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Pelanggaran <strong>{deleteTarget?.poin_pelanggaran?.nama}</strong> untuk{' '}
                            <strong>{deleteTarget?.siswa?.nama}</strong> akan dihapus.
                        </AlertDialogDescription>
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

PelanggaranIndex.layout = {
    breadcrumbs: [
        { title: 'Wakasis', href: '/wakasis' },
        { title: 'Pelanggaran', href: '/wakasis/pelanggaran' },
    ],
};
