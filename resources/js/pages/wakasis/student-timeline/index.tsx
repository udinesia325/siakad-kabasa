import { Head, router } from '@inertiajs/react';
import { AlertTriangle, BookOpen, ClipboardX, HeartHandshake, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type SiswaOpt = { id: number; nama: string; nisn: string | null };

type EventType = 'pelanggaran' | 'surat_peringatan' | 'pembinaan' | 'prestasi' | 'kasus';

type TimelineEvent = {
    type: EventType;
    tanggal: string;
    label: string;
    detail: string | null;
    meta: string | null;
};

type Props = {
    siswaList: SiswaOpt[];
    selectedSiswa: SiswaOpt | null;
    events: TimelineEvent[];
    filters: { siswa_id?: string };
};

const eventConfig: Record<EventType, { icon: React.ElementType; color: string; badgeClass: string; label: string }> = {
    pelanggaran: {
        icon: AlertTriangle,
        color: 'bg-red-500',
        badgeClass: 'bg-red-100 text-red-800',
        label: 'Pelanggaran',
    },
    surat_peringatan: {
        icon: Mail,
        color: 'bg-orange-500',
        badgeClass: 'bg-orange-100 text-orange-800',
        label: 'Surat Peringatan',
    },
    pembinaan: {
        icon: HeartHandshake,
        color: 'bg-blue-500',
        badgeClass: 'bg-blue-100 text-blue-800',
        label: 'Pembinaan',
    },
    prestasi: {
        icon: BookOpen,
        color: 'bg-green-500',
        badgeClass: 'bg-green-100 text-green-800',
        label: 'Prestasi',
    },
    kasus: {
        icon: ClipboardX,
        color: 'bg-purple-500',
        badgeClass: 'bg-purple-100 text-purple-800',
        label: 'Kasus',
    },
};

export default function StudentTimelineIndex({ siswaList, selectedSiswa, events, filters }: Props) {
    function selectSiswa(siswaId: string) {
        router.get(
            '/wakasis/student-timeline',
            { siswa_id: siswaId || undefined },
            { preserveState: false, replace: true },
        );
    }

    return (
        <>
            <Head title="Student Timeline" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Student Timeline</h1>
                </div>

                <div className="flex items-center gap-3">
                    <Select value={filters.siswa_id ?? ''} onValueChange={selectSiswa}>
                        <SelectTrigger className="w-72">
                            <SelectValue placeholder="Pilih siswa…" />
                        </SelectTrigger>
                        <SelectContent>
                            {siswaList.map((s) => (
                                <SelectItem key={s.id} value={String(s.id)}>
                                    {s.nama} {s.nisn ? `(${s.nisn})` : ''}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {!selectedSiswa && (
                    <p className="text-muted-foreground">Pilih siswa untuk melihat timeline aktivitasnya.</p>
                )}

                {selectedSiswa && events.length === 0 && (
                    <p className="text-muted-foreground">
                        Tidak ada aktivitas tercatat untuk <strong>{selectedSiswa.nama}</strong>.
                    </p>
                )}

                {selectedSiswa && events.length > 0 && (
                    <div className="flex flex-col gap-1">
                        <p className="mb-4 text-sm text-muted-foreground">
                            {events.length} aktivitas tercatat untuk <strong>{selectedSiswa.nama}</strong>
                            {selectedSiswa.nisn ? ` (NISN: ${selectedSiswa.nisn})` : ''}.
                        </p>
                        <ol className="relative border-l border-border">
                            {events.map((event, idx) => {
                                const cfg = eventConfig[event.type];
                                const Icon = cfg.icon;

                                return (
                                    <li key={idx} className="mb-6 ml-6">
                                        <span className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ${cfg.color} ring-4 ring-background`}>
                                            <Icon className="h-3 w-3 text-white" />
                                        </span>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <time className="text-sm font-normal text-muted-foreground">
                                                {event.tanggal}
                                            </time>
                                            <Badge className={cfg.badgeClass}>{cfg.label}</Badge>
                                            {event.meta && (
                                                <span className="text-xs text-muted-foreground">{event.meta}</span>
                                            )}
                                        </div>
                                        <h3 className="mt-1 text-sm font-semibold">{event.label}</h3>
                                        {event.detail && (
                                            <p className="mt-0.5 text-sm text-muted-foreground">{event.detail}</p>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                )}
            </div>
        </>
    );
}

StudentTimelineIndex.layout = {
    breadcrumbs: [
        { title: 'Wakasis', href: '/wakasis' },
        { title: 'Student Timeline', href: '/wakasis/student-timeline' },
    ],
};
