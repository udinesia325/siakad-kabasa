import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type JamPelajaran = {
    id: number;
    nomor: number;
    jam_mulai: string;
    jam_selesai: string;
    keterangan: string | null;
    aktif: boolean;
};

type Props = { jamPelajaran: JamPelajaran[] };

function formatJam(value: string): string {
    return value.slice(0, 5);
}

export default function JamPelajaranIndex({ jamPelajaran }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<JamPelajaran | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<JamPelajaran | null>(null);

    const form = useForm({
        nomor: 1,
        jam_mulai: '',
        jam_selesai: '',
        keterangan: '',
        aktif: true,
    });

    function openCreate() {
        const nextNomor =
            jamPelajaran.length > 0
                ? Math.max(...jamPelajaran.map((j) => j.nomor)) + 1
                : 1;
        form.reset();
        form.setData({
            nomor: nextNomor,
            jam_mulai: '',
            jam_selesai: '',
            keterangan: '',
            aktif: true,
        });
        setEditing(null);
        setOpen(true);
    }

    function openEdit(j: JamPelajaran) {
        form.setData({
            nomor: j.nomor,
            jam_mulai: formatJam(j.jam_mulai),
            jam_selesai: formatJam(j.jam_selesai),
            keterangan: j.keterangan ?? '',
            aktif: j.aktif,
        });
        setEditing(j);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            form.patch(`/jam-pelajaran/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/jam-pelajaran', {
                onSuccess: () => setOpen(false),
            });
        }
    }

    function hapus() {
        if (!deleteTarget) return;
        router.delete(`/jam-pelajaran/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Jam Pelajaran" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Jam Pelajaran</h1>
                        <p className="text-sm text-muted-foreground">
                            Master slot jam yang dipakai di seluruh jadwal mengajar.
                        </p>
                    </div>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah Jam
                    </Button>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">Jam ke-</TableHead>
                                <TableHead>Mulai</TableHead>
                                <TableHead>Selesai</TableHead>
                                <TableHead>Keterangan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-24"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jamPelajaran.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Belum ada jam pelajaran. Klik "Tambah Jam".
                                    </TableCell>
                                </TableRow>
                            )}
                            {jamPelajaran.map((j) => (
                                <TableRow key={j.id}>
                                    <TableCell className="font-semibold">
                                        {j.nomor}
                                    </TableCell>
                                    <TableCell>
                                        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                            {formatJam(j.jam_mulai)}
                                        </code>
                                    </TableCell>
                                    <TableCell>
                                        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                            {formatJam(j.jam_selesai)}
                                        </code>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {j.keterangan ?? '—'}
                                    </TableCell>
                                    <TableCell>
                                        {j.aktif ? (
                                            <Badge>Aktif</Badge>
                                        ) : (
                                            <Badge variant="secondary">Nonaktif</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => openEdit(j)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => setDeleteTarget(j)}
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Jam Pelajaran' : 'Tambah Jam Pelajaran'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Jam ke-</Label>
                            <Input
                                type="number"
                                min={1}
                                max={20}
                                value={form.data.nomor}
                                onChange={(e) =>
                                    form.setData('nomor', Number(e.target.value))
                                }
                            />
                            {form.errors.nomor && (
                                <p className="text-sm text-destructive">
                                    {form.errors.nomor}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>Jam Mulai</Label>
                                <Input
                                    type="time"
                                    value={form.data.jam_mulai}
                                    onChange={(e) =>
                                        form.setData('jam_mulai', e.target.value)
                                    }
                                />
                                {form.errors.jam_mulai && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.jam_mulai}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Jam Selesai</Label>
                                <Input
                                    type="time"
                                    value={form.data.jam_selesai}
                                    onChange={(e) =>
                                        form.setData('jam_selesai', e.target.value)
                                    }
                                />
                                {form.errors.jam_selesai && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.jam_selesai}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Keterangan (opsional)</Label>
                            <Input
                                value={form.data.keterangan}
                                onChange={(e) =>
                                    form.setData('keterangan', e.target.value)
                                }
                                placeholder="Mis. Istirahat 1, Sholat dhuhur, ..."
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={form.data.aktif}
                                onCheckedChange={(v) => form.setData('aktif', v)}
                            />
                            <Label>Aktif</Label>
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
                        <AlertDialogTitle>Hapus jam pelajaran?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Jam ke-<strong>{deleteTarget?.nomor}</strong> akan dihapus.
                            Semua jadwal mengajar pada slot ini juga akan ikut hilang.
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

JamPelajaranIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jam Pelajaran', href: '/jam-pelajaran' },
    ],
};
