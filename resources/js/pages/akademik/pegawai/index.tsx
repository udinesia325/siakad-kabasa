import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    CreditCard,
    KeyRound,
    MoreVertical,
    Pencil,
    PlusCircle,
    ShieldOff,
    Trash2,
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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
    JENIS_PEGAWAI_LABEL,
    STATUS_KEPEGAWAIAN_LABEL
    
} from '@/types/akademik';
import type {Pegawai} from '@/types/akademik';

type PaginatedPegawai = {
    data: Pegawai[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
};

type Props = {
    pegawai: PaginatedPegawai;
    filters: {
        search?: string;
        jenis?: string;
        status?: string;
    };
};

export default function PegawaiIndex({ pegawai, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [jenis, setJenis] = useState(filters.jenis || '_all');
    const [status, setStatus] = useState(filters.status ?? 'aktif');
    const [deleteTarget, setDeleteTarget] = useState<Pegawai | null>(null);
    const [assignUserTarget, setAssignUserTarget] = useState<Pegawai | null>(
        null,
    );
    const [assignRfidTarget, setAssignRfidTarget] = useState<Pegawai | null>(
        null,
    );
    const [revokeUserTarget, setRevokeUserTarget] = useState<Pegawai | null>(
        null,
    );
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const handle = setTimeout(() => {
            router.get(
                '/pegawai',
                {
                    search,
                    jenis: jenis === '_all' ? undefined : jenis,
                    status,
                },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(handle);
    }, [search, jenis, status]);

    function handleDelete() {
        if (!deleteTarget) {
return;
}

        router.delete(`/pegawai/${deleteTarget.id}`, {
            onFinish: () => setDeleteTarget(null),
        });
    }

    function handleRevokeUser() {
        if (!revokeUserTarget) {
return;
}

        router.delete(`/pegawai/${revokeUserTarget.id}/revoke-user`, {
            preserveScroll: true,
            onFinish: () => setRevokeUserTarget(null),
        });
    }

    return (
        <>
            <Head title="Pegawai" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold">Pegawai</h1>
                        <p className="text-sm text-muted-foreground">
                            Data guru, staff TU, dan kepala sekolah
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/pegawai/create">
                            <PlusCircle className="size-4" />
                            Tambah Pegawai
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Input
                        placeholder="Cari nama / NIP / NUPTK…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-xs"
                    />
                    <Select value={jenis} onValueChange={setJenis}>
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Semua jenis" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="_all">Semua jenis</SelectItem>
                            {Object.entries(JENIS_PEGAWAI_LABEL).map(([k, v]) => (
                                <SelectItem key={k} value={k}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-36">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="aktif">Aktif</SelectItem>
                            <SelectItem value="nonaktif">Non-aktif</SelectItem>
                            <SelectItem value="semua">Semua</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>NIP / NUPTK</TableHead>
                                <TableHead>Jenis</TableHead>
                                <TableHead>Jabatan</TableHead>
                                <TableHead>Akun</TableHead>
                                <TableHead>RFID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pegawai.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Belum ada data pegawai
                                    </TableCell>
                                </TableRow>
                            )}
                            {pegawai.data.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>
                                        <div className="font-medium">{p.nama}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {p.jenis_kelamin === 'L'
                                                ? 'Laki-laki'
                                                : 'Perempuan'}
                                            {p.email && <span> · {p.email}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {p.nip || '—'}
                                        {p.nuptk && (
                                            <div className="text-xs text-muted-foreground">
                                                NUPTK {p.nuptk}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {JENIS_PEGAWAI_LABEL[p.jenis]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {p.jabatan || '—'}
                                        {p.status_kepegawaian && (
                                            <div className="text-xs text-muted-foreground">
                                                {
                                                    STATUS_KEPEGAWAIAN_LABEL[
                                                        p.status_kepegawaian
                                                    ]
                                                }
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {p.user ? (
                                            <Badge
                                                variant="outline"
                                                className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400"
                                            >
                                                Aktif
                                            </Badge>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {p.rfid ? (
                                            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                                                {p.rfid.kode_rfid}
                                            </code>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {p.aktif ? (
                                            <Badge>Aktif</Badge>
                                        ) : (
                                            <Badge variant="secondary">Non-aktif</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        router.get(
                                                            `/pegawai/${p.id}/edit`,
                                                        )
                                                    }
                                                >
                                                    <Pencil className="size-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setAssignRfidTarget(p)
                                                    }
                                                >
                                                    <CreditCard className="size-4" />
                                                    {p.rfid
                                                        ? 'Ganti RFID'
                                                        : 'Assign RFID'}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setAssignUserTarget(p)
                                                    }
                                                >
                                                    <KeyRound className="size-4" />
                                                    {p.user
                                                        ? 'Reset Password'
                                                        : 'Assign Login'}
                                                </DropdownMenuItem>
                                                {p.user && (
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            setRevokeUserTarget(p)
                                                        }
                                                    >
                                                        <ShieldOff className="size-4" />
                                                        Cabut Akun
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    onClick={() => setDeleteTarget(p)}
                                                >
                                                    <Trash2 className="size-4" />
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {pegawai.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Halaman {pegawai.current_page} dari {pegawai.last_page}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!pegawai.prev_page_url}
                                onClick={() =>
                                    pegawai.prev_page_url &&
                                    router.get(pegawai.prev_page_url)
                                }
                            >
                                Sebelumnya
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!pegawai.next_page_url}
                                onClick={() =>
                                    pegawai.next_page_url &&
                                    router.get(pegawai.next_page_url)
                                }
                            >
                                Selanjutnya
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus pegawai?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Data <strong>{deleteTarget?.nama}</strong> akan dihapus
                            permanen. Tindakan ini tidak bisa dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
                open={!!revokeUserTarget}
                onOpenChange={(open) => !open && setRevokeUserTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cabut akun login?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Akun login <strong>{revokeUserTarget?.user?.email}</strong>{' '}
                            akan dihapus. Pegawai tetap ada di sistem, tapi tidak bisa
                            login lagi sampai di-assign ulang.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRevokeUser}>
                            Cabut
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {assignUserTarget && (
                <AssignUserModal
                    pegawai={assignUserTarget}
                    onClose={() => setAssignUserTarget(null)}
                />
            )}
            {assignRfidTarget && (
                <AssignRfidModal
                    pegawai={assignRfidTarget}
                    onClose={() => setAssignRfidTarget(null)}
                />
            )}
        </>
    );
}

function AssignUserModal({
    pegawai,
    onClose,
}: {
    pegawai: Pegawai;
    onClose: () => void;
}) {
    const form = useForm({ password: '', password_confirmation: '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post(`/pegawai/${pegawai.id}/assign-user`, {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    }

    const isReset = !!pegawai.user;
    const hasEmail = !!pegawai.email;

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isReset ? 'Reset Password' : 'Assign Login'}
                    </DialogTitle>
                    <DialogDescription>
                        {isReset ? (
                            <>
                                Ubah password akun <strong>{pegawai.user?.email}</strong>
                                .
                            </>
                        ) : hasEmail ? (
                            <>
                                Buat akun login untuk{' '}
                                <strong>{pegawai.nama}</strong>. Email akan diambil
                                otomatis dari data pegawai:{' '}
                                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                                    {pegawai.email}
                                </code>
                                .
                            </>
                        ) : (
                            <>
                                Pegawai belum punya email. Isi email lewat menu Edit
                                terlebih dahulu.
                            </>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="flex flex-col gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            disabled={!hasEmail}
                            value={form.data.password}
                            onChange={(e) =>
                                form.setData('password', e.target.value)
                            }
                            placeholder="Minimal 8 karakter"
                            autoFocus
                        />
                        {form.errors.password && (
                            <p className="text-sm text-destructive">
                                {form.errors.password}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Konfirmasi Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            disabled={!hasEmail}
                            value={form.data.password_confirmation}
                            onChange={(e) =>
                                form.setData(
                                    'password_confirmation',
                                    e.target.value,
                                )
                            }
                            placeholder="Ulangi password"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                !hasEmail ||
                                form.processing ||
                                !form.data.password ||
                                form.data.password !==
                                    form.data.password_confirmation
                            }
                        >
                            {isReset ? 'Reset' : 'Buat Akun'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function AssignRfidModal({
    pegawai,
    onClose,
}: {
    pegawai: Pegawai;
    onClose: () => void;
}) {
    const form = useForm({ kode_rfid: '' });
    const inputRef = useRef<HTMLInputElement>(null);
    const [scanned, setScanned] = useState(false);
    const lastScanRef = useRef<{ kode: string; at: number }>({
        kode: '',
        at: 0,
    });

    useEffect(() => {
        const t = setTimeout(() => inputRef.current?.focus(), 50);

        return () => clearTimeout(t);
    }, []);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter') {
return;
}

        e.preventDefault();
        const kode = (e.currentTarget.value || '').trim();
        e.currentTarget.value = '';

        if (!kode) {
return;
}

        const now = Date.now();

        if (
            lastScanRef.current.kode === kode &&
            now - lastScanRef.current.at < 1500
        ) {
            return;
        }

        lastScanRef.current = { kode, at: now };
        form.setData('kode_rfid', kode);
        setScanned(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post(`/pegawai/${pegawai.id}/assign-rfid`, {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {pegawai.rfid ? 'Ganti RFID' : 'Assign RFID'}
                    </DialogTitle>
                    <DialogDescription>
                        Tempelkan kartu RFID ke scanner untuk pegawai{' '}
                        <span className="font-semibold">{pegawai.nama}</span>.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="flex flex-col gap-3">
                    <Label htmlFor="kode_rfid_pegawai">Kode RFID</Label>
                    <Input
                        id="kode_rfid_pegawai"
                        ref={inputRef}
                        autoFocus
                        autoComplete="off"
                        placeholder="Menunggu scan kartu..."
                        onKeyDown={handleKeyDown}
                        className={scanned ? 'border-green-500 font-mono' : 'font-mono'}
                    />
                    {scanned && (
                        <p className="text-sm text-green-600">
                            Terdeteksi:{' '}
                            <span className="font-mono">{form.data.kode_rfid}</span>
                        </p>
                    )}
                    {form.errors.kode_rfid && (
                        <p className="text-sm text-destructive">
                            {form.errors.kode_rfid}
                        </p>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={form.processing || !form.data.kode_rfid}
                        >
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

PegawaiIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pegawai', href: '/pegawai' },
    ],
};
