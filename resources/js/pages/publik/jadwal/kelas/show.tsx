import { Head } from '@inertiajs/react';

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
    hariList: string[];
    jamPelajaran: JamPelajaran[];
    jadwal: Record<string, JadwalCell[]>;
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikKelasShow({ kelas, namaSekolah }: Props) {
    return (
        <>
            <Head title={`Jadwal Kelas ${kelas.nama} — ${namaSekolah}`} />
            <h1>{kelas.nama}</h1>
        </>
    );
}
