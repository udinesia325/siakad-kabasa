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

type Prioritas = 'rendah' | 'sedang' | 'tinggi';
type StatusKerusakan =
    | 'dilaporkan'
    | 'diproses'
    | 'menunggu_sparepart'
    | 'selesai';
type BarangOpt = { id: number; kode: string; nama: string };
type VendorOpt = { id: number; nama: string };
type Kerusakan = {
    id: number;
    barang_id: number;
    pelapor_id: number;
    deskripsi: string;
    foto_path: string | null;
    prioritas: Prioritas;
    status: StatusKerusakan;
    catatan_progres: string | null;
    tgl_selesai: string | null;
    vendor_id: number | null;
    barang: BarangOpt | null;
    pelapor: { id: number; name: string } | null;
    vendor: VendorOpt | null;
};
type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};
type Props = {
    kerusakan: Paginated<Kerusakan>;
    filters: { search?: string; status?: string; prioritas?: string };
    barangList: BarangOpt[];
    vendorList: VendorOpt[];
    authId: number;
};

const PRIORITAS_LABEL: Record<Prioritas, string> = {
    rendah: 'Rendah',
    sedang: 'Sedang',
    tinggi: 'Tinggi',
};
const PRIORITAS_VARIANT: Record<
    Prioritas,
    'default' | 'secondary' | 'destructive'
> = {
    rendah: 'secondary',
    sedang: 'default',
    tinggi: 'destructive',
};
const STATUS_LABEL: Record<StatusKerusakan, string> = {
    dilaporkan: 'Dilaporkan',
    diproses: 'Diproses',
    menunggu_sparepart: 'Menunggu Sparepart',
    selesai: 'Selesai',
};
const STATUS_VARIANT: Record<
    StatusKerusakan,
    'default' | 'secondary' | 'outline'
> = {
    dilaporkan: 'secondary',
    diproses: 'default',
    menunggu_sparepart: 'secondary',
    selesai: 'outline',
};

