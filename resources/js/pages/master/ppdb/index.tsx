import { Head, router, useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { ClipboardList, ExternalLink, Minus, Pencil, Plus, PlusCircle, Trash2, UserCheck } from 'lucide-react';
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
import AppLayout from '@/layouts/app-layout';
import type {BreadcrumbItem} from '@/types';

type Jurusan = { id: number; nama: string; singkatan: string };
type TahunAjaran = { id: number; nama: string };

type PpdbDokumen = {
    id: number;
    nama_dokumen: string;
    file_path: string;
    file_url?: string;
};

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
    dokumen: PpdbDokumen[];
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
    filters: { tahun_ajaran_id?: string; jurusan_id?: string; status?: string; nama?: string };
    tahunAjaranList: TahunAjaran[];
    jurusanList: Jurusan[];
};

type DokumenBaru = { nama: string; file: File | null };
type DokumenExisting = PpdbDokumen;

const emptyForm = {
    tahun_ajaran_id: '',
    jurusan_id: '',
    nomor_registrasi: '',
    tanggal_daftar: '',
    nama: '',
    nik: '',
    nisn: '',
    jenis_kelamin: '' as 'L' | 'P' | '',
    tempat_lahir: '',
    tanggal_lahir: '',
    agama: '',
    sekolah_asal: '',
    no_telepon: '',
    penerima_kip: false as boolean,
    nama_kip: '',
    no_registrasi_akta: '',
    alamat: '',
    rt: '',
    rw: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    kode_pos: '',
    nama_ayah: '',
    pekerjaan_ayah: '',
    pendidikan_ayah: '',
    penghasilan_ayah: '',
    nama_ibu: '',
    pekerjaan_ibu: '',
    pendidikan_ibu: '',
    penghasilan_ibu: '',
};

const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];
const pendidikanOptions = ['SD', 'SMP', 'SMA/SMK', 'D3', 'S1', 'S2', 'S3', 'Tidak Sekolah'];
const penghasilanOptions = ['< 1.000.000', '1.000.000–3.000.000', '3.000.000–5.000.000', '> 5.000.000', 'Tidak Ada Penghasilan'];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Master Data', href: '#' },
    { title: 'Pendaftaran Siswa (PPDB)', href: '/ppdb' },
];

