import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    MoreVertical,
    Pencil,
    PlusCircle,
    Trash2,
    User,
    Users,
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
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Kelas, TahunAjaran } from '@/types/akademik';
import { ForcePromoteModal } from './force-promote-modal';
import { LogOperasiModal } from './log-operasi-modal';
import { LuluskanModal } from './luluskan-modal';
import { NaikKelasModal } from './naik-kelas-modal';

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    total: number;
};

type PegawaiOption = { id: number; nama: string; nip: string | null };
type KelasDenganWali = {
    id: number;
    nama: string;
    pegawai_id: number;
    tahun_ajaran_id: number;
    tahun_ajaran?: { id: number; nama: string };
};

type Props = {
    kelas: Paginated<Kelas>;
    tahunAjaran: TahunAjaran[];
    kelasTujuanOptions: Kelas[];
    pegawaiOptions: PegawaiOption[];
    kelasDenganWali: KelasDenganWali[];
    filters: { search?: string };
};

export default function KelasIndex({
    kelas,
    tahunAjaran: tahunAjaranProp,
    kelasTujuanOptions,
    pegawaiOptions,
    kelasDenganWali,
    filters,
}: Props) {
    const { errors } = usePage().props as unknown as { errors: Record<string, string> };
    const [tahunAjaran, setTahunAjaran] =
        useState<TahunAjaran[]>(tahunAjaranProp);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Kelas | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Kelas | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [items, setItems] = useState<Kelas[]>(kelas.data);
    const [currentPage, setCurrentPage] = useState(kelas.current_page);
    const [lastPage, setLastPage] = useState(kelas.last_page);
    const [loading, setLoading] = useState(false);
    const [activeKelasForModal, setActiveKelasForModal] =
        useState<Kelas | null>(null);
    const [naikOpen, setNaikOpen] = useState(false);
    const [luluskanOpen, setLuluskanOpen] = useState(false);
    const [logOpen, setLogOpen] = useState(false);
    const [forceOpen, setForceOpen] = useState(false);
    const [forceData, setForceData] = useState<{
        jumlah: number;
        payload: { kelas_tujuan_id: number; keterangan: string };
    } | null>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const form = useForm({
        nama: '',
        tingkat: '' as 'X' | 'XI' | 'XII',
        tahun_ajaran_id: 0,
        pegawai_id: null as number | null,
    });

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        setItems(kelas.data);
        setCurrentPage(kelas.current_page);
        setLastPage(kelas.last_page);
    }, [kelas]);
    /* eslint-enable react-hooks/set-state-in-effect */

    function loadNextPage() {
        if (loading || currentPage >= lastPage) {
            return;
        }

        setLoading(true);
        router.get(
            '/kelas',
            { search: search || undefined, page: currentPage + 1 },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['kelas'],
                onSuccess: (page) => {
                    const next = (page.props as unknown as Props).kelas;
                    setItems((prev) => [...prev, ...next.data]);
                    setCurrentPage(next.current_page);
                    setLastPage(next.last_page);
                    setLoading(false);
                },
            },
        );
    }

    const handleSearch = useCallback((value: string) => {
        setSearch(value);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            router.get(
                '/kelas',
                { search: value || undefined },
                {
                    preserveState: true,
                    preserveScroll: false,
                    only: ['kelas', 'filters'],
                    onSuccess: (page) => {
                        const fresh = (page.props as unknown as Props).kelas;
                        setItems(fresh.data);
                        setCurrentPage(fresh.current_page);
                        setLastPage(fresh.last_page);
                    },
                },
            );
        }, 300);
    }, []);

    useEffect(() => {
        const sentinel = sentinelRef.current;

        if (!sentinel) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadNextPage();
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [currentPage, lastPage, loading, search]);

    function openCreate() {
        form.reset();
        setEditing(null);
        router.reload({
            only: ['tahunAjaran'],
            onSuccess: (page) => {
                setTahunAjaran((page.props as unknown as Props).tahunAjaran);
            },
        });
        setOpen(true);
    }

    function openEdit(k: Kelas) {
        form.setData({
            nama: k.nama,
            tingkat: k.tingkat,
            tahun_ajaran_id: k.tahun_ajaran_id,
            pegawai_id: k.pegawai_id,
        });
        setEditing(k);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/kelas/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/kelas', { onSuccess: () => setOpen(false) });
        }
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        form.delete(`/kelas/${deleteTarget.id}`);
        setDeleteTarget(null);
    }

    return (
        <>
            <Head title="Kelas" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Kelas</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                {errors.delete && (
                    <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        {errors.delete}
                    </div>
                )}

                <Input
                    placeholder="Cari nama kelas..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="max-w-xs"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((k) => {
                        const accentColor =
                            k.tingkat === 'X'
                                ? '#3b82f6'
                                : k.tingkat === 'XI'
                                  ? '#8b5cf6'
                                  : '#10b981';
                        const badgeClass =
                            k.tingkat === 'X'
                                ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900'
                                : k.tingkat === 'XI'
                                  ? 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900'
                                  : 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900';

                        return (
                            <Card
                                key={k.id}
                                className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                style={{
                                    borderLeft: `3px solid ${accentColor}`,
                                }}
                            >
                                <CardContent className="px-4 pt-4 pb-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-base font-semibold leading-tight">
                                                {k.nama}
                                            </p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                {k.tahun_ajaran?.nama}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className={`shrink-0 text-xs font-medium ${badgeClass}`}
                                        >
                                            {k.tingkat}
                                        </Badge>
                                    </div>
                                    <div className="mt-3 flex items-center gap-1.5 text-muted-foreground">
                                        <User className="h-3.5 w-3.5" />
                                        <span className="truncate text-xs">
                                            {k.wali_kelas ? (
                                                <span className="font-medium text-foreground">
                                                    {k.wali_kelas.nama}
                                                </span>
                                            ) : (
                                                <span className="italic">
                                                    Belum ada wali
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="mt-1.5 flex items-center gap-1.5 text-muted-foreground">
                                        <Users className="h-3.5 w-3.5" />
                                        <span className="text-xs">
                                            <span className="font-medium text-foreground">
                                                {k.siswa_count ?? 0}
                                            </span>{' '}
                                            siswa aktif
                                        </span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-0.5 border-t px-3 py-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 opacity-60 transition-opacity group-hover:opacity-100"
                                        onClick={() => openEdit(k)}
                                        title="Edit"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                    {(k.siswa_count ?? 0) === 0 ? (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-destructive opacity-60 transition-opacity hover:text-destructive group-hover:opacity-100"
                                            onClick={() => setDeleteTarget(k)}
                                            title="Hapus"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 cursor-not-allowed opacity-30"
                                            disabled
                                            title="Tidak dapat dihapus — masih memiliki siswa"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    )}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 opacity-60 transition-opacity group-hover:opacity-100"
                                                title="Operasi"
                                            >
                                                <MoreVertical className="h-3.5 w-3.5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {k.tingkat !== 'XII' && (
                                                <DropdownMenuItem
                                                    onSelect={() => {
                                                        setActiveKelasForModal(
                                                            k,
                                                        );
                                                        setNaikOpen(true);
                                                    }}
                                                >
                                                    Naik Kelas →
                                                </DropdownMenuItem>
                                            )}
                                            {k.tingkat === 'XII' && (
                                                <DropdownMenuItem
                                                    onSelect={() => {
                                                        setActiveKelasForModal(
                                                            k,
                                                        );
                                                        setLuluskanOpen(true);
                                                    }}
                                                >
                                                    Luluskan Angkatan
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                onSelect={() => {
                                                    setActiveKelasForModal(k);
                                                    setLogOpen(true);
                                                }}
                                            >
                                                Riwayat Operasi
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardFooter>
                            </Card>
                        );
                    })}

                    {items.length === 0 && !loading && (
                        <p className="col-span-full text-center text-muted-foreground">
                            Belum ada data kelas.
                        </p>
                    )}
                </div>

                {loading && (
                    <p className="text-center text-sm text-muted-foreground">
                        Memuat...
                    </p>
                )}

                <div ref={sentinelRef} className="h-1" />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Kelas' : 'Tambah Kelas'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nama Kelas</Label>
                                <Input
                                    placeholder="contoh: X RPL 1"
                                    value={form.data.nama}
                                    onChange={(e) =>
                                        form.setData('nama', e.target.value)
                                    }
                                />
                                {form.errors.nama && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.nama}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Tingkat</Label>
                                <Select
                                    value={form.data.tingkat}
                                    onValueChange={(v) =>
                                        form.setData(
                                            'tingkat',
                                            v as 'X' | 'XI' | 'XII',
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tingkat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="X">X</SelectItem>
                                        <SelectItem value="XI">XI</SelectItem>
                                        <SelectItem value="XII">XII</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.tingkat && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.tingkat}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Tahun Ajaran</Label>
                                <Select
                                    value={String(form.data.tahun_ajaran_id)}
                                    onValueChange={(v) =>
                                        form.setData(
                                            'tahun_ajaran_id',
                                            Number(v),
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tahun ajaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tahunAjaran.map((ta) => (
                                            <SelectItem
                                                key={ta.id}
                                                value={String(ta.id)}
                                            >
                                                {ta.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.tahun_ajaran_id && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.tahun_ajaran_id}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>
                                    Wali Kelas{' '}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        (opsional)
                                    </span>
                                </Label>
                                <Select
                                    value={
                                        form.data.pegawai_id == null
                                            ? '_none'
                                            : String(form.data.pegawai_id)
                                    }
                                    onValueChange={(v) =>
                                        form.setData(
                                            'pegawai_id',
                                            v === '_none' ? null : Number(v),
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih wali kelas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="_none">
                                            — Belum ditentukan —
                                        </SelectItem>
                                        {pegawaiOptions.map((p) => (
                                            <SelectItem
                                                key={p.id}
                                                value={String(p.id)}
                                            >
                                                {p.nama}
                                                {p.nip && ` · ${p.nip}`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {(() => {
                                    if (form.data.pegawai_id == null)
                                        return null;
                                    const konflik = kelasDenganWali.filter(
                                        (kw) =>
                                            kw.pegawai_id ===
                                                form.data.pegawai_id &&
                                            kw.id !== editing?.id,
                                    );
                                    if (konflik.length === 0) return null;
                                    return (
                                        <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                                            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                            <div>
                                                Guru ini sudah menjadi wali kelas
                                                di:{' '}
                                                <span className="font-medium">
                                                    {konflik
                                                        .map(
                                                            (kw) =>
                                                                `${kw.nama}${kw.tahun_ajaran ? ` (${kw.tahun_ajaran.nama})` : ''}`,
                                                        )
                                                        .join(', ')}
                                                </span>
                                                . Anda tetap bisa menyimpan jika
                                                memang disengaja.
                                            </div>
                                        </div>
                                    );
                                })()}
                                {form.errors.pegawai_id && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.pegawai_id}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Kelas</AlertDialogTitle>
                        <AlertDialogDescription>
                            Yakin ingin menghapus kelas{' '}
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

            {activeKelasForModal && (
                <>
                    <NaikKelasModal
                        open={naikOpen}
                        onClose={() => setNaikOpen(false)}
                        kelasAsal={activeKelasForModal}
                        kelasTujuanOptions={kelasTujuanOptions}
                        onConflict={(jumlah, payload) => {
                            setForceData({ jumlah, payload });
                            setNaikOpen(false);
                            setForceOpen(true);
                        }}
                    />
                    {forceData && (
                        <ForcePromoteModal
                            open={forceOpen}
                            onClose={() => {
                                setForceOpen(false);
                                setForceData(null);
                            }}
                            kelasAsalId={activeKelasForModal.id}
                            kelasTujuanNama={
                                kelasTujuanOptions.find(
                                    (k) =>
                                        k.id ===
                                        forceData.payload.kelas_tujuan_id,
                                )?.nama ?? ''
                            }
                            jumlahSiswaTujuan={forceData.jumlah}
                            payload={forceData.payload}
                        />
                    )}
                    <LuluskanModal
                        open={luluskanOpen}
                        onClose={() => setLuluskanOpen(false)}
                        kelasId={activeKelasForModal.id}
                        kelasNama={activeKelasForModal.nama}
                        siswaCount={activeKelasForModal.siswa_count ?? 0}
                    />
                    <LogOperasiModal
                        open={logOpen}
                        onClose={() => setLogOpen(false)}
                        kelasId={activeKelasForModal.id}
                    />
                </>
            )}
        </>
    );
}

KelasIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelas', href: '/kelas' },
    ],
};
