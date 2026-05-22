import { Head, usePage } from '@inertiajs/react';
import PpdbForm from './form';
import type {Jurusan, TahunAjaran} from './form';

type Props = {
    tahunAjaranList: TahunAjaran[];
    jurusanList: Jurusan[];
};

export default function PpdbCreate({ tahunAjaranList, jurusanList }: Props) {
    const { errors } = usePage().props as unknown as { errors: Record<string, string> };

    return (
        <>
            <Head title="Tambah Pendaftaran PPDB" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold">Tambah Pendaftaran Baru</h1>
                    <p className="text-sm text-muted-foreground">Isi formulir pendaftaran peserta didik baru</p>
                </div>
                <PpdbForm
                    tahunAjaranList={tahunAjaranList}
                    jurusanList={jurusanList}
                    errors={errors}
                    submitUrl="/ppdb"
                    method="post"
                    submitLabel="Simpan Pendaftaran"
                    cancelUrl="/ppdb"
                />
            </div>
        </>
    );
}

PpdbCreate.layout = {
    breadcrumbs: [
        { title: 'Master Data', href: '#' },
        { title: 'Pendaftaran Siswa (PPDB)', href: '/ppdb' },
        { title: 'Tambah', href: '/ppdb/create' },
    ],
};
