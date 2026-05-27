export type TahunAjaran = {
    id: number;
    nama: string;
    is_active: boolean;
    kelas_count?: number;
    created_at: string;
    updated_at: string;
};

export type Kelas = {
    id: number;
    nama: string;
    tingkat: string | null;
    tingkat_id: number | null;
    kelas_id: number | null;
    tahun_ajaran_id: number;
    tahun_ajaran?: TahunAjaran | null;
    pegawai_id: number | null;
    wali_kelas?: { id: number; nama: string } | null;
    siswa_count?: number;
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
    nisn: string | null;
    nama: string;
    jenis_kelamin: 'L' | 'P';
    email: string | null;
    alamat: string | null;
    foto: string | null;
    kelas_ajaran_id: number | null;
    kelas_ajaran?: Kelas;
    rfid?: Rfid | null;
    status: 'aktif' | 'lulus' | 'keluar';
    status_tanggal: string | null;
    status_keterangan: string | null;
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

export type StatusKehadiran =
    | 'hadir'
    | 'terlambat'
    | 'alpha'
    | 'sakit'
    | 'izin'
    | 'dispensasi';

export type AnulirData = {
    id: number;
    status: StatusKehadiran;
    keterangan: string | null;
    bukti: string[];
    anulir_oleh: string | null;
    updated_at: string;
};

export type MatrixCell = {
    status: StatusKehadiran;
    is_anulir: boolean;
    jam_masuk: string | null;
    jam_pulang: string | null;
    anulir: AnulirData | null;
};

export type SiswaKehadiran = {
    id: number;
    nama: string;
    nisn: string | null;
};

// matrix: Record<siswa_id, Record<tanggal_string, MatrixCell>>
export type KehadiranMatrix = Record<number, Record<string, MatrixCell>>;

export type KelasKehadiran = {
    id: number;
    nama: string;
    tingkat: string | null;
    tahun_ajaran: string | null;
};

export type ImportValidRow = {
    nik: string;
    nisn: string | null;
    nama: string;
    jenis_kelamin: 'L' | 'P';
    email: string | null;
    alamat: string | null;
    kelas_ajaran_id: number | null;
    kelas_label: string | null;
    rfid: string | null;
};

export type ImportInvalidRow = {
    nik: string | null;
    nama: string | null;
    jenis_kelamin: string | null;
    kelas: string | null;
    alasan: string[];
};

export type ImportPreviewResult = {
    valid: ImportValidRow[];
    invalid: ImportInvalidRow[];
};

export type JenisPegawai = 'guru' | 'staff_tu' | 'kepala_sekolah' | 'lainnya';
export type StatusKepegawaian =
    | 'gty'
    | 'pppk'
    | 'honorer'
    | 'kontrak'
    | 'lainnya';

export type Pegawai = {
    id: number;
    user_id: number | null;
    nik: string | null;
    nuptk: string | null;
    nama: string;
    jenis_kelamin: 'L' | 'P';
    jenis: JenisPegawai;
    jabatan: string | null;
    status_kepegawaian: StatusKepegawaian | null;
    no_hp: string | null;
    email: string | null;
    alamat: string | null;
    foto: string | null;
    aktif: boolean;
    user?: { id: number; email: string; roles?: { id: number; name: string }[] } | null;
    rfid?: Rfid | null;
    created_at: string;
    updated_at: string;
};

export const JENIS_PEGAWAI_LABEL: Record<JenisPegawai, string> = {
    guru: 'Guru',
    staff_tu: 'Staff TU',
    kepala_sekolah: 'Kepala Sekolah',
    lainnya: 'Lainnya',
};

export const STATUS_KEPEGAWAIAN_LABEL: Record<StatusKepegawaian, string> = {
    gty: 'GTY',
    pppk: 'PPPK',
    honorer: 'Honorer',
    kontrak: 'Kontrak',
    lainnya: 'Lainnya',
};
