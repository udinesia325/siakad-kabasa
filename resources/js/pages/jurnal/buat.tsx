import { Head, router } from '@inertiajs/react';
import { BookMarked, Pencil, Zap } from 'lucide-react';
import { useState } from 'react';

type JadwalSlot = {
    id: number;
    mata_pelajaran: string;
    kelas: string;
    tingkat: string | null;
    jam_mulai: string;
    jam_selesai: string;
    nomor_jam: number;
    sudah_dibuat: boolean;
    jurnal_id: number | null;
};

type Blok = {
    ids: number[];
    mata_pelajaran: string;
    kelas: string;
    tingkat: string | null;
    nomor_jam_dari: number;
    nomor_jam_sampai: number;
    jam_mulai: string;
    jam_selesai: string;
};

type Props = {
    jadwals: JadwalSlot[];
    error: string | null;
};

/* ── 6 accent colors, picked by hashing the mapel name ── */
const ACCENT_PALETTE = [
    { bg: 'bg-blue-500/10',   icon: 'bg-blue-500',   dot: 'bg-blue-500',   ring: 'shadow-[0_0_0_3px_rgb(59_130_246/0.15)]',   square: 'bg-blue-500'   },
    { bg: 'bg-violet-500/10', icon: 'bg-violet-500', dot: 'bg-violet-500', ring: 'shadow-[0_0_0_3px_rgb(139_92_246/0.15)]',   square: 'bg-violet-500' },
    { bg: 'bg-emerald-500/10',icon: 'bg-emerald-500',dot: 'bg-emerald-500',ring: 'shadow-[0_0_0_3px_rgb(16_185_129/0.15)]',   square: 'bg-emerald-500'},
    { bg: 'bg-amber-500/10',  icon: 'bg-amber-500',  dot: 'bg-amber-500',  ring: 'shadow-[0_0_0_3px_rgb(245_158_11/0.15)]',   square: 'bg-amber-500'  },
    { bg: 'bg-rose-500/10',   icon: 'bg-rose-500',   dot: 'bg-rose-500',   ring: 'shadow-[0_0_0_3px_rgb(244_63_94/0.15)]',    square: 'bg-rose-500'   },
    { bg: 'bg-cyan-500/10',   icon: 'bg-cyan-500',   dot: 'bg-cyan-500',   ring: 'shadow-[0_0_0_3px_rgb(6_182_212/0.15)]',    square: 'bg-cyan-500'   },
] as const;

function getAccent(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    }
    return ACCENT_PALETTE[hash % ACCENT_PALETTE.length];
}

function detectBloks(jadwals: JadwalSlot[]): Blok[] {
    const bloks: Blok[] = [];
    let i = 0;

    while (i < jadwals.length) {
        const start = jadwals[i];
        if (start.sudah_dibuat) {
            i++;
            continue;
        }

        let j = i + 1;
        while (
            j < jadwals.length &&
            !jadwals[j].sudah_dibuat &&
            jadwals[j].mata_pelajaran === start.mata_pelajaran &&
            jadwals[j].kelas === start.kelas &&
            jadwals[j].nomor_jam === jadwals[j - 1].nomor_jam + 1
        ) {
            j++;
        }

        if (j - i >= 2) {
            const group = jadwals.slice(i, j);
            bloks.push({
                ids: group.map((s) => s.id),
                mata_pelajaran: start.mata_pelajaran,
                kelas: start.kelas,
                tingkat: start.tingkat,
                nomor_jam_dari: start.nomor_jam,
                nomor_jam_sampai: jadwals[j - 1].nomor_jam,
                jam_mulai: start.jam_mulai,
                jam_selesai: jadwals[j - 1].jam_selesai,
            });
        }
        i = j;
    }

    return bloks;
}

