import { Head, router, useForm } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
    JENIS_PEGAWAI_LABEL,
    STATUS_KEPEGAWAIAN_LABEL,
} from '@/types/akademik';
import type { Pegawai } from '@/types/akademik';

type Props = { pegawai: Pegawai; assignableRoles: string[] };

export default function PegawaiShow({ pegawai, assignableRoles }: Props) {
    const [roleDialogOpen, setRoleDialogOpen] = useState(false);

    const currentRole = pegawai.user?.roles?.[0]?.name ?? '';

    return (
        <>
            <Head title={pegawai.nama} />
            <div className="flex max-w-2xl flex-col gap-6 p-4">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">{pegawai.nama}</h1>
                    <Button onClick={() => router.get(`/pegawai/${pegawai.id}/edit`)}>
                        <Pencil className="size-4" />
                        Edit
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>NIK</Label>
                            <Input value={pegawai.nik ?? ''} disabled />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>NUPTK</Label>
                            <Input value={pegawai.nuptk ?? ''} disabled />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Nama Lengkap</Label>
                        <Input value={pegawai.nama} disabled />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Jenis Kelamin</Label>
                            <Select value={pegawai.jenis_kelamin} disabled>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">Laki-laki</SelectItem>
                                    <SelectItem value="P">Perempuan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Jenis Pegawai</Label>
                            <Select value={pegawai.jenis} disabled>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(JENIS_PEGAWAI_LABEL).map(([k, v]) => (
                                        <SelectItem key={k} value={k}>
                                            {v}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Jabatan</Label>
                            <Input value={pegawai.jabatan ?? ''} disabled />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Status Kepegawaian</Label>
                            <Select value={pegawai.status_kepegawaian ?? ''} disabled>
                                <SelectTrigger>
                                    <SelectValue placeholder="—" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(STATUS_KEPEGAWAIAN_LABEL).map(([k, v]) => (
                                        <SelectItem key={k} value={k}>
                                            {v}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>No HP</Label>
                            <Input value={pegawai.no_hp ?? ''} disabled />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input value={pegawai.email ?? ''} disabled />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Alamat</Label>
                        <Textarea value={pegawai.alamat ?? ''} disabled />
                    </div>

                    <div className="flex items-center gap-3 rounded-md border p-3">
                        <Switch id="aktif" checked={pegawai.aktif} disabled />
                        <div className="flex flex-col">
                            <Label htmlFor="aktif">Status Aktif</Label>
                            <span className="text-xs text-muted-foreground">
                                Pegawai non-aktif tidak muncul di pemilihan wali kelas
                            </span>
                        </div>
                    </div>

                    {/* Akun Login */}
                    <div className="flex items-center justify-between gap-3 rounded-md border p-3">
                        <div className="flex flex-col gap-1">
                            <Label>Akun Login</Label>
                            {pegawai.user ? (
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400"
                                    >
                                        {pegawai.user.email}
                                    </Badge>
                                    {currentRole && (
                                        <Badge variant="secondary" className="capitalize">
                                            {currentRole}
                                        </Badge>
                                    )}
                                </div>
                            ) : (
                                <span className="text-sm text-muted-foreground">
                                    Belum memiliki akun login
                                </span>
                            )}
                        </div>
                        {pegawai.user && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setRoleDialogOpen(true)}
                            >
                                Atur Role
                            </Button>
                        )}
                    </div>

                    {pegawai.rfid && (
                        <div className="flex flex-col gap-2 rounded-md border p-3">
                            <Label>RFID</Label>
                            <code className="w-fit rounded bg-muted px-2 py-1 text-sm">
                                {pegawai.rfid.kode_rfid}
                            </code>
                        </div>
                    )}

                    <div>
                        <Button variant="outline" onClick={() => router.get('/pegawai')}>
                            Kembali
                        </Button>
                    </div>
                </div>
            </div>

            {pegawai.user && (
                <AssignRoleDialog
                    open={roleDialogOpen}
                    onClose={() => setRoleDialogOpen(false)}
                    pegawaiId={pegawai.id}
                    pegawaiNama={pegawai.nama}
                    currentRole={currentRole}
                    assignableRoles={assignableRoles}
                />
            )}
        </>
    );
}

function AssignRoleDialog({
    open,
    onClose,
    pegawaiId,
    pegawaiNama,
    currentRole,
    assignableRoles,
}: {
    open: boolean;
    onClose: () => void;
    pegawaiId: number;
    pegawaiNama: string;
    currentRole: string;
    assignableRoles: string[];
}) {
    const form = useForm({ role: currentRole || assignableRoles[0] || '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.patch(`/pegawai/${pegawaiId}/assign-role`, {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Atur Role — {pegawaiNama}</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="flex flex-col gap-4 py-2">
                    <div className="flex flex-col gap-2">
                        <Label>Role</Label>
                        <Select
                            value={form.data.role}
                            onValueChange={(v) => form.setData('role', v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih role" />
                            </SelectTrigger>
                            <SelectContent>
                                {assignableRoles.map((r) => (
                                    <SelectItem key={r} value={r} className="capitalize">
                                        {r.charAt(0).toUpperCase() + r.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.errors.role && (
                            <p className="text-sm text-destructive">{form.errors.role}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

PegawaiShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pegawai', href: '/pegawai' },
        { title: 'Detail', href: '#' },
    ],
};
