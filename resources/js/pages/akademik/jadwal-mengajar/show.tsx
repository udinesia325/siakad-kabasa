import { Head, router, useForm } from '@inertiajs/react';
import { Plus, QrCode, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import QrPublikModal from '@/components/akademik/jadwal-mengajar/qr-publik-modal';
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
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Hari =
    | 'senin'
    | 'selasa'
    | 'rabu'
    | 'kamis'
    | 'jumat'
    | 'sabtu'
    | 'minggu';

type JamPelajaran = {
    id: number;
    nomor: number;
    jam_mulai: string;
    jam_selesai: string;
    keterangan: string | null;
};

type JadwalCell = {
    id: number;
    mata_pelajaran: { id: number; kode: string; nama: string };
    pegawai: { id: number; nama: string };
};

type Kelas = {
    id: number;
    nama: string;
    tingkat: string;
    tahun_ajaran?: { id: number; nama: string };
};

type MapelOpt = { id: number; kode: string; nama: string };
type PegawaiOpt = { id: number; nama: string };

type Props = {
    kelas: Kelas;
    hariList: Hari[];
    jamPelajaran: JamPelajaran[];
    jadwal: Record<string, JadwalCell[]>; // "hari|jamId" → 1 entry (array karena Laravel groupBy)
    mataPelajaran: MapelOpt[];
    pengampuMap: Record<number, PegawaiOpt[]>;
};

const HARI_LABEL: Record<Hari, string> = {
    senin: 'Senin',
    selasa: 'Selasa',
    rabu: 'Rabu',
    kamis: 'Kamis',
    jumat: 'Jumat',
    sabtu: 'Sabtu',
    minggu: 'Minggu',
};

const SUBJECT_COLORS = [
    'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-200',
    'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-200',
    'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-200',
    'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950/60 dark:border-purple-800 dark:text-purple-200',
    'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/60 dark:border-rose-800 dark:text-rose-200',
    'bg-cyan-50 border-cyan-200 text-cyan-900 dark:bg-cyan-950/60 dark:border-cyan-800 dark:text-cyan-200',
    'bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950/60 dark:border-orange-800 dark:text-orange-200',
];

function colorForMapel(id: number): string {
    return SUBJECT_COLORS[id % SUBJECT_COLORS.length];
}

function formatJam(t: string): string {
    return t.slice(0, 5);
}

export default function JadwalMengajarShow({
    kelas,
    hariList,
    jamPelajaran,
    jadwal,
    mataPelajaran,
    pengampuMap,
}: Props) {
    const [editTarget, setEditTarget] = useState<{
        hari: Hari;
        jam: JamPelajaran;
        existing: JadwalCell | null;
    } | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<JadwalCell | null>(null);
    const [qrOpen, setQrOpen] = useState(false);

    function getCell(hari: Hari, jamId: number): JadwalCell | null {
        const arr = jadwal[`${hari}|${jamId}`];

        return arr?.[0] ?? null;
    }

    function hapus() {
        if (!deleteTarget) {
            return;
        }

        router.delete(`/jadwal-mengajar/${kelas.id}/${deleteTarget.id}`, {
            preserveScroll: true,
            onFinish: () => setDeleteTarget(null),
        });
    }

    return (
        <>
            <Head title={`Jadwal — ${kelas.nama}`} />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{kelas.nama}</h1>
                        <p className="text-sm text-muted-foreground">
                            Jadwal Mengajar · {kelas.tahun_ajaran?.nama}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQrOpen(true)}
                    >
                        <QrCode className="mr-1 h-4 w-4" />
                        QR Publik
                    </Button>
                </div>

                {jamPelajaran.length === 0 ? (
                    <div className="rounded-lg border p-10 text-center text-muted-foreground">
                        Belum ada jam pelajaran aktif. Atur dulu di{' '}
                        <a href="/jam-pelajaran" className="underline">
                            Master Jam Pelajaran
                        </a>
                        .
                    </div>
                ) : (
                    <div className="overflow-auto rounded-lg border">
                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-muted">
                                    <th className="sticky left-0 z-10 min-w-[120px] bg-muted px-3 py-2 text-left font-medium shadow-[1px_0_0_0_var(--border)]">
                                        Jam
                                    </th>
                                    {hariList.map((h) => (
                                        <th
                                            key={h}
                                            className="min-w-[150px] px-2 py-2 text-center font-medium"
                                        >
                                            {HARI_LABEL[h]}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {jamPelajaran.map((jam, i) => {
                                    const rowBg =
                                        i % 2 === 0
                                            ? 'bg-white dark:bg-zinc-900'
                                            : 'bg-zinc-50 dark:bg-zinc-800/60';

                                    return (
                                        <tr key={jam.id} className={rowBg}>
                                            <td
                                                className={`sticky left-0 z-10 px-3 py-2 font-medium shadow-[1px_0_0_0_var(--border)] ${rowBg}`}
                                            >
                                                <div className="font-semibold">
                                                    Jam {jam.nomor}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {formatJam(jam.jam_mulai)}–
                                                    {formatJam(jam.jam_selesai)}
                                                </div>
                                                {jam.keterangan && (
                                                    <div className="mt-0.5 text-xs text-muted-foreground italic">
                                                        {jam.keterangan}
                                                    </div>
                                                )}
                                            </td>
                                            {hariList.map((h) => {
                                                const cell = getCell(h, jam.id);

                                                return (
                                                    <td
                                                        key={h}
                                                        className="px-1.5 py-1.5 align-middle"
                                                    >
                                                        {cell ? (
                                                            <button
                                                                onClick={() =>
                                                                    setEditTarget(
                                                                        {
                                                                            hari: h,
                                                                            jam,
                                                                            existing:
                                                                                cell,
                                                                        },
                                                                    )
                                                                }
                                                                className={`group relative w-full rounded-md border px-2 py-1.5 text-left transition-opacity hover:opacity-90 ${colorForMapel(cell.mata_pelajaran.id)}`}
                                                            >
                                                                <div className="text-xs leading-tight font-semibold">
                                                                    {
                                                                        cell
                                                                            .mata_pelajaran
                                                                            .nama
                                                                    }
                                                                </div>
                                                                <div className="mt-0.5 truncate text-[11px] opacity-80">
                                                                    {
                                                                        cell
                                                                            .pegawai
                                                                            .nama
                                                                    }
                                                                </div>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    setEditTarget(
                                                                        {
                                                                            hari: h,
                                                                            jam,
                                                                            existing:
                                                                                null,
                                                                        },
                                                                    )
                                                                }
                                                                className="flex h-full min-h-[44px] w-full items-center justify-center rounded-md border border-dashed border-zinc-300 text-zinc-400 transition-colors hover:border-primary hover:text-primary dark:border-zinc-700"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {editTarget && (
                <AssignModal
                    open={!!editTarget}
                    onClose={() => setEditTarget(null)}
                    kelasId={kelas.id}
                    hari={editTarget.hari}
                    jam={editTarget.jam}
                    existing={editTarget.existing}
                    mataPelajaran={mataPelajaran}
                    pengampuMap={pengampuMap}
                    onDelete={(cell) => {
                        setEditTarget(null);
                        setDeleteTarget(cell);
                    }}
                />
            )}

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(v) => !v && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus jadwal?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Jadwal{' '}
                            <strong>{deleteTarget?.mata_pelajaran.nama}</strong>{' '}
                            ({deleteTarget?.pegawai.nama}) akan dihapus dari
                            slot ini.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={hapus}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <QrPublikModal
                open={qrOpen}
                onOpenChange={setQrOpen}
                kelasNama={kelas.nama}
                publicUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/jadwal/kelas/${kelas.id}`}
            />
        </>
    );
}

function AssignModal({
    open,
    onClose,
    kelasId,
    hari,
    jam,
    existing,
    mataPelajaran,
    pengampuMap,
    onDelete,
}: {
    open: boolean;
    onClose: () => void;
    kelasId: number;
    hari: Hari;
    jam: JamPelajaran;
    existing: JadwalCell | null;
    mataPelajaran: MapelOpt[];
    pengampuMap: Record<number, PegawaiOpt[]>;
    onDelete: (cell: JadwalCell) => void;
}) {
    const form = useForm({
        hari,
        jam_pelajaran_id: jam.id,
        mata_pelajaran_id: existing?.mata_pelajaran.id ?? 0,
        pegawai_id: existing?.pegawai.id ?? 0,
    });

    // Reset pegawai_id ketika mapel berubah dan pegawai existing tidak termasuk pengampu
    useEffect(() => {
        const list = pengampuMap[form.data.mata_pelajaran_id] ?? [];

        if (
            form.data.pegawai_id &&
            !list.some((p) => p.id === form.data.pegawai_id)
        ) {
            form.setData('pegawai_id', 0);
        }
    }, [form.data.mata_pelajaran_id]);

    const guruOptions = pengampuMap[form.data.mata_pelajaran_id] ?? [];

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post(`/jadwal-mengajar/${kelasId}`, {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {existing ? 'Edit Jadwal' : 'Tambah Jadwal'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="rounded-md bg-muted px-3 py-2 text-sm">
                        <p>
                            <strong>{HARI_LABEL[hari]}</strong> · Jam ke-
                            {jam.nomor} ({formatJam(jam.jam_mulai)}–
                            {formatJam(jam.jam_selesai)})
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Mata Pelajaran</Label>
                        <Select
                            value={
                                form.data.mata_pelajaran_id
                                    ? String(form.data.mata_pelajaran_id)
                                    : ''
                            }
                            onValueChange={(v) =>
                                form.setData('mata_pelajaran_id', Number(v))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih mata pelajaran" />
                            </SelectTrigger>
                            <SelectContent>
                                {mataPelajaran.map((mp) => (
                                    <SelectItem
                                        key={mp.id}
                                        value={String(mp.id)}
                                    >
                                        {mp.kode} — {mp.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.errors.mata_pelajaran_id && (
                            <p className="text-sm text-destructive">
                                {form.errors.mata_pelajaran_id}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>
                            Guru Pengajar{' '}
                            {form.data.mata_pelajaran_id > 0 &&
                                guruOptions.length === 0 && (
                                    <span className="text-xs text-destructive">
                                        — belum ada pengampu untuk mapel ini
                                    </span>
                                )}
                        </Label>
                        <Select
                            value={
                                form.data.pegawai_id
                                    ? String(form.data.pegawai_id)
                                    : ''
                            }
                            onValueChange={(v) =>
                                form.setData('pegawai_id', Number(v))
                            }
                            disabled={
                                !form.data.mata_pelajaran_id ||
                                guruOptions.length === 0
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih guru" />
                            </SelectTrigger>
                            <SelectContent>
                                {guruOptions.map((p) => (
                                    <SelectItem key={p.id} value={String(p.id)}>
                                        {p.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.errors.pegawai_id && (
                            <p className="text-sm text-destructive">
                                {form.errors.pegawai_id}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="flex sm:justify-between">
                        <div>
                            {existing && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onDelete(existing)}
                                    className="text-destructive"
                                >
                                    <Trash2 className="mr-1 h-4 w-4" />
                                    Hapus
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    !form.data.mata_pelajaran_id ||
                                    !form.data.pegawai_id ||
                                    form.processing
                                }
                            >
                                Simpan
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

JadwalMengajarShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jadwal Mengajar', href: '/jadwal-mengajar' },
        { title: 'Detail', href: '#' },
    ],
};
