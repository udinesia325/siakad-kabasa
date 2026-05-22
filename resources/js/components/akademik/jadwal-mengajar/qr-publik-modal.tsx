import { Copy, ExternalLink, Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
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
    onOpenChange: (v: boolean) => void;
    kelasNama: string;
    publicUrl: string;
};

export default function QrPublikModal({
    open,
    onOpenChange,
    kelasNama,
    publicUrl,
}: Props) {
    const [copied, setCopied] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    const copy = async () => {
        await navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const print = () => {
        const node = printRef.current;

        if (!node) {
            return;
        }

        const w = window.open('', '_blank', 'width=600,height=600');

        if (!w) {
            return;
        }

        w.document
            .write(`<!doctype html><html><head><title>QR Jadwal ${kelasNama}</title>
<style>
body { font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; padding: 32px; }
h1 { font-size: 20px; margin: 0 0 4px; }
p { font-size: 12px; color: #666; margin: 0 0 16px; word-break: break-all; text-align: center; }
svg { width: 320px; height: 320px; }
</style></head><body>
<h1>Jadwal Kelas ${kelasNama}</h1>
<p>${publicUrl}</p>
${node.innerHTML}
<script>window.onload = () => { window.print(); }</script>
</body></html>`);
        w.document.close();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>QR Code Jadwal Publik</DialogTitle>
                    <DialogDescription>
                        Cetak QR code ini untuk ditempel di mading. Siswa bisa
                        scan untuk melihat jadwal kelas {kelasNama} tanpa login.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                    <div
                        ref={printRef}
                        className="rounded-lg border bg-white p-4"
                    >
                        <QRCodeSVG value={publicUrl} size={224} level="M" />
                    </div>
                    <div className="w-full">
                        <p className="mb-1 text-xs font-medium text-muted-foreground">
                            URL Publik
                        </p>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 truncate rounded bg-muted px-2 py-1.5 text-xs">
                                {publicUrl}
                            </code>
                            <Button size="sm" variant="outline" onClick={copy}>
                                <Copy className="mr-1 h-3.5 w-3.5" />
                                {copied ? 'Disalin' : 'Salin'}
                            </Button>
                        </div>
                    </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-2">
                    <Button variant="outline" asChild>
                        <a
                            href={publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="mr-1 h-4 w-4" />
                            Buka tab baru
                        </a>
                    </Button>
                    <Button onClick={print}>
                        <Printer className="mr-1 h-4 w-4" />
                        Cetak
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
