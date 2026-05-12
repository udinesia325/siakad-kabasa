import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { ImportPreviewResult } from '@/types/akademik';

type Props = {
    open: boolean;
    result: ImportPreviewResult | null;
    onClose: () => void;
};

export function ImportPreviewDialog({ open, result, onClose }: Props) {
    const [saving, setSaving] = useState(false);

    if (!result) return null;

    const hasValid = result.valid.length > 0;

    function handleSimpan() {
        setSaving(true);
        router.post(
            '/siswa/import/store',
            { data: result!.valid },
            {
                onFinish: () => setSaving(false),
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="flex max-h-[90vh] w-full max-w-4xl flex-col">
                <DialogHeader>
                    <DialogTitle>Preview Import Siswa</DialogTitle>
                </DialogHeader>

                <div className="flex flex-1 flex-col gap-4 overflow-hidden">
                    {/* Tabel Valid */}
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-green-700">
                            Data Valid ({result.valid.length} baris)
                        </p>
                        <div className="max-h-60 overflow-y-auto rounded-md border">
                            <Table>
                                <TableHeader className="sticky top-0 bg-green-50">
                                    <TableRow>
                                        <TableHead className="w-10">No</TableHead>
                                        <TableHead>NIK</TableHead>
                                        <TableHead>NISN</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>JK</TableHead>
                                        <TableHead>Kelas</TableHead>
                                        <TableHead>RFID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {result.valid.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                                Tidak ada data valid
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        result.valid.map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell className="font-mono text-xs">{row.nik}</TableCell>
                                                <TableCell className="font-mono text-xs">{row.nisn ?? '-'}</TableCell>
                                                <TableCell>{row.nama}</TableCell>
                                                <TableCell>{row.jenis_kelamin}</TableCell>
                                                <TableCell>{row.kelas_label ?? '-'}</TableCell>
                                                <TableCell className="font-mono text-xs">{row.rfid ?? '-'}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Tabel Invalid */}
                    {result.invalid.length > 0 && (
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-red-700">
                                Data Tidak Valid ({result.invalid.length} baris)
                            </p>
                            <div className="max-h-60 overflow-y-auto rounded-md border">
                                <Table>
                                    <TableHeader className="sticky top-0 bg-red-50">
                                        <TableRow>
                                            <TableHead className="w-10">No</TableHead>
                                            <TableHead>NIK</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>JK</TableHead>
                                            <TableHead>Kelas</TableHead>
                                            <TableHead>Alasan</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {result.invalid.map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell className="font-mono text-xs">{row.nik ?? '-'}</TableCell>
                                                <TableCell>{row.nama ?? '-'}</TableCell>
                                                <TableCell>{row.jenis_kelamin ?? '-'}</TableCell>
                                                <TableCell>{row.kelas ?? '-'}</TableCell>
                                                <TableCell>
                                                    {row.alasan.length === 1 ? (
                                                        <span className="text-sm text-red-600">{row.alasan[0]}</span>
                                                    ) : (
                                                        <ul className="list-disc pl-4 text-sm text-red-600">
                                                            {row.alasan.map((a, j) => <li key={j}>{a}</li>)}
                                                        </ul>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="mt-2 gap-2">
                    <Button variant="outline" onClick={onClose} disabled={saving}>
                        Tutup
                    </Button>
                    <Button
                        onClick={handleSimpan}
                        disabled={!hasValid || saving}
                        className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Menyimpan...
                            </>
                        ) : (
                            `Simpan ${result.valid.length} Data`
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
