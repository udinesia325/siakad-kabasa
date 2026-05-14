import { router } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type Props = {
    open: boolean;
    onClose: () => void;
    kelasAsalId: number;
    kelasTujuanNama: string;
    jumlahSiswaTujuan: number;
    payload: { kelas_tujuan_id: number; keterangan: string };
};

export function ForcePromoteModal({
    open,
    onClose,
    kelasAsalId,
    kelasTujuanNama,
    jumlahSiswaTujuan,
    payload,
}: Props) {
    const [setuju, setSetuju] = useState(false);
    const [processing, setProcessing] = useState(false);

    const submit = () => {
        if (!setuju) {
            return;
        }

        setProcessing(true);
        router.post(
            `/kelas/${kelasAsalId}/naik-kelas`,
            { ...payload, paksa: true },
            {
                onFinish: () => {
                    setProcessing(false);
                    onClose();
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="size-5 text-amber-600" />
                        Kelas Tujuan Belum Kosong
                    </DialogTitle>
                    <DialogDescription>
                        Kelas <b>{kelasTujuanNama}</b> masih berisi{' '}
                        {jumlahSiswaTujuan} siswa aktif yang seharusnya sudah
                        dinaikkan atau diluluskan terlebih dahulu.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 py-2 text-sm">
                    <p className="text-muted-foreground">
                        Disarankan: Selesaikan kelas tujuan dulu (Luluskan XII →
                        naikkan XI → naikkan X).
                    </p>
                    <div className="rounded border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950">
                        <b>Risiko jika dipaksa:</b>
                        <ul className="ml-5 list-disc">
                            <li>
                                Siswa lama dan baru akan tercampur dalam satu
                                kelas
                            </li>
                            <li>
                                Data rekap kehadiran kelas akan bercampur antar
                                angkatan
                            </li>
                            <li>Operasi sulit di-rollback</li>
                        </ul>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2">
                        <Checkbox
                            checked={setuju}
                            onCheckedChange={(v) => setSetuju(Boolean(v))}
                        />
                        Saya mengerti risikonya dan ingin tetap melanjutkan
                    </label>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={submit}
                        disabled={!setuju || processing}
                    >
                        Paksa Naikkan Kelas
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
