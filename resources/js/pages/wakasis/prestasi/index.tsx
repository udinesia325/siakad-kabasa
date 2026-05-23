import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Pencil, PlusCircle, Trash2 } from 'lucide-react';
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
type JenisOpt = { id: number; nama: string };
type KategoriOpt = { id: number; nama: string; tingkat: string };

type Prestasi = {
    id: number;
    siswa_id: number;
    jenis_prestasi_id: number;
    kategori_prestasi_id: number;
    tanggal: string;
    nama_kejuaraan: string;
    peringkat: string | null;
    sertifikat_path: string | null;
    keterangan: string | null;
    validated_at: string | null;
    siswa: SiswaOpt | null;
    jenis_prestasi: JenisOpt | null;
    kategori_prestasi: KategoriOpt | null;
    input_oleh: { id: number; name: string } | null;
    divalidasi_oleh: { id: number; name: string } | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    prestasi: Paginated<Prestasi>;
    filters: { search?: string; jenis_prestasi_id?: string; validated?: string };
    siswaList: SiswaOpt[];
    jenisList: JenisOpt[];
    kategoriList: KategoriOpt[];
};

const tingkatLabel: Record<string, string> = {
    sekolah: 'Sekolah',
    kabupaten: 'Kabupaten',
    provinsi: 'Provinsi',
    nasional: 'Nasional',
    internasional: 'Internasional',
};

const tingkatColor: Record<string, string> = {
    sekolah: 'bg-slate-100 text-slate-800',
    kabupaten: 'bg-blue-100 text-blue-800',
    provinsi: 'bg-purple-100 text-purple-800',
    nasional: 'bg-amber-100 text-amber-800',
    internasional: 'bg-green-100 text-green-800',
};

