import { Head, router } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import {
    ClipboardList,
    ExternalLink,
    Pencil,
    PlusCircle,
    Trash2,
    UserCheck,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
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

type Jurusan = { id: number; nama: string; singkatan: string };
type TahunAjaran = { id: number; nama: string };

type Ppdb = {
    id: number;
    nomor_registrasi: string;
    tanggal_daftar: string;
    status: 'draft' | 'aktif';
    siswa_id: number | null;
    nama: string;
    nik: string;
    nisn: string | null;
    jenis_kelamin: 'L' | 'P';
    tempat_lahir: string;
    tanggal_lahir: string;
    agama: string;
    sekolah_asal: string;
    no_telepon: string | null;
    penerima_kip: boolean;
    nama_kip: string | null;
    no_registrasi_akta: string | null;
    alamat: string;
    rt: string | null;
    rw: string | null;
    kelurahan: string | null;
    kecamatan: string | null;
    kabupaten: string | null;
    provinsi: string | null;
    kode_pos: string | null;
    nama_ayah: string;
    pekerjaan_ayah: string | null;
    pendidikan_ayah: string | null;
    penghasilan_ayah: string | null;
    nama_ibu: string;
    pekerjaan_ibu: string | null;
    pendidikan_ibu: string | null;
    penghasilan_ibu: string | null;
    tahun_ajaran: TahunAjaran;
    jurusan: Jurusan;
    dokumen: { id: number; nama_dokumen: string; file_path: string; file_url?: string }[];
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    total: number;
};

type Props = {
    ppdb: Paginated<Ppdb>;
    filters: {
        tahun_ajaran_id?: string;
        jurusan_id?: string;
        status?: string;
        nama?: string;
    };
    tahunAjaranList: TahunAjaran[];
    jurusanList: Jurusan[];
};

export default function PpdbIndex({
    ppdb,
    filters,
    tahunAjaranList,
    jurusanList,
}: Props) {
    const [deleteTarget, setDeleteTarget] = useState<Ppdb | null>(null);
    const [aktivasiTarget, setAktivasi] = useState<Ppdb | null>(null);

    // Filter state
    const [filterTahun, setFilterTahun] = useState(
        filters.tahun_ajaran_id ?? '',
    );
    const [filterJurusan, setFilterJurusan] = useState(
        filters.jurusan_id ?? '',
    );
    const [filterStatus, setFilterStatus] = useState(filters.status ?? '');
    const [filterNama, setFilterNama] = useState(filters.nama ?? '');
    const [filterNamaInput, setFilterNamaInput] = useState(filters.nama ?? '');

    // Infinite scroll state
    const [items, setItems] = useState<Ppdb[]>(ppdb.data);
    const [currentPage, setCurrentPage] = useState(ppdb.current_page);
    const [lastPage, setLastPage] = useState(ppdb.last_page);
    const [total, setTotal] = useState(ppdb.total);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Reset ketika filter berubah — ambil ulang dari server
    useEffect(() => {
        const opts: Record<string, string> = {};

        if (filterTahun) {
            opts.tahun_ajaran_id = filterTahun;
        }

        if (filterJurusan) {
            opts.jurusan_id = filterJurusan;
        }

        if (filterStatus) {
            opts.status = filterStatus;
        }

        if (filterNama) {
            opts.nama = filterNama;
        }

        router.get('/ppdb', opts, {
            preserveState: true,
            preserveScroll: true,
            only: ['ppdb'],
            onSuccess: (page) => {
                const data = (page.props as unknown as Props).ppdb;
                setItems(data.data);
                setCurrentPage(data.current_page);
                setLastPage(data.last_page);
                setTotal(data.total);
            },
        });
    }, [filterTahun, filterJurusan, filterStatus, filterNama]);

    const loadMore = useCallback(() => {
        if (loading || currentPage >= lastPage) {
            return;
        }

        setLoading(true);

        const opts: Record<string, string | number> = { page: currentPage + 1 };

        if (filterTahun) {
            opts.tahun_ajaran_id = filterTahun;
        }

        if (filterJurusan) {
            opts.jurusan_id = filterJurusan;
        }

        if (filterStatus) {
            opts.status = filterStatus;
        }

        if (filterNama) {
            opts.nama = filterNama;
        }

        router.get('/ppdb', opts, {
            preserveState: true,
            preserveScroll: true,
            only: ['ppdb'],
            onSuccess: (page) => {
                const data = (page.props as unknown as Props).ppdb;
                setItems((prev) => [...prev, ...data.data]);
                setCurrentPage(data.current_page);
                setLastPage(data.last_page);
                setLoading(false);
            },
            onError: () => setLoading(false),
        });
    }, [
        loading,
        currentPage,
        lastPage,
        filterTahun,
        filterJurusan,
        filterStatus,
        filterNama,
    ]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 },
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [loadMore]);

    return (
        <>
            <Head title="Pendaftaran Siswa (PPDB)" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-primary" />
                        <h1 className="text-xl font-semibold">
                            Pendaftaran Siswa (PPDB)
                        </h1>
                        <Badge variant="outline">{total} data</Badge>
                    </div>
                    <Button onClick={() => router.get('/ppdb/create')} size="sm">
                        <PlusCircle className="mr-1 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap gap-2">
                    <Select
                        value={filterTahun || 'all'}
                        onValueChange={(v) => setFilterTahun(v === 'all' ? '' : v)}
                    >
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Semua Tahun Ajaran" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tahun Ajaran</SelectItem>
                            {tahunAjaranList.map((t) => (
                                <SelectItem key={t.id} value={String(t.id)}>
                                    {t.nama}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filterJurusan || 'all'}
                        onValueChange={(v) => setFilterJurusan(v === 'all' ? '' : v)}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Semua Jurusan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Jurusan</SelectItem>
                            {jurusanList.map((j) => (
                                <SelectItem key={j.id} value={String(j.id)}>
                                    {j.singkatan}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filterStatus || 'all'}
                        onValueChange={(v) => setFilterStatus(v === 'all' ? '' : v)}
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="aktif">Aktif</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        placeholder="Cari nama..."
                        className="w-48"
                        value={filterNamaInput}
                        onChange={(e) => setFilterNamaInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFilterNama(filterNamaInput);
                            }
                        }}
                        onBlur={() => setFilterNama(filterNamaInput)}
                    />
                </div>

                {/* Tabel */}
                <div className="rounded-md border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">
                                    No. Registrasi
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Nama
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Jurusan
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Tahun Ajaran
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Tgl. Daftar
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-right font-medium">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-3 font-mono text-xs">
                                        {item.nomor_registrasi}
                                    </td>
                                    <td className="px-4 py-3">{item.nama}</td>
                                    <td className="px-4 py-3 text-xs">
                                        {item.jurusan?.singkatan}
                                    </td>
                                    <td className="px-4 py-3 text-xs">
                                        {item.tahun_ajaran?.nama}
                                    </td>
                                    <td className="px-4 py-3 text-xs text-muted-foreground">
                                        {format(
                                            parseISO(item.tanggal_daftar),
                                            'd MMM yyyy',
                                            { locale: localeId },
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            variant={
                                                item.status === 'aktif'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {item.status === 'aktif'
                                                ? 'Aktif'
                                                : 'Draft'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-1">
                                            {item.status === 'draft' ? (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Jadikan Siswa"
                                                        onClick={() =>
                                                            setAktivasi(item)
                                                        }
                                                    >
                                                        <UserCheck className="h-4 w-4 text-green-600" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Edit"
                                                        onClick={() =>
                                                            router.get(`/ppdb/${item.id}/edit`)
                                                        }
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Hapus"
                                                        onClick={() =>
                                                            setDeleteTarget(
                                                                item,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                    title="Lihat Siswa"
                                                >
                                                    <a
                                                        href={`/siswa/${item.siswa_id}/edit`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <ExternalLink className="mr-1 h-3 w-3" />
                                                        Lihat Siswa
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {items.length === 0 && (
                        <div className="py-12 text-center text-muted-foreground">
                            Tidak ada data pendaftaran.
                        </div>
                    )}
                </div>

                {/* Infinite scroll loader */}
                <div ref={loaderRef} className="flex justify-center py-4">
                    {loading && (
                        <span className="text-sm text-muted-foreground">
                            Memuat...
                        </span>
                    )}
                </div>
            </div>

            {/* Confirm Hapus */}
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(v) => {
                    if (!v) {
                        setDeleteTarget(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Pendaftaran?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Data pendaftaran atas nama{' '}
                            <strong>{deleteTarget?.nama}</strong> (No. Reg:{' '}
                            {deleteTarget?.nomor_registrasi}) akan dihapus
                            permanen beserta semua dokumen yang terupload.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => {
                                if (!deleteTarget) {
                                    return;
                                }

                                router.delete(`/ppdb/${deleteTarget.id}`, {
                                    onSuccess: () => {
                                        setDeleteTarget(null);
                                        setItems((prev) =>
                                            prev.filter(
                                                (i) => i.id !== deleteTarget.id,
                                            ),
                                        );
                                        setTotal((t) => t - 1);
                                    },
                                });
                            }}
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Confirm Aktivasi */}
            <AlertDialog
                open={!!aktivasiTarget}
                onOpenChange={(v) => {
                    if (!v) {
                        setAktivasi(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Jadikan Siswa Aktif?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Pendaftaran atas nama{' '}
                            <strong>{aktivasiTarget?.nama}</strong> akan diubah
                            menjadi siswa aktif. Data pendaftaran akan terkunci
                            dan tidak dapat diedit lagi.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (!aktivasiTarget) {
                                    return;
                                }

                                router.post(
                                    `/ppdb/${aktivasiTarget.id}/aktivasi`,
                                    {},
                                    {
                                        onSuccess: () => {
                                            setAktivasi(null);
                                            router.reload({ only: ['ppdb'] });
                                        },
                                    },
                                );
                            }}
                        >
                            Ya, Jadikan Siswa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

PpdbIndex.layout = {
    breadcrumbs: [
        { title: 'Master Data', href: '#' },
        { title: 'Pendaftaran Siswa (PPDB)', href: '/ppdb' },
    ],
};
