import { Head, Link } from '@inertiajs/react';
import { GraduationCap, UserSquare2 } from 'lucide-react';
import PublikLayout from '@/layouts/publik-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type Props = {
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikJadwalIndex({ tahunAjaranAktif, namaSekolah }: Props) {
    return (
        <PublikLayout
            tahunAjaranAktif={tahunAjaranAktif}
            breadcrumbs={[{ label: 'Jadwal' }]}
        >
            <Head title={`Jadwal — ${namaSekolah}`} />
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-semibold md:text-3xl">Jadwal</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Pilih jenis jadwal yang ingin Anda lihat
                </p>
            </div>
            {!tahunAjaranAktif && (
                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    Belum ada tahun ajaran aktif. Hubungi admin sekolah.
                </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
                <Link href="/jadwal/kelas" className="group">
                    <Card className="h-full transition group-hover:border-primary group-hover:shadow-md">
                        <CardHeader>
                            <GraduationCap className="h-10 w-10 text-primary" />
                            <CardTitle className="mt-3">Jadwal Kelas</CardTitle>
                            <CardDescription>
                                Untuk siswa — lihat jadwal pelajaran per kelas
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Pilih kelas, lalu lihat jadwal pelajaran sepekan dalam bentuk grid.
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/jadwal/guru" className="group">
                    <Card className="h-full transition group-hover:border-primary group-hover:shadow-md">
                        <CardHeader>
                            <UserSquare2 className="h-10 w-10 text-primary" />
                            <CardTitle className="mt-3">Jadwal Guru</CardTitle>
                            <CardDescription>
                                Untuk guru — lihat jadwal mengajar per hari
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Cari nama guru, lalu lihat jadwal mengajarnya dikelompokkan per hari.
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </PublikLayout>
    );
}
