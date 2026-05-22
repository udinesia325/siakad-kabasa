import { Badge } from '@/components/ui/badge';

type Hari =
    | 'senin'
    | 'selasa'
    | 'rabu'
    | 'kamis'
    | 'jumat'
    | 'sabtu'
    | 'minggu';

const HARI_LABEL: Record<Hari, string> = {
    senin: 'Senin',
    selasa: 'Selasa',
    rabu: 'Rabu',
    kamis: 'Kamis',
    jumat: 'Jumat',
    sabtu: 'Sabtu',
    minggu: 'Minggu',
};

export type JadwalItem = {
    id: number;
    mata_pelajaran: { id: number; kode: string; nama: string };
    kelas: { id: number; nama: string; tingkat: string };
    jam_pelajaran: {
        id: number;
        nomor: number;
        jam_mulai: string;
        jam_selesai: string;
        keterangan: string | null;
    };
};

type Props = {
    hari: Hari;
    items: JadwalItem[];
};

function formatJam(time: string): string {
    return time.slice(0, 5);
}

export default function JadwalHariSection({ hari, items }: Props) {
    return (
        <section className="rounded-lg border bg-card">
            <header className="border-b bg-muted/30 px-4 py-2">
                <h2 className="text-sm font-semibold tracking-wide uppercase">
                    {HARI_LABEL[hari]}
                </h2>
            </header>
            {items.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                    Tidak ada jadwal
                </p>
            ) : (
                <ul className="divide-y">
                    {items.map((it) => (
                        <li
                            key={it.id}
                            className="flex flex-wrap items-center gap-3 px-4 py-3"
                        >
                            <div className="w-20 shrink-0">
                                <p className="text-xs font-medium text-muted-foreground">
                                    Jam {it.jam_pelajaran.nomor}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatJam(it.jam_pelajaran.jam_mulai)}–
                                    {formatJam(it.jam_pelajaran.jam_selesai)}
                                </p>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">
                                    {it.mata_pelajaran.nama}
                                </p>
                                {it.jam_pelajaran.keterangan && (
                                    <p className="text-xs text-muted-foreground italic">
                                        {it.jam_pelajaran.keterangan}
                                    </p>
                                )}
                            </div>
                            <Badge variant="secondary">{it.kelas.nama}</Badge>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
