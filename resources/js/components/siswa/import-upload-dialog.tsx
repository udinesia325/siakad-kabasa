import { AxiosError } from 'axios';
import { AlertCircle, FileSpreadsheet, Upload } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import axios from '@/lib/axios';
import type { ImportPreviewResult } from '@/types/akademik';

type Props = {
    open: boolean;
    onClose: () => void;
    onPreviewReady: (result: ImportPreviewResult) => void;
};

export function ImportUploadDialog({ open, onClose, onPreviewReady }: Props) {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback(
        async (file: File) => {
            const allowed = [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
            ];

            if (
                !allowed.includes(file.type) &&
                !file.name.match(/\.(xlsx|xls)$/i)
            ) {
                setError('File harus berformat Excel (.xlsx atau .xls)');

                return;
            }

            setError(null);
            setUploading(true);

            const formData = new FormData();
            formData.append('file', file);

            try {
                const { data } = await axios.post<ImportPreviewResult>(
                    '/siswa/import/preview',
                    formData,
                );

                onPreviewReady(data);
                onClose();
            } catch (err) {
                if (err instanceof AxiosError && err.response?.data?.error) {
                    setError(err.response.data.error);
                } else {
                    setError('Gagal menghubungi server. Coba lagi.');
                }
            } finally {
                setUploading(false);
            }
        },
        [onClose, onPreviewReady],
    );

    const onDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];

            if (file) {
                handleFile(file);
            }
        },
        [handleFile],
    );

    function handleClose() {
        setError(null);
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5 text-green-600" />
                        Import Siswa
                    </DialogTitle>
                </DialogHeader>

                <div
                    className={`mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors ${
                        dragging
                            ? 'border-green-500 bg-green-50'
                            : 'border-muted-foreground/30 hover:border-muted-foreground/60'
                    } cursor-pointer`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
                    <p className="text-sm font-medium">
                        Seret file ke sini atau klik untuk memilih
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Format: .xlsx, .xls
                    </p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (file) {
                                handleFile(file);
                            }

                            e.target.value = '';
                        }}
                    />
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Gagal memproses file</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <p className="text-center text-sm text-muted-foreground">
                    Belum memiliki format import siswa?{' '}
                    <a
                        href="/siswa/import/template"
                        className="text-green-600 underline underline-offset-2 hover:text-green-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Unduh
                    </a>
                </p>

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={uploading}
                    >
                        Batal
                    </Button>
                    {uploading && (
                        <Button disabled>
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Memproses...
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
