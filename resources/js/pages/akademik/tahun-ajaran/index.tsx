import { Head, useForm } from '@inertiajs/react';
import { CheckCircle, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { TahunAjaran } from '@/types/akademik';

type Props = { tahunAjaran: TahunAjaran[] };

export default function TahunAjaranIndex({ tahunAjaran }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<TahunAjaran | null>(null);

    const form = useForm({ nama: '' });

    function openCreate() {
        form.reset();
        setEditing(null);
        setOpen(true);
    }

    function openEdit(ta: TahunAjaran) {
        form.setData({ nama: ta.nama });
        setEditing(ta);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/tahun-ajaran/${editing.id}`, { onSuccess: () => setOpen(false) });
        } else {
            form.post('/tahun-ajaran', { onSuccess: () => setOpen(false) });
        }
    }

    function hapus(ta: TahunAjaran) {
        if (confirm(`Hapus tahun ajaran ${ta.nama}?`)) {
            form.delete(`/tahun-ajaran/${ta.id}`);
        }
    }

    function setAktif(ta: TahunAjaran) {
        form.patch(`/tahun-ajaran/${ta.id}/set-aktif`);
    }

    return (
        <>
            <Head title="Tahun Ajaran" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Tahun Ajaran</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tahunAjaran.map((ta) => (
                            <TableRow key={ta.id}>
                                <TableCell>{ta.nama}</TableCell>
                                <TableCell>
                                    {ta.is_active
                                        ? <Badge>Aktif</Badge>
                                        : <Badge variant="outline">Tidak Aktif</Badge>}
                                </TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    {!ta.is_active && (
                                        <Button size="sm" variant="outline" onClick={() => setAktif(ta)}>
                                            <CheckCircle className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Button size="sm" variant="outline" onClick={() => openEdit(ta)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    {!ta.is_active && (
                                        <Button size="sm" variant="destructive" onClick={() => hapus(ta)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {tahunAjaran.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">
                                    Belum ada data tahun ajaran.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Edit Tahun Ajaran' : 'Tambah Tahun Ajaran'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="nama">Nama</Label>
                                <Input
                                    id="nama"
                                    placeholder="contoh: 2025/2026"
                                    value={form.data.nama}
                                    onChange={(e) => form.setData('nama', e.target.value)}
                                />
                                {form.errors.nama && (
                                    <p className="text-sm text-destructive">{form.errors.nama}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

TahunAjaranIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tahun Ajaran', href: '/tahun-ajaran' },
    ],
};
