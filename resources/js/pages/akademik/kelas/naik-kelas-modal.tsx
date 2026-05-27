import { router } from '@inertiajs/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { Textarea } from '@/components/ui/textarea';
import axios from '@/lib/axios';
import type { Kelas } from '@/types/akademik';

type Props = {
    open: boolean;
    onClose: () => void;
    kelasAsal: Kelas;
    kelasTujuanOptions: Kelas[];
    onConflict: (
        jumlah: number,
        payload: { kelas_tujuan_id: number; keterangan: string },
    ) => void;
};

export function NaikKelasModal({
    open,
    onClose,
    kelasAsal,
    kelasTujuanOptions,
    onConflict,
}: Props) {
    const [kelasTujuanId, setKelasTujuanId] = useState<string>('');
    const [keterangan, setKeterangan] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const eligibleTujuan = kelasTujuanOptions.filter(
        (k) =>
            (k.tingkat_id ?? 0) > (kelasAsal.tingkat_id ?? 0) &&
            k.tahun_ajaran_id !== kelasAsal.tahun_ajaran_id,
    );

    const submit = async () => {
        if (!kelasTujuanId) {
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            await axios.post(`/kelas/${kelasAsal.id}/naik-kelas`, {
                kelas_tujuan_id: Number(kelasTujuanId),
                keterangan,
                paksa: false,
            });

            onClose();
            router.reload();
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                if (err.response.status === 409) {
                    const data = err.response.data as { jumlah: number };
                    onConflict(data.jumlah, {
                        kelas_tujuan_id: Number(kelasTujuanId),
                        keterangan,
                    });

                    return;
                }

                if (err.response.status === 422) {
                    const data = err.response.data as {
                        errors?: Record<string, string[]>;
                        message?: string;
                    };
                    const firstError =
                        Object.values(data.errors ?? {})[0]?.[0] ??
                        data.message;
                    setError(firstError ?? 'Validasi gagal.');

                    return;
                }
            }

            setError('Terjadi kesalahan saat memproses naik kelas.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Naikkan Kelas: {kelasAsal.nama}</DialogTitle>
                    <DialogDescription>
                        Jumlah siswa aktif yang akan dinaikkan:{' '}
                        {kelasAsal.siswa_count ?? 0} siswa.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-2">
                    <div className="flex flex-col gap-2">
                        <Label>Kelas Tujuan</Label>
                        <Select
                            value={kelasTujuanId}
                            onValueChange={setKelasTujuanId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih kelas tujuan" />
                            </SelectTrigger>
                            <SelectContent>
                                {eligibleTujuan.map((k) => (
                                    <SelectItem key={k.id} value={String(k.id)}>
                                        {k.nama} — {k.tahun_ajaran?.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {eligibleTujuan.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                Belum ada kelas tujuan yang tersedia (harus
                                tingkat lebih tinggi & tahun ajaran berbeda).
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Keterangan (opsional)</Label>
                        <Textarea
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button
                        onClick={submit}
                        disabled={!kelasTujuanId || processing}
                    >
                        Naikkan Kelas
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
