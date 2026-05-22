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

type Interval = 'mingguan' | 'bulanan' | 'tahunan';
type StatusMaintenance = 'dijadwalkan' | 'selesai';

type Maintenance = {
    id: number;
    barang_id: number;
    vendor_id: number | null;
    tgl_rencana: string;
    tgl_selesai: string | null;
    interval: Interval;
    biaya: number | null;
    catatan: string | null;
    status: StatusMaintenance;
    barang: { id: number; nama: string; kode: string } | null;
    vendor: { id: number; nama: string } | null;
};

type Props = {
    maintenances: {
        data: Maintenance[];
        links: any[];
        meta: any;
        current_page: number;
        last_page: number;
        total: number;
    };
    barangs: { id: number; nama: string }[];
    vendors: { id: number; nama: string }[];
    filters: { search?: string; status?: string };
};

const INTERVAL_LABEL: Record<Interval, string> = {
    mingguan: 'Mingguan',
    bulanan: 'Bulanan',
    tahunan: 'Tahunan',
};

const STATUS_LABEL: Record<StatusMaintenance, string> = {
    dijadwalkan: 'Dijadwalkan',
    selesai: 'Selesai',
};

const STATUS_VARIANT: Record<StatusMaintenance, 'default' | 'secondary'> = {
    dijadwalkan: 'secondary',
    selesai: 'default',
};

function formatIDR(value: number | null): string {
    if (value === null || value === undefined) {
        return '—';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);
}

