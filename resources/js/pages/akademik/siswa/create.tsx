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
import type { Kelas } from '@/types/akademik';

type Props = { kelas: Kelas[] };

export default function SiswaCreate({ kelas }: Props) {
    const form = useForm({
        nik: '',
        nisn: '',
        nama: '',
        jenis_kelamin: '' as 'L' | 'P',
        email: '',
        alamat: '',
        kelas_ajaran_id: '' as string,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post('/siswa');
    }

    return (
        <>
            <Head title="Tambah Siswa" />
            <div className="flex max-w-2xl flex-col gap-6 p-4">
                <h1 className="text-2xl font-semibold">Tambah Siswa</h1>
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
                                placeholder="16 digit NIK"
                            />
                            {form.errors.nik && (
                                <p className="text-sm text-destructive">
                                    {form.errors.nik}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>
                                NISN{' '}
                                <span className="text-xs text-muted-foreground">
                                    (opsional)
                                </span>
                            </Label>
                            <Input
                                value={form.data.nisn}
                                onChange={(e) =>
                                    form.setData('nisn', e.target.value)
                                }
                                placeholder="Nomor Induk Siswa Nasional"
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
                            placeholder="Nama lengkap siswa"
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
                            <Label>Kelas</Label>
                            <Select
                                value={form.data.kelas_ajaran_id}
                                onValueChange={(v) =>
                                    form.setData('kelas_ajaran_id', v)
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
                            {form.errors.kelas_ajaran_id && (
                                <p className="text-sm text-destructive">
                                    {form.errors.kelas_ajaran_id}
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
                            placeholder="email@sekolah.sch.id"
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
                            placeholder="Alamat lengkap"
                        />
                        {form.errors.alamat && (
                            <p className="text-sm text-destructive">
                                {form.errors.alamat}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={form.processing}>
                            Simpan
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
            </div>
        </>
    );
}

SiswaCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Siswa', href: '/siswa' },
        { title: 'Tambah', href: '/siswa/create' },
    ],
};
