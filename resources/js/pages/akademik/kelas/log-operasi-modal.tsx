import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type LogEntry = {
    id: number;
    tipe: 'naik_kelas' | 'lulus_angkatan';
    tanggal_efektif: string;
    jumlah_siswa: number;
    dipaksa: boolean;
    keterangan: string | null;
    kelas_asal: { nama: string };
    kelas_tujuan: { nama: string } | null;
    oleh: { name: string };
};

type Props = {
    open: boolean;
    onClose: () => void;
    kelasId: number;
};

export function LogOperasiModal({ open, onClose, kelasId }: Props) {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(false);

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (!open) {
            return;
        }

        setLoading(true);
        fetch(`/kelas/${kelasId}/log-operasi`, {
            headers: { Accept: 'application/json' },
        })
            .then((r) => r.json() as Promise<{ logs: LogEntry[] }>)
            .then((data) => setLogs(data.logs))
            .finally(() => setLoading(false));
    }, [open, kelasId]);
    /* eslint-enable react-hooks/set-state-in-effect */

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Riwayat Operasi Kelas</DialogTitle>
                </DialogHeader>

                {loading && (
                    <p className="text-sm text-muted-foreground">Memuat...</p>
                )}
                {!loading && logs.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Belum ada operasi tercatat.
                    </p>
                )}

                <ul className="flex flex-col gap-2 text-sm">
                    {logs.map((log) => (
                        <li key={log.id} className="rounded border p-3">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">
                                    {log.tipe === 'naik_kelas'
                                        ? `${log.kelas_asal.nama} → ${log.kelas_tujuan?.nama ?? '?'}`
                                        : `Lulus: ${log.kelas_asal.nama}`}
                                </span>
                                {log.dipaksa && (
                                    <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                                        Dipaksa
                                    </span>
                                )}
                            </div>
                            <div className="text-muted-foreground">
                                {log.jumlah_siswa} siswa •{' '}
                                {new Date(log.tanggal_efektif).toLocaleString(
                                    'id-ID',
                                )}{' '}
                                • oleh {log.oleh.name}
                            </div>
                            {log.keterangan && (
                                <div className="mt-1 italic">
                                    "{log.keterangan}"
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    );
}