function formatDate(value: string | null): string {
    if (!value) {
        return '—';
    }

    return new Date(value).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

const defaultFormData = {
    barang_id: '',
    vendor_id: '',
    tgl_rencana: '',
    tgl_selesai: '',
    interval: 'bulanan' as Interval,
    biaya: '',
    catatan: '',
    status: 'dijadwalkan' as StatusMaintenance,
};

export default function MaintenanceIndex({
    maintenances,
    barangs,
    vendors,
    filters,
}: Props) {
    const [openCreate, setOpenCreate] = useState(false);
    const [editTarget, setEditTarget] = useState<Maintenance | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Maintenance | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'all');
    const isFirstRender = useRef(true);

    const { auth } = usePage<{
        auth: { is_superadmin: boolean; permissions: string[] };
    }>().props;
    const canCreate =
        auth.is_superadmin ||
        auth.permissions.some((p) => p === 'sarpras.maintenance.create');
    const canUpdate =
        auth.is_superadmin ||
        auth.permissions.some((p) => p === 'sarpras.maintenance.update');
    const canDelete =
        auth.is_superadmin ||
        auth.permissions.some((p) => p === 'sarpras.maintenance.delete');

    const createForm = useForm(defaultFormData);
    const editForm = useForm(defaultFormData);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/sarpras/maintenance',
                {
                    search: search || undefined,
                    status: status === 'all' ? undefined : status,
                },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search, status]);

    function openEdit(item: Maintenance) {
        editForm.setData({
            barang_id: item.barang_id.toString(),
            vendor_id: item.vendor_id?.toString() ?? '',
            tgl_rencana: item.tgl_rencana
                ? item.tgl_rencana.substring(0, 10)
                : '',
            tgl_selesai: item.tgl_selesai
                ? item.tgl_selesai.substring(0, 10)
                : '',
            interval: item.interval,
            biaya: item.biaya?.toString() ?? '',
            catatan: item.catatan ?? '',
            status: item.status,
        });
        setEditTarget(item);
    }

    function submitCreate(e: React.FormEvent) {
        e.preventDefault();
        createForm.post('/sarpras/maintenance', {
            preserveScroll: true,
            onSuccess: () => {
                setOpenCreate(false);
                createForm.reset();
            },
        });
    }

    function submitEdit(e: React.FormEvent) {
        e.preventDefault();

        if (!editTarget) {
            return;
        }

        editForm.put(`/sarpras/maintenance/${editTarget.id}`, {
            preserveScroll: true,
            onSuccess: () => setEditTarget(null),
        });
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/sarpras/maintenance/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    const data = maintenances.data ?? [];
    const currentPage =
        (maintenances as any).current_page ??
        maintenances.meta?.current_page ??
        1;
    const lastPage =
        (maintenances as any).last_page ?? maintenances.meta?.last_page ?? 1;
    const total = (maintenances as any).total ?? maintenances.meta?.total ?? 0;

    return (
        <>
            <Head title="Jadwal Maintenance" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                        Jadwal Maintenance
                    </h1>
                    {canCreate && (
                        <Button
                            onClick={() => {
                                createForm.reset();
                                setOpenCreate(true);
                            }}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Tambah
                        </Button>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Cari nama barang…"
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
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Barang</TableHead>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Tgl Rencana</TableHead>
                                <TableHead>Tgl Selesai</TableHead>
                                <TableHead>Interval</TableHead>
                                <TableHead>Biaya</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Tidak ada jadwal maintenance.
                                    </TableCell>
                                </TableRow>
                            )}
                            {data.map((item) => (
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
                                        {item.vendor?.nama ?? '—'}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {formatDate(item.tgl_rencana)}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {formatDate(item.tgl_selesai)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {INTERVAL_LABEL[item.interval]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {formatIDR(item.biaya)}
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
                                            {canUpdate && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        openEdit(item)
                                                    }
                                                    title="Edit"
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

                {lastPage > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {currentPage} dari {lastPage} · {total} total
                    </p>
                )}
            </div>

            {/* Dialog Tambah */}
            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Tambah Jadwal Maintenance</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={submitCreate}
                        className="flex flex-col gap-4"
                    >
                        <MaintenanceFormFields
                            form={createForm}
                            barangs={barangs}
                            vendors={vendors}
                        />
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpenCreate(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={createForm.processing}
                            >
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Dialog Edit */}
            <Dialog
                open={!!editTarget}
                onOpenChange={(v) => !v && setEditTarget(null)}
            >
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Jadwal Maintenance</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="flex flex-col gap-4">
                        <MaintenanceFormFields
                            form={editForm}
                            barangs={barangs}
                            vendors={vendors}
                        />
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
                        <AlertDialogTitle>
                            Hapus jadwal maintenance?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Jadwal maintenance untuk{' '}
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

type FormData = {
    barang_id: string;
    vendor_id: string;
    tgl_rencana: string;
    tgl_selesai: string;
    interval: Interval;
    biaya: string;
    catatan: string;
    status: StatusMaintenance;
};

function MaintenanceFormFields({
    form,
    barangs,
    vendors,
}: {
    form: ReturnType<typeof useForm<FormData>>;
    barangs: { id: number; nama: string }[];
    vendors: { id: number; nama: string }[];
}) {
    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 flex flex-col gap-2">
                    <Label>
                        Barang <span className="text-destructive">*</span>
                    </Label>
                    <Select
                        value={form.data.barang_id || 'none'}
                        onValueChange={(v) =>
                            form.setData('barang_id', v === 'none' ? '' : v)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih barang..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">
                                Pilih barang...
                            </SelectItem>
                            {barangs.map((b) => (
                                <SelectItem key={b.id} value={b.id.toString()}>
                                    {b.nama}
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

                <div className="col-span-2 flex flex-col gap-2">
                    <Label>Vendor (opsional)</Label>
                    <Select
                        value={form.data.vendor_id || 'none'}
                        onValueChange={(v) =>
                            form.setData('vendor_id', v === 'none' ? '' : v)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih vendor..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Tidak ada</SelectItem>
                            {vendors.map((v) => (
                                <SelectItem key={v.id} value={v.id.toString()}>
                                    {v.nama}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>
                        Tgl Rencana <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        type="date"
                        value={form.data.tgl_rencana}
                        onChange={(e) =>
                            form.setData('tgl_rencana', e.target.value)
                        }
                    />
                    {form.errors.tgl_rencana && (
                        <p className="text-sm text-destructive">
                            {form.errors.tgl_rencana}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Tgl Selesai (opsional)</Label>
                    <Input
                        type="date"
                        value={form.data.tgl_selesai}
                        onChange={(e) =>
                            form.setData('tgl_selesai', e.target.value)
                        }
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>
                        Interval <span className="text-destructive">*</span>
                    </Label>
                    <Select
                        value={form.data.interval}
                        onValueChange={(v) =>
                            form.setData('interval', v as Interval)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(INTERVAL_LABEL).map(([k, v]) => (
                                <SelectItem key={k} value={k}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {form.errors.interval && (
                        <p className="text-sm text-destructive">
                            {form.errors.interval}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label>
                        Status <span className="text-destructive">*</span>
                    </Label>
                    <Select
                        value={form.data.status}
                        onValueChange={(v) =>
                            form.setData('status', v as StatusMaintenance)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(STATUS_LABEL).map(([k, v]) => (
                                <SelectItem key={k} value={k}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {form.errors.status && (
                        <p className="text-sm text-destructive">
                            {form.errors.status}
                        </p>
                    )}
                </div>

                <div className="col-span-2 flex flex-col gap-2">
                    <Label>Biaya (opsional)</Label>
                    <Input
                        type="number"
                        min="0"
                        value={form.data.biaya}
                        onChange={(e) => form.setData('biaya', e.target.value)}
                        placeholder="0"
                    />
                    {form.errors.biaya && (
                        <p className="text-sm text-destructive">
                            {form.errors.biaya}
                        </p>
                    )}
                </div>

                <div className="col-span-2 flex flex-col gap-2">
                    <Label>Catatan (opsional)</Label>
                    <Textarea
                        rows={3}
                        value={form.data.catatan}
                        onChange={(e) =>
                            form.setData('catatan', e.target.value)
                        }
                        placeholder="Catatan maintenance..."
                    />
                    {form.errors.catatan && (
                        <p className="text-sm text-destructive">
                            {form.errors.catatan}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

MaintenanceIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Jadwal Maintenance', href: '/sarpras/maintenance' },
    ],
};
