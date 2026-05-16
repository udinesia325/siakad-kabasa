import { Head, router, useForm } from '@inertiajs/react';
import { differenceInDays, format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { CalendarOff, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
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

type HariLibur = {
    id: number;
    tanggal: string;
    keterangan: string;
    dibuat_oleh: number | null;
    dibuat_oleh_nama: string | null;
};

type Props = {
    hariLibur: HariLibur[];
    filters: { tahun?: string };
};

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);

export default function HariLiburIndex({ hariLibur, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<HariLibur | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<HariLibur | null>(null);
    const [tahun, setTahun] = useState(filters.tahun ?? String(currentYear));

    const form = useForm({
        mode: 'tunggal' as 'tunggal' | 'rentang',
        tanggal: '',
        dari: '',
        sampai: '',
        keterangan: '',
    });

    useEffect(() => {
        router.get('/hari-libur', { tahun }, { preserveState: true, preserveScroll: true });
    }, [tahun]);

    function openCreate() {
        form.reset();
        form.setData('mode', 'tunggal');
        setEditing(null);
        setOpen(true);
    }

    function openEdit(hl: HariLibur) {
        form.setData({ mode: 'tunggal', tanggal: hl.tanggal, dari: '', sampai: '', keterangan: hl.keterangan });
        setEditing(hl);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            form.patch(`/hari-libur/${editing.id}`, { onSuccess: () => setOpen(false) });
        } else {
            form.post('/hari-libur', { onSuccess: () => setOpen(false) });
        }
    }

    const jumlahHari =
        form.data.mode === 'rentang' && form.data.dari && form.data.sampai
            ? differenceInDays(parseISO(form.data.sampai), parseISO(form.data.dari)) + 1
            : null;

    function hapus() {
        if (!deleteTarget) return;
        router.delete(`/hari-libur/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    // Group by bulan
    const grouped = hariLibur.reduce<Record<string, HariLibur[]>>((acc, hl) => {
        const bulan = hl.tanggal.slice(0, 7); // "2026-05"
        if (!acc[bulan]) acc[bulan] = [];
        acc[bulan].push(hl);
        return acc;
    }, {});

    return (
        <>
            <Head title="Hari Libur" />
            <div className="flex flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Hari Libur</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                {/* Filter tahun */}
                <div className="flex items-center gap-2">
                    <Label className="text-sm">Tahun:</Label>
                    <Select value={tahun} onValueChange={setTahun}>
                        <SelectTrigger className="w-28">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {yearOptions.map((y) => (
                                <SelectItem key={y} value={String(y)}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">
                        {hariLibur.length} hari libur
                    </span>
                </div>

                {/* List grouped by bulan */}
                {hariLibur.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
                        <CalendarOff className="h-10 w-10 opacity-30" />
                        <p>Belum ada hari libur untuk tahun {tahun}.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {Object.entries(grouped).map(([bulan, items]) => (
                            <div key={bulan}>
                                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    {format(parseISO(bulan + '-01'), 'MMMM yyyy', { locale: localeId })}
                                </h2>
                                <div className="overflow-hidden rounded-lg border">
                                    {items.map((hl, i) => (
                                        <div
                                            key={hl.id}
                                            className={`flex items-center gap-4 px-4 py-3 ${
                                                i !== items.length - 1 ? 'border-b' : ''
                                            } ${i % 2 === 0 ? '' : 'bg-muted/30'}`}
                                        >
                                            {/* Tanggal badge */}
                                            <div className="flex w-16 shrink-0 flex-col items-center rounded-md bg-slate-100 py-1.5 text-center dark:bg-slate-800">
                                                <span className="text-xs font-medium text-muted-foreground uppercase">
                                                    {format(parseISO(hl.tanggal), 'EEE', { locale: localeId })}
                                                </span>
                                                <span className="text-lg font-bold leading-tight">
                                                    {format(parseISO(hl.tanggal), 'd')}
                                                </span>
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-1 flex-col">
                                                <span className="font-medium">{hl.keterangan}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {format(parseISO(hl.tanggal), 'EEEE, d MMMM yyyy', { locale: localeId })}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => openEdit(hl)}
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                    onClick={() => setDeleteTarget(hl)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Form Dialog */}
            <Dialog open={open} onOpenChange={(v) => !v && setOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Hari Libur' : 'Tambah Hari Libur'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            {/* Mode selector — hanya untuk tambah baru */}
                            {!editing && (
                                <div className="flex rounded-md border p-1 gap-1">
                                    <button
                                        type="button"
                                        onClick={() => form.setData('mode', 'tunggal')}
                                        className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                                            form.data.mode === 'tunggal'
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        Tanggal Tunggal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => form.setData('mode', 'rentang')}
                                        className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                                            form.data.mode === 'rentang'
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        Rentang Tanggal
                                    </button>
                                </div>
                            )}

                            {/* Field tanggal: tunggal atau rentang */}
                            {form.data.mode === 'tunggal' ? (
                                <div className="flex flex-col gap-2">
                                    <Label>Tanggal</Label>
                                    <Input
                                        type="date"
                                        value={form.data.tanggal}
                                        onChange={(e) => form.setData('tanggal', e.target.value)}
                                    />
                                    {form.errors.tanggal && (
                                        <p className="text-sm text-destructive">{form.errors.tanggal}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-2">
                                            <Label>Dari</Label>
                                            <Input
                                                type="date"
                                                value={form.data.dari}
                                                onChange={(e) => form.setData('dari', e.target.value)}
                                            />
                                            {form.errors.dari && (
                                                <p className="text-sm text-destructive">{form.errors.dari}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Sampai</Label>
                                            <Input
                                                type="date"
                                                value={form.data.sampai}
                                                min={form.data.dari || undefined}
                                                onChange={(e) => form.setData('sampai', e.target.value)}
                                            />
                                            {form.errors.sampai && (
                                                <p className="text-sm text-destructive">{form.errors.sampai}</p>
                                            )}
                                        </div>
                                    </div>
                                    {jumlahHari !== null && jumlahHari > 0 && (
                                        <p className="text-sm text-muted-foreground">
                                            Akan menambahkan{' '}
                                            <span className="font-medium text-foreground">{jumlahHari} hari</span>{' '}
                                            libur. Tanggal yang sudah ada akan dilewati.
                                        </p>
                                    )}
                                    {jumlahHari !== null && jumlahHari <= 0 && (
                                        <p className="text-sm text-destructive">Tanggal sampai harus setelah tanggal dari.</p>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <Label>Keterangan</Label>
                                <Input
                                    placeholder="cth: Libur Semester, Hari Raya Idul Fitri"
                                    value={form.data.keterangan}
                                    onChange={(e) => form.setData('keterangan', e.target.value)}
                                />
                                {form.errors.keterangan && (
                                    <p className="text-sm text-destructive">{form.errors.keterangan}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    form.processing ||
                                    !form.data.keterangan ||
                                    (form.data.mode === 'tunggal' ? !form.data.tanggal : !form.data.dari || !form.data.sampai || (jumlahHari ?? 0) <= 0)
                                }
                            >
                                {form.data.mode === 'rentang' && jumlahHari && jumlahHari > 0
                                    ? `Simpan (${jumlahHari} hari)`
                                    : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Hapus Dialog */}
            <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Hari Libur</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus{' '}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.keterangan}
                            </span>
                            {' '}(
                            {deleteTarget &&
                                format(parseISO(deleteTarget.tanggal), 'd MMMM yyyy', { locale: localeId })}
                            )? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={hapus}
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

HariLiburIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hari Libur', href: '/hari-libur' },
    ],
};
