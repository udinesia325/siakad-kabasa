import { Head, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
import type { Kelas, TahunAjaran } from '@/types/akademik';

type Props = { kelas: Kelas[]; tahunAjaran: TahunAjaran[] };

export default function KelasIndex({ kelas, tahunAjaran }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Kelas | null>(null);

    const form = useForm({
        nama: '',
        tingkat: '' as 'X' | 'XI' | 'XII',
        tahun_ajaran_id: 0,
    });

    function openCreate() {
        form.reset();
        setEditing(null);
        setOpen(true);
    }

    function openEdit(k: Kelas) {
        form.setData({
            nama: k.nama,
            tingkat: k.tingkat,
            tahun_ajaran_id: k.tahun_ajaran_id,
        });
        setEditing(k);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/kelas/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/kelas', { onSuccess: () => setOpen(false) });
        }
    }

    function hapus(k: Kelas) {
        if (confirm(`Hapus kelas ${k.nama}?`)) {
            form.delete(`/kelas/${k.id}`);
        }
    }

    return (
        <>
            <Head title="Kelas" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Kelas</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Tingkat</TableHead>
                            <TableHead>Tahun Ajaran</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {kelas.map((k) => (
                            <TableRow key={k.id}>
                                <TableCell>{k.nama}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{k.tingkat}</Badge>
                                </TableCell>
                                <TableCell>{k.tahun_ajaran?.nama}</TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openEdit(k)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => hapus(k)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {kelas.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center text-muted-foreground"
                                >
                                    Belum ada data kelas.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Kelas' : 'Tambah Kelas'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nama Kelas</Label>
                                <Input
                                    placeholder="contoh: X RPL 1"
                                    value={form.data.nama}
                                    onChange={(e) =>
                                        form.setData('nama', e.target.value)
                                    }
                                />
                                {form.errors.nama && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.nama}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Tingkat</Label>
                                <Select
                                    value={form.data.tingkat}
                                    onValueChange={(v) =>
                                        form.setData(
                                            'tingkat',
                                            v as 'X' | 'XI' | 'XII',
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tingkat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="X">X</SelectItem>
                                        <SelectItem value="XI">XI</SelectItem>
                                        <SelectItem value="XII">XII</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.tingkat && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.tingkat}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Tahun Ajaran</Label>
                                <Select
                                    value={String(form.data.tahun_ajaran_id)}
                                    onValueChange={(v) =>
                                        form.setData(
                                            'tahun_ajaran_id',
                                            Number(v),
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tahun ajaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tahunAjaran.map((ta) => (
                                            <SelectItem
                                                key={ta.id}
                                                value={String(ta.id)}
                                            >
                                                {ta.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.tahun_ajaran_id && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.tahun_ajaran_id}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

KelasIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelas', href: '/kelas' },
    ],
};
