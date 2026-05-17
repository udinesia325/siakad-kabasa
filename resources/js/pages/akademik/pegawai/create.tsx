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
import { Textarea } from '@/components/ui/textarea';
import {
    JENIS_PEGAWAI_LABEL,
    STATUS_KEPEGAWAIAN_LABEL
    
    
} from '@/types/akademik';
import type {JenisPegawai, StatusKepegawaian} from '@/types/akademik';

export default function PegawaiCreate() {
    const form = useForm({
        nip: '',
        nuptk: '',
        nama: '',
        jenis_kelamin: '' as 'L' | 'P' | '',
        jenis: 'guru' as JenisPegawai,
        jabatan: '',
        status_kepegawaian: '' as StatusKepegawaian | '',
        no_hp: '',
        email: '',
        alamat: '',
        aktif: true,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post('/pegawai');
    }

    return (
        <>
            <Head title="Tambah Pegawai" />
            <div className="flex max-w-2xl flex-col gap-6 p-4">
                <h1 className="text-2xl font-semibold">Tambah Pegawai</h1>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>NIP</Label>
                            <Input
                                value={form.data.nip}
                                onChange={(e) => form.setData('nip', e.target.value)}
                                placeholder="Nomor Induk Pegawai"
                            />
                            {form.errors.nip && (
                                <p className="text-sm text-destructive">{form.errors.nip}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>NUPTK</Label>
                            <Input
                                value={form.data.nuptk}
                                onChange={(e) => form.setData('nuptk', e.target.value)}
                                placeholder="Nomor Unik PTK"
                            />
                            {form.errors.nuptk && (
                                <p className="text-sm text-destructive">{form.errors.nuptk}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>
                            Nama Lengkap <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            value={form.data.nama}
                            onChange={(e) => form.setData('nama', e.target.value)}
                            placeholder="Nama lengkap"
                        />
                        {form.errors.nama && (
                            <p className="text-sm text-destructive">{form.errors.nama}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>
                                Jenis Kelamin <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={form.data.jenis_kelamin}
                                onValueChange={(v) =>
                                    form.setData('jenis_kelamin', v as 'L' | 'P')
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih" />
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
                            <Label>
                                Jenis Pegawai <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={form.data.jenis}
                                onValueChange={(v) =>
                                    form.setData('jenis', v as JenisPegawai)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(JENIS_PEGAWAI_LABEL).map(([k, v]) => (
                                        <SelectItem key={k} value={k}>
                                            {v}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.jenis && (
                                <p className="text-sm text-destructive">{form.errors.jenis}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Jabatan</Label>
                            <Input
                                value={form.data.jabatan}
                                onChange={(e) => form.setData('jabatan', e.target.value)}
                                placeholder="Contoh: Wakil Kepala Kurikulum"
                            />
                            {form.errors.jabatan && (
                                <p className="text-sm text-destructive">
                                    {form.errors.jabatan}
                                </p>
                            )}
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
                                    {Object.entries(STATUS_KEPEGAWAIAN_LABEL).map(
                                        ([k, v]) => (
                                            <SelectItem key={k} value={k}>
                                                {v}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                            {form.errors.status_kepegawaian && (
                                <p className="text-sm text-destructive">
                                    {form.errors.status_kepegawaian}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>No HP</Label>
                            <Input
                                value={form.data.no_hp}
                                onChange={(e) => form.setData('no_hp', e.target.value)}
                                placeholder="08xxxxxxxxxx"
                            />
                            {form.errors.no_hp && (
                                <p className="text-sm text-destructive">{form.errors.no_hp}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                placeholder="email@sekolah.sch.id"
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
                            onChange={(e) => form.setData('alamat', e.target.value)}
                            placeholder="Alamat lengkap"
                        />
                        {form.errors.alamat && (
                            <p className="text-sm text-destructive">{form.errors.alamat}</p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={form.processing}>
                            Simpan
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

PegawaiCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pegawai', href: '/pegawai' },
        { title: 'Tambah', href: '/pegawai/create' },
    ],
};
