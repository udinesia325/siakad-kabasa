import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, QrCode, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import QrBarangModal from '@/components/sarpras/qr-barang-modal';
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

type Kondisi = 'baik' | 'rusak_ringan' | 'rusak_berat' | 'hilang';
type KategoriOpt = { id: number; nama: string; warna: string | null };
type LokasiOpt = { id: number; nama: string; kode: string };
type VendorOpt = { id: number; nama: string };
type UserOpt = { id: number; name: string };
type Barang = {
    id: number;
    kode: string;
    nama: string;
    kondisi: Kondisi;
    satuan: string;
    jumlah_unit: number;
    tahun_beli: number | null;
    harga_beli: number | null;
    foto_path: string | null;
    garansi_sampai: string | null;
    sumber_dana: string | null;
    kategori_id: number | null;
    lokasi_id: number | null;
    vendor_id: number | null;
    penanggung_jawab_id: number | null;
    kategori: KategoriOpt | null;
    lokasi: LokasiOpt | null;
    penanggungjawab: UserOpt | null;
};
type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};
type Props = {
    barang: Paginated<Barang>;
    filters: { search?: string; kondisi?: string; kategori_id?: string };
    kategoriList: KategoriOpt[];
    lokasiList: LokasiOpt[];
    vendorList: VendorOpt[];
    userList: UserOpt[];
};

const KONDISI_LABEL: Record<Kondisi, string> = {
    baik: 'Baik',
    rusak_ringan: 'Rusak Ringan',
    rusak_berat: 'Rusak Berat',
    hilang: 'Hilang',
};
const KONDISI_VARIANT: Record<
    Kondisi,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    baik: 'default',
    rusak_ringan: 'secondary',
    rusak_berat: 'destructive',
    hilang: 'outline',
};

