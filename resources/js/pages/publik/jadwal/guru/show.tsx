import { Head } from '@inertiajs/react';

type JadwalItem = {
    id: number;
    mata_pelajaran: { id: number; kode: string; nama: string };
    kelas: { id: number; nama: string; tingkat: string };
    jam_pelajaran: {
        id: number;
        nomor: number;
        jam_mulai: string;
        jam_selesai: string;
        keterangan: string | null;
    };
};

type Props = {
    pegawai: { id: number; nama: string };
    hariList: string[];
    jadwalPerHari: Record<string, JadwalItem[]>;
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikGuruShow({ pegawai, namaSekolah }: Props) {
    return (
        <>
            <Head title={`Jadwal Mengajar ${pegawai.nama} — ${namaSekolah}`} />
            <h1>{pegawai.nama}</h1>
        </>
    );
}
