import { Head, router, useForm } from '@inertiajs/react';
import { Check, CreditCard } from 'lucide-react';
import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

type Props = { siswa: Siswa; kelas: Kelas[] };

export default function SiswaEdit({ siswa, kelas }: Props) {
    const form = useForm({
        nik: siswa.nik,
        nisn: siswa.nisn ?? '',
        nama: siswa.nama,
        jenis_kelamin: siswa.jenis_kelamin,
        email: siswa.email ?? '',
        alamat: siswa.alamat ?? '',
        kelas_id: siswa.kelas_id ? String(siswa.kelas_id) : '',
    });

    const rfidForm = useForm({ kode_rfid: siswa.rfid?.kode_rfid ?? '' });
    const rfidInputRef = useRef<HTMLInputElement>(null);
    const [rfidScanned, setRfidScanned] = useState(false);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.patch(`/siswa/${siswa.id}`);
    }

    function submitRfid(e: React.FormEvent) {
        e.preventDefault();
        rfidForm.post(`/siswa/${siswa.id}/assign-rfid`);
    }

    // Scanner RFID HID mengirim "<id><Enter>". Setiap Enter berarti
    // satu pembacaan kartu utuh — ambil value-nya lalu kosongkan input
    // supaya scanner yang re-trigger cepat (kartu nempel terus) tidak
    // menumpuk karakter "0007174622 0007174622 …" di buffer.
    function handleRfidKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const kode = (e.currentTarget.value || '').trim();

            if (kode) {
                rfidForm.setData('kode_rfid', kode);
                setRfidScanned(true);
            }

            // Kosongkan input agar scan berikutnya tidak menumpuk
            e.currentTarget.value = '';
        }
    }

    return (
        <>
            <Head title={`Edit Siswa — ${siswa.nama}`} />
            <div className="flex max-w-2xl flex-col gap-6 p-4">
                <h1 className="text-2xl font-semibold">Edit Siswa</h1>

                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>
                                NIK <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                value={form.data.nik}
                                onChange={(e) =>
                                    form.setData('nik', e.target.value)
                                }
                            />
                            {form.errors.nik && (
                                <p className="text-sm text-destructive">
                                    {form.errors.nik}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>NISN</Label>
                            <Input
                                value={form.data.nisn}
                                onChange={(e) =>
                                    form.setData('nisn', e.target.value)
                                }
                            />
                            {form.errors.nisn && (
                                <p className="text-sm text-destructive">
                                    {form.errors.nisn}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>
                            Nama Lengkap{' '}
                            <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            value={form.data.nama}
                            onChange={(e) =>
                                form.setData('nama', e.target.value)
                            }
                        />
                        {form.errors.nama && (
                            <p className="text-sm text-destructive">
                                {form.errors.nama}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>
                                Jenis Kelamin{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={form.data.jenis_kelamin}
                                onValueChange={(v) =>
                                    form.setData(
                                        'jenis_kelamin',
                                        v as 'L' | 'P',
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">Laki-laki</SelectItem>
                                    <SelectItem value="P">Perempuan</SelectItem>
                                </SelectContent>
                            </Select>
                            {form.errors.jenis_kelamin && (
                                <p className="text-sm text-destructive">
                                    {form.errors.jenis_kelamin}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Kelas</Label>
                            <Select
                                value={form.data.kelas_id}
                                onValueChange={(v) =>
                                    form.setData('kelas_id', v)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kelas" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kelas.map((k) => (
                                        <SelectItem
                                            key={k.id}
                                            value={String(k.id)}
                                        >
                                            {k.nama} ({k.tahun_ajaran?.nama})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.kelas_id && (
                                <p className="text-sm text-destructive">
                                    {form.errors.kelas_id}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData('email', e.target.value)
                            }
                        />
                        {form.errors.email && (
                            <p className="text-sm text-destructive">
                                {form.errors.email}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Alamat</Label>
                        <Textarea
                            value={form.data.alamat}
                            onChange={(e) =>
                                form.setData('alamat', e.target.value)
                            }
                        />
                        {form.errors.alamat && (
                            <p className="text-sm text-destructive">
                                {form.errors.alamat}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={form.processing}>
                            Simpan Perubahan
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get('/siswa')}
                        >
                            Batal
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Kartu RFID
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {siswa.rfid && (
                            <p className="mb-3 text-sm text-muted-foreground">
                                Kartu aktif:{' '}
                                <Badge variant="outline" className="font-mono">
                                    {siswa.rfid.kode_rfid}
                                </Badge>
                            </p>
                        )}
                        <form
                            onSubmit={submitRfid}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex flex-col gap-1.5">
                                <Label
                                    htmlFor="kode_rfid_scan"
                                    className="text-xs text-muted-foreground"
                                >
                                    Tempelkan kartu pada pemindai
                                </Label>
                                <div className="relative max-w-xs">
                                    <Input
                                        id="kode_rfid_scan"
                                        ref={rfidInputRef}
                                        placeholder="Menunggu kartu…"
                                        defaultValue=""
                                        onKeyDown={handleRfidKeyDown}
                                        autoComplete="off"
                                        className="pr-9 font-mono"
                                    />
                                    <span
                                        className={`absolute top-1/2 right-2.5 size-2 -translate-y-1/2 rounded-full ${
                                            rfidScanned
                                                ? 'bg-emerald-500'
                                                : 'animate-pulse bg-sky-500'
                                        }`}
                                        aria-hidden
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs text-muted-foreground">
                                    Kode kartu yang akan disimpan
                                </Label>
                                <div className="flex gap-2">
                                    <div className="relative max-w-xs flex-1">
                                        <Input
                                            value={rfidForm.data.kode_rfid}
                                            onChange={(e) => {
                                                rfidForm.setData(
                                                    'kode_rfid',
                                                    e.target.value,
                                                );
                                                setRfidScanned(false);
                                            }}
                                            placeholder="Belum ada kartu"
                                            className={
                                                rfidScanned
                                                    ? 'border-emerald-500 pr-9 font-mono ring-1 ring-emerald-500/40'
                                                    : 'pr-9 font-mono'
                                            }
                                        />
                                        {rfidScanned && (
                                            <Check className="absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-emerald-500" />
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        disabled={
                                            rfidForm.processing ||
                                            !rfidForm.data.kode_rfid
                                        }
                                    >
                                        {siswa.rfid
                                            ? 'Ganti Kartu'
                                            : 'Assign Kartu'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                        {rfidForm.errors.kode_rfid && (
                            <p className="mt-1 text-sm text-destructive">
                                {rfidForm.errors.kode_rfid}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SiswaEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Siswa', href: '/siswa' },
        { title: 'Edit', href: '#' },
    ],
};
