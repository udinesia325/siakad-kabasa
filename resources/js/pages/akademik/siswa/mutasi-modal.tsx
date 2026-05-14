import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import type { Kelas, Siswa } from '@/types/akademik';

type AksiValue =
    | 'pindah_kelas'
    | 'turunkan_tingkat'
    | 'set_lulus'
    | 'set_keluar'
    | 'reaktivasi';

const AKSI_LABEL: Record<AksiValue, string> = {
    pindah_kelas: 'Pindah Kelas (TA sama)',
    turunkan_tingkat: 'Turunkan Tingkat',
    set_lulus: 'Set Lulus',
    set_keluar: 'Set Keluar',
    reaktivasi: 'Reaktivasi',
};

const AKSI_BUTUH_TUJUAN: AksiValue[] = [
    'pindah_kelas',
    'turunkan_tingkat',
    'reaktivasi',
];

type Props = {
    open: boolean;
    onClose: () => void;
    siswa: Siswa;
    kelasOptions: Kelas[];
};

export function MutasiModal({ open, onClose, siswa, kelasOptions }: Props) {
    const [aksi, setAksi] = useState<AksiValue | ''>('');
    const [kelasTujuanId, setKelasTujuanId] = useState<string>('');
    const [keterangan, setKeterangan] = useState('');
    const [processing, setProcessing] = useState(false);

    const opsiAksi = useMemo<AksiValue[]>(() => {
        if (siswa.status === 'aktif') {
            return [
                'pindah_kelas',
                'turunkan_tingkat',
                'set_lulus',
                'set_keluar',
            ];
        }

        return ['reaktivasi'];
    }, [siswa.status]);

    const butuhTujuan =
        aksi !== '' && AKSI_BUTUH_TUJUAN.includes(aksi as AksiValue);

    const submit = () => {
        if (!aksi) {
            return;
        }

        setProcessing(true);
        router.post(
            `/siswa/${siswa.id}/mutasi`,
            {
                aksi,
                kelas_tujuan_id: butuhTujuan ? Number(kelasTujuanId) : null,
                keterangan,
            },
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
                    <DialogTitle>Mutasi Siswa: {siswa.nama}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-2">
                    <div className="flex flex-col gap-2">
                        <Label>Aksi</Label>
                        <Select
                            value={aksi}
                            onValueChange={(v) => setAksi(v as AksiValue)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih aksi" />
                            </SelectTrigger>
                            <SelectContent>
                                {opsiAksi.map((a) => (
                                    <SelectItem key={a} value={a}>
                                        {AKSI_LABEL[a]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {butuhTujuan && (
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
                                    {kelasOptions.map((k) => (
                                        <SelectItem
                                            key={k.id}
                                            value={String(k.id)}
                                        >
                                            {k.nama} — {k.tahun_ajaran?.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <Label>Keterangan (opsional)</Label>
                        <Textarea
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button
                        onClick={submit}
                        disabled={
                            !aksi ||
                            (butuhTujuan && !kelasTujuanId) ||
                            processing
                        }
                    >
                        Simpan Mutasi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
