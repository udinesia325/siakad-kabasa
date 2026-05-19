import { Head } from '@inertiajs/react';

type Pegawai = { id: number; nama: string };

type Paginator<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
};

type Props = {
    guru: Paginator<Pegawai>;
    filters: { search: string };
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikGuruIndex({ guru, namaSekolah }: Props) {
    return (
        <>
            <Head title={`Jadwal Guru — ${namaSekolah}`} />
            <ul>
                {guru.data.map((g) => (
                    <li key={g.id}>{g.nama}</li>
                ))}
            </ul>
        </>
    );
}
