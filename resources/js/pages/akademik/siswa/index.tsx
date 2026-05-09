import { Head, Link, router } from '@inertiajs/react';
import { Pencil, PlusCircle, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Kelas, Siswa } from '@/types/akademik';

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
    filters: { search?: string; kelas_id?: string };
};

export default function SiswaIndex({ siswa, kelas, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [kelasId, setKelasId] = useState(filters.kelas_id || '_all');

    function applyFilter() {
        router.get('/siswa', { search, kelas_id: kelasId === '_all' ? '' : kelasId }, { preserveState: true });
    }

    function hapus(s: Siswa) {
        if (confirm(`Hapus siswa ${s.nama}?`)) {
            router.delete(`/siswa/${s.id}`);
        }
    }

    return (
        <>
            <Head title="Siswa" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Siswa</h1>
                    <Button asChild>
                        <Link href="/siswa/create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Tambah Siswa
                        </Link>
                    </Button>
                </div>

                <div className="flex gap-2">
                    <Input
                        placeholder="Cari nama, NIK, atau NIS..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && applyFilter()}
                        className="max-w-xs"
                    />
                    <Select value={kelasId} onValueChange={(v) => setKelasId(v)}>
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
                    <Button variant="outline" onClick={applyFilter}>
                        <Search className="h-4 w-4" />
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>NIK</TableHead>
                            <TableHead>NIS</TableHead>
                            <TableHead>Kelas</TableHead>
                            <TableHead>RFID</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {siswa.data.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell>{s.nama}</TableCell>
                                <TableCell className="font-mono text-sm">{s.nik}</TableCell>
                                <TableCell>{s.nis ?? '-'}</TableCell>
                                <TableCell>{s.kelas?.nama ?? <span className="text-muted-foreground">-</span>}</TableCell>
                                <TableCell>
                                    {s.rfid
                                        ? <Badge variant="outline" className="font-mono">{s.rfid.kode_rfid}</Badge>
                                        : <Badge variant="secondary">Belum assign</Badge>}
                                </TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={`/siswa/${s.id}/edit`}>
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => hapus(s)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {siswa.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                    Tidak ada data siswa.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {siswa.last_page > 1 && (
                    <div className="flex justify-end gap-2">
                        {siswa.prev_page_url && (
                            <Button variant="outline" size="sm" onClick={() => router.get(siswa.prev_page_url!)}>
                                Sebelumnya
                            </Button>
                        )}
                        <span className="flex items-center text-sm text-muted-foreground">
                            Hal {siswa.current_page} / {siswa.last_page}
                        </span>
                        {siswa.next_page_url && (
                            <Button variant="outline" size="sm" onClick={() => router.get(siswa.next_page_url!)}>
                                Berikutnya
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

SiswaIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Siswa', href: '/siswa' },
    ],
};
