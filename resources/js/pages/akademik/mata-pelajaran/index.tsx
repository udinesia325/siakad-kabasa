import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
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
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type Kelompok = 'umum' | 'kejuruan' | 'muatan_lokal' | 'lainnya';

type PegawaiOpt = { id: number; nama: string; nik: string | null };

type MataPelajaran = {
    id: number;
    kode: string;
    nama: string;
    kelompok: Kelompok;
    deskripsi: string | null;
    aktif: boolean;
    pengampu_count: number;
    pengampu: PegawaiOpt[];
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    mataPelajaran: Paginated<MataPelajaran>;
    filters: { search?: string; kelompok?: string };
    pegawaiGuru: PegawaiOpt[];
};

const KELOMPOK_LABEL: Record<Kelompok, string> = {
    umum: 'Umum',
    kejuruan: 'Kejuruan',
    muatan_lokal: 'Muatan Lokal',
    lainnya: 'Lainnya',
};

export default function MataPelajaranIndex({
    mataPelajaran,
    filters,
    pegawaiGuru,
}: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<MataPelajaran | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<MataPelajaran | null>(
        null,
    );
    const [pengampuIds, setPengampuIds] = useState<Set<number>>(new Set());
    const [pengampuSearch, setPengampuSearch] = useState('');
    const [search, setSearch] = useState(filters.search ?? '');
    const [kelompok, setKelompok] = useState(filters.kelompok ?? 'all');
    const isFirstRender = useRef(true);

    const form = useForm({
        kode: '',
        nama: '',
        kelompok: 'umum' as Kelompok,
        deskripsi: '',
        aktif: true,
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/mata-pelajaran',
                {
                    search: search || undefined,
                    kelompok: kelompok === 'all' ? undefined : kelompok,
                },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search, kelompok]);

    function openCreate() {
        form.reset();
        setEditing(null);
        setPengampuIds(new Set());
        setPengampuSearch('');
        setOpen(true);
    }

    function openEdit(mp: MataPelajaran) {
        form.setData({
            kode: mp.kode,
            nama: mp.nama,
            kelompok: mp.kelompok,
            deskripsi: mp.deskripsi ?? '',
            aktif: mp.aktif,
        });
        setPengampuIds(new Set(mp.pengampu.map((p) => p.id)));
        setPengampuSearch('');
        setEditing(mp);
        setOpen(true);
    }

    function syncPengampu(mapelId: number, onDone: () => void) {
        router.post(
            `/mata-pelajaran/${mapelId}/pengampu`,
            { pegawai_ids: Array.from(pengampuIds) },
            {
                preserveScroll: true,
                onFinish: onDone,
            },
        );
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/mata-pelajaran/${editing.id}`, {
                preserveScroll: true,
                onSuccess: () => syncPengampu(editing.id, () => setOpen(false)),
            });
        } else {
            // Untuk create kita perlu id mapel yang baru — pakai router.post lalu sync via
            // tahap kedua dengan membaca id terbaru dari response page props.
            form.post('/mata-pelajaran', {
                preserveScroll: true,
                onSuccess: (page) => {
                    // Ambil mapel baru dari list — yang kode-nya cocok
                    const list = (
                        page.props.mataPelajaran as Paginated<MataPelajaran>
                    )?.data;
                    const created = list?.find(
                        (m) => m.kode === form.data.kode,
                    );

                    if (created && pengampuIds.size > 0) {
                        syncPengampu(created.id, () => setOpen(false));
                    } else {
                        setOpen(false);
                    }
                },
            });
        }
    }

    const filteredGuru = useMemo(() => {
        const q = pengampuSearch.trim().toLowerCase();

        if (!q) {
            return pegawaiGuru;
        }

        return pegawaiGuru.filter(
            (p) =>
                p.nama.toLowerCase().includes(q) ||
                (p.nik ?? '').toLowerCase().includes(q),
        );
    }, [pegawaiGuru, pengampuSearch]);

    function togglePengampu(id: number) {
        setPengampuIds((prev) => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/mata-pelajaran/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Mata Pelajaran" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Mata Pelajaran</h1>
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
                    <Select value={kelompok} onValueChange={setKelompok}>
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Kelompok" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kelompok</SelectItem>
                            {Object.entries(KELOMPOK_LABEL).map(([k, v]) => (
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
                                <TableHead className="w-32">Kode</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Kelompok</TableHead>
                                <TableHead className="w-32">Pengampu</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mataPelajaran.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Tidak ada mata pelajaran.
                                    </TableCell>
                                </TableRow>
                            )}
                            {mataPelajaran.data.map((mp) => (
                                <TableRow key={mp.id}>
                                    <TableCell>
                                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                                            {mp.kode}
                                        </code>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">
                                            {mp.nama}
                                        </div>
                                        {mp.deskripsi && (
                                            <div className="text-xs text-muted-foreground">
                                                {mp.deskripsi}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {KELOMPOK_LABEL[mp.kelompok]}
                                    </TableCell>
                                    <TableCell>
                                        {mp.pengampu_count === 0 ? (
                                            <span className="text-xs text-muted-foreground">
                                                Belum ada
                                            </span>
                                        ) : (
                                            <div className="flex flex-wrap gap-1">
                                                {mp.pengampu
                                                    .slice(0, 2)
                                                    .map((p) => (
                                                        <Badge
                                                            key={p.id}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {p.nama}
                                                        </Badge>
                                                    ))}
                                                {mp.pengampu_count > 2 && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        +{mp.pengampu_count - 2}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {mp.aktif ? (
                                            <Badge>Aktif</Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                Nonaktif
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => openEdit(mp)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    setDeleteTarget(mp)
                                                }
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

                {mataPelajaran.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">
                            Halaman {mataPelajaran.current_page} dari{' '}
                            {mataPelajaran.last_page} · {mataPelajaran.total}{' '}
                            total
                        </p>
                    </div>
                )}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex max-h-[85vh] max-w-lg flex-col">
                    <DialogHeader>
                        <DialogTitle>
                            {editing
                                ? 'Edit Mata Pelajaran'
                                : 'Tambah Mata Pelajaran'}
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={submit}
                        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Kode</Label>
                                <Input
                                    value={form.data.kode}
                                    onChange={(e) =>
                                        form.setData('kode', e.target.value)
                                    }
                                    placeholder="MTK-X"
                                />
                                {form.errors.kode && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.kode}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Kelompok</Label>
                                <Select
                                    value={form.data.kelompok}
                                    onValueChange={(v) =>
                                        form.setData('kelompok', v as Kelompok)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(KELOMPOK_LABEL).map(
                                            ([k, v]) => (
                                                <SelectItem key={k} value={k}>
                                                    {v}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Nama</Label>
                            <Input
                                value={form.data.nama}
                                onChange={(e) =>
                                    form.setData('nama', e.target.value)
                                }
                                placeholder="Matematika"
                            />
                            {form.errors.nama && (
                                <p className="text-sm text-destructive">
                                    {form.errors.nama}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Deskripsi (opsional)</Label>
                            <Textarea
                                rows={3}
                                value={form.data.deskripsi}
                                onChange={(e) =>
                                    form.setData('deskripsi', e.target.value)
                                }
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={form.data.aktif}
                                onCheckedChange={(v) =>
                                    form.setData('aktif', v)
                                }
                            />
                            <Label>Aktif</Label>
                        </div>

                        <div className="flex flex-col gap-2 border-t pt-4">
                            <div className="flex items-center justify-between">
                                <Label>Guru Pengampu</Label>
                                <span className="text-xs text-muted-foreground">
                                    {pengampuIds.size} dipilih
                                </span>
                            </div>
                            <Input
                                placeholder="Cari guru…"
                                value={pengampuSearch}
                                onChange={(e) =>
                                    setPengampuSearch(e.target.value)
                                }
                            />
                            <div className="max-h-60 overflow-y-auto rounded-md border">
                                {filteredGuru.length === 0 && (
                                    <div className="p-3 text-center text-xs text-muted-foreground">
                                        {pegawaiGuru.length === 0
                                            ? 'Belum ada pegawai jenis "guru". Tambah dulu di menu Pegawai.'
                                            : 'Tidak ada guru yang cocok.'}
                                    </div>
                                )}
                                {filteredGuru.map((p) => (
                                    <label
                                        key={p.id}
                                        className="flex cursor-pointer items-center gap-3 border-b px-3 py-2 last:border-b-0 hover:bg-accent"
                                    >
                                        <Checkbox
                                            checked={pengampuIds.has(p.id)}
                                            onCheckedChange={() =>
                                                togglePengampu(p.id)
                                            }
                                        />
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">
                                                {p.nama}
                                            </div>
                                            {p.nik && (
                                                <div className="text-xs text-muted-foreground">
                                                    NIK {p.nik}
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(v) => !v && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Hapus mata pelajaran?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>{deleteTarget?.nama}</strong> akan dihapus
                            permanen beserta semua relasi pengampu dan
                            jadwalnya.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={hapus}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

MataPelajaranIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Mata Pelajaran', href: '/mata-pelajaran' },
    ],
};
