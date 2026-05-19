import { Head } from '@inertiajs/react';
import PublikLayout from '@/layouts/publik-layout';
import KelasCard from '@/components/publik/jadwal/kelas-card';

type Kelas = { id: number; nama: string; tingkat: string };

type Props = {
    kelas: Kelas[];
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikKelasIndex({ kelas, tahunAjaranAktif, namaSekolah }: Props) {
    const perTingkat = kelas.reduce<Record<string, Kelas[]>>((acc, k) => {
        (acc[k.tingkat] ??= []).push(k);
        return acc;
    }, {});
    const tingkatKeys = Object.keys(perTingkat).sort();

    return (
        <PublikLayout
            tahunAjaranAktif={tahunAjaranAktif}
            namaSekolah={namaSekolah}
            breadcrumbs={[
                { label: 'Jadwal', href: '/jadwal' },
                { label: 'Kelas' },
            ]}
        >
            <Head title={`Jadwal Kelas — ${namaSekolah}`} />
            <h1 className="mb-1 text-2xl font-semibold">Jadwal Kelas</h1>
            <p className="mb-6 text-sm text-muted-foreground">
                Pilih kelas untuk melihat jadwal pelajaran sepekan.
            </p>

            {kelas.length === 0 ? (
                <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                    Belum ada kelas di tahun ajaran aktif.
                </div>
            ) : (
                <div className="space-y-8">
                    {tingkatKeys.map((tk) => (
                        <section key={tk}>
                            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                Tingkat {tk}
                            </h2>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {perTingkat[tk].map((k) => (
                                    <KelasCard key={k.id} {...k} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </PublikLayout>
    );
}
