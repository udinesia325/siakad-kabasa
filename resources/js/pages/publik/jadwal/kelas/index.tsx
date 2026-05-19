import { Head } from '@inertiajs/react';

type Kelas = { id: number; nama: string; tingkat: string };

type Props = {
    kelas: Kelas[];
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikKelasIndex({ kelas, namaSekolah }: Props) {
    return (
        <>
            <Head title={`Jadwal Kelas — ${namaSekolah}`} />
            <ul>
                {kelas.map((k) => (
                    <li key={k.id}>{k.nama}</li>
                ))}
            </ul>
        </>
    );
}
