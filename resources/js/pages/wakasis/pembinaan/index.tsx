import { Head, router, useForm, usePage } from '@inertiajs/react';
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
import type { Auth } from '@/types';

type SiswaOpt = { id: number; nama: string; nisn: string | null };
type PegawaiOpt = { id: number; nama: string };
type KategoriOpt = { id: number; nama: string };
type SpOpt = { id: number; siswa_id: number; jenis_sp_id: number; tanggal: string; siswa: SiswaOpt | null; jenis_sp: { id: number; nama: string } | null };

type StatusPembinaan = 'proses' | 'monitoring' | 'selesai';

type Pembinaan = {
    id: number;
    siswa_id: number;
    surat_peringatan_id: number | null;
    kategori_pembinaan_id: number;
    pembina_id: number;
    tanggal_mulai: string;
    tanggal_selesai: string | null;
    status: StatusPembinaan;
    catatan: string | null;
    siswa: SiswaOpt | null;
    kategori_pembinaan: KategoriOpt | null;
    pembina: PegawaiOpt | null;
    surat_peringatan: { id: number; jenis_sp: { id: number; nama: string } | null } | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    pembinaan: Paginated<Pembinaan>;
    filters: { search?: string; status?: string };
    siswaList: SiswaOpt[];
    pegawaiList: PegawaiOpt[];
    kategoriList: KategoriOpt[];
    suratPeringatanList: SpOpt[];
};

const statusLabel: Record<StatusPembinaan, string> = {
    proses: 'Proses',
    monitoring: 'Monitoring',
    selesai: 'Selesai',
};

const statusColor: Record<StatusPembinaan, string> = {
    proses: 'bg-blue-100 text-blue-800',
    monitoring: 'bg-amber-100 text-amber-800',
    selesai: 'bg-green-100 text-green-800',
};

