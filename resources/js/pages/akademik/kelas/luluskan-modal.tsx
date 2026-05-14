import { router } from '@inertiajs/react';
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
import { Textarea } from '@/components/ui/textarea';

type Props = {
    open: boolean;
    onClose: () => void;
    kelasId: number;
    kelasNama: string;
    siswaCount: number;
};

export function LuluskanModal({
    open,
    onClose,
    kelasId,
    kelasNama,
    siswaCount,
}: Props) {
    const [keterangan, setKeterangan] = useState('');
    const [processing, setProcessing] = useState(false);

    const submit = () => {
        setProcessing(true);
        router.post(
            `/kelas/${kelasId}/luluskan`,
            { keterangan },
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
                    <DialogTitle>Luluskan Angkatan: {kelasNama}</DialogTitle>
                    <DialogDescription>
                        {siswaCount} siswa aktif akan ditandai sebagai lulus.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2 py-2">
                    <Label>Keterangan (opsional)</Label>
                    <Textarea
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button onClick={submit} disabled={processing}>
                        Luluskan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
