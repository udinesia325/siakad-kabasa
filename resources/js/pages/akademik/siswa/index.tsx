import { Head, Link, router } from '@inertiajs/react';
import {
    FileSpreadsheet,
    MoreVertical,
    Pencil,
    PlusCircle,
    Search,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { ImportPreviewDialog } from '@/components/siswa/import-preview-dialog';
import { ImportUploadDialog } from '@/components/siswa/import-upload-dialog';
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
import type { ImportPreviewResult, Kelas, Siswa } from '@/types/akademik';
import { MutasiModal } from './mutasi-modal';
import { RiwayatKelasModal } from './riwayat-kelas-modal';

type PaginatedSiswa = {
    data: Siswa[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
};

type Props = {
    siswa: PaginatedSiswa;
    kelas: Kelas[];
    filters: { search?: string; kelas_id?: string; status?: string };
};

const STATUS_LABEL: Record<Siswa['status'], string> = {
    aktif: 'Aktif',
    lulus: 'Lulus',
    keluar: 'Keluar',
};

const STATUS_VARIANT: Record<
    Siswa['status'],
    'default' | 'secondary' | 'outline' | 'destructive'
> = {
    aktif: 'default',
    lulus: 'secondary',
    keluar: 'destructive',
};

export default function SiswaIndex({ siswa, kelas, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [kelasId, setKelasId] = useState(filters.kelas_id || '_all');
    const [status, setStatus] = useState(filters.status ?? 'aktif');
    const [deleteTarget, setDeleteTarget] = useState<Siswa | null>(null);
    const [importOpen, setImportOpen] = useState(false);
    const [previewResult, setPreviewResult] =
        useState<ImportPreviewResult | null>(null);
    const [mutasiTarget, setMutasiTarget] = useState<Siswa | null>(null);
    const [riwayatTarget, setRiwayatTarget] = useState<Siswa | null>(null);

    function applyFilter() {
        router.get(
            '/siswa',
            {
                search,
                kelas_id: kelasId === '_all' ? '' : kelasId,
                status,
            },
            { preserveState: true },
        );
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/siswa/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Siswa" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Siswa</h1>
                    <div className="flex gap-2">
                        <Button
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => setImportOpen(true)}
                        >
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Import Siswa
                        </Button>
                        <Button asChild>
                            <Link href="/siswa/create">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Tambah Siswa
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Input
                        placeholder="Cari nama, NIK, atau NISN..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && applyFilter()}
                        className="max-w-xs"
                    />
                    <Select
                        value={kelasId}
                        onValueChange={(v) => setKelasId(v)}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Semua kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="_all">Semua kelas</SelectItem>
                            {kelas.map((k) => (
                                <SelectItem key={k.id} value={String(k.id)}>
                                    {k.nama} ({k.tahun_ajaran?.nama})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={status} onValueChange={(v) => setStatus(v)}>
                        <SelectTrigger className="w-36">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="aktif">Aktif</SelectItem>
                            <SelectItem value="lulus">Lulus</SelectItem>
                            <SelectItem value="keluar">Keluar</SelectItem>
                            <SelectItem value="semua">Semua</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={applyFilter}>
                        <Search className="h-4 w-4" />
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>NIK</TableHead>
                            <TableHead>NISN</TableHead>
                            <TableHead>Kelas</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>RFID</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {siswa.data.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell>{s.nama}</TableCell>
                                <TableCell className="font-mono text-sm">
                                    {s.nik}
                                </TableCell>
                                <TableCell>{s.nisn ?? '-'}</TableCell>
                                <TableCell>
                                    {s.kelas?.nama ?? (
                                        <span className="text-muted-foreground">
                                            -
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={STATUS_VARIANT[s.status]}>
                                        {STATUS_LABEL[s.status]}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {s.rfid ? (
                                        <Badge
                                            variant="outline"
                                            className="font-mono"
                                        >
                                            {s.rfid.kode_rfid}
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary">
                                            Belum assign
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={`/siswa/${s.id}/edit`}>
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => setDeleteTarget(s)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onSelect={() =>
                                                    setMutasiTarget(s)
                                                }
                                            >
                                                Mutasi
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onSelect={() =>
                                                    setRiwayatTarget(s)
                                                }
                                            >
                                                Riwayat Kelas
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        {siswa.data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center text-muted-foreground"
                                >
                                    Tidak ada data siswa.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {siswa.last_page > 1 && (
                    <div className="flex justify-end gap-2">
                        {siswa.prev_page_url && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(siswa.prev_page_url!)}
                            >
                                Sebelumnya
                            </Button>
                        )}
                        <span className="flex items-center text-sm text-muted-foreground">
                            Hal {siswa.current_page} / {siswa.last_page}
                        </span>
                        {siswa.next_page_url && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(siswa.next_page_url!)}
                            >
                                Berikutnya
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Siswa</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus siswa{' '}
                            <span className="font-semibold">
                                {deleteTarget?.nama}
                            </span>
                            ? Tindakan ini tidak dapat dibatalkan.
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

            <ImportUploadDialog
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onPreviewReady={(result) => {
                    setPreviewResult(result);
                }}
            />

            <ImportPreviewDialog
                open={previewResult !== null}
                result={previewResult}
                onClose={() => setPreviewResult(null)}
            />

            {mutasiTarget && (
                <MutasiModal
                    open={!!mutasiTarget}
                    onClose={() => setMutasiTarget(null)}
                    siswa={mutasiTarget}
                    kelasOptions={kelas}
                />
            )}
            {riwayatTarget && (
                <RiwayatKelasModal
                    open={!!riwayatTarget}
                    onClose={() => setRiwayatTarget(null)}
                    siswaId={riwayatTarget.id}
                    siswaNama={riwayatTarget.nama}
                />
            )}
        </>
    );
}

SiswaIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Siswa', href: '/siswa' },
    ],
};
