import { Head, Link, router } from '@inertiajs/react';
import { Archive, Crown, RotateCcw, Trash2 } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type TrashedUserRow = {
    id: number;
    name: string;
    email: string;
    role: string | null;
    deleted_at: string | null;
    is_primary_superadmin: boolean;
};

type Props = {
    users: Paginated<TrashedUserRow>;
    filters: { search?: string };
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

export default function UsersTrashed({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [forceTarget, setForceTarget] = useState<TrashedUserRow | null>(null);

    function doSearch(value: string) {
        setSearch(value);
        router.get(
            '/users/trashed',
            { search: value || undefined },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }

    function restore(u: TrashedUserRow) {
        router.post(`/users/${u.id}/restore`, {}, { preserveScroll: true });
    }

    function forceDelete() {
        if (!forceTarget) {
            return;
        }

        router.delete(`/users/${forceTarget.id}/force-delete`, {
            preserveScroll: true,
            onFinish: () => setForceTarget(null),
        });
    }

    return (
        <>
            <Head title="Arsip Pengguna" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Archive className="h-6 w-6 text-blue-500" />
                        <h1 className="text-2xl font-semibold">
                            Arsip Pengguna
                        </h1>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/users">Kembali ke Aktif</Link>
                    </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                    Pengguna yang sudah dihapus (soft delete). Bisa di-restore
                    atau dihapus permanen.
                </p>

                <Input
                    placeholder="Cari nama atau email..."
                    value={search}
                    onChange={(e) => doSearch(e.target.value)}
                    className="max-w-xs"
                />

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Dihapus</TableHead>
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
                                        Tidak ada pengguna di arsip.
                                    </TableCell>
                                </TableRow>
                            )}
                            {users.data.map((u) => (
                                <TableRow key={u.id} className="opacity-70">
                                    <TableCell className="font-medium">
                                        <span className="flex items-center gap-1.5">
                                            {u.is_primary_superadmin && (
                                                <Crown
                                                    className="h-4 w-4 shrink-0 text-amber-500"
                                                    title="Superadmin Inti"
                                                />
                                            )}
                                            {u.name}
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
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {u.deleted_at ?? '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-600"
                                            onClick={() => restore(u)}
                                            title="Restore"
                                        >
                                            <RotateCcw className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                            onClick={() => setForceTarget(u)}
                                            title="Hapus Permanen"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {users.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                            Halaman {users.current_page} dari {users.last_page}{' '}
                            · {users.total} pengguna
                        </span>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={users.current_page <= 1}
                                onClick={() =>
                                    router.get(
                                        '/users/trashed',
                                        {
                                            search: search || undefined,
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
                                        '/users/trashed',
                                        {
                                            search: search || undefined,
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

            <AlertDialog
                open={!!forceTarget}
                onOpenChange={(v) => !v && setForceTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Permanen</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus permanen{' '}
                            <span className="font-semibold text-foreground">
                                {forceTarget?.name}
                            </span>
                            ? Data tidak bisa dikembalikan lagi.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={forceDelete}
                        >
                            Hapus Permanen
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

UsersTrashed.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pengguna', href: '/users' },
        { title: 'Arsip', href: '/users/trashed' },
    ],
};
