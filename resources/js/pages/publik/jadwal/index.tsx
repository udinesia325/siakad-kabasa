import { Head } from '@inertiajs/react';

type Props = {
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikJadwalIndex({ tahunAjaranAktif, namaSekolah }: Props) {
    return (
        <>
            <Head title={`Jadwal — ${namaSekolah}`} />
            <div>
                <h1>Jadwal {namaSekolah}</h1>
                {tahunAjaranAktif && <p>Tahun Ajaran {tahunAjaranAktif.nama}</p>}
            </div>
        </>
    );
}
