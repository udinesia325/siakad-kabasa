import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Archive, Crown, Pencil, PlusCircle, ShieldCheck, Trash2 } from 'lucide-react';
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
import type { Auth } from '@/types';

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type UserRow = {
    id: number;
    name: string;
    email: string;
    role: string | null;
    created_at: string | null;
    is_self: boolean;
    is_primary_superadmin: boolean;
};

type Props = {
    users: Paginated<UserRow>;
    filters: { search?: string; role?: string };
    assignableRoles: string[];
    roleFilterOptions: string[];
    currentIsPrimarySuperadmin: boolean;
};

const roleVariant: Record<string, string> = {
    superadmin: 'bg-blue-500 text-white hover:bg-blue-500',
    admin: 'bg-emerald-500 text-white hover:bg-emerald-500',
    pegawai: 'bg-slate-500 text-white hover:bg-slate-500',
};

function roleLabel(role: string | null) {
    if (!role) {
return 'Tanpa Role';
}

    return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function UsersIndex({
    users,
    filters,
    assignableRoles,
    roleFilterOptions,
    currentIsPrimarySuperadmin,
}: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<UserRow | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [roleFilter, setRoleFilter] = useState(filters.role ?? 'all');

    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: assignableRoles[0] ?? 'admin',
    });

    useEffect(() => {
        const t = setTimeout(() => {
            router.get(
                '/users',
                {
                    search: search || undefined,
                    role: roleFilter !== 'all' ? roleFilter : undefined,
                },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(t);
         
    }, [search, roleFilter]);

    function openCreate() {
        form.reset();
        form.setData({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role: assignableRoles[0] ?? 'admin',
        });
        form.clearErrors();
        setEditing(null);
        setOpen(true);
    }

    function openEdit(u: UserRow) {
        if (u.role === 'pegawai') return;
        if (u.role === 'superadmin' && !currentIsPrimarySuperadmin) return;

        form.setData({
            name: u.name,
            email: u.email,
            password: '',
            password_confirmation: '',
            role: u.role ?? assignableRoles[0],
        });
        form.clearErrors();
        setEditing(u);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/users/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/users', {
                onSuccess: () => setOpen(false),
            });
        }
    }

    function hapus() {
        if (!deleteTarget) {
return;
}

        router.delete(`/users/${deleteTarget.id}`, {
            preserveScroll: true,
            onFinish: () => setDeleteTarget(null),
        });
    }

    const isSuperadmin = auth.roles?.includes('superadmin');

    return (
        <>
            <Head title="Pengguna" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-blue-500" />
                        <h1 className="text-2xl font-semibold">Pengguna</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        {isSuperadmin && (
                            <Button variant="outline" asChild>
                                <Link href="/users/trashed">
                                    <Archive className="mr-2 h-4 w-4" />
                                    Arsip
                                </Link>
                            </Button>
                        )}
                        <Button onClick={openCreate}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Tambah
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Input
                        placeholder="Cari nama atau email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-xs"
                    />
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Semua role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua role</SelectItem>
                            {roleFilterOptions.map((r) => (
                                <SelectItem key={r} value={r}>
                                    {roleLabel(r)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead className="w-28 text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-muted-foreground"
                                    >
                                        Belum ada pengguna.
                                    </TableCell>
                                </TableRow>
                            )}
                            {users.data.map((u) => {
                                const isPegawai = u.role === 'pegawai';
                                const isSuper = u.role === 'superadmin';
                                const canEdit =
                                    !isPegawai &&
                                    !u.is_self &&
                                    (!isSuper || currentIsPrimarySuperadmin);
                                const canDelete = canEdit;

                                return (
                                    <TableRow key={u.id}>
                                        <TableCell className="font-medium">
                                            <span className="flex items-center gap-1.5">
                                                {u.is_primary_superadmin && (
                                                    <Crown
                                                        className="h-4 w-4 shrink-0 text-amber-500"
                                                        title="Superadmin Inti"
                                                    />
                                                )}
                                                {u.name}
                                                {u.is_self && (
                                                    <span className="text-xs text-muted-foreground">
                                                        (Anda)
                                                    </span>
                                                )}
                                            </span>
                                        </TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    u.role
                                                        ? roleVariant[u.role]
                                                        : ''
                                                }
                                                variant={
                                                    u.role ? 'default' : 'outline'
                                                }
                                            >
                                                {roleLabel(u.role)}
                                            </Badge>
                                            {isPegawai && (
                                                <span className="ml-2 text-xs text-muted-foreground">
                                                    Kelola via modul Pegawai
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {u.created_at ?? '-'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                disabled={!canEdit}
                                                className="h-8 w-8 p-0"
                                                onClick={() => openEdit(u)}
                                                title={
                                                    isPegawai
                                                        ? 'Kelola via modul Pegawai'
                                                        : 'Edit'
                                                }
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                disabled={!canDelete}
                                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                onClick={() => setDeleteTarget(u)}
                                                title="Hapus"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                {users.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                            Halaman {users.current_page} dari {users.last_page} ·{' '}
                            {users.total} pengguna
                        </span>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={users.current_page <= 1}
                                onClick={() =>
                                    router.get(
                                        '/users',
                                        {
                                            search: search || undefined,
                                            role:
                                                roleFilter !== 'all'
                                                    ? roleFilter
                                                    : undefined,
                                            page: users.current_page - 1,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                }
                            >
                                Sebelumnya
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={users.current_page >= users.last_page}
                                onClick={() =>
                                    router.get(
                                        '/users',
                                        {
                                            search: search || undefined,
                                            role:
                                                roleFilter !== 'all'
                                                    ? roleFilter
                                                    : undefined,
                                            page: users.current_page + 1,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                }
                            >
                                Berikutnya
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Pengguna' : 'Tambah Pengguna'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(e) =>
                                        form.setData('name', e.target.value)
                                    }
                                />
                                {form.errors.name && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(e) =>
                                        form.setData('email', e.target.value)
                                    }
                                />
                                {form.errors.email && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password">
                                    Password
                                    {editing && (
                                        <span className="ml-1 text-xs text-muted-foreground">
                                            (kosongkan jika tidak diubah)
                                        </span>
                                    )}
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={form.data.password}
                                    onChange={(e) =>
                                        form.setData('password', e.target.value)
                                    }
                                />
                                {form.errors.password && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={form.data.password_confirmation}
                                    onChange={(e) =>
                                        form.setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
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
                                            <SelectItem key={r} value={r}>
                                                {roleLabel(r)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.role && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.role}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={form.processing}
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
                        <AlertDialogTitle>Hapus Pengguna</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus pengguna{' '}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.name}
                            </span>
                            ? Pengguna akan dinonaktifkan (soft delete).
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

UsersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pengguna', href: '/users' },
    ],
};
