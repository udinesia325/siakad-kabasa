import { Head } from '@inertiajs/react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
    kategoris: { id: number; nama: string }[];
    filters: {
        jenis?: string;
        kondisi?: string;
        kategori_id?: string;
        dari?: string;
        sampai?: string;
        status?: string;
    };
};

const reportTypes = [
    {
        value: 'barang',
        label: 'Inventaris Barang',
        description: 'Daftar semua barang dengan kondisi, kategori, lokasi, harga, dan tahun pembelian.',
    },
    {
        value: 'peminjaman',
        label: 'Peminjaman per Periode',
        description: 'Rekap peminjaman barang dengan filter rentang tanggal dan status.',
    },
    {
        value: 'kerusakan',
        label: 'Kerusakan & Maintenance',
        description: 'Laporan kerusakan dan jadwal maintenance dalam dua sheet/halaman terpisah.',
    },
];

export default function LaporanIndex({ kategoris }: Props) {
    const [jenis, setJenis] = useState('barang');
    const [kondisi, setKondisi] = useState('');
    const [kategoriId, setKategoriId] = useState('');
    const [dari, setDari] = useState('');
    const [sampai, setSampai] = useState('');
    const [status, setStatus] = useState('');

    function buildQuery(): string {
        const params = new URLSearchParams({ jenis });

        if (jenis === 'barang') {
            if (kondisi) {
params.set('kondisi', kondisi);
}

            if (kategoriId) {
params.set('kategori_id', kategoriId);
}
        } else if (jenis === 'peminjaman') {
            if (dari) {
params.set('dari', dari);
}

            if (sampai) {
params.set('sampai', sampai);
}

            if (status) {
params.set('status', status);
}
        } else if (jenis === 'kerusakan') {
            if (status) {
params.set('status', status);
}
        }

        return params.toString();
    }

    function handleExport(format: 'excel' | 'pdf') {
        const query = buildQuery();
        const url =
            format === 'excel'
                ? `/sarpras/laporan/export/excel?${query}`
                : `/sarpras/laporan/export/pdf?${query}`;
        window.open(url, '_blank');
    }

    const selectedType = reportTypes.find((r) => r.value === jenis);

    return (
        <>
            <Head title="Laporan Sarpras" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Laporan Sarpras</h1>
                    <p className="text-muted-foreground text-sm">Pilih jenis laporan dan filter, lalu export ke Excel atau PDF.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Jenis Laporan</CardTitle>
                        <CardDescription>{selectedType?.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Jenis Laporan</Label>
                            <Select
                                value={jenis}
                                onValueChange={(val) => {
                                    setJenis(val);
                                    setKondisi('');
                                    setKategoriId('');
                                    setDari('');
                                    setSampai('');
                                    setStatus('');
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {reportTypes.map((r) => (
                                        <SelectItem key={r.value} value={r.value}>
                                            {r.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {jenis === 'barang' && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Kondisi</Label>
                                    <Select value={kondisi} onValueChange={setKondisi}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua kondisi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="baik">Baik</SelectItem>
                                            <SelectItem value="rusak_ringan">Rusak Ringan</SelectItem>
                                            <SelectItem value="rusak_berat">Rusak Berat</SelectItem>
                                            <SelectItem value="hilang">Hilang</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Kategori</Label>
                                    <Select value={kategoriId} onValueChange={setKategoriId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {kategoris.map((k) => (
                                                <SelectItem key={k.id} value={String(k.id)}>
                                                    {k.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {jenis === 'peminjaman' && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label>Dari Tanggal</Label>
                                    <Input type="date" value={dari} onChange={(e) => setDari(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sampai Tanggal</Label>
                                    <Input type="date" value={sampai} onChange={(e) => setSampai(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="menunggu">Menunggu</SelectItem>
                                            <SelectItem value="disetujui">Disetujui</SelectItem>
                                            <SelectItem value="ditolak">Ditolak</SelectItem>
                                            <SelectItem value="dikembalikan">Dikembalikan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {jenis === 'kerusakan' && (
                            <div className="max-w-xs space-y-2">
                                <Label>Status Kerusakan</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dilaporkan">Dilaporkan</SelectItem>
                                        <SelectItem value="diproses">Diproses</SelectItem>
                                        <SelectItem value="menunggu_sparepart">Menunggu Sparepart</SelectItem>
                                        <SelectItem value="selesai">Selesai</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3 pt-2">
                            <Button onClick={() => handleExport('excel')} variant="outline" className="gap-2">
                                <FileSpreadsheet className="h-4 w-4" />
                                Export Excel
                            </Button>
                            <Button onClick={() => handleExport('pdf')} variant="outline" className="gap-2">
                                <FileText className="h-4 w-4" />
                                Export PDF
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Download className="h-4 w-4" />
                            Panduan Laporan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-muted-foreground space-y-1 text-sm">
                            <li>
                                <strong>Inventaris Barang</strong> — mencakup semua barang: kode, nama, kategori, lokasi, kondisi, jumlah, tahun beli, dan harga.
                            </li>
                            <li>
                                <strong>Peminjaman per Periode</strong> — filter berdasarkan rentang tanggal pinjam dan status peminjaman.
                            </li>
                            <li>
                                <strong>Kerusakan &amp; Maintenance</strong> — Excel berisi dua sheet terpisah; PDF menampilkan kedua tabel dalam satu halaman landscape.
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

LaporanIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sarpras', href: '/sarpras' },
        { title: 'Laporan', href: '/sarpras/laporan' },
    ],
};