export default function PrestasiIndex({ prestasi, filters, siswaList, jenisList, kategoriList }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const canCreate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.prestasi.create'));
    const canUpdate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.prestasi.update'));
    const canDelete = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.prestasi.delete'));
    const canValidate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.prestasi.validate'));

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Prestasi | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Prestasi | null>(null);
    const [validateTarget, setValidateTarget] = useState<Prestasi | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);

    const form = useForm<{
        siswa_id: string;
        jenis_prestasi_id: string;
        kategori_prestasi_id: string;
        tanggal: string;
        nama_kejuaraan: string;
        peringkat: string;
        keterangan: string;
        sertifikat: File | null;
    }>({
        siswa_id: '',
        jenis_prestasi_id: '',
        kategori_prestasi_id: '',
        tanggal: new Date().toISOString().slice(0, 10),
        nama_kejuaraan: '',
        peringkat: '',
        keterangan: '',
        sertifikat: null,
    });

    useEffect(() => {
        if (isFirstRender.current) {
 isFirstRender.current = false;

 return; 
}

        const handle = setTimeout(() => {
            router.get('/wakasis/prestasi', { search: search || undefined, jenis_prestasi_id: filters.jenis_prestasi_id || undefined, validated: filters.validated || undefined }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
        form.reset();
        form.setData({ siswa_id: '', jenis_prestasi_id: '', kategori_prestasi_id: '', tanggal: new Date().toISOString().slice(0, 10), nama_kejuaraan: '', peringkat: '', keterangan: '', sertifikat: null });
        setEditing(null);
        setOpen(true);
    }

    function openEdit(item: Prestasi) {
        form.setData({
            siswa_id: String(item.siswa_id),
            jenis_prestasi_id: String(item.jenis_prestasi_id),
            kategori_prestasi_id: String(item.kategori_prestasi_id),
            tanggal: item.tanggal,
            nama_kejuaraan: item.nama_kejuaraan,
            peringkat: item.peringkat ?? '',
            keterangan: item.keterangan ?? '',
            sertifikat: null,
        });
        setEditing(item);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const options = { preserveScroll: true, forceFormData: true, onSuccess: () => {
 setOpen(false); form.reset(); 
} };

        if (editing) {
            form.post(`/wakasis/prestasi/${editing.id}?_method=PATCH`, options);
        } else {
            form.post('/wakasis/prestasi', options);
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/wakasis/prestasi/${deleteTarget.id}`, { preserveScroll: true });
        setDeleteTarget(null);
    }

    function confirmValidate() {
        if (!validateTarget) {
return;
}

        router.post(`/wakasis/prestasi/${validateTarget.id}/validate`, {}, { preserveScroll: true });
        setValidateTarget(null);
    }

    return (
        <>
            <Head title="Prestasi Siswa" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Prestasi Siswa</h1>
                    {canCreate && (
                        <Button onClick={openCreate}>
                            <PlusCircle className="mr-2 h-4 w-4" />Catat Prestasi
                        </Button>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Input placeholder="Cari nama/NISN siswa atau kejuaraan…" className="w-80" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Select value={filters.jenis_prestasi_id ?? ''} onValueChange={(v) => router.get('/wakasis/prestasi', { ...filters, jenis_prestasi_id: v || undefined }, { preserveState: true, replace: true })}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="Semua Jenis" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Jenis</SelectItem>
                            {jenisList.map((j) => <SelectItem key={j.id} value={String(j.id)}>{j.nama}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={filters.validated ?? ''} onValueChange={(v) => router.get('/wakasis/prestasi', { ...filters, validated: v || undefined }, { preserveState: true, replace: true })}>
                        <SelectTrigger className="w-44"><SelectValue placeholder="Semua Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Status</SelectItem>
                            <SelectItem value="ya">Sudah Divalidasi</SelectItem>
                            <SelectItem value="tidak">Belum Divalidasi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Siswa</TableHead>
                                <TableHead>Kejuaraan</TableHead>
                                <TableHead>Tingkat</TableHead>
                                <TableHead className="w-28">Tanggal</TableHead>
                                <TableHead className="w-32">Status</TableHead>
                                <TableHead className="w-28"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prestasi.data.length === 0 && (
                                <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                            )}
                            {prestasi.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.siswa?.nama ?? '—'}</div>
                                        <div className="text-xs text-muted-foreground">{item.siswa?.nisn ?? ''}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{item.nama_kejuaraan}</div>
                                        <div className="flex items-center gap-1 mt-1">
                                            {item.jenis_prestasi && <Badge variant="secondary" className="text-xs">{item.jenis_prestasi.nama}</Badge>}
                                            {item.peringkat && <span className="text-xs text-muted-foreground">· {item.peringkat}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.kategori_prestasi && (
                                            <Badge className={tingkatColor[item.kategori_prestasi.tingkat] ?? 'bg-gray-100 text-gray-800'}>
                                                {tingkatLabel[item.kategori_prestasi.tingkat] ?? item.kategori_prestasi.tingkat}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm">{item.tanggal}</TableCell>
                                    <TableCell>
                                        {item.validated_at ? (
                                            <div>
                                                <Badge className="bg-green-100 text-green-800">Divalidasi</Badge>
                                                <div className="mt-1 text-xs text-muted-foreground">oleh {item.divalidasi_oleh?.name ?? '—'}</div>
                                            </div>
                                        ) : (
                                            <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {canValidate && !item.validated_at && (
                                                <Button size="sm" variant="outline" onClick={() => setValidateTarget(item)}>
                                                    <CheckCircle className="mr-1 h-3 w-3" />Validasi
                                                </Button>
                                            )}
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

                {prestasi.last_page > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {prestasi.current_page} dari {prestasi.last_page} · {prestasi.total} total
                    </p>
                )}
            </div>

            {/* Dialog Create/Edit */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>{editing ? 'Edit Prestasi' : 'Catat Prestasi'}</DialogTitle></DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4" encType="multipart/form-data">
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
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Jenis Prestasi</Label>
                                <Select value={form.data.jenis_prestasi_id} onValueChange={(v) => form.setData('jenis_prestasi_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Pilih jenis…" /></SelectTrigger>
                                    <SelectContent>
                                        {jenisList.map((j) => (
                                            <SelectItem key={j.id} value={String(j.id)}>{j.nama}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.jenis_prestasi_id && <p className="text-sm text-destructive">{form.errors.jenis_prestasi_id}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Kategori / Tingkat</Label>
                                <Select value={form.data.kategori_prestasi_id} onValueChange={(v) => form.setData('kategori_prestasi_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Pilih kategori…" /></SelectTrigger>
                                    <SelectContent>
                                        {kategoriList.map((k) => (
                                            <SelectItem key={k.id} value={String(k.id)}>{k.nama} ({tingkatLabel[k.tingkat] ?? k.tingkat})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.kategori_prestasi_id && <p className="text-sm text-destructive">{form.errors.kategori_prestasi_id}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Nama Kejuaraan</Label>
                            <Input value={form.data.nama_kejuaraan} onChange={(e) => form.setData('nama_kejuaraan', e.target.value)} placeholder="Olimpiade Sains Nasional 2024…" />
                            {form.errors.nama_kejuaraan && <p className="text-sm text-destructive">{form.errors.nama_kejuaraan}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Tanggal</Label>
                                <Input type="date" value={form.data.tanggal} onChange={(e) => form.setData('tanggal', e.target.value)} />
                                {form.errors.tanggal && <p className="text-sm text-destructive">{form.errors.tanggal}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Peringkat (opsional)</Label>
                                <Input value={form.data.peringkat} onChange={(e) => form.setData('peringkat', e.target.value)} placeholder="Juara 1, Finalis…" />
                                {form.errors.peringkat && <p className="text-sm text-destructive">{form.errors.peringkat}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Sertifikat (opsional, PDF/JPG/PNG maks 5MB)</Label>
                            <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => form.setData('sertifikat', e.target.files?.[0] ?? null)} />
                            {editing?.sertifikat_path && !form.data.sertifikat && (
                                <p className="text-xs text-muted-foreground">Sertifikat sudah ada. Upload baru untuk mengganti.</p>
                            )}
                            {form.errors.sertifikat && <p className="text-sm text-destructive">{form.errors.sertifikat}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Keterangan (opsional)</Label>
                            <Textarea rows={2} value={form.data.keterangan} onChange={(e) => form.setData('keterangan', e.target.value)} placeholder="Keterangan tambahan…" />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={form.processing}>Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* AlertDialog Validasi */}
            <AlertDialog open={!!validateTarget} onOpenChange={(v) => !v && setValidateTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Validasi Prestasi?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Prestasi <strong>{validateTarget?.nama_kejuaraan}</strong> untuk{' '}
                            <strong>{validateTarget?.siswa?.nama}</strong> akan ditandai sudah divalidasi.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmValidate}>Validasi</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* AlertDialog Hapus */}
            <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus catatan prestasi?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Prestasi <strong>{deleteTarget?.nama_kejuaraan}</strong> untuk{' '}
                            <strong>{deleteTarget?.siswa?.nama}</strong> akan dihapus permanen beserta sertifikatnya.
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

PrestasiIndex.layout = {
    breadcrumbs: [
        { title: 'Wakasis', href: '/wakasis' },
        { title: 'Prestasi Siswa', href: '/wakasis/prestasi' },
    ],
};