/* ── Stat Chip ── */
function StatChip({ label, value, color }: { label: string; value: string; color: 'primary' | 'amber' | 'emerald' }) {
    const colorMap = {
        primary: { dot: 'bg-primary', bg: 'bg-primary/[0.08]' },
        amber:   { dot: 'bg-amber-500', bg: 'bg-amber-500/[0.08]' },
        emerald: { dot: 'bg-emerald-500', bg: 'bg-emerald-500/[0.08]' },
    };
    const c = colorMap[color];
    return (
        <div className="flex items-center gap-2.5 rounded-[10px] border border-border bg-card px-4 py-2.5">
            <div className={`flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                <div className={`h-2.25 w-2.25 rounded-full ${c.dot}`} />
            </div>
            <div>
                <div className="text-[11px] font-semibold tracking-[0.2px] text-muted-foreground">{label}</div>
                <div className="text-[15px] font-bold text-foreground">{value}</div>
            </div>
        </div>
    );
}

/* ── Block Detector Card ── */
function BlockDetectorCard({ blok, onClick }: { blok: Blok; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);
    const hours = `${blok.nomor_jam_dari}–${blok.nomor_jam_sampai}`;
    const timeRange = `${blok.jam_mulai}–${blok.jam_selesai}`;
    const kelasLabel = blok.tingkat ? `${blok.tingkat} ${blok.kelas}` : blok.kelas;

    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={[
                'flex w-full cursor-pointer items-center justify-between rounded-[14px] border-[1.5px] border-primary bg-card px-5 py-3.5 text-left transition-all duration-180',
                hovered ? 'shadow-[0_0_0_4px_hsl(var(--primary)/0.12)] -translate-y-px' : 'shadow-[0_0_0_3px_hsl(var(--primary)/0.06)]',
            ].join(' ')}
        >
            <div className="flex items-center gap-3.5">
                <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[10px] bg-linear-to-br from-primary to-primary/80">
                    <Zap className="h-4.5 w-4.5 fill-white stroke-white" />
                </div>
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-foreground">Isi Sekaligus</span>
                        <span className="text-[13px] font-semibold text-primary">— {blok.mata_pelajaran}</span>
                    </div>
                    <div className="mt-0.75 text-xs font-medium text-muted-foreground">
                        {kelasLabel} · Jam {hours} · {timeRange}
                    </div>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3.5 py-1.25 text-xs font-bold text-primary-foreground">
                {blok.ids.length} jam
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </div>
        </button>
    );
}

/* ── Timeline Card ── */
function TimelineCard({
    slot,
    isBlock,
    isFirst,
    isLast,
    onClick,
}: {
    slot: JadwalSlot;
    isBlock: boolean;
    isFirst: boolean;
    isLast: boolean;
    onClick: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const isDone = slot.sudah_dibuat;
    const accent = getAccent(slot.mata_pelajaran);
    const GAP = 8;

    let lineTop: string | undefined;
    let lineHeight: string | undefined;

    if (isBlock && isFirst && !isLast) {
        lineTop = '50%';
        lineHeight = `calc(50% + ${GAP / 2}px)`;
    } else if (isBlock && isLast && !isFirst) {
        lineTop = `${-GAP / 2}px`;
        lineHeight = `calc(50% + ${GAP / 2}px)`;
    } else if (isBlock && !isFirst && !isLast) {
        lineTop = `${-GAP / 2}px`;
        lineHeight = `calc(100% + ${GAP}px)`;
    }

    const showLine = isBlock && lineTop != null;
    const kelasLabel = slot.tingkat ? `${slot.tingkat} ${slot.kelas}` : slot.kelas;

    return (
        <div
            className="relative flex"
            style={{ paddingLeft: isBlock ? 26 : 0 }}
        >
            {/* Connector line */}
            {showLine && (
                <div
                    className={`absolute w-0.5 rounded-[1px] opacity-35 ${accent.dot}`}
                    style={{ left: 11, top: lineTop, height: lineHeight }}
                />
            )}

            {/* Dot */}
            {isBlock && (
                <div
                    className={[
                        'absolute left-1.5 top-1/2 z-2 h-3 w-3 -translate-y-1/2 rounded-full border-[2.5px] border-background',
                        accent.dot,
                        accent.ring,
                    ].join(' ')}
                />
            )}

            {/* Card */}
            <button
                type="button"
                onClick={onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={[
                    'flex flex-1 items-center justify-between rounded-xl px-4.5 py-3.5 text-left transition-all duration-180',
                    isDone
                        ? hovered
                            ? 'border border-border bg-card shadow-sm -translate-y-px'
                            : 'border border-border bg-card/60'
                        : hovered
                          ? 'border border-primary bg-card shadow-[0_4px_16px_hsl(var(--primary)/0.07)] -translate-y-px'
                          : 'border border-border bg-card',
                ].join(' ')}
            >
                {/* Left */}
                <div className="flex items-center gap-3.5">
                    <div className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[10px] ${accent.bg}`}>
                        <div className={`h-2.5 w-2.5 rounded-[3px] ${accent.square}`} />
                    </div>
                    <div>
                        <div className={`text-sm font-bold ${isDone ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {slot.mata_pelajaran}
                        </div>
                        <div className={`mt-[3px] flex items-center gap-1.5 text-xs font-medium ${isDone ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>
                            <span>{kelasLabel}</span>
                            <span className="text-border">·</span>
                            <span>Jam {slot.nomor_jam}</span>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2.5">
                    <div className={`text-right text-[13px] font-semibold ${isDone ? 'text-muted-foreground/50' : 'text-foreground/70'}`}>
                        {slot.jam_mulai}–{slot.jam_selesai}
                    </div>
                    {isBlock && !isDone && (
                        <span className="rounded-[6px] bg-primary/8 px-2.25 py-0.75 text-[10px] font-bold tracking-[0.3px] text-primary">
                            BLOK
                        </span>
                    )}
                    {isDone && (
                        <span className="flex items-center gap-1 rounded-[6px] bg-emerald-50 px-2.25 py-0.75 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            Selesai
                        </span>
                    )}
                    {!isDone && !isBlock && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/30">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    )}
                    {isDone && hovered && (
                        <span className="flex items-center gap-1 rounded-[6px] bg-primary/8 px-2.25 py-0.75 text-[10px] font-bold tracking-[0.3px] text-primary">
                            <Pencil className="h-2.25 w-2.25" />
                            Ubah
                        </span>
                    )}
                </div>
            </button>
        </div>
    );
}

/* ── Section Label ── */
function SectionLabel({ children, dotColor }: { children: React.ReactNode; dotColor?: string }) {
    return (
        <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-muted-foreground">
            {dotColor && <div className={`h-1.75 w-1.75 rounded-full ${dotColor}`} />}
            {children}
        </div>
    );
}

export default function JurnalBuat({ jadwals, error }: Props) {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const bloks = detectBloks(jadwals);
    const blokSlotIds = new Set(bloks.flatMap((b) => b.ids));

    const totalJam = jadwals.length;
    const selesaiJam = jadwals.filter((s) => s.sudah_dibuat).length;
    const belumJam = totalJam - selesaiJam;

    const belumList = jadwals.filter((s) => !s.sudah_dibuat);
    const selesaiList = jadwals.filter((s) => s.sudah_dibuat);

    function isBlokFirst(slot: JadwalSlot): boolean {
        if (!blokSlotIds.has(slot.id)) return false;
        const blok = bloks.find((b) => b.ids.includes(slot.id));
        return blok ? blok.ids[0] === slot.id : false;
    }

    function isBlokLast(slot: JadwalSlot): boolean {
        if (!blokSlotIds.has(slot.id)) return false;
        const blok = bloks.find((b) => b.ids.includes(slot.id));
        return blok ? blok.ids[blok.ids.length - 1] === slot.id : false;
    }

    return (
        <>
            <Head title="Buat Jurnal" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-extrabold tracking-[-0.3px] text-foreground">Buat Jurnal</h1>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">{today}</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                        {error}
                    </div>
                )}

                {/* Empty state */}
                {!error && jadwals.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 py-16 text-center">
                        <BookMarked className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                        <p className="font-medium text-foreground/70">Tidak ada jadwal mengajar hari ini</p>
                        <p className="mt-1 text-sm text-muted-foreground">Jurnal hanya bisa dibuat untuk hari yang ada jadwal mengajarnya</p>
                    </div>
                )}

                {jadwals.length > 0 && (
                    <>
                        {/* Stat chips */}
                        <div className="flex flex-wrap gap-3">
                            <StatChip label="Total" value={`${totalJam} jam`} color="primary" />
                            <StatChip label="Belum Diisi" value={`${belumJam} jam`} color="amber" />
                            <StatChip label="Selesai" value={`${selesaiJam} jam`} color="emerald" />
                        </div>

                        {/* Isi Cepat (blok) */}
                        {bloks.length > 0 && (
                            <div>
                                <SectionLabel>
                                    <Zap className="h-[13px] w-[13px]" />
                                    Isi Cepat
                                </SectionLabel>
                                <div className="flex flex-col gap-2">
                                    {bloks.map((blok) => (
                                        <BlockDetectorCard
                                            key={blok.ids.join('-')}
                                            blok={blok}
                                            onClick={() => router.visit(`/jurnal/serentak?ids=${blok.ids.join(',')}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Belum Diisi */}
                        {belumList.length > 0 && (
                            <div>
                                <SectionLabel dotColor="bg-amber-500">Belum Diisi</SectionLabel>
                                <div className="flex flex-col gap-2">
                                    {belumList.map((slot) => (
                                        <TimelineCard
                                            key={slot.id}
                                            slot={slot}
                                            isBlock={blokSlotIds.has(slot.id)}
                                            isFirst={isBlokFirst(slot)}
                                            isLast={isBlokLast(slot)}
                                            onClick={() => router.visit(`/jurnal/buat/${slot.id}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Selesai */}
                        {selesaiList.length > 0 && (
                            <div>
                                <SectionLabel dotColor="bg-emerald-500">
                                    Selesai
                                    <span className="ml-1 font-normal normal-case tracking-normal text-muted-foreground/60">· masih bisa diubah</span>
                                </SectionLabel>
                                <div className="flex flex-col gap-2">
                                    {selesaiList.map((slot) => (
                                        <TimelineCard
                                            key={slot.id}
                                            slot={slot}
                                            isBlock={false}
                                            isFirst={false}
                                            isLast={false}
                                            onClick={() => router.visit(`/jurnal/buat/${slot.id}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

JurnalBuat.layout = {
    breadcrumbs: [{ title: 'Buat Jurnal', href: '/jurnal/buat' }],
};