export default function KerusakanIndex({
    kerusakan,
    filters,
    barangList,
    vendorList,
}: Props) {
    const [openLapor, setOpenLapor] = useState(false);
    const [editTarget, setEditTarget] = useState<Kerusakan | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Kerusakan | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'all');
    const [prioritas, setPrioritas] = useState(filters.prioritas ?? 'all');
    const isFirstRender = useRef(true);

    const { auth } = usePage<{
        auth: { is_superadmin: boolean; permissions: string[] };
    }>().props;
    const canUpdate =
        auth.is_superadmin ||
        auth.permissions.some((p) => p.startsWith('sarpras.kerusakan.update'));
    const canDelete =
        auth.is_superadmin ||
        auth.permissions.some((p) => p.startsWith('sarpras.kerusakan.delete'));

    const laporForm = useForm({
        barang_id: '',
        deskripsi: '',
        prioritas: 'sedang' as Prioritas,
        foto: null as File | null,
    });
    const editForm = useForm({
        status: 'dilaporkan' as StatusKerusakan,
        prioritas: 'sedang' as Prioritas,
        catatan_progres: '',
        tgl_selesai: '',
        vendor_id: '',
        foto: null as File | null,
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/sarpras/kerusakan',
                {
                    search: search || undefined,
                    status: status === 'all' ? undefined : status,
                    prioritas: prioritas === 'all' ? undefined : prioritas,
                },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search, status, prioritas]);

    function openEdit(item: Kerusakan) {
        editForm.setData({
            status: item.status,
            prioritas: item.prioritas,
            catatan_progres: item.catatan_progres ?? '',
            tgl_selesai: item.tgl_selesai ?? '',
            vendor_id: item.vendor_id?.toString() ?? '',
            foto: null,
        });
        setEditTarget(item);
    }

    function submitLapor(e: React.FormEvent) {
        e.preventDefault();
        laporForm.post('/sarpras/kerusakan', {
            preserveScroll: true,
            onSuccess: () => setOpenLapor(false),
        });
    }

    function submitEdit(e: React.FormEvent) {
        e.preventDefault();

        if (!editTarget) {
            return;
        }

        editForm.patch(`/sarpras/kerusakan/${editTarget.id}`, {
            preserveScroll: true,
            onSuccess: () => setEditTarget(null),
        });
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/sarpras/kerusakan/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Laporan Kerusakan" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                        Laporan Kerusakan
                    </h1>
                    <Button
                        onClick={() => {
                            laporForm.reset();
                            setOpenLapor(true);
                        }}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Laporkan
                    </Button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Cari kode / nama barang…"
                        className="w-64"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            {Object.entries(STATUS_LABEL).map(([k, v]) => (
                                <SelectItem key={k} value={k}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={prioritas} onValueChange={setPrioritas}>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Prioritas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua</SelectItem>
                            {Object.entries(PRIORITAS_LABEL).map(([k, v]) => (
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
                                <TableHead>Barang</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead>Prioritas</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Pelapor</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kerusakan.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Tidak ada laporan kerusakan.
                                    </TableCell>
                                </TableRow>
                            )}
                            {kerusakan.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {item.barang?.nama ?? '—'}
                                        </div>
                                        <code className="text-xs text-muted-foreground">
                                            {item.barang?.kode}
                                        </code>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate text-sm">
                                        {item.deskripsi}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                PRIORITAS_VARIANT[
                                                    item.prioritas
                                                ]
                                            }
                                        >
                                            {PRIORITAS_LABEL[item.prioritas]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                STATUS_VARIANT[item.status]
                                            }
                                        >
                                            {STATUS_LABEL[item.status]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {item.pelapor?.name ?? '—'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {canUpdate && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        openEdit(item)
                                                    }
                                                    title="Update Status"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {canDelete && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        setDeleteTarget(item)
                                                    }
                                                    title="Hapus"
                                                >
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

                {kerusakan.last_page > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {kerusakan.current_page} dari{' '}
                        {kerusakan.last_page} · {kerusakan.total} total
                    </p>
                )}
            </div>

            {/* Dialog Lapor */}
            <Dialog open={openLapor} onOpenChange={setOpenLapor}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Laporkan Kerusakan</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={submitLapor}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-2">
                            <Label>Barang</Label>
                            <Select
                                value={laporForm.data.barang_id || 'none'}
                                onValueChange={(v) =>
                                    laporForm.setData(
                                        'barang_id',
                                        v === 'none' ? '' : v,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih barang..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">
                                        Pilih barang...
                                    </SelectItem>
                                    {barangList.map((b) => (
                                        <SelectItem
                                            key={b.id}
                                            value={b.id.toString()}
                                        >
                                            {b.nama} ({b.kode})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {laporForm.errors.barang_id && (
                                <p className="text-sm text-destructive">
                                    {laporForm.errors.barang_id}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Prioritas</Label>
                            <Select
                                value={laporForm.data.prioritas}
                                onValueChange={(v) =>
                                    laporForm.setData(
                                        'prioritas',
                                        v as Prioritas,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(PRIORITAS_LABEL).map(
                                        ([k, v]) => (
                                            <SelectItem key={k} value={k}>
                                                {v}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Deskripsi Kerusakan</Label>
                            <Textarea
                                rows={3}
                                value={laporForm.data.deskripsi}
                                onChange={(e) =>
                                    laporForm.setData(
                                        'deskripsi',
                                        e.target.value,
                                    )
                                }
                                placeholder="Jelaskan kerusakan..."
                            />
                            {laporForm.errors.deskripsi && (
                                <p className="text-sm text-destructive">
                                    {laporForm.errors.deskripsi}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Foto Kerusakan (opsional, maks 10MB)</Label>
                            <Input
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp,.pdf"
                                onChange={(e) =>
                                    laporForm.setData(
                                        'foto',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpenLapor(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={laporForm.processing}
                            >
                                Kirim
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Dialog Edit Status */}
            <Dialog
                open={!!editTarget}
                onOpenChange={(v) => !v && setEditTarget(null)}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Update Status Kerusakan</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Status</Label>
                                <Select
                                    value={editForm.data.status}
                                    onValueChange={(v) =>
                                        editForm.setData(
                                            'status',
                                            v as StatusKerusakan,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(STATUS_LABEL).map(
                                            ([k, v]) => (
                                                <SelectItem key={k} value={k}>
                                                    {v}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Prioritas</Label>
                                <Select
                                    value={editForm.data.prioritas}
                                    onValueChange={(v) =>
                                        editForm.setData(
                                            'prioritas',
                                            v as Prioritas,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(PRIORITAS_LABEL).map(
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
                            <Label>Vendor (opsional)</Label>
                            <Select
                                value={editForm.data.vendor_id || 'none'}
                                onValueChange={(v) =>
                                    editForm.setData(
                                        'vendor_id',
                                        v === 'none' ? '' : v,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih vendor..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">
                                        Tidak ada
                                    </SelectItem>
                                    {vendorList.map((v) => (
                                        <SelectItem
                                            key={v.id}
                                            value={v.id.toString()}
                                        >
                                            {v.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Tanggal Selesai</Label>
                            <Input
                                type="date"
                                value={editForm.data.tgl_selesai}
                                onChange={(e) =>
                                    editForm.setData(
                                        'tgl_selesai',
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Catatan Progres</Label>
                            <Textarea
                                rows={3}
                                value={editForm.data.catatan_progres}
                                onChange={(e) =>
                                    editForm.setData(
                                        'catatan_progres',
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Foto Update (opsional)</Label>
                            <Input
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp,.pdf"
                                onChange={(e) =>
                                    editForm.setData(
                                        'foto',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditTarget(null)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={editForm.processing}
                            >
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
                        <AlertDialogTitle>Hapus laporan?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Laporan kerusakan untuk{' '}
                            <strong>{deleteTarget?.barang?.nama}</strong> akan
                            dihapus.
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

KerusakanIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Laporan Kerusakan', href: '/sarpras/kerusakan' },
    ],
};
