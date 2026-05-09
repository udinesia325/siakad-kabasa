export type TahunAjaran = {
    id: number;
    nama: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type Kelas = {
    id: number;
    nama: string;
    tingkat: 'X' | 'XI' | 'XII';
    tahun_ajaran_id: number;
    tahun_ajaran?: TahunAjaran;
    created_at: string;
    updated_at: string;
};

export type Rfid = {
    id: number;
    kode_rfid: string;
    reff_type: string;
    reff_id: number;
    dibuat_pada: string | null;
};

export type Siswa = {
    id: number;
    nik: string;
    nis: string | null;
    nama: string;
    jenis_kelamin: 'L' | 'P';
    email: string | null;
    alamat: string | null;
    foto: string | null;
    kelas_id: number | null;
    kelas?: Kelas;
    rfid?: Rfid | null;
    created_at: string;
    updated_at: string;
};

export type JadwalAbsensi = {
    id: number;
    hari: number;
    is_libur: boolean;
    jam_masuk_min: string | null;
    jam_masuk_max: string | null;
    jam_pulang_min: string | null;
    jam_pulang_max: string | null;
};

export const NAMA_HARI: Record<number, string> = {
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
    6: 'Sabtu',
    7: 'Minggu',
};
