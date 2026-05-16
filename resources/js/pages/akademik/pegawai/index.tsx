import { Head, Link, router } from '@inertiajs/react';
import { MoreVertical, Pencil, PlusCircle, Trash2 } from 'lucide-react';
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
    STATUS_KEPEGAWAIAN_LABEL,
    type Pegawai,
} from '@/types/akademik';

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
        if (!deleteTarget) return;
        router.delete(`/pegawai/${deleteTarget.id}`, {
            onFinish: () => setDeleteTarget(null),
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

                {/* Filter bar */}
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

                {/* Table */}
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>NIP / NUPTK</TableHead>
                                <TableHead>Jenis</TableHead>
                                <TableHead>Jabatan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pegawai.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
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
                                            {p.email && (
                                                <span> · {p.email}</span>
                                            )}
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

                {/* Pagination */}
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
        </>
    );
}

PegawaiIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pegawai', href: '/pegawai' },
    ],
};
