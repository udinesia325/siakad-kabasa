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

type Jenis = 'lab' | 'kelas' | 'gudang' | 'lainnya';
type UserOpt = { id: number; name: string };
type Lokasi = {
    id: number;
    kode: string;
    nama: string;
    kapasitas: number | null;
    jenis: Jenis;
    penanggung_jawab_id: number | null;
    penanggungjawab: UserOpt | null;
};
type Paginated<T> = { data: T[]; current_page: number; last_page: number; total: number };
type Props = {
    lokasi: Paginated<Lokasi>;
    filters: { search?: string; jenis?: string };
    users: UserOpt[];
};

const JENIS_LABEL: Record<Jenis, string> = {
    lab: 'Lab',
    kelas: 'Kelas',
    gudang: 'Gudang',
    lainnya: 'Lainnya',
};
const JENIS_VARIANT: Record<Jenis, 'default' | 'secondary' | 'outline'> = {
    lab: 'default',
    kelas: 'secondary',
    gudang: 'outline',
    lainnya: 'outline',
};

export default function LokasiIndex({ lokasi, filters, users }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Lokasi | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Lokasi | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [jenis, setJenis] = useState(filters.jenis ?? 'all');
    const isFirstRender = useRef(true);

    const form = useForm({
        kode: '',
        nama: '',
        kapasitas: '',
        jenis: 'lainnya' as Jenis,
        penanggung_jawab_id: '' as string,
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/sarpras/lokasi',
                { search: search || undefined, jenis: jenis === 'all' ? undefined : jenis },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search, jenis]);

    function openCreate() {
        form.reset();
        setEditing(null);
        setOpen(true);
    }

    function openEdit(item: Lokasi) {
        form.setData({
            kode: item.kode,
            nama: item.nama,
            kapasitas: item.kapasitas?.toString() ?? '',
            jenis: item.jenis,
            penanggung_jawab_id: item.penanggung_jawab_id?.toString() ?? '',
        });
        setEditing(item);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/sarpras/lokasi/${editing.id}`, {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/sarpras/lokasi', {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/sarpras/lokasi/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Lokasi / Ruangan" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Lokasi / Ruangan</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Cari kode / nama…"
                        className="w-72"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select value={jenis} onValueChange={setJenis}>
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Jenis" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Jenis</SelectItem>
                            {Object.entries(JENIS_LABEL).map(([k, v]) => (
                                <SelectItem key={k} value={k}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-28">Kode</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Jenis</TableHead>
                                <TableHead className="w-28">Kapasitas</TableHead>
                                <TableHead>Penanggung Jawab</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lokasi.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Tidak ada lokasi.
                                    </TableCell>
                                </TableRow>
                            )}
                            {lokasi.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                                            {item.kode}
                                        </code>
                                    </TableCell>
                                    <TableCell className="font-medium">{item.nama}</TableCell>
                                    <TableCell>
                                        <Badge variant={JENIS_VARIANT[item.jenis]}>
                                            {JENIS_LABEL[item.jenis]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {item.kapasitas ?? (
                                            <span className="text-muted-foreground">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.penanggungjawab?.name ?? (
                                            <span className="text-xs text-muted-foreground">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => openEdit(item)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => setDeleteTarget(item)}
                                                title="Hapus"
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Edit Lokasi' : 'Tambah Lokasi'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Kode</Label>
                                <Input
                                    value={form.data.kode}
                                    onChange={(e) =>
                                        form.setData('kode', e.target.value.toUpperCase())
                                    }
                                    placeholder="RKB-01"
                                />
                                {form.errors.kode && (
                                    <p className="text-sm text-destructive">{form.errors.kode}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Jenis</Label>
                                <Select
                                    value={form.data.jenis}
                                    onValueChange={(v) => form.setData('jenis', v as Jenis)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(JENIS_LABEL).map(([k, v]) => (
                                            <SelectItem key={k} value={k}>
                                                {v}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Nama</Label>
                            <Input
                                value={form.data.nama}
                                onChange={(e) => form.setData('nama', e.target.value)}
                                placeholder="Ruang Kelas B1"
                            />
                            {form.errors.nama && (
                                <p className="text-sm text-destructive">{form.errors.nama}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Kapasitas (opsional)</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={form.data.kapasitas}
                                    onChange={(e) => form.setData('kapasitas', e.target.value)}
                                    placeholder="30"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Penanggung Jawab</Label>
                                <Select
                                    value={form.data.penanggung_jawab_id || 'none'}
                                    onValueChange={(v) =>
                                        form.setData('penanggung_jawab_id', v === 'none' ? '' : v)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Tidak ada</SelectItem>
                                        {users.map((u) => (
                                            <SelectItem key={u.id} value={u.id.toString()}>
                                                {u.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus lokasi?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>{deleteTarget?.nama}</strong> akan dihapus permanen.
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

LokasiIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Lokasi / Ruangan', href: '/sarpras/lokasi' },
    ],
};
