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

export type HeatmapCell = {
    tanggal: string;
    nomor: number;
    iso_weekday: number;
    is_weekend: boolean;
    is_libur: boolean;
    is_aktif: boolean;
    is_future: boolean;
    is_today: boolean;
    persen_hadir: number | null;
};

export type LeaderboardItem = {
    id: number;
    nama: string;
    nisn: string | null;
    hadir: number;
    alpha: number;
    persen: number;
    streak: number;
    peringkat: number;
};

export type AlertTingkat = 'ringan' | 'sedang' | 'urgent';

export type AlertJenis = 'streak_alpha' | 'rate_rendah' | 'sering_terlambat';

export type AlertItem = {
    jenis: AlertJenis;
    judul: string;
    tingkat: AlertTingkat;
    siswa: string;
    nilai: number;
    satuan: string;
    deskripsi: string;
};

export type StatistikAbsensi = {
    chart: ChartPoint[];
    ringkasan: RingkasanStatus;
    gender: { L: number; P: number };
    donut: DonutPoint[];
    recentAnulir: AnulirItem[];
    rataJamMasuk: { rata: string | null; totalTerlambat: number };
    heatmap: HeatmapCell[];
    leaderboard: LeaderboardItem[];
    alerts: AlertItem[];
    jumlahHariAktif: number;
};

export type StatistikKelas = {
    id: number;
    nama: string;
    tingkat: 'X' | 'XI' | 'XII';
    tahun_ajaran: string | null;
};
