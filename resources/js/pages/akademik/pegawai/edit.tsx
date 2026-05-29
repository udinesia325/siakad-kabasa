import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import PhoneInput from '@/components/phone-input';
import {
    JENIS_PEGAWAI_LABEL,
    STATUS_KEPEGAWAIAN_LABEL,
} from '@/types/akademik';
import type {
    JenisPegawai,
    Pegawai,
    StatusKepegawaian,
} from '@/types/akademik';

type Props = { pegawai: Pegawai };

export default function PegawaiEdit({ pegawai }: Props) {
    const form = useForm({
        nik: pegawai.nik ?? '',
        nuptk: pegawai.nuptk ?? '',
        nama: pegawai.nama,
        jenis_kelamin: pegawai.jenis_kelamin,
        jenis: pegawai.jenis,
        jabatan: pegawai.jabatan ?? '',
        status_kepegawaian: (pegawai.status_kepegawaian ?? '') as
            | StatusKepegawaian
            | '',
        no_hp: pegawai.no_hp ?? '',
        email: pegawai.email ?? '',
        alamat: pegawai.alamat ?? '',
        aktif: pegawai.aktif,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.put(`/pegawai/${pegawai.id}`);
    }

    return (
        <>
            <Head title={`Edit ${pegawai.nama}`} />
            <div className="flex max-w-2xl flex-col gap-6 p-4">
                <h1 className="text-2xl font-semibold">Edit Pegawai</h1>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>NIK</Label>
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
                            <Label>NUPTK</Label>
                            <Input
                                value={form.data.nuptk}
                                onChange={(e) =>
                                    form.setData('nuptk', e.target.value)
                                }
                            />
                            {form.errors.nuptk && (
                                <p className="text-sm text-destructive">
                                    {form.errors.nuptk}
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
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>
                                Jenis Pegawai{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={form.data.jenis}
                                onValueChange={(v) =>
                                    form.setData('jenis', v as JenisPegawai)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(JENIS_PEGAWAI_LABEL).map(
                                        ([k, v]) => (
                                            <SelectItem key={k} value={k}>
                                                {v}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Jabatan</Label>
                            <Input
                                value={form.data.jabatan}
                                onChange={(e) =>
                                    form.setData('jabatan', e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Status Kepegawaian</Label>
                            <Select
                                value={form.data.status_kepegawaian}
                                onValueChange={(v) =>
                                    form.setData(
                                        'status_kepegawaian',
                                        v as StatusKepegawaian,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(
                                        STATUS_KEPEGAWAIAN_LABEL,
                                    ).map(([k, v]) => (
                                        <SelectItem key={k} value={k}>
                                            {v}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>No HP</Label>
                            <PhoneInput
                                value={form.data.no_hp}
                                onChange={(v) => form.setData('no_hp', v)}
                            />
                            {form.errors.no_hp && (
                                <p className="text-sm text-destructive">
                                    {form.errors.no_hp}
                                </p>
                            )}
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
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Alamat</Label>
                        <Textarea
                            value={form.data.alamat}
                            onChange={(e) =>
                                form.setData('alamat', e.target.value)
                            }
                        />
                    </div>

                    <div className="flex items-center gap-3 rounded-md border p-3">
                        <Switch
                            id="aktif"
                            checked={form.data.aktif}
                            onCheckedChange={(v) => form.setData('aktif', v)}
                        />
                        <div className="flex flex-col">
                            <Label htmlFor="aktif" className="cursor-pointer">
                                Status Aktif
                            </Label>
                            <span className="text-xs text-muted-foreground">
                                Pegawai non-aktif tidak muncul di pemilihan wali
                                kelas
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={form.processing}>
                            Simpan Perubahan
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get('/pegawai')}
                        >
                            Batal
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

PegawaiEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pegawai', href: '/pegawai' },
        { title: 'Edit', href: '#' },
    ],
};
