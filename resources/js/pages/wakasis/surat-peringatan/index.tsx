import { Head, router, usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
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
import type { Auth } from '@/types';

type SiswaOpt = { id: number; nama: string; nisn: string | null };
type JenisSpOpt = { id: number; nama: string; level: number };

type SuratPeringatan = {
    id: number;
    siswa_id: number;
    jenis_sp_id: number;
    tanggal: string;
    total_poin_saat_itu: number;
    keterangan: string | null;
    validated_at: string | null;
    siswa: SiswaOpt | null;
    jenis_sp: JenisSpOpt | null;
    divalidasi_oleh: { id: number; name: string } | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    suratPeringatan: Paginated<SuratPeringatan>;
    filters: { search?: string; jenis_sp_id?: string; validated?: string };
    jenisSps: JenisSpOpt[];
};

export default function SuratPeringatanIndex({ suratPeringatan, filters, jenisSps }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const canValidate = auth.is_superadmin || auth.permissions.some((p) => p.startsWith('wakasis.surat-peringatan.validate'));

    const [validateTarget, setValidateTarget] = useState<SuratPeringatan | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
 isFirstRender.current = false;

 return; 
}

        const handle = setTimeout(() => {
            router.get('/wakasis/surat-peringatan', { search: search || undefined, jenis_sp_id: filters.jenis_sp_id || undefined, validated: filters.validated || undefined }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(handle);
    }, [search]);

    function confirmValidate() {
        if (!validateTarget) {
return;
}

        router.post(`/wakasis/surat-peringatan/${validateTarget.id}/validate`, {}, { preserveScroll: true });
        setValidateTarget(null);
    }

    return (
        <>
            <Head title="Surat Peringatan" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Surat Peringatan</h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Input placeholder="Cari nama/NISN siswa…" className="w-72" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Select value={filters.jenis_sp_id ?? ''} onValueChange={(v) => router.get('/wakasis/surat-peringatan', { ...filters, jenis_sp_id: v || undefined }, { preserveState: true, replace: true })}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="Semua SP" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua SP</SelectItem>
                            {jenisSps.map((j) => <SelectItem key={j.id} value={String(j.id)}>{j.nama}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={filters.validated ?? ''} onValueChange={(v) => router.get('/wakasis/surat-peringatan', { ...filters, validated: v || undefined }, { preserveState: true, replace: true })}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="Semua Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Status</SelectItem>
                            <SelectItem value="ya">Sudah Divalidasi</SelectItem>
                            <SelectItem value="tidak">Belum Divalidasi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Siswa</TableHead>
                                <TableHead className="w-24">Jenis SP</TableHead>
                                <TableHead className="w-24 text-center">Total Poin</TableHead>
                                <TableHead className="w-28">Tanggal</TableHead>
                                <TableHead className="w-32">Status</TableHead>
                                <TableHead className="w-20"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suratPeringatan.data.length === 0 && (
                                <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                            )}
                            {suratPeringatan.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.siswa?.nama ?? '—'}</div>
                                        <div className="text-xs text-muted-foreground">{item.siswa?.nisn ?? ''}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{item.jenis_sp?.nama ?? '—'}</Badge>
                                    </TableCell>
                                    <TableCell className="text-center font-mono font-semibold">{item.total_poin_saat_itu}</TableCell>
                                    <TableCell className="text-sm">{item.tanggal}</TableCell>
                                    <TableCell>
                                        {item.validated_at ? (
                                            <div>
                                                <Badge className="bg-green-100 text-green-800">Divalidasi</Badge>
                                                <div className="mt-1 text-xs text-muted-foreground">oleh {item.divalidasi_oleh?.name ?? '—'}</div>
                                            </div>
                                        ) : (
                                            <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {canValidate && !item.validated_at && (
                                            <Button size="sm" variant="outline" onClick={() => setValidateTarget(item)}>
                                                <CheckCircle className="mr-1 h-3 w-3" />Validasi
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {suratPeringatan.last_page > 1 && (
                    <p className="text-sm text-muted-foreground">
                        Halaman {suratPeringatan.current_page} dari {suratPeringatan.last_page} · {suratPeringatan.total} total
                    </p>
                )}
            </div>

            <AlertDialog open={!!validateTarget} onOpenChange={(v) => !v && setValidateTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Validasi Surat Peringatan?</AlertDialogTitle>
                        <AlertDialogDescription>
                            SP <strong>{validateTarget?.jenis_sp?.nama}</strong> untuk{' '}
                            <strong>{validateTarget?.siswa?.nama}</strong> akan ditandai sudah divalidasi.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmValidate}>Validasi</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

SuratPeringatanIndex.layout = {
    breadcrumbs: [
        { title: 'Wakasis', href: '/wakasis' },
        { title: 'Surat Peringatan', href: '/wakasis/surat-peringatan' },
    ],
};
