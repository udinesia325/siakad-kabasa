import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SiswaPicker } from '@/components/siswa-picker';
import type { SiswaOption } from '@/components/siswa-picker';
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

type StatusKasus = 'baru' | 'proses' | 'selesai';

type KasusSiswa = {
    id: number;
    siswa_id: number;
    tanggal: string;
    judul: string;
    deskripsi: string | null;
    status: StatusKasus;
    ditangani_oleh: number | null;
    catatan_penanganan: string | null;
    siswa: SiswaOpt | null;
    ditangani_oleh_pegawai: PegawaiOpt | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    kasusSiswa: Paginated<KasusSiswa>;
    filters: { search?: string; status?: string };
    pegawaiList: PegawaiOpt[];
};

const statusLabel: Record<StatusKasus, string> = {
    baru: 'Baru',
    proses: 'Proses',
    selesai: 'Selesai',
};

const statusColor: Record<StatusKasus, string> = {
    baru: 'bg-red-100 text-red-800',
    proses: 'bg-amber-100 text-amber-800',
    selesai: 'bg-green-100 text-green-800',
};

export default function KasusSiswaIndex({ kasusSiswa, filters, pegawaiList }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const canCreate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.kasus-siswa.create'));
    const canUpdate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.kasus-siswa.update'));
    const canDelete = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.kasus-siswa.delete'));

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<KasusSiswa | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<KasusSiswa | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);

    const form = useForm({
        siswa_id: '',
        tanggal: new Date().toISOString().slice(0, 10),
        judul: '',
        deskripsi: '',
        status: 'baru',
        ditangani_oleh: '',
        catatan_penanganan: '',
    });

    useEffect(() => {
        if (isFirstRender.current) {
 isFirstRender.current = false;

 return; 
}

        const handle = setTimeout(() => {
            router.get('/wakasis/kasus-siswa', { search: search || undefined, status: filters.status || undefined }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
        form.reset();
        form.setData({ siswa_id: '', tanggal: new Date().toISOString().slice(0, 10), judul: '', deskripsi: '', status: 'baru', ditangani_oleh: '', catatan_penanganan: '' });
        setEditing(null);
        setOpen(true);
    }

    function openEdit(item: KasusSiswa) {
        form.setData({
            siswa_id: String(item.siswa_id),
            tanggal: item.tanggal,
            judul: item.judul,
            deskripsi: item.deskripsi ?? '',
            status: item.status,
            ditangani_oleh: item.ditangani_oleh ? String(item.ditangani_oleh) : '',
            catatan_penanganan: item.catatan_penanganan ?? '',
        });
        setEditing(item);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/wakasis/kasus-siswa/${editing.id}`, { preserveScroll: true, onSuccess: () => setOpen(false) });
        } else {
            form.post('/wakasis/kasus-siswa', { preserveScroll: true, onSuccess: () => {
 setOpen(false); form.reset(); 
} });
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/wakasis/kasus-siswa/${deleteTarget.id}`, { preserveScroll: true });
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Kasus Siswa" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Kasus Siswa</h1>
                    {canCreate && (
                        <Button onClick={openCreate}>
                            <PlusCircle className="mr-2 h-4 w-4" />Catat Kasus
                        </Button>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Input placeholder="Cari nama/NISN siswa atau judul kasus…" className="w-80" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Select value={filters.status ?? 'all'} onValueChange={(v) => router.get('/wakasis/kasus-siswa', { ...filters, status: v === 'all' ? undefined : v }, { preserveState: true, replace: true })}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="Semua Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="baru">Baru</SelectItem>
                            <SelectItem value="proses">Proses</SelectItem>
                            <SelectItem value="selesai">Selesai</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Siswa</TableHead>
                                <TableHead>Kasus</TableHead>
                                <TableHead className="w-28">Tanggal</TableHead>
                                <TableHead className="w-24">Status</TableHead>
                                <TableHead>Penanganan</TableHead>
                                <TableHead className="w-20"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kasusSiswa.data.length === 0 && (
                                <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                            )}
                            {kasusSiswa.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.siswa?.nama ?? '—'}</div>
                                        <div className="text-xs text-muted-foreground">{item.siswa?.nisn ?? ''}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{item.judul}</div>
                                        {item.deskripsi && <div className="mt-1 text-xs text-muted-foreground line-clamp-1">{item.deskripsi}</div>}
                                    </TableCell>
                                    <TableCell className="text-sm">{item.tanggal}</TableCell>
                                    <TableCell>
                                        <Badge className={statusColor[item.status]}>{statusLabel[item.status]}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {item.ditangani_oleh_pegawai?.nama ?? '—'}
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

                {kasusSiswa.last_page > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {kasusSiswa.current_page} dari {kasusSiswa.last_page} · {kasusSiswa.total} total
                    </p>
                )}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>{editing ? 'Edit Kasus' : 'Catat Kasus Siswa'}</DialogTitle></DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Siswa</Label>
                            <SiswaPicker
                                value={form.data.siswa_id ? Number(form.data.siswa_id) : null}
                                onChange={(siswa: SiswaOption | null) => form.setData('siswa_id', siswa ? String(siswa.id) : '')}
                            />
                            {form.errors.siswa_id && <p className="text-sm text-destructive">{form.errors.siswa_id}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Tanggal</Label>
                                <Input type="date" value={form.data.tanggal} onChange={(e) => form.setData('tanggal', e.target.value)} />
                                {form.errors.tanggal && <p className="text-sm text-destructive">{form.errors.tanggal}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Status</Label>
                                <Select value={form.data.status} onValueChange={(v) => form.setData('status', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="baru">Baru</SelectItem>
                                        <SelectItem value="proses">Proses</SelectItem>
                                        <SelectItem value="selesai">Selesai</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Judul Kasus</Label>
                            <Input value={form.data.judul} onChange={(e) => form.setData('judul', e.target.value)} placeholder="Perkelahian antar siswa…" maxLength={200} />
                            {form.errors.judul && <p className="text-sm text-destructive">{form.errors.judul}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Deskripsi (opsional)</Label>
                            <Textarea rows={3} value={form.data.deskripsi} onChange={(e) => form.setData('deskripsi', e.target.value)} placeholder="Detail kejadian…" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Ditangani Oleh (opsional)</Label>
                            <Select value={form.data.ditangani_oleh || 'none'} onValueChange={(v) => form.setData('ditangani_oleh', v === 'none' ? '' : v)}>
                                <SelectTrigger><SelectValue placeholder="Pilih pegawai…" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Belum ditentukan</SelectItem>
                                    {pegawaiList.map((p) => (
                                        <SelectItem key={p.id} value={String(p.id)}>{p.nama}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Catatan Penanganan (opsional)</Label>
                            <Textarea rows={2} value={form.data.catatan_penanganan} onChange={(e) => form.setData('catatan_penanganan', e.target.value)} placeholder="Tindakan yang sudah dilakukan…" />
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
                        <AlertDialogTitle>Hapus catatan kasus?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Kasus <strong>{deleteTarget?.judul}</strong> untuk{' '}
                            <strong>{deleteTarget?.siswa?.nama}</strong> akan dihapus permanen.
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

KasusSiswaIndex.layout = {
    breadcrumbs: [
        { title: 'Wakasis', href: '/wakasis' },
        { title: 'Kasus Siswa', href: '/wakasis/kasus-siswa' },
    ],
};
