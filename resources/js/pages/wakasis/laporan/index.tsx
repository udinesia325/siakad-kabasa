import { Head, router, usePage } from '@inertiajs/react';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

type KelasOpt = { id: number; nama: string };

type LaporanRow = {
    id: number;
    nama: string;
    nisn: string | null;
    total_pelanggaran: number;
    total_sp: number;
    total_prestasi: number;
    total_kasus: number;
    status_pembinaan: 'aktif' | 'tidak';
};

type Props = {
    rows: LaporanRow[];
    kelasList: KelasOpt[];
    filters: { kelas_id?: string };
};

export default function LaporanIndex({ rows, kelasList, filters }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const canExport = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.laporan.export'));

    function filterKelas(kelasId: string) {
        router.get('/wakasis/laporan', { kelas_id: kelasId || undefined }, { preserveState: false, replace: true });
    }

    function doExport() {
        const params = filters.kelas_id ? `?kelas_id=${filters.kelas_id}` : '';
        window.location.href = `/wakasis/laporan/export${params}`;
    }

    return (
        <>
            <Head title="Laporan Wakasis" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Laporan Wakasis</h1>
                    {canExport && (
                        <Button variant="outline" onClick={doExport}>
                            <Download className="mr-2 h-4 w-4" />Export CSV
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Select value={filters.kelas_id ?? 'all'} onValueChange={(v) => filterKelas(v === 'all' ? '' : v)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Semua Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kelas</SelectItem>
                            {kelasList.map((k) => (
                                <SelectItem key={k.id} value={String(k.id)}>{k.nama}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">{rows.length} siswa</span>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-8">No</TableHead>
                                <TableHead>Nama Siswa</TableHead>
                                <TableHead className="w-32">NISN</TableHead>
                                <TableHead className="w-24 text-center">Pelanggaran</TableHead>
                                <TableHead className="w-20 text-center">SP</TableHead>
                                <TableHead className="w-24 text-center">Prestasi</TableHead>
                                <TableHead className="w-20 text-center">Kasus</TableHead>
                                <TableHead className="w-28 text-center">Pembinaan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                                        Tidak ada data siswa.
                                    </TableCell>
                                </TableRow>
                            )}
                            {rows.map((row, idx) => (
                                <TableRow key={row.id}>
                                    <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{row.nama}</div>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{row.nisn ?? '—'}</TableCell>
                                    <TableCell className="text-center">
                                        <span className={row.total_pelanggaran > 0 ? 'font-semibold text-red-600' : 'text-muted-foreground'}>
                                            {row.total_pelanggaran}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className={row.total_sp > 0 ? 'font-semibold text-orange-600' : 'text-muted-foreground'}>
                                            {row.total_sp}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className={row.total_prestasi > 0 ? 'font-semibold text-green-600' : 'text-muted-foreground'}>
                                            {row.total_prestasi}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className={row.total_kasus > 0 ? 'font-semibold text-purple-600' : 'text-muted-foreground'}>
                                            {row.total_kasus}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {row.status_pembinaan === 'aktif' ? (
                                            <Badge className="bg-blue-100 text-blue-800">Aktif</Badge>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">—</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

LaporanIndex.layout = {
    breadcrumbs: [
        { title: 'Wakasis', href: '/wakasis' },
        { title: 'Laporan', href: '/wakasis/laporan' },
    ],
};