export default function PpdbIndex({ ppdb, filters, tahunAjaranList, jurusanList }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Ppdb | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Ppdb | null>(null);
    const [aktivasiTarget, setAktivasi] = useState<Ppdb | null>(null);
    const [activeSection, setActiveSection] = useState(0);

    // Filter state
    const [filterTahun, setFilterTahun] = useState(filters.tahun_ajaran_id ?? '');
    const [filterJurusan, setFilterJurusan] = useState(filters.jurusan_id ?? '');
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

    // Dokumen state
    const [dokumenExisting, setDokumenExisting] = useState<DokumenExisting[]>([]);
    const [dokumenBaru, setDokumenBaru] = useState<DokumenBaru[]>([]);
    const [hapusDokumenIds, setHapusDokumenIds] = useState<number[]>([]);

    const form = useForm(emptyForm);

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
    }, [loading, currentPage, lastPage, filterTahun, filterJurusan, filterStatus, filterNama]);

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

    function openCreate() {
        setEditing(null);
        form.reset();
        setDokumenExisting([]);
        setDokumenBaru([]);
        setHapusDokumenIds([]);
        setActiveSection(0);
        setOpen(true);
    }

    function openEdit(item: Ppdb) {
        setEditing(item);
        form.setData({
            tahun_ajaran_id: String(item.tahun_ajaran?.id ?? ''),
            jurusan_id: String(item.jurusan?.id ?? ''),
            nomor_registrasi: item.nomor_registrasi,
            tanggal_daftar: item.tanggal_daftar,
            nama: item.nama,
            nik: item.nik,
            nisn: item.nisn ?? '',
            jenis_kelamin: item.jenis_kelamin,
            tempat_lahir: item.tempat_lahir,
            tanggal_lahir: item.tanggal_lahir,
            agama: item.agama,
            sekolah_asal: item.sekolah_asal,
            no_telepon: item.no_telepon ?? '',
            penerima_kip: item.penerima_kip,
            nama_kip: item.nama_kip ?? '',
            no_registrasi_akta: item.no_registrasi_akta ?? '',
            alamat: item.alamat,
            rt: item.rt ?? '',
            rw: item.rw ?? '',
            kelurahan: item.kelurahan ?? '',
            kecamatan: item.kecamatan ?? '',
            kabupaten: item.kabupaten ?? '',
            provinsi: item.provinsi ?? '',
            kode_pos: item.kode_pos ?? '',
            nama_ayah: item.nama_ayah,
            pekerjaan_ayah: item.pekerjaan_ayah ?? '',
            pendidikan_ayah: item.pendidikan_ayah ?? '',
            penghasilan_ayah: item.penghasilan_ayah ?? '',
            nama_ibu: item.nama_ibu,
            pekerjaan_ibu: item.pekerjaan_ibu ?? '',
            pendidikan_ibu: item.pendidikan_ibu ?? '',
            penghasilan_ibu: item.penghasilan_ibu ?? '',
        });
        setDokumenExisting(item.dokumen ?? []);
        setDokumenBaru([]);
        setHapusDokumenIds([]);
        setActiveSection(0);
        setOpen(true);
    }

    function submitForm() {
        const fd = new FormData();

        // append semua field teks
        Object.entries(form.data).forEach(([key, val]) => {
            fd.append(key, val === null || val === undefined ? '' : String(val));
        });

        // append dokumen baru
        dokumenBaru.forEach((dok, i) => {
            fd.append(`dokumen[${i}][nama]`, dok.nama);

            if (dok.file) {
fd.append(`dokumen[${i}][file]`, dok.file);
}
        });

        // append id dokumen yang dihapus
        hapusDokumenIds.forEach((id, i) => {
            fd.append(`hapus_dokumen_ids[${i}]`, String(id));
        });

        const options = {
            forceFormData: true,
            onSuccess: () => {
                setOpen(false);
                router.reload({ only: ['ppdb'] });
            },
        };

        if (editing) {
            fd.append('_method', 'PUT');
            router.post(`/ppdb/${editing.id}`, fd, options);
        } else {
            router.post('/ppdb', fd, options);
        }
    }

    function handleHapusDokumenExisting(id: number) {
        setHapusDokumenIds((prev) => [...prev, id]);
        setDokumenExisting((prev) => prev.filter((d) => d.id !== id));
    }

    function addDokumenBaru() {
        setDokumenBaru((prev) => [...prev, { nama: '', file: null }]);
    }

    function removeDokumenBaru(index: number) {
        setDokumenBaru((prev) => prev.filter((_, i) => i !== index));
    }

    function updateDokumenBaru(index: number, field: 'nama' | 'file', value: string | File | null) {
        setDokumenBaru((prev) =>
            prev.map((dok, i) => (i === index ? { ...dok, [field]: value } : dok)),
        );
    }

    const sections = ['Identitas', 'Alamat', 'Orang Tua', 'Dokumen'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pendaftaran Siswa (PPDB)" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-primary" />
                        <h1 className="text-xl font-semibold">Pendaftaran Siswa (PPDB)</h1>
                        <Badge variant="outline">{total} data</Badge>
                    </div>
                    <Button onClick={openCreate} size="sm">
                        <PlusCircle className="mr-1 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap gap-2">
                    <Select value={filterTahun} onValueChange={setFilterTahun}>
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Semua Tahun Ajaran" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Tahun Ajaran</SelectItem>
                            {tahunAjaranList.map((t) => (
                                <SelectItem key={t.id} value={String(t.id)}>{t.nama}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={filterJurusan} onValueChange={setFilterJurusan}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Semua Jurusan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Jurusan</SelectItem>
                            {jurusanList.map((j) => (
                                <SelectItem key={j.id} value={String(j.id)}>{j.singkatan}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Status</SelectItem>
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
                                <th className="px-4 py-3 text-left font-medium">No. Registrasi</th>
                                <th className="px-4 py-3 text-left font-medium">Nama</th>
                                <th className="px-4 py-3 text-left font-medium">Jurusan</th>
                                <th className="px-4 py-3 text-left font-medium">Tahun Ajaran</th>
                                <th className="px-4 py-3 text-left font-medium">Tgl. Daftar</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3 text-right font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-3 font-mono text-xs">{item.nomor_registrasi}</td>
                                    <td className="px-4 py-3">{item.nama}</td>
                                    <td className="px-4 py-3 text-xs">{item.jurusan?.singkatan}</td>
                                    <td className="px-4 py-3 text-xs">{item.tahun_ajaran?.nama}</td>
                                    <td className="px-4 py-3 text-xs text-muted-foreground">
                                        {format(parseISO(item.tanggal_daftar), 'd MMM yyyy', { locale: localeId })}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant={item.status === 'aktif' ? 'default' : 'secondary'}>
                                            {item.status === 'aktif' ? 'Aktif' : 'Draft'}
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
                                                        onClick={() => setAktivasi(item)}
                                                    >
                                                        <UserCheck className="h-4 w-4 text-green-600" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Edit"
                                                        onClick={() => openEdit(item)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Hapus"
                                                        onClick={() => setDeleteTarget(item)}
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
                                                    <a href={`/siswa/${item.siswa_id}/edit`} target="_blank" rel="noreferrer">
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
                        <div className="py-12 text-center text-muted-foreground">Tidak ada data pendaftaran.</div>
                    )}
                </div>

                {/* Infinite scroll loader */}
                <div ref={loaderRef} className="flex justify-center py-4">
                    {loading && <span className="text-sm text-muted-foreground">Memuat...</span>}
                </div>
            </div>

            {/* Form Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Edit Pendaftaran' : 'Tambah Pendaftaran Baru'}</DialogTitle>
                    </DialogHeader>

                    {/* Section tabs */}
                    <div className="flex gap-1 border-b pb-2">
                        {sections.map((s, i) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setActiveSection(i)}
                                className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                                    activeSection === i
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Section 0: Identitas */}
                    {activeSection === 0 && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2 grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label>Tahun Ajaran *</Label>
                                    <Select value={form.data.tahun_ajaran_id} onValueChange={(v) => form.setData('tahun_ajaran_id', v)}>
                                        <SelectTrigger><SelectValue placeholder="Pilih tahun ajaran" /></SelectTrigger>
                                        <SelectContent>
                                            {tahunAjaranList.map((t) => (
                                                <SelectItem key={t.id} value={String(t.id)}>{t.nama}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.errors.tahun_ajaran_id && <p className="text-xs text-destructive">{form.errors.tahun_ajaran_id}</p>}
                                </div>
                                <div className="space-y-1">
                                    <Label>Jurusan *</Label>
                                    <Select value={form.data.jurusan_id} onValueChange={(v) => form.setData('jurusan_id', v)}>
                                        <SelectTrigger><SelectValue placeholder="Pilih jurusan" /></SelectTrigger>
                                        <SelectContent>
                                            {jurusanList.map((j) => (
                                                <SelectItem key={j.id} value={String(j.id)}>{j.nama}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.errors.jurusan_id && <p className="text-xs text-destructive">{form.errors.jurusan_id}</p>}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label>No. Registrasi *</Label>
                                <Input value={form.data.nomor_registrasi} onChange={(e) => form.setData('nomor_registrasi', e.target.value)} placeholder="Contoh: PPDB-2026-001" />
                                {form.errors.nomor_registrasi && <p className="text-xs text-destructive">{form.errors.nomor_registrasi}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label>Tanggal Daftar *</Label>
                                <Input type="date" value={form.data.tanggal_daftar} onChange={(e) => form.setData('tanggal_daftar', e.target.value)} />
                                {form.errors.tanggal_daftar && <p className="text-xs text-destructive">{form.errors.tanggal_daftar}</p>}
                            </div>

                            <div className="col-span-2 space-y-1">
                                <Label>Nama Lengkap *</Label>
                                <Input value={form.data.nama} onChange={(e) => form.setData('nama', e.target.value)} placeholder="Sesuai akta lahir, huruf kapital semua" />
                                {form.errors.nama && <p className="text-xs text-destructive">{form.errors.nama}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label>NIK (16 digit) *</Label>
                                <Input value={form.data.nik} onChange={(e) => form.setData('nik', e.target.value)} maxLength={20} placeholder="16 digit" />
                                {form.errors.nik && <p className="text-xs text-destructive">{form.errors.nik}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label>NISN (10 digit)</Label>
                                <Input value={form.data.nisn} onChange={(e) => form.setData('nisn', e.target.value)} maxLength={10} placeholder="10 digit" />
                                {form.errors.nisn && <p className="text-xs text-destructive">{form.errors.nisn}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label>Jenis Kelamin *</Label>
                                <Select value={form.data.jenis_kelamin} onValueChange={(v) => form.setData('jenis_kelamin', v as 'L' | 'P')}>
                                    <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="L">Laki-laki</SelectItem>
                                        <SelectItem value="P">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.jenis_kelamin && <p className="text-xs text-destructive">{form.errors.jenis_kelamin}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label>Agama *</Label>
                                <Select value={form.data.agama} onValueChange={(v) => form.setData('agama', v)}>
                                    <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                                    <SelectContent>
                                        {agamaOptions.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {form.errors.agama && <p className="text-xs text-destructive">{form.errors.agama}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label>Tempat Lahir *</Label>
                                <Input value={form.data.tempat_lahir} onChange={(e) => form.setData('tempat_lahir', e.target.value)} />
                                {form.errors.tempat_lahir && <p className="text-xs text-destructive">{form.errors.tempat_lahir}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label>Tanggal Lahir *</Label>
                                <Input type="date" value={form.data.tanggal_lahir} onChange={(e) => form.setData('tanggal_lahir', e.target.value)} />
                                {form.errors.tanggal_lahir && <p className="text-xs text-destructive">{form.errors.tanggal_lahir}</p>}
                            </div>

                            <div className="col-span-2 space-y-1">
                                <Label>Sekolah Asal *</Label>
                                <Input value={form.data.sekolah_asal} onChange={(e) => form.setData('sekolah_asal', e.target.value)} placeholder="Nama lengkap SMP/MTs asal" />
                                {form.errors.sekolah_asal && <p className="text-xs text-destructive">{form.errors.sekolah_asal}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label>No. Telepon</Label>
                                <Input value={form.data.no_telepon} onChange={(e) => form.setData('no_telepon', e.target.value)} placeholder="08xxxxxxxxxx" />
                            </div>
                            <div className="space-y-1">
                                <Label>No. Registrasi Akta Lahir</Label>
                                <Input value={form.data.no_registrasi_akta} onChange={(e) => form.setData('no_registrasi_akta', e.target.value)} />
                            </div>

                            <div className="col-span-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="penerima_kip"
                                    checked={form.data.penerima_kip}
                                    onChange={(e) => form.setData('penerima_kip', e.target.checked)}
                                />
                                <Label htmlFor="penerima_kip">Penerima KIP (Kartu Indonesia Pintar)</Label>
                            </div>
                            {form.data.penerima_kip && (
                                <div className="col-span-2 space-y-1">
                                    <Label>Nama Tertera di KIP *</Label>
                                    <Input value={form.data.nama_kip} onChange={(e) => form.setData('nama_kip', e.target.value)} />
                                    {form.errors.nama_kip && <p className="text-xs text-destructive">{form.errors.nama_kip}</p>}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Section 1: Alamat */}
                    {activeSection === 1 && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2 space-y-1">
                                <Label>Alamat (Jalan / Dusun) *</Label>
                                <textarea
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                    rows={3}
                                    value={form.data.alamat}
                                    onChange={(e) => form.setData('alamat', e.target.value)}
                                    placeholder="Nama jalan, nomor rumah, dusun"
                                />
                                {form.errors.alamat && <p className="text-xs text-destructive">{form.errors.alamat}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label>RT</Label>
                                <Input value={form.data.rt} onChange={(e) => form.setData('rt', e.target.value)} maxLength={5} placeholder="003" />
                            </div>
                            <div className="space-y-1">
                                <Label>RW</Label>
                                <Input value={form.data.rw} onChange={(e) => form.setData('rw', e.target.value)} maxLength={5} placeholder="005" />
                            </div>

                            <div className="space-y-1">
                                <Label>Kelurahan / Desa</Label>
                                <Input value={form.data.kelurahan} onChange={(e) => form.setData('kelurahan', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Kecamatan</Label>
                                <Input value={form.data.kecamatan} onChange={(e) => form.setData('kecamatan', e.target.value)} />
                            </div>

                            <div className="space-y-1">
                                <Label>Kabupaten / Kota</Label>
                                <Input value={form.data.kabupaten} onChange={(e) => form.setData('kabupaten', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Provinsi</Label>
                                <Input value={form.data.provinsi} onChange={(e) => form.setData('provinsi', e.target.value)} />
                            </div>

                            <div className="space-y-1">
                                <Label>Kode Pos</Label>
                                <Input value={form.data.kode_pos} onChange={(e) => form.setData('kode_pos', e.target.value)} maxLength={10} placeholder="5 digit" />
                            </div>
                        </div>
                    )}

                    {/* Section 2: Orang Tua */}
                    {activeSection === 2 && (
                        <div className="space-y-4">
                            <div>
                                <p className="mb-2 text-sm font-medium text-muted-foreground">Data Ayah Kandung</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2 space-y-1">
                                        <Label>Nama Ayah *</Label>
                                        <Input value={form.data.nama_ayah} onChange={(e) => form.setData('nama_ayah', e.target.value)} />
                                        {form.errors.nama_ayah && <p className="text-xs text-destructive">{form.errors.nama_ayah}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Pekerjaan</Label>
                                        <Input value={form.data.pekerjaan_ayah} onChange={(e) => form.setData('pekerjaan_ayah', e.target.value)} placeholder="PNS, Wiraswasta, dll." />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Pendidikan Terakhir</Label>
                                        <Select value={form.data.pendidikan_ayah} onValueChange={(v) => form.setData('pendidikan_ayah', v)}>
                                            <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                                            <SelectContent>
                                                {pendidikanOptions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <Label>Penghasilan Bulanan</Label>
                                        <Select value={form.data.penghasilan_ayah} onValueChange={(v) => form.setData('penghasilan_ayah', v)}>
                                            <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                                            <SelectContent>
                                                {penghasilanOptions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <p className="mb-2 text-sm font-medium text-muted-foreground">Data Ibu Kandung</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2 space-y-1">
                                        <Label>Nama Ibu *</Label>
                                        <Input value={form.data.nama_ibu} onChange={(e) => form.setData('nama_ibu', e.target.value)} />
                                        {form.errors.nama_ibu && <p className="text-xs text-destructive">{form.errors.nama_ibu}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Pekerjaan</Label>
                                        <Input value={form.data.pekerjaan_ibu} onChange={(e) => form.setData('pekerjaan_ibu', e.target.value)} placeholder="Ibu Rumah Tangga, dll." />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Pendidikan Terakhir</Label>
                                        <Select value={form.data.pendidikan_ibu} onValueChange={(v) => form.setData('pendidikan_ibu', v)}>
                                            <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                                            <SelectContent>
                                                {pendidikanOptions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <Label>Penghasilan Bulanan</Label>
                                        <Select value={form.data.penghasilan_ibu} onValueChange={(v) => form.setData('penghasilan_ibu', v)}>
                                            <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                                            <SelectContent>
                                                {penghasilanOptions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 3: Dokumen */}
                    {activeSection === 3 && (
                        <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">Upload dokumen pendukung (foto/PDF). Maks. 5MB per file.</p>

                            {/* Dokumen existing (saat edit) */}
                            {dokumenExisting.map((dok) => (
                                <div key={dok.id} className="flex items-center gap-2 rounded-md border px-3 py-2">
                                    <span className="flex-1 text-sm">{dok.nama_dokumen}</span>
                                    <a
                                        href={dok.file_url ?? '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-primary underline"
                                    >
                                        Lihat
                                    </a>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleHapusDokumenExisting(dok.id)}
                                    >
                                        <Minus className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}

                            {/* Dokumen baru */}
                            {dokumenBaru.map((dok, i) => (
                                <div key={i} className="flex items-end gap-2">
                                    <div className="flex-1 space-y-1">
                                        <Label>Nama Dokumen</Label>
                                        <Input
                                            value={dok.nama}
                                            onChange={(e) => updateDokumenBaru(i, 'nama', e.target.value)}
                                            placeholder="Kartu Keluarga, Akta Lahir, dll."
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <Label>File</Label>
                                        <Input
                                            type="file"
                                            accept="image/*,.pdf,.doc,.docx"
                                            onChange={(e) => updateDokumenBaru(i, 'file', e.target.files?.[0] ?? null)}
                                        />
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeDokumenBaru(i)}>
                                        <Minus className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}

                            <Button type="button" variant="outline" size="sm" onClick={addDokumenBaru}>
                                <Plus className="mr-1 h-4 w-4" />
                                Tambah Dokumen
                            </Button>
                        </div>
                    )}

                    <DialogFooter className="flex justify-between">
                        <div className="flex gap-2">
                            {activeSection > 0 && (
                                <Button type="button" variant="outline" size="sm" onClick={() => setActiveSection((s) => s - 1)}>
                                    &larr; Sebelumnya
                                </Button>
                            )}
                            {activeSection < sections.length - 1 && (
                                <Button type="button" variant="outline" size="sm" onClick={() => setActiveSection((s) => s + 1)}>
                                    Selanjutnya &rarr;
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
                            <Button type="button" onClick={submitForm} disabled={form.processing}>
                                {editing ? 'Simpan Perubahan' : 'Simpan'}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirm Hapus */}
            <AlertDialog open={!!deleteTarget} onOpenChange={(v) => {
 if (!v) {
setDeleteTarget(null);
} 
}}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Pendaftaran?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Data pendaftaran atas nama <strong>{deleteTarget?.nama}</strong> (No. Reg: {deleteTarget?.nomor_registrasi}) akan dihapus permanen beserta semua dokumen yang terupload.
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
                                        setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
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
            <AlertDialog open={!!aktivasiTarget} onOpenChange={(v) => {
 if (!v) {
setAktivasi(null);
} 
}}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Jadikan Siswa Aktif?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Pendaftaran atas nama <strong>{aktivasiTarget?.nama}</strong> akan diubah menjadi siswa aktif. Data pendaftaran akan terkunci dan tidak dapat diedit lagi.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (!aktivasiTarget) {
return;
}

                                router.post(`/ppdb/${aktivasiTarget.id}/aktivasi`, {}, {
                                    onSuccess: () => {
                                        setAktivasi(null);
                                        router.reload({ only: ['ppdb'] });
                                    },
                                });
                            }}
                        >
                            Ya, Jadikan Siswa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