export default function PembinaanIndex({ pembinaan, filters, siswaList, pegawaiList, kategoriList, suratPeringatanList }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const canCreate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.pembinaan.create'));
    const canUpdate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.pembinaan.update'));
    const canDelete = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.pembinaan.delete'));

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Pembinaan | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Pembinaan | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);

    const form = useForm({
        siswa_id: '',
        surat_peringatan_id: '',
        kategori_pembinaan_id: '',
        pembina_id: '',
        tanggal_mulai: new Date().toISOString().slice(0, 10),
        tanggal_selesai: '',
        status: 'proses',
        catatan: '',
    });

    useEffect(() => {
        if (isFirstRender.current) {
 isFirstRender.current = false;

 return; 
}

        const handle = setTimeout(() => {
            router.get('/wakasis/pembinaan', { search: search || undefined, status: filters.status || undefined }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
        form.reset();
        form.setData({ siswa_id: '', surat_peringatan_id: '', kategori_pembinaan_id: '', pembina_id: '', tanggal_mulai: new Date().toISOString().slice(0, 10), tanggal_selesai: '', status: 'proses', catatan: '' });
        setEditing(null);
        setOpen(true);
    }

    function openEdit(item: Pembinaan) {
        form.setData({
            siswa_id: String(item.siswa_id),
            surat_peringatan_id: item.surat_peringatan_id ? String(item.surat_peringatan_id) : '',
            kategori_pembinaan_id: String(item.kategori_pembinaan_id),
            pembina_id: String(item.pembina_id),
            tanggal_mulai: item.tanggal_mulai,
            tanggal_selesai: item.tanggal_selesai ?? '',
            status: item.status,
            catatan: item.catatan ?? '',
        });
        setEditing(item);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/wakasis/pembinaan/${editing.id}`, { preserveScroll: true, onSuccess: () => setOpen(false) });
        } else {
            form.post('/wakasis/pembinaan', { preserveScroll: true, onSuccess: () => {
 setOpen(false); form.reset(); 
} });
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/wakasis/pembinaan/${deleteTarget.id}`, { preserveScroll: true });
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Pembinaan Siswa" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Pembinaan Siswa</h1>
                    {canCreate && (
                        <Button onClick={openCreate}><PlusCircle className="mr-2 h-4 w-4" />Tambah</Button>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Input placeholder="Cari nama siswa…" className="w-72" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Select value={filters.status ?? 'all'} onValueChange={(v) => router.get('/wakasis/pembinaan', { ...filters, status: v === 'all' ? undefined : v }, { preserveState: true, replace: true })}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="Semua Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="proses">Proses</SelectItem>
                            <SelectItem value="monitoring">Monitoring</SelectItem>
                            <SelectItem value="selesai">Selesai</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Siswa</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Pembina</TableHead>
                                <TableHead className="w-28">Mulai</TableHead>
                                <TableHead className="w-24">Status</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pembinaan.data.length === 0 && (
                                <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                            )}
                            {pembinaan.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.siswa?.nama ?? '—'}</div>
                                        {item.surat_peringatan && (
                                            <div className="text-xs text-muted-foreground">SP: {item.surat_peringatan.jenis_sp?.nama ?? '—'}</div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm">{item.kategori_pembinaan?.nama ?? '—'}</TableCell>
                                    <TableCell className="text-sm">{item.pembina?.nama ?? '—'}</TableCell>
                                    <TableCell className="text-sm">{item.tanggal_mulai}</TableCell>
                                    <TableCell>
                                        <Badge className={statusColor[item.status]}>{statusLabel[item.status]}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {canUpdate && (
                                                <Button size="icon" variant="ghost" onClick={() => openEdit(item)} title="Edit">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {canDelete && (
                                                <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(item)} title="Hapus">
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {pembinaan.last_page > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {pembinaan.current_page} dari {pembinaan.last_page} · {pembinaan.total} total
                    </p>
                )}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>{editing ? 'Edit Pembinaan' : 'Tambah Pembinaan'}</DialogTitle></DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Siswa</Label>
                            <Select value={form.data.siswa_id} onValueChange={(v) => form.setData('siswa_id', v)}>
                                <SelectTrigger><SelectValue placeholder="Pilih siswa…" /></SelectTrigger>
                                <SelectContent>
                                    {siswaList.map((s) => (
                                        <SelectItem key={s.id} value={String(s.id)}>{s.nama}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.siswa_id && <p className="text-sm text-destructive">{form.errors.siswa_id}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Surat Peringatan (opsional)</Label>
                            <Select value={form.data.surat_peringatan_id || 'none'} onValueChange={(v) => form.setData('surat_peringatan_id', v === 'none' ? '' : v)}>
                                <SelectTrigger><SelectValue placeholder="Kaitkan ke SP…" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Tidak dikaitkan</SelectItem>
                                    {suratPeringatanList.map((sp) => (
                                        <SelectItem key={sp.id} value={String(sp.id)}>
                                            {sp.siswa?.nama} — {sp.jenis_sp?.nama} ({sp.tanggal})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Kategori Pembinaan</Label>
                            <Select value={form.data.kategori_pembinaan_id} onValueChange={(v) => form.setData('kategori_pembinaan_id', v)}>
                                <SelectTrigger><SelectValue placeholder="Pilih kategori…" /></SelectTrigger>
                                <SelectContent>
                                    {kategoriList.map((k) => (
                                        <SelectItem key={k.id} value={String(k.id)}>{k.nama}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.kategori_pembinaan_id && <p className="text-sm text-destructive">{form.errors.kategori_pembinaan_id}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Pembina</Label>
                            <Select value={form.data.pembina_id} onValueChange={(v) => form.setData('pembina_id', v)}>
                                <SelectTrigger><SelectValue placeholder="Pilih pembina…" /></SelectTrigger>
                                <SelectContent>
                                    {pegawaiList.map((p) => (
                                        <SelectItem key={p.id} value={String(p.id)}>{p.nama}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.pembina_id && <p className="text-sm text-destructive">{form.errors.pembina_id}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Tanggal Mulai</Label>
                                <Input type="date" value={form.data.tanggal_mulai} onChange={(e) => form.setData('tanggal_mulai', e.target.value)} />
                                {form.errors.tanggal_mulai && <p className="text-sm text-destructive">{form.errors.tanggal_mulai}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Tanggal Selesai (opsional)</Label>
                                <Input type="date" value={form.data.tanggal_selesai} onChange={(e) => form.setData('tanggal_selesai', e.target.value)} />
                                {form.errors.tanggal_selesai && <p className="text-sm text-destructive">{form.errors.tanggal_selesai}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Status</Label>
                            <Select value={form.data.status} onValueChange={(v) => form.setData('status', v)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="proses">Proses</SelectItem>
                                    <SelectItem value="monitoring">Monitoring</SelectItem>
                                    <SelectItem value="selesai">Selesai</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Catatan (opsional)</Label>
                            <Textarea rows={3} value={form.data.catatan} onChange={(e) => form.setData('catatan', e.target.value)} placeholder="Catatan pembinaan…" />
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
                        <AlertDialogTitle>Hapus catatan pembinaan?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Pembinaan untuk <strong>{deleteTarget?.siswa?.nama}</strong> akan dihapus permanen.
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

PembinaanIndex.layout = {
    breadcrumbs: [
        { title: 'Wakasis', href: '/wakasis' },
        { title: 'Pembinaan', href: '/wakasis/pembinaan' },
    ],
};
