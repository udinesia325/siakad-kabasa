export type StatusKehadiran =
    | 'hadir'
    | 'terlambat'
    | 'sakit'
    | 'izin'
    | 'dispensasi'
    | 'alpha';

export type ChartPoint = {
    tanggal: string;
    label: string;
    hadir: number;
    alpha: number;
};

export type RingkasanStatus = Record<StatusKehadiran, number>;

export type DonutPoint = {
    status: StatusKehadiran;
    total: number;
};

export type AnulirItem = {
    siswa: string;
    status: StatusKehadiran;
    oleh: string;
    tanggal: string;
};

export type StatistikAbsensi = {
    chart: ChartPoint[];
    ringkasan: RingkasanStatus;
    gender: { L: number; P: number };
    donut: DonutPoint[];
    recentAnulir: AnulirItem[];
    rataJamMasuk: { rata: string | null; totalTerlambat: number };
};

export type StatistikKelas = {
    id: number;
    nama: string;
    tingkat: 'X' | 'XI' | 'XII';
    tahun_ajaran: string | null;
};
