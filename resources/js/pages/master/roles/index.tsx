import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type RoleRow = {
    id: number;
    name: string;
    description: string | null;
    is_system: boolean;
    users_count: number;
    permissions_count: number;
};

type Props = { roles: RoleRow[] };

export default function RolesIndex({ roles }: Props) {
    const [pendingDelete, setPendingDelete] = useState<RoleRow | null>(null);

    const confirmDelete = (role: RoleRow) => {
        router.delete(`/master/roles/${role.id}`, {
            onError: (errors) => {
                alert(Object.values(errors)[0] ?? 'Gagal menghapus role.');
            },
        });
        setPendingDelete(null);
    };

    return (
        <>
            <Head title="Master Role" />
            <div className="flex items-center justify-between p-6">
                <h1 className="text-2xl font-semibold">Master Role</h1>
                <Link href="/master/roles/create">
                    <Button>
                        <Plus className="h-4 w-4" />
                        Tambah Role
                    </Button>
                </Link>
            </div>

            <div className="px-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Tipe</TableHead>
                            <TableHead>Permission</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell>
                                    <div className="font-medium">{r.name}</div>
                                    {r.description && (
                                        <p className="text-xs text-muted-foreground">
                                            {r.description}
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            r.is_system
                                                ? 'secondary'
                                                : 'outline'
                                        }
                                    >
                                        {r.is_system ? 'Bawaan' : 'Custom'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{r.permissions_count}</TableCell>
                                <TableCell>{r.users_count}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link href={`/master/roles/${r.id}/edit`}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Edit role"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            disabled={
                                                r.is_system || r.users_count > 0
                                            }
                                            title={
                                                r.is_system
                                                    ? 'Role bawaan tidak dapat dihapus'
                                                    : r.users_count > 0
                                                      ? `Role masih digunakan oleh ${r.users_count} user`
                                                      : 'Hapus role'
                                            }
                                            onClick={() => setPendingDelete(r)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {pendingDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="rounded-lg bg-background p-6 shadow-lg">
                        <h2 className="text-lg font-semibold">Hapus role?</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Role "{pendingDelete.name}" akan dihapus permanen.
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setPendingDelete(null)}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => confirmDelete(pendingDelete)}
                            >
                                Hapus
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
