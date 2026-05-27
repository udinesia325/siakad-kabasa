import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { isCancel } from 'axios';
import axios from '@/lib/axios';

type RiwayatEntry = {
    id: number;
    mulai: string;
    selesai: string | null;
    alasan: string;
    keterangan: string | null;
    kelas: {
        nama: string;
        tingkat: string;
        tahun_ajaran: { nama: string } | null;
    };
};

const ALASAN_LABEL: Record<string, string> = {
    pendaftaran: 'Pendaftaran',
    naik_kelas: 'Naik Kelas',
    mutasi: 'Mutasi',
    koreksi: 'Koreksi',
    tinggal_kelas: 'Tinggal Kelas',
};

type Props = {
    open: boolean;
    onClose: () => void;
    siswaId: number;
    siswaNama: string;
};

export function RiwayatKelasModal({
    open,
    onClose,
    siswaId,
    siswaNama,
}: Props) {
    const [riwayat, setRiwayat] = useState<RiwayatEntry[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            return;
        }

        const controller = new AbortController();

        const doFetch = async () => {
            setLoading(true);

            try {
                const { data } = await axios.get<{ riwayat: RiwayatEntry[] }>(
                    `/siswa/${siswaId}/riwayat-kelas`,
                    { signal: controller.signal },
                );

                setRiwayat(data.riwayat);
            } catch (err) {
                if (isCancel(err)) return;
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void doFetch();

        return () => controller.abort();
    }, [open, siswaId]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Riwayat Kelas: {siswaNama}</DialogTitle>
                </DialogHeader>

                {loading && (
                    <p className="text-sm text-muted-foreground">Memuat...</p>
                )}
                {!loading && riwayat.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Belum ada riwayat.
                    </p>
                )}

                <ul className="flex flex-col gap-2 text-sm">
                    {riwayat.map((r) => (
                        <li key={r.id} className="rounded border p-3">
                            <div className="font-medium">
                                {r.kelas.nama}
                                {r.kelas.tahun_ajaran &&
                                    ` — ${r.kelas.tahun_ajaran.nama}`}
                            </div>
                            <div className="text-muted-foreground">
                                {new Date(r.mulai).toLocaleDateString('id-ID')}{' '}
                                →{' '}
                                {r.selesai
                                    ? new Date(r.selesai).toLocaleDateString(
                                          'id-ID',
                                      )
                                    : 'Sekarang'}{' '}
                                • {ALASAN_LABEL[r.alasan] ?? r.alasan}
                            </div>
                            {r.keterangan && (
                                <div className="mt-1 italic">
                                    "{r.keterangan}"
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    );
}
