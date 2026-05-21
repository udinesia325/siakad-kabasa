type Hari = 'senin' | 'selasa' | 'rabu' | 'kamis' | 'jumat' | 'sabtu' | 'minggu';

const HARI_LABEL: Record<Hari, string> = {
    senin: 'Senin',
    selasa: 'Selasa',
    rabu: 'Rabu',
    kamis: 'Kamis',
    jumat: 'Jumat',
    sabtu: 'Sabtu',
    minggu: 'Minggu',
};

type JamPelajaran = {
    id: number;
    nomor: number;
    jam_mulai: string;
    jam_selesai: string;
    keterangan: string | null;
};

type JadwalCell = {
    id: number;
    mata_pelajaran: { id: number; kode: string; nama: string };
    pegawai: { id: number; nama: string };
};

type Props = {
    hariList: Hari[];
    jamPelajaran: JamPelajaran[];
    jadwal: Record<string, JadwalCell[]>;
};

function formatJam(time: string): string {
    return time.slice(0, 5);
}

export default function JadwalGridReadOnly({ hariList, jamPelajaran, jadwal }: Props) {
    return (
        <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="w-full min-w-[900px] border-collapse">
                <thead>
                    <tr className="border-b bg-muted/40">
                        <th className="sticky left-0 z-10 w-32 bg-muted/40 px-3 py-2 text-left text-sm font-semibold">
                            Jam
                        </th>
                        {hariList.map((h) => (
                            <th
                                key={h}
                                className="min-w-[140px] px-3 py-2 text-left text-sm font-semibold"
                            >
                                {HARI_LABEL[h]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {jamPelajaran.map((jp) => (
                        <tr key={jp.id} className="border-b last:border-b-0">
                            <td className="sticky left-0 z-10 bg-card px-3 py-2 align-top">
                                <p className="text-sm font-medium">Jam {jp.nomor}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatJam(jp.jam_mulai)}–{formatJam(jp.jam_selesai)}
                                </p>
                                {jp.keterangan && (
                                    <p className="mt-0.5 text-xs italic text-muted-foreground">
                                        {jp.keterangan}
                                    </p>
                                )}
                            </td>
                            {hariList.map((h) => {
                                const cells = jadwal[`${h}|${jp.id}`] ?? [];
                                const cell = cells[0];

                                return (
                                    <td key={`${h}-${jp.id}`} className="px-2 py-2 align-top">
                                        {cell ? (
                                            <div className="rounded-md border bg-emerald-50/60 px-2 py-1.5 text-sm">
                                                <p
                                                    className="font-medium text-emerald-900"
                                                    title={cell.mata_pelajaran.nama}
                                                >
                                                    {cell.mata_pelajaran.nama}
                                                </p>
                                                <p
                                                    className="truncate text-xs text-muted-foreground"
                                                    title={cell.pegawai.nama}
                                                >
                                                    {cell.pegawai.nama}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex h-full min-h-[44px] items-center justify-center text-muted-foreground/40">
                                                –
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