export default function BarangIndex({
    barang,
    filters,
    kategoriList,
    lokasiList,
    vendorList,
    userList,
}: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Barang | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Barang | null>(null);
    const [qrTarget, setQrTarget] = useState<Barang | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [kondisi, setKondisi] = useState(filters.kondisi ?? 'all');
    const [kategoriFilter, setKategoriFilter] = useState(
        filters.kategori_id ?? 'all',
    );
    const isFirstRender = useRef(true);

    const form = useForm<{
        nama: string;
        kondisi: Kondisi;
        satuan: string;
        jumlah_unit: string;
        tahun_beli: string;
        harga_beli: string;
        garansi_sampai: string;
        sumber_dana: string;
        kategori_id: string;
        lokasi_id: string;
        vendor_id: string;
        penanggung_jawab_id: string;
        foto: File | null;
    }>({
        nama: '',
        kondisi: 'baik',
        satuan: 'unit',
        jumlah_unit: '1',
        tahun_beli: '',
        harga_beli: '',
        garansi_sampai: '',
        sumber_dana: '',
        kategori_id: '',
        lokasi_id: '',
        vendor_id: '',
        penanggung_jawab_id: '',
        foto: null,
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/sarpras/barang',
                {
                    search: search || undefined,
                    kondisi: kondisi === 'all' ? undefined : kondisi,
                    kategori_id:
                        kategoriFilter === 'all' ? undefined : kategoriFilter,
                },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search, kondisi, kategoriFilter]);

    function openCreate() {
        form.reset();
        setEditing(null);
        setOpen(true);
    }

    function openEdit(item: Barang) {
        form.setData({
            nama: item.nama,
            kondisi: item.kondisi,
            satuan: item.satuan,
            jumlah_unit: item.jumlah_unit.toString(),
            tahun_beli: item.tahun_beli?.toString() ?? '',
            harga_beli: item.harga_beli?.toString() ?? '',
            garansi_sampai: item.garansi_sampai ?? '',
            sumber_dana: item.sumber_dana ?? '',
            kategori_id: item.kategori_id?.toString() ?? '',
            lokasi_id: item.lokasi_id?.toString() ?? '',
            vendor_id: item.vendor_id?.toString() ?? '',
            penanggung_jawab_id: item.penanggung_jawab_id?.toString() ?? '',
            foto: null,
        });
        setEditing(item);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        };

        if (editing) {
            form.patch(`/sarpras/barang/${editing.id}`, options);
        } else {
            form.post('/sarpras/barang', options);
        }
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/sarpras/barang/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Data Barang" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Data Barang</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Cari kode / nama…"
                        className="w-64"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select value={kondisi} onValueChange={setKondisi}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Kondisi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kondisi</SelectItem>
                            {Object.entries(KONDISI_LABEL).map(([k, v]) => (
                                <SelectItem key={k} value={k}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={kategoriFilter}
                        onValueChange={setKategoriFilter}
                    >
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kategori</SelectItem>
                            {kategoriList.map((k) => (
                                <SelectItem key={k.id} value={k.id.toString()}>
                                    {k.nama}
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
                                <TableHead>Kategori</TableHead>
                                <TableHead>Lokasi</TableHead>
                                <TableHead>Kondisi</TableHead>
                                <TableHead className="w-20">Jumlah</TableHead>
                                <TableHead className="w-28"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {barang.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Tidak ada barang.
                                    </TableCell>
                                </TableRow>
                            )}
                            {barang.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                                            {item.kode}
                                        </code>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">
                                            {item.nama}
                                        </div>
                                        {item.sumber_dana && (
                                            <div className="text-xs text-muted-foreground">
                                                {item.sumber_dana}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.kategori ? (
                                            <div className="flex items-center gap-1.5">
                                                {item.kategori.warna && (
                                                    <span
                                                        className="h-3 w-3 rounded-sm"
                                                        style={{
                                                            backgroundColor:
                                                                item.kategori
                                                                    .warna,
                                                        }}
                                                    />
                                                )}
                                                <span className="text-sm">
                                                    {item.kategori.nama}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.lokasi ? (
                                            <div>
                                                <div className="text-sm">
                                                    {item.lokasi.nama}
                                                </div>
                                                <code className="text-xs text-muted-foreground">
                                                    {item.lokasi.kode}
                                                </code>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                KONDISI_VARIANT[item.kondisi]
                                            }
                                        >
                                            {KONDISI_LABEL[item.kondisi]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {item.jumlah_unit} {item.satuan}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    setQrTarget(item)
                                                }
                                                title="QR Code"
                                            >
                                                <QrCode className="h-4 w-4" />
                                            </Button>
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

                {barang.last_page > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {barang.current_page} dari {barang.last_page} ·{' '}
                        {barang.total} total
                    </p>
                )}
            </div>

            {/* QR Modal */}
            {qrTarget && (
                <QrBarangModal
                    open={!!qrTarget}
                    onOpenChange={(v) => !v && setQrTarget(null)}
                    barangNama={qrTarget.nama}
                    barangKode={qrTarget.kode}
                />
            )}

            {/* Form Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex max-h-[85vh] max-w-2xl flex-col">
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Barang' : 'Tambah Barang'}
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={submit}
                        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1"
                    >
                        {/* Nama */}
                        <div className="flex flex-col gap-2">
                            <Label>Nama Barang</Label>
                            <Input
                                value={form.data.nama}
                                onChange={(e) =>
                                    form.setData('nama', e.target.value)
                                }
                                placeholder="Laptop ASUS VivoBook"
                            />
                            {form.errors.nama && (
                                <p className="text-sm text-destructive">
                                    {form.errors.nama}
                                </p>
                            )}
                        </div>

                        {/* Kondisi + Satuan + Jumlah */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Kondisi</Label>
                                <Select
                                    value={form.data.kondisi}
                                    onValueChange={(v) =>
                                        form.setData('kondisi', v as Kondisi)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(KONDISI_LABEL).map(
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
                                <Label>Satuan</Label>
                                <Input
                                    value={form.data.satuan}
                                    onChange={(e) =>
                                        form.setData('satuan', e.target.value)
                                    }
                                    placeholder="unit"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Jumlah</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={form.data.jumlah_unit}
                                    onChange={(e) =>
                                        form.setData(
                                            'jumlah_unit',
                                            e.target.value,
                                        )
                                    }
                                />
                                {form.errors.jumlah_unit && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.jumlah_unit}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Kategori + Lokasi */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Kategori</Label>
                                <Select
                                    value={form.data.kategori_id || 'none'}
                                    onValueChange={(v) =>
                                        form.setData(
                                            'kategori_id',
                                            v === 'none' ? '' : v,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kategori..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            Tidak ada
                                        </SelectItem>
                                        {kategoriList.map((k) => (
                                            <SelectItem
                                                key={k.id}
                                                value={k.id.toString()}
                                            >
                                                {k.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Lokasi</Label>
                                <Select
                                    value={form.data.lokasi_id || 'none'}
                                    onValueChange={(v) =>
                                        form.setData(
                                            'lokasi_id',
                                            v === 'none' ? '' : v,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih lokasi..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            Tidak ada
                                        </SelectItem>
                                        {lokasiList.map((l) => (
                                            <SelectItem
                                                key={l.id}
                                                value={l.id.toString()}
                                            >
                                                {l.nama} ({l.kode})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Tahun Beli + Harga Beli */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Tahun Beli</Label>
                                <Input
                                    type="number"
                                    min="1900"
                                    max="2099"
                                    value={form.data.tahun_beli}
                                    onChange={(e) =>
                                        form.setData(
                                            'tahun_beli',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="2024"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Harga Beli (Rp)</Label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={form.data.harga_beli}
                                    onChange={(e) =>
                                        form.setData(
                                            'harga_beli',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Vendor + Penanggung Jawab */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Vendor</Label>
                                <Select
                                    value={form.data.vendor_id || 'none'}
                                    onValueChange={(v) =>
                                        form.setData(
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
                                <Label>Penanggung Jawab</Label>
                                <Select
                                    value={
                                        form.data.penanggung_jawab_id || 'none'
                                    }
                                    onValueChange={(v) =>
                                        form.setData(
                                            'penanggung_jawab_id',
                                            v === 'none' ? '' : v,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih user..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            Tidak ada
                                        </SelectItem>
                                        {userList.map((u) => (
                                            <SelectItem
                                                key={u.id}
                                                value={u.id.toString()}
                                            >
                                                {u.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Garansi + Sumber Dana */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Garansi Sampai</Label>
                                <Input
                                    type="date"
                                    value={form.data.garansi_sampai}
                                    onChange={(e) =>
                                        form.setData(
                                            'garansi_sampai',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Sumber Dana</Label>
                                <Input
                                    value={form.data.sumber_dana}
                                    onChange={(e) =>
                                        form.setData(
                                            'sumber_dana',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="APBN 2024"
                                />
                            </div>
                        </div>

                        {/* Foto */}
                        <div className="flex flex-col gap-2">
                            <Label>Foto Barang (opsional, maks 10MB)</Label>
                            <Input
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp,.pdf"
                                onChange={(e) =>
                                    form.setData(
                                        'foto',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                            {form.errors.foto && (
                                <p className="text-sm text-destructive">
                                    {form.errors.foto}
                                </p>
                            )}
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

            {/* Hapus Dialog */}
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(v) => !v && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus barang?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>{deleteTarget?.nama}</strong> (
                            {deleteTarget?.kode}) akan dihapus permanen.
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

BarangIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Data Barang', href: '/sarpras/barang' },
    ],
};
