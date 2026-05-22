import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    CheckCircle,
    PlusCircle,
    RotateCcw,
    Trash2,
    XCircle,
} from 'lucide-react';
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

type Status = 'menunggu' | 'disetujui' | 'ditolak' | 'dikembalikan';
type BarangOpt = { id: number; kode: string; nama: string; satuan: string };
type Peminjaman = {
    id: number;
    barang_id: number;
    peminjam_id: number;
    tgl_pinjam: string;
    tgl_kembali_rencana: string;
    tgl_kembali_aktual: string | null;
    keperluan: string;
    catatan: string | null;
    status: Status;
    approved_by: number | null;
    barang: { id: number; kode: string; nama: string } | null;
    peminjam: { id: number; name: string } | null;
    approvedBy: { id: number; name: string } | null;
};
type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};
type Props = {
    peminjaman: Paginated<Peminjaman>;
    filters: { search?: string; status?: string };
    barangList: BarangOpt[];
    authId: number;
};

const STATUS_LABEL: Record<Status, string> = {
    menunggu: 'Menunggu',
    disetujui: 'Disetujui',
    ditolak: 'Ditolak',
    dikembalikan: 'Dikembalikan',
};
const STATUS_VARIANT: Record<
    Status,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    menunggu: 'secondary',
    disetujui: 'default',
    ditolak: 'destructive',
    dikembalikan: 'outline',
};

export default function PeminjamanIndex({
    peminjaman,
    filters,
    barangList,
    authId,
}: Props) {
    const [open, setOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Peminjaman | null>(null);
    const [actionTarget, setActionTarget] = useState<{
        item: Peminjaman;
        action: 'approve' | 'reject' | 'kembalikan';
    } | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'all');
    const isFirstRender = useRef(true);

    const { auth } = usePage<{
        auth: { is_superadmin: boolean; permissions: string[] };
    }>().props;
    const canApprove =
        auth.is_superadmin ||
        auth.permissions.some((p) =>
            p.startsWith('sarpras.peminjaman.approve'),
        );

    const form = useForm({
        barang_id: '',
        tgl_pinjam: '',
        tgl_kembali_rencana: '',
        keperluan: '',
        catatan: '',
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/sarpras/peminjaman',
                {
                    search: search || undefined,
                    status: status === 'all' ? undefined : status,
                },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search, status]);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post('/sarpras/peminjaman', {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    }

    function confirmAction() {
        if (!actionTarget) {
            return;
        }

        const { item, action } = actionTarget;
        router.post(
            `/sarpras/peminjaman/${item.id}/${action}`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setActionTarget(null),
            },
        );
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/sarpras/peminjaman/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Peminjaman Barang" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                        Peminjaman Barang
                    </h1>
                    <Button
                        onClick={() => {
                            form.reset();
                            setOpen(true);
                        }}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Request Pinjam
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
                        <SelectTrigger className="w-40">
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
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Barang</TableHead>
                                <TableHead>Peminjam</TableHead>
                                <TableHead>Tgl Pinjam</TableHead>
                                <TableHead>Tgl Kembali</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-32"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {peminjaman.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Tidak ada peminjaman.
                                    </TableCell>
                                </TableRow>
                            )}
                            {peminjaman.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {item.barang?.nama ?? '—'}
                                        </div>
                                        <code className="text-xs text-muted-foreground">
                                            {item.barang?.kode}
                                        </code>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {item.peminjam?.name ?? '—'}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {item.tgl_pinjam}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        <div>{item.tgl_kembali_rencana}</div>
                                        {item.tgl_kembali_aktual && (
                                            <div className="text-xs text-muted-foreground">
                                                Aktual:{' '}
                                                {item.tgl_kembali_aktual}
                                            </div>
                                        )}
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
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {canApprove &&
                                                item.status === 'menunggu' && (
                                                    <>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            title="Setujui"
                                                            onClick={() =>
                                                                setActionTarget(
                                                                    {
                                                                        item,
                                                                        action: 'approve',
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            title="Tolak"
                                                            onClick={() =>
                                                                setActionTarget(
                                                                    {
                                                                        item,
                                                                        action: 'reject',
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            <XCircle className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </>
                                                )}
                                            {canApprove &&
                                                item.status === 'disetujui' && (
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        title="Catat Kembali"
                                                        onClick={() =>
                                                            setActionTarget({
                                                                item,
                                                                action: 'kembalikan',
                                                            })
                                                        }
                                                    >
                                                        <RotateCcw className="h-4 w-4 text-blue-600" />
                                                    </Button>
                                                )}
                                            {item.peminjam_id === authId &&
                                                item.status === 'menunggu' && (
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            setDeleteTarget(
                                                                item,
                                                            )
                                                        }
                                                        title="Batalkan"
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

                {peminjaman.last_page > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {peminjaman.current_page} dari{' '}
                        {peminjaman.last_page} · {peminjaman.total} total
                    </p>
                )}
            </div>

            {/* Form Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Request Pinjam Barang</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Barang</Label>
                            <Select
                                value={form.data.barang_id || 'none'}
                                onValueChange={(v) =>
                                    form.setData(
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
                            {form.errors.barang_id && (
                                <p className="text-sm text-destructive">
                                    {form.errors.barang_id}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Tanggal Pinjam</Label>
                                <Input
                                    type="date"
                                    value={form.data.tgl_pinjam}
                                    onChange={(e) =>
                                        form.setData(
                                            'tgl_pinjam',
                                            e.target.value,
                                        )
                                    }
                                />
                                {form.errors.tgl_pinjam && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.tgl_pinjam}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Rencana Kembali</Label>
                                <Input
                                    type="date"
                                    value={form.data.tgl_kembali_rencana}
                                    onChange={(e) =>
                                        form.setData(
                                            'tgl_kembali_rencana',
                                            e.target.value,
                                        )
                                    }
                                />
                                {form.errors.tgl_kembali_rencana && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.tgl_kembali_rencana}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Keperluan</Label>
                            <Textarea
                                rows={3}
                                value={form.data.keperluan}
                                onChange={(e) =>
                                    form.setData('keperluan', e.target.value)
                                }
                                placeholder="Untuk kegiatan..."
                            />
                            {form.errors.keperluan && (
                                <p className="text-sm text-destructive">
                                    {form.errors.keperluan}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Catatan (opsional)</Label>
                            <Textarea
                                rows={2}
                                value={form.data.catatan}
                                onChange={(e) =>
                                    form.setData('catatan', e.target.value)
                                }
                            />
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
                                Kirim
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Konfirmasi Aksi */}
            <AlertDialog
                open={!!actionTarget}
                onOpenChange={(v) => !v && setActionTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {actionTarget?.action === 'approve'
                                ? 'Setujui peminjaman?'
                                : actionTarget?.action === 'reject'
                                  ? 'Tolak peminjaman?'
                                  : 'Catat pengembalian?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Barang:{' '}
                            <strong>{actionTarget?.item.barang?.nama}</strong>{' '}
                            oleh {actionTarget?.item.peminjam?.name}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmAction}>
                            Konfirmasi
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Konfirmasi Hapus */}
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(v) => !v && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Batalkan peminjaman?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Permohonan akan dihapus permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Kembali</AlertDialogCancel>
                        <AlertDialogAction onClick={hapus}>
                            Batalkan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

PeminjamanIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Peminjaman', href: '/sarpras/peminjaman' },
    ],
};
