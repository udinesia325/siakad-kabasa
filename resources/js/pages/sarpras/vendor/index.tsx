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
import { Textarea } from '@/components/ui/textarea';

type Spesialisasi = 'pengadaan' | 'servis' | 'keduanya';
type Vendor = {
    id: number;
    nama: string;
    pic_nama: string | null;
    pic_kontak: string | null;
    alamat: string | null;
    spesialisasi: Spesialisasi;
};
type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};
type Props = {
    vendor: Paginated<Vendor>;
    filters: { search?: string };
};

const SPESIALISASI_LABEL: Record<Spesialisasi, string> = {
    pengadaan: 'Pengadaan',
    servis: 'Servis',
    keduanya: 'Pengadaan & Servis',
};

export default function VendorIndex({ vendor, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Vendor | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Vendor | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);

    const form = useForm({
        nama: '',
        pic_nama: '',
        pic_kontak: '',
        alamat: '',
        spesialisasi: 'keduanya' as Spesialisasi,
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/sarpras/vendor',
                { search: search || undefined },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function openCreate() {
        form.reset();
        setEditing(null);
        setOpen(true);
    }

    function openEdit(item: Vendor) {
        form.setData({
            nama: item.nama,
            pic_nama: item.pic_nama ?? '',
            pic_kontak: item.pic_kontak ?? '',
            alamat: item.alamat ?? '',
            spesialisasi: item.spesialisasi,
        });
        setEditing(item);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/sarpras/vendor/${editing.id}`, {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/sarpras/vendor', {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        }
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/sarpras/vendor/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Vendor / Supplier" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                        Vendor / Supplier
                    </h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>
                <Input
                    placeholder="Cari nama vendor / PIC…"
                    className="w-72"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>PIC</TableHead>
                                <TableHead className="w-40">Kontak</TableHead>
                                <TableHead>Spesialisasi</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendor.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Tidak ada vendor.
                                    </TableCell>
                                </TableRow>
                            )}
                            {vendor.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {item.nama}
                                        </div>
                                        {item.alamat && (
                                            <div className="max-w-xs truncate text-xs text-muted-foreground">
                                                {item.alamat}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.pic_nama ?? (
                                            <span className="text-xs text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.pic_kontak ?? (
                                            <span className="text-xs text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {
                                                SPESIALISASI_LABEL[
                                                    item.spesialisasi
                                                ]
                                            }
                                        </Badge>
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
                                                onClick={() =>
                                                    setDeleteTarget(item)
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
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Vendor' : 'Tambah Vendor'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Nama Vendor</Label>
                            <Input
                                value={form.data.nama}
                                onChange={(e) =>
                                    form.setData('nama', e.target.value)
                                }
                                placeholder="PT. Maju Bersama"
                            />
                            {form.errors.nama && (
                                <p className="text-sm text-destructive">
                                    {form.errors.nama}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Spesialisasi</Label>
                            <Select
                                value={form.data.spesialisasi}
                                onValueChange={(v) =>
                                    form.setData(
                                        'spesialisasi',
                                        v as Spesialisasi,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(SPESIALISASI_LABEL).map(
                                        ([k, v]) => (
                                            <SelectItem key={k} value={k}>
                                                {v}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Nama PIC (opsional)</Label>
                                <Input
                                    value={form.data.pic_nama}
                                    onChange={(e) =>
                                        form.setData('pic_nama', e.target.value)
                                    }
                                    placeholder="Budi Santoso"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Kontak PIC (opsional)</Label>
                                <Input
                                    value={form.data.pic_kontak}
                                    onChange={(e) =>
                                        form.setData(
                                            'pic_kontak',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="08123456789"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Alamat (opsional)</Label>
                            <Textarea
                                rows={3}
                                value={form.data.alamat}
                                onChange={(e) =>
                                    form.setData('alamat', e.target.value)
                                }
                                placeholder="Jl. Contoh No. 1..."
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
                        <AlertDialogTitle>Hapus vendor?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>{deleteTarget?.nama}</strong> akan dihapus
                            permanen.
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

VendorIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Vendor / Supplier', href: '/sarpras/vendor' },
    ],
};
