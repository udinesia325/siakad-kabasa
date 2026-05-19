import { Head } from '@inertiajs/react';
import PublikLayout from '@/layouts/publik-layout';
import JadwalHariSection, {
    type JadwalItem,
} from '@/components/publik/jadwal/jadwal-hari-section';

type Hari = 'senin' | 'selasa' | 'rabu' | 'kamis' | 'jumat' | 'sabtu' | 'minggu';

type Props = {
    pegawai: { id: number; nama: string };
    hariList: Hari[];
    jadwalPerHari: Record<string, JadwalItem[]>;
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikGuruShow({
    pegawai,
    hariList,
    jadwalPerHari,
    tahunAjaranAktif,
    namaSekolah,
}: Props) {
    const totalJadwal = hariList.reduce(
        (sum, h) => sum + (jadwalPerHari[h]?.length ?? 0),
        0,
    );

    return (
        <PublikLayout
            tahunAjaranAktif={tahunAjaranAktif}
            namaSekolah={namaSekolah}
            breadcrumbs={[
                { label: 'Jadwal', href: '/jadwal' },
                { label: 'Guru', href: '/jadwal/guru' },
                { label: pegawai.nama },
            ]}
        >
            <Head title={`Jadwal Mengajar ${pegawai.nama} — ${namaSekolah}`} />
            <div className="mb-6">
                <h1 className="text-2xl font-semibold md:text-3xl">{pegawai.nama}</h1>
                <p className="text-sm text-muted-foreground">
                    Jadwal Mengajar
                    {tahunAjaranAktif && ` · Tahun Ajaran ${tahunAjaranAktif.nama}`}
                </p>
            </div>
            {totalJadwal === 0 ? (
                <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                    Belum ada jadwal untuk guru ini di tahun ajaran aktif.
                </div>
            ) : (
                <div className="space-y-4">
                    {hariList.map((h) => (
                        <JadwalHariSection
                            key={h}
                            hari={h}
                            items={jadwalPerHari[h] ?? []}
                        />
                    ))}
                </div>
            )}
        </PublikLayout>
    );
}
