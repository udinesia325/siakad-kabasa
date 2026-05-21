import { Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';
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
    barangNama: string;
    barangKode: string;
};

export default function QrBarangModal({ open, onOpenChange, barangNama, barangKode }: Props) {
    const printRef = useRef<HTMLDivElement>(null);

    const print = () => {
        const node = printRef.current;

        if (!node) {
return;
}

        const w = window.open('', '_blank', 'width=600,height=600');

        if (!w) {
return;
}

        w.document.write(`<!doctype html><html><head><title>QR Barang ${barangKode}</title>
<style>
body { font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; padding: 32px; }
h1 { font-size: 18px; margin: 0 0 4px; }
p { font-size: 12px; color: #666; margin: 0 0 16px; }
svg { width: 280px; height: 280px; }
</style></head><body>
<h1>${barangNama}</h1>
<p>Kode: ${barangKode}</p>
${node.innerHTML}
<script>window.onload = () => { window.print(); }</script>
</body></html>`);
        w.document.close();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>QR Code Barang</DialogTitle>
                    <DialogDescription>Cetak QR code ini untuk ditempel pada barang.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                    <div ref={printRef} className="rounded-lg border bg-white p-4">
                        <QRCodeSVG value={barangKode} size={200} level="M" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium">{barangNama}</p>
                        <code className="text-xs text-muted-foreground">{barangKode}</code>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={print}>
                        <Printer className="mr-1 h-4 w-4" />
                        Cetak
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
