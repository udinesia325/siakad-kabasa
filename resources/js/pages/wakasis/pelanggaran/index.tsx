import { Head, router, usePage } from '@inertiajs/react';
import { ImagePlus, PlusCircle, Trash2, X } from 'lucide-react';
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
type JenisOpt = { id: number; nama: string; warna: string | null };

type PoinOpt = {
    id: number;
    nama: string;
    poin: number;
    jenis_pelanggaran_id: number;
    jenis_pelanggaran: JenisOpt | null;
};

type BuktiItem = { id: number; file_path: string; file_url: string };

type Pelanggaran = {
    id: number;
    siswa_id: number;
    poin_pelanggaran_id: number;
    tanggal: string;
    keterangan: string | null;
    siswa: SiswaOpt | null;
    poin_pelanggaran: (PoinOpt & { jenis_pelanggaran: JenisOpt | null }) | null;
    input_oleh: { id: number; name: string } | null;
    bukti: BuktiItem[];
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
    poinList: PoinOpt[];
};

type NewBukti = { file: File; preview: string };

const emptyForm = {
    siswa_id: '',
    poin_pelanggaran_id: '',
    tanggal: new Date().toISOString().slice(0, 10),
    keterangan: '',
};

export default function PelanggaranIndex({ pelanggaran, filters, poinList }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const canCreate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.pelanggaran.create'));
    const canDelete = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.pelanggaran.delete'));

    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Pelanggaran | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const isFirstRender = useRef(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState(emptyForm);
    const [newBukti, setNewBukti] = useState<NewBukti[]>([]);
    const [hapusBuktiIds, setHapusBuktiIds] = useState<number[]>([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/wakasis/pelanggaran',
                { search: search || undefined, siswa_id: filters.siswa_id || undefined },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
        setFormData({ ...emptyForm, tanggal: new Date().toISOString().slice(0, 10) });
        setNewBukti([]);
        setHapusBuktiIds([]);
        setErrors({});
        setOpen(true);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files ?? []);
        const added: NewBukti[] = files.map((f) => ({ file: f, preview: URL.createObjectURL(f) }));
        setNewBukti((prev) => [...prev, ...added]);
        // reset supaya file yang sama bisa dipilih lagi
        e.target.value = '';
    }

    function removeNewBukti(idx: number) {
        setNewBukti((prev) => {
            URL.revokeObjectURL(prev[idx].preview);

            return prev.filter((_, i) => i !== idx);
        });
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        const fd = new FormData();
        fd.append('siswa_id', formData.siswa_id);
        fd.append('poin_pelanggaran_id', formData.poin_pelanggaran_id);
        fd.append('tanggal', formData.tanggal);
        fd.append('keterangan', formData.keterangan);

        newBukti.forEach((b) => fd.append('bukti[]', b.file));
        hapusBuktiIds.forEach((id) => fd.append('hapus_bukti_ids[]', String(id)));

        setProcessing(true);
        router.post('/wakasis/pelanggaran', fd, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                newBukti.forEach((b) => URL.revokeObjectURL(b.preview));
            },
            onError: (errs) => setErrors(errs),
            onFinish: () => setProcessing(false),
        });
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
                        <Button onClick={openCreate}>
                            <PlusCircle className="mr-2 h-4 w-4" />Catat Pelanggaran
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Cari nama/NISN siswa…"
                        className="w-72"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
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
                                <TableHead className="w-24">Bukti</TableHead>
                                <TableHead className="w-20"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pelanggaran.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                                        Tidak ada data.
                                    </TableCell>
                                </TableRow>
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
                                        {item.bukti.length > 0 ? (
                                            <div className="flex gap-1">
                                                {item.bukti.slice(0, 3).map((b) => (
                                                    <a key={b.id} href={b.file_url} target="_blank" rel="noreferrer">
                                                        <img
                                                            src={b.file_url}
                                                            alt="bukti"
                                                            className="h-8 w-8 rounded object-cover ring-1 ring-border hover:opacity-80"
                                                        />
                                                    </a>
                                                ))}
                                                {item.bukti.length > 3 && (
                                                    <span className="flex h-8 w-8 items-center justify-center rounded bg-muted text-xs text-muted-foreground ring-1 ring-border">
                                                        +{item.bukti.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {canDelete && (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => setDeleteTarget(item)}
                                                title="Hapus"
                                            >
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

            {/* Dialog Catat Pelanggaran */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Catat Pelanggaran</DialogTitle></DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Siswa</Label>
                            <SiswaPicker
                                value={formData.siswa_id ? Number(formData.siswa_id) : null}
                                onChange={(siswa: SiswaOption | null) =>
                                    setFormData((d) => ({ ...d, siswa_id: siswa ? String(siswa.id) : '' }))
                                }
                            />
                            {errors.siswa_id && <p className="text-sm text-destructive">{errors.siswa_id}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Jenis Pelanggaran</Label>
                            <Select
                                value={formData.poin_pelanggaran_id}
                                onValueChange={(v) => setFormData((d) => ({ ...d, poin_pelanggaran_id: v }))}
                            >
                                <SelectTrigger><SelectValue placeholder="Pilih pelanggaran…" /></SelectTrigger>
                                <SelectContent>
                                    {poinList.map((p) => (
                                        <SelectItem key={p.id} value={String(p.id)}>
                                            {p.nama} — {p.poin} poin
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.poin_pelanggaran_id && <p className="text-sm text-destructive">{errors.poin_pelanggaran_id}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Tanggal</Label>
                            <Input
                                type="date"
                                value={formData.tanggal}
                                onChange={(e) => setFormData((d) => ({ ...d, tanggal: e.target.value }))}
                            />
                            {errors.tanggal && <p className="text-sm text-destructive">{errors.tanggal}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Keterangan (opsional)</Label>
                            <Textarea
                                rows={3}
                                value={formData.keterangan}
                                onChange={(e) => setFormData((d) => ({ ...d, keterangan: e.target.value }))}
                                placeholder="Keterangan tambahan…"
                            />
                        </div>

                        {/* Bukti Foto */}
                        <div className="flex flex-col gap-2">
                            <Label>Bukti Foto (opsional)</Label>

                            {newBukti.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {newBukti.map((b, i) => (
                                        <div key={i} className="relative">
                                            <img
                                                src={b.preview}
                                                alt="preview"
                                                className="h-20 w-20 rounded-md object-cover ring-1 ring-border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeNewBukti(i)}
                                                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-fit"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImagePlus className="mr-2 h-4 w-4" />
                                Tambah Foto
                            </Button>
                            {errors['bukti'] && <p className="text-sm text-destructive">{errors['bukti']}</p>}
                            {errors['bukti.0'] && <p className="text-sm text-destructive">File harus berupa gambar, maks 5MB.</p>}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={processing}>Simpan</Button>
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
                            <strong>{deleteTarget?.siswa?.nama}</strong> akan dihapus beserta semua foto bukti.
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
