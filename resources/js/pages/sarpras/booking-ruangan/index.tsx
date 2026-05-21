import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Flag, PlusCircle, Trash2, XCircle } from 'lucide-react';
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type Status = 'menunggu' | 'disetujui' | 'ditolak' | 'selesai';
type LokasiOpt = { id: number; nama: string; kode: string; kapasitas: number | null };
type Booking = {
    id: number;
    lokasi_id: number;
    pemohon_id: number;
    keperluan: string;
    mulai: string;
    selesai: string;
    catatan: string | null;
    status: Status;
    approved_by: number | null;
    lokasi: { id: number; nama: string; kode: string } | null;
    pemohon: { id: number; name: string } | null;
    approvedBy: { id: number; name: string } | null;
};
type Paginated<T> = { data: T[]; current_page: number; last_page: number; total: number };
type Props = {
    booking: Paginated<Booking>;
    filters: { search?: string; status?: string };
    lokasiList: LokasiOpt[];
    authId: number;
};

const STATUS_LABEL: Record<Status, string> = {
    menunggu: 'Menunggu',
    disetujui: 'Disetujui',
    ditolak: 'Ditolak',
    selesai: 'Selesai',
};
const STATUS_VARIANT: Record<Status, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    menunggu: 'secondary',
    disetujui: 'default',
    ditolak: 'destructive',
    selesai: 'outline',
};

export default function BookingRuanganIndex({ booking, filters, lokasiList, authId }: Props) {
    const [open, setOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
    const [actionTarget, setActionTarget] = useState<{ item: Booking; action: 'approve' | 'reject' | 'selesai' } | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'all');
    const isFirstRender = useRef(true);

    const { auth } = usePage<{ auth: { is_superadmin: boolean; permissions: string[] } }>().props;
    const canApprove = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('sarpras.booking-ruangan.approve'));

    const form = useForm({
        lokasi_id: '',
        keperluan: '',
        mulai: '',
        selesai: '',
        catatan: '',
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/sarpras/booking-ruangan',
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
        form.post('/sarpras/booking-ruangan', {
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
            `/sarpras/booking-ruangan/${item.id}/${action}`,
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

        router.delete(`/sarpras/booking-ruangan/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    const formatDt = (dt: string) =>
        new Date(dt).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });

    return (
        <>
            <Head title="Booking Ruangan" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Booking Ruangan</h1>
                    <Button
                        onClick={() => {
                            form.reset();
                            setOpen(true);
                        }}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Booking Baru
                    </Button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Cari nama / kode ruangan…"
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
                                <TableHead>Ruangan</TableHead>
                                <TableHead>Pemohon</TableHead>
                                <TableHead>Mulai</TableHead>
                                <TableHead>Selesai</TableHead>
                                <TableHead>Keperluan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-28"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {booking.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                                        Tidak ada booking.
                                    </TableCell>
                                </TableRow>
                            )}
                            {booking.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.lokasi?.nama ?? '—'}</div>
                                        <code className="text-xs text-muted-foreground">{item.lokasi?.kode}</code>
                                    </TableCell>
                                    <TableCell className="text-sm">{item.pemohon?.name ?? '—'}</TableCell>
                                    <TableCell className="text-sm">{formatDt(item.mulai)}</TableCell>
                                    <TableCell className="text-sm">{formatDt(item.selesai)}</TableCell>
                                    <TableCell className="max-w-xs truncate text-sm">{item.keperluan}</TableCell>
                                    <TableCell>
                                        <Badge variant={STATUS_VARIANT[item.status]}>{STATUS_LABEL[item.status]}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {canApprove && item.status === 'menunggu' && (
                                                <>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        title="Setujui"
                                                        onClick={() => setActionTarget({ item, action: 'approve' })}
                                                    >
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        title="Tolak"
                                                        onClick={() => setActionTarget({ item, action: 'reject' })}
                                                    >
                                                        <XCircle className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </>
                                            )}
                                            {canApprove && item.status === 'disetujui' && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    title="Selesai"
                                                    onClick={() => setActionTarget({ item, action: 'selesai' })}
                                                >
                                                    <Flag className="h-4 w-4 text-blue-600" />
                                                </Button>
                                            )}
                                            {item.pemohon_id === authId && item.status === 'menunggu' && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setDeleteTarget(item)}
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

                {booking.last_page > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {booking.current_page} dari {booking.last_page} · {booking.total} total
                    </p>
                )}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Booking Ruangan Baru</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Ruangan</Label>
                            <Select
                                value={form.data.lokasi_id || 'none'}
                                onValueChange={(v) => form.setData('lokasi_id', v === 'none' ? '' : v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih ruangan..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Pilih ruangan...</SelectItem>
                                    {lokasiList.map((l) => (
                                        <SelectItem key={l.id} value={l.id.toString()}>
                                            {l.nama} ({l.kode})
                                            {l.kapasitas ? ` · ${l.kapasitas} orang` : ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.lokasi_id && <p className="text-sm text-destructive">{form.errors.lokasi_id}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Mulai</Label>
                                <Input
                                    type="datetime-local"
                                    value={form.data.mulai}
                                    onChange={(e) => form.setData('mulai', e.target.value)}
                                />
                                {form.errors.mulai && <p className="text-sm text-destructive">{form.errors.mulai}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Selesai</Label>
                                <Input
                                    type="datetime-local"
                                    value={form.data.selesai}
                                    onChange={(e) => form.setData('selesai', e.target.value)}
                                />
                                {form.errors.selesai && <p className="text-sm text-destructive">{form.errors.selesai}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Keperluan</Label>
                            <Textarea
                                rows={3}
                                value={form.data.keperluan}
                                onChange={(e) => form.setData('keperluan', e.target.value)}
                                placeholder="Rapat koordinasi..."
                            />
                            {form.errors.keperluan && <p className="text-sm text-destructive">{form.errors.keperluan}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Catatan (opsional)</Label>
                            <Textarea
                                rows={2}
                                value={form.data.catatan}
                                onChange={(e) => form.setData('catatan', e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                Kirim
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!actionTarget} onOpenChange={(v) => !v && setActionTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {actionTarget?.action === 'approve'
                                ? 'Setujui booking?'
                                : actionTarget?.action === 'reject'
                                  ? 'Tolak booking?'
                                  : 'Tandai selesai?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Ruangan: <strong>{actionTarget?.item.lokasi?.nama}</strong> oleh{' '}
                            {actionTarget?.item.pemohon?.name}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmAction}>Konfirmasi</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Batalkan booking?</AlertDialogTitle>
                        <AlertDialogDescription>Permohonan akan dihapus permanen.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Kembali</AlertDialogCancel>
                        <AlertDialogAction onClick={hapus}>Batalkan</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

BookingRuanganIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Booking Ruangan', href: '/sarpras/booking-ruangan' },
    ],
};
