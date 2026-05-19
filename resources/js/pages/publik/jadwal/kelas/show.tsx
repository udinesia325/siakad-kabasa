import { Head } from '@inertiajs/react';
import PublikLayout from '@/layouts/publik-layout';
import JadwalGridReadOnly from '@/components/publik/jadwal/jadwal-grid-read-only';

type Hari = 'senin' | 'selasa' | 'rabu' | 'kamis' | 'jumat' | 'sabtu' | 'minggu';

type Kelas = {
    id: number;
    nama: string;
    tingkat: string;
    tahun_ajaran: { id: number; nama: string };
};

type JamPelajaran = {
    id: number;
    nomor: number;
    jam_mulai: string;
    jam_selesai: string;
    keterangan: string | null;
};

type JadwalCell = {
    id: number;
    mata_pelajaran: { id: number; kode: string; nama: string };
    pegawai: { id: number; nama: string };
};

type Props = {
    kelas: Kelas;
    hariList: Hari[];
    jamPelajaran: JamPelajaran[];
    jadwal: Record<string, JadwalCell[]>;
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikKelasShow({
    kelas,
    hariList,
    jamPelajaran,
    jadwal,
    tahunAjaranAktif,
    namaSekolah,
}: Props) {
    return (
        <PublikLayout
            tahunAjaranAktif={tahunAjaranAktif}
            breadcrumbs={[
                { label: 'Jadwal', href: '/jadwal' },
                { label: 'Kelas', href: '/jadwal/kelas' },
                { label: kelas.nama },
            ]}
        >
            <Head title={`Jadwal Kelas ${kelas.nama} — ${namaSekolah}`} />
            <div className="mb-6">
                <h1 className="text-2xl font-semibold md:text-3xl">{kelas.nama}</h1>
                <p className="text-sm text-muted-foreground">
                    Jadwal Pelajaran · Tahun Ajaran {kelas.tahun_ajaran.nama}
                </p>
            </div>
            {jamPelajaran.length === 0 ? (
                <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                    Belum ada jam pelajaran yang dikonfigurasi.
                </div>
            ) : (
                <JadwalGridReadOnly
                    hariList={hariList}
                    jamPelajaran={jamPelajaran}
                    jadwal={jadwal}
                />
            )}
        </PublikLayout>
    );
}
