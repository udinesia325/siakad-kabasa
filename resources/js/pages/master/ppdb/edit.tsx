import { Head, usePage } from '@inertiajs/react';
import PpdbForm from './form';
import type {Jurusan, PpdbDokumen, TahunAjaran} from './form';

type Ppdb = {
    id: number;
    tahun_ajaran_id: number;
    jurusan_id: number;
    nomor_registrasi: string;
    tanggal_daftar: string;
    nama: string;
    nik: string;
    nisn: string | null;
    jenis_kelamin: 'L' | 'P';
    tempat_lahir: string;
    tanggal_lahir: string;
    agama: string;
    sekolah_asal: string;
    no_telepon: string | null;
    penerima_kip: boolean;
    nama_kip: string | null;
    no_registrasi_akta: string | null;
    alamat: string;
    rt: string | null;
    rw: string | null;
    kelurahan: string | null;
    kecamatan: string | null;
    kabupaten: string | null;
    provinsi: string | null;
    kode_pos: string | null;
    nama_ayah: string;
    pekerjaan_ayah: string | null;
    pendidikan_ayah: string | null;
    penghasilan_ayah: string | null;
    nama_ibu: string;
    pekerjaan_ibu: string | null;
    pendidikan_ibu: string | null;
    penghasilan_ibu: string | null;
    dokumen: PpdbDokumen[];
};

type Props = {
    ppdb: Ppdb;
    tahunAjaranList: TahunAjaran[];
    jurusanList: Jurusan[];
};

export default function PpdbEdit({ ppdb, tahunAjaranList, jurusanList }: Props) {
    const { errors } = usePage().props as unknown as { errors: Record<string, string> };

    return (
        <>
            <Head title={`Edit PPDB — ${ppdb.nama}`} />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold">Edit Pendaftaran</h1>
                    <p className="text-sm text-muted-foreground">
                        {ppdb.nomor_registrasi} — {ppdb.nama}
                    </p>
                </div>
                <PpdbForm
                    defaultValues={{
                        tahun_ajaran_id: String(ppdb.tahun_ajaran_id),
                        jurusan_id: String(ppdb.jurusan_id),
                        nomor_registrasi: ppdb.nomor_registrasi,
                        tanggal_daftar: ppdb.tanggal_daftar,
                        nama: ppdb.nama,
                        nik: ppdb.nik,
                        nisn: ppdb.nisn ?? '',
                        jenis_kelamin: ppdb.jenis_kelamin,
                        tempat_lahir: ppdb.tempat_lahir,
                        tanggal_lahir: ppdb.tanggal_lahir,
                        agama: ppdb.agama,
                        sekolah_asal: ppdb.sekolah_asal,
                        no_telepon: ppdb.no_telepon ?? '',
                        penerima_kip: ppdb.penerima_kip,
                        nama_kip: ppdb.nama_kip ?? '',
                        no_registrasi_akta: ppdb.no_registrasi_akta ?? '',
                        alamat: ppdb.alamat,
                        rt: ppdb.rt ?? '',
                        rw: ppdb.rw ?? '',
                        kelurahan: ppdb.kelurahan ?? '',
                        kecamatan: ppdb.kecamatan ?? '',
                        kabupaten: ppdb.kabupaten ?? '',
                        provinsi: ppdb.provinsi ?? '',
                        kode_pos: ppdb.kode_pos ?? '',
                        nama_ayah: ppdb.nama_ayah,
                        pekerjaan_ayah: ppdb.pekerjaan_ayah ?? '',
                        pendidikan_ayah: ppdb.pendidikan_ayah ?? '',
                        penghasilan_ayah: ppdb.penghasilan_ayah ?? '',
                        nama_ibu: ppdb.nama_ibu,
                        pekerjaan_ibu: ppdb.pekerjaan_ibu ?? '',
                        pendidikan_ibu: ppdb.pendidikan_ibu ?? '',
                        penghasilan_ibu: ppdb.penghasilan_ibu ?? '',
                    }}
                    existingDokumen={ppdb.dokumen}
                    tahunAjaranList={tahunAjaranList}
                    jurusanList={jurusanList}
                    errors={errors}
                    submitUrl={`/ppdb/${ppdb.id}`}
                    method="put"
                    submitLabel="Simpan Perubahan"
                    cancelUrl="/ppdb"
                />
            </div>
        </>
    );
}

PpdbEdit.layout = {
    breadcrumbs: [
        { title: 'Master Data', href: '#' },
        { title: 'Pendaftaran Siswa (PPDB)', href: '/ppdb' },
        { title: 'Edit', href: '#' },
    ],
};
