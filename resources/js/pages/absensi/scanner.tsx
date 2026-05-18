import { Head, router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from '@/lib/axios';

/* ------------------------------------------------------------------ types */
type Jadwal = {
    is_libur: boolean;
    jam_masuk_min: string | null;
    jam_masuk_max: string | null;
    jam_pulang_min: string | null;
    jam_pulang_max: string | null;
};

type ScanResult =
    | {
          status: 'success';
          tipe: 'masuk' | 'pulang';
          nama: string;
          kelas: string | null;
          waktu_absen: string;
      }
    | {
          status: 'duplicate';
          tipe: 'masuk' | 'pulang';
          nama: string;
          kelas: string | null;
          waktu_absen: string;
      }
    | { status: 'not_registered' }
    | { status: 'libur' }
    | { status: 'diluar_jadwal' }
    | { status: 'pegawai_nonaktif'; nama: string };

type CardState = 'loading' | 'success' | 'error';

type ScanCard = {
    id: number;
    rfid: string;
    state: CardState;
    title: string;
    subtitle: string;
    exiting: boolean;
};

type Props = { jadwal: Jadwal | null };

const MAX_CARDS = 9;
const HOLD_SUCCESS_MS = 1500;
const HOLD_ERROR_MS = 2400;
const EXIT_ANIM_MS = 320;

/* ----------------------------------------------------------- result mapper */
function mapResult(result: ScanResult): {
    state: CardState;
    title: string;
    subtitle: string;
} {
    if (result.status === 'success') {
        return {
            state: 'success',
            title: result.nama,
            subtitle: `${result.tipe === 'masuk' ? 'Masuk' : 'Pulang'} · ${result.waktu_absen}${result.kelas ? ' · ' + result.kelas : ''}`,
        };
    }

    if (result.status === 'duplicate') {
        return {
            state: 'success',
            title: result.nama,
            subtitle: `Sudah ${result.tipe} pada ${result.waktu_absen}`,
        };
    }

    if (result.status === 'libur') {
        return {
            state: 'error',
            title: 'Hari Libur',
            subtitle: 'Tidak ada jadwal absensi hari ini',
        };
    }

    if (result.status === 'diluar_jadwal') {
        return {
            state: 'error',
            title: 'Di luar jam absensi',
            subtitle: 'Waktu saat ini di luar rentang jam masuk/pulang',
        };
    }

    if (result.status === 'pegawai_nonaktif') {
        return {
            state: 'error',
            title: 'Pegawai non-aktif',
            subtitle: `${result.nama} berstatus non-aktif`,
        };
    }

    return {
        state: 'error',
        title: 'Kartu tidak terdaftar',
        subtitle: 'RFID belum terdaftar di sistem',
    };
}

/* ---------------------------------------------------------------- ScanCard */
function ScanCardView({ card }: { card: ScanCard }) {
    const borderClass =
        card.state === 'success'
            ? 'border-emerald-500/70 ring-emerald-500/20'
            : card.state === 'error'
              ? 'border-rose-500/70 ring-rose-500/20'
              : 'border-sky-500/40 ring-sky-500/10';

    const textClass =
        card.state === 'success'
            ? 'text-emerald-700 dark:text-emerald-300'
            : card.state === 'error'
              ? 'text-rose-700 dark:text-rose-300'
              : 'text-sky-700 dark:text-sky-300';

    return (
        <div
            className={`scan-card-wrap w-70 shrink-0 overflow-hidden ${card.exiting ? 'exiting' : ''}`}
        >
        <div
            className={`${card.exiting ? '' : 'scan-card-in'} flex w-70 flex-col rounded-2xl border-2 bg-white px-5 py-4 shadow-[0_4px_16px_-6px_rgba(14,165,233,0.18)] ring-1 transition-colors duration-300 dark:bg-slate-900/60 ${borderClass}`}
        >
            {/* RFID code */}
            <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] text-slate-400 uppercase dark:text-slate-500">
                    RFID
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-slate-700 tabular-nums dark:text-slate-200">
                    {card.rfid}
                </span>
            </div>

            <div className="my-3 h-px bg-slate-200/70 dark:bg-white/5" />

            {/* Body — loader / pesan */}
            <div className="flex min-h-13 items-center justify-center">
                {card.state === 'loading' ? (
                    <div className="flex items-center gap-2.5">
                        <svg
                            className="scan-spin"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="currentColor"
                                strokeOpacity="0.18"
                                strokeWidth="2.5"
                            />
                            <path
                                d="M21 12a9 9 0 0 0-9-9"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
                            Memverifikasi…
                        </span>
                    </div>
                ) : (
                    <div className="w-full text-center">
                        <div
                            className={`text-base leading-tight font-semibold tracking-tight ${textClass}`}
                        >
                            {card.title}
                        </div>
                        {card.subtitle && (
                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                {card.subtitle}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}

/* --------------------------------------------------------------- IdleHero */
function IdleHero() {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-sky-500/10 ring-1 ring-sky-500/20">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-sky-500"
                >
                    <path
                        d="M5 9a9 9 0 0 1 14 0"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M8 12.5a5.5 5.5 0 0 1 8 0"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.6"
                    />
                    <circle cx="12" cy="16.5" r="1.6" fill="currentColor" />
                </svg>
            </div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3.5 py-1.5 ring-1 ring-sky-500/20">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-sky-500"></span>
                <span className="text-xs font-medium tracking-widest text-sky-700 uppercase dark:text-sky-300">
                    Siap memindai
                </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-balance text-slate-900 dark:text-white">
                Tempelkan kartu pada pemindai
            </h1>
        </div>
    );
}

/* ----------------------------------------------------------------- TopBar */
function TopBar({
    tapCount,
    onLogoTap,
    isFullscreen,
    onFullscreen,
    activeCount,
}: {
    tapCount: number;
    onLogoTap: () => void;
    isFullscreen: boolean;
    onFullscreen: () => void;
    activeCount: number;
}) {
    const [time, setTime] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);

        return () => clearInterval(id);
    }, []);

    const day = time.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const hhmm = time.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const pips = tapCount > 0 ? Array.from({ length: 5 }) : [];

    return (
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onLogoTap}
                    className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30 transition-transform select-none focus:outline-none active:scale-95"
                    aria-label="Ketuk 5x untuk kembali ke dashboard"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M5 8.5A6.5 6.5 0 0 1 11.5 2"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M8 11.5A3.5 3.5 0 0 1 11.5 8"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <circle cx="11.5" cy="14.5" r="1.6" fill="white" />
                        <rect
                            x="3"
                            y="14"
                            width="14"
                            height="8"
                            rx="2"
                            stroke="white"
                            strokeWidth="2"
                        />
                    </svg>
                    {tapCount > 0 && (
                        <div className="absolute -bottom-4 flex gap-0.5">
                            {pips.map((_, i) => (
                                <span
                                    key={i}
                                    className={`h-1 w-1 rounded-full transition-colors duration-150 ${
                                        i < tapCount
                                            ? 'bg-sky-500'
                                            : 'bg-slate-300 dark:bg-slate-600'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </button>
                <div>
                    <div className="text-sm leading-none font-semibold tracking-tight text-slate-900 dark:text-white">
                        SIAKAD · Absensi
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {day}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1.5 ring-1 ring-sky-500/30">
                    <span className="live-dot h-1.5 w-1.5 rounded-full bg-sky-500"></span>
                    <span className="text-xs font-medium tracking-wide text-sky-700 dark:text-sky-300">
                        {activeCount > 0
                            ? `${activeCount} antrian`
                            : 'Tersambung'}
                    </span>
                </div>
                <div className="font-mono text-lg font-semibold text-slate-900 tabular-nums dark:text-white">
                    {hhmm}
                </div>
                {!isFullscreen && (
                    <button
                        onClick={onFullscreen}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                        title="Masuk layar penuh"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------- BottomBar */
function BottomBar({ jadwal }: { jadwal: Jadwal | null }) {
    return (
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                RFID&nbsp;READER&nbsp;·&nbsp;125&nbsp;kHz
            </div>
            {jadwal && !jadwal.is_libur && (
                <div className="text-xs text-slate-400 dark:text-slate-500">
                    Masuk {jadwal.jam_masuk_min}–{jadwal.jam_masuk_max}
                    <span className="mx-2">·</span>
                    Pulang {jadwal.jam_pulang_min}–{jadwal.jam_pulang_max}
                </div>
            )}
            {jadwal?.is_libur && (
                <div className="text-xs text-rose-400">
                    Hari Libur — tidak ada jadwal absensi
                </div>
            )}
        </div>
    );
}

/* -------------------------------------------------------------------- App */
export default function AbsensiScanner({ jadwal }: Props) {
    const [cards, setCards] = useState<ScanCard[]>([]);
    const [tapCount, setTapCount] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const cardIdRef = useRef(0);

    const enterFullscreen = useCallback(() => {
        document.documentElement.requestFullscreen().catch(() => {});
    }, []);

    const exitFullscreen = useCallback(() => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
    }, []);

    useEffect(() => {
        const onFsChange = () =>
            setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onFsChange);
        enterFullscreen();

        return () =>
            document.removeEventListener('fullscreenchange', onFsChange);
    }, [enterFullscreen]);

    /* ------------------------ corner double-tap untuk exit fullscreen */
    const cornerTapRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cornerTapCountRef = useRef(0);
    const [ripples, setRipples] = useState<
        { id: number; x: number; y: number }[]
    >([]);
    const rippleIdRef = useRef(0);
    const handleCornerDoubleTap = useCallback(
        (e: React.PointerEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            const id = ++rippleIdRef.current;
            setRipples((prev) => [...prev, { id, x, y }]);
            setTimeout(
                () =>
                    setRipples((prev) => prev.filter((r) => r.id !== id)),
                500,
            );
            cornerTapCountRef.current += 1;

            if (cornerTapCountRef.current >= 2) {
                cornerTapCountRef.current = 0;

                if (cornerTapRef.current) {
                    clearTimeout(cornerTapRef.current);
                }

                exitFullscreen();

                return;
            }

            if (cornerTapRef.current) {
                clearTimeout(cornerTapRef.current);
            }

            cornerTapRef.current = setTimeout(() => {
                cornerTapCountRef.current = 0;
            }, 400);
        },
        [exitFullscreen],
    );

    /* --------------------------------------------- RFID input handling */
    const bufferRef = useRef('');
    const tapResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

    const refocus = useCallback(() => {
        setTimeout(() => inputRef.current?.focus(), 50);
    }, []);

    useEffect(() => {
        refocus();
        const onVisibility = () => {
            if (!document.hidden) {
                refocus();
            }
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () =>
            document.removeEventListener('visibilitychange', onVisibility);
    }, [refocus]);

    const removeCard = useCallback((id: number) => {
        setCards((prev) =>
            prev.map((c) => (c.id === id ? { ...c, exiting: true } : c)),
        );
        const t = setTimeout(() => {
            setCards((prev) => prev.filter((c) => c.id !== id));
            timersRef.current.delete(t);
        }, EXIT_ANIM_MS);
        timersRef.current.add(t);
    }, []);

    const spawnScan = useCallback(
        (kode: string) => {
            // Guard: kartu terakhir masih loading dengan RFID yang sama → tolak
            const last = cards[cards.length - 1];

            if (last && last.state === 'loading' && last.rfid === kode) {
                return;
            }

            // Guard: queue penuh
            if (cards.filter((c) => !c.exiting).length >= MAX_CARDS) {
                return;
            }

            const id = ++cardIdRef.current;
            const newCard: ScanCard = {
                id,
                rfid: kode,
                state: 'loading',
                title: '',
                subtitle: '',
                exiting: false,
            };
            setCards((prev) => [...prev, newCard]);

            axios
                .post<ScanResult>('/api/absensi/scan', { kode_rfid: kode })
                .then(({ data }) => {
                    const mapped = mapResult(data);
                    setCards((prev) =>
                        prev.map((c) =>
                            c.id === id
                                ? {
                                      ...c,
                                      state: mapped.state,
                                      title: mapped.title,
                                      subtitle: mapped.subtitle,
                                  }
                                : c,
                        ),
                    );
                    const hold =
                        mapped.state === 'success'
                            ? HOLD_SUCCESS_MS
                            : HOLD_ERROR_MS;
                    const t = setTimeout(() => {
                        removeCard(id);
                        timersRef.current.delete(t);
                    }, hold);
                    timersRef.current.add(t);
                })
                .catch(() => {
                    const mapped = mapResult({ status: 'not_registered' });
                    setCards((prev) =>
                        prev.map((c) =>
                            c.id === id
                                ? {
                                      ...c,
                                      state: mapped.state,
                                      title: mapped.title,
                                      subtitle: mapped.subtitle,
                                  }
                                : c,
                        ),
                    );
                    const t = setTimeout(() => {
                        removeCard(id);
                        timersRef.current.delete(t);
                    }, HOLD_ERROR_MS);
                    timersRef.current.add(t);
                });
        },
        [cards, removeCard],
    );

    const clearInput = useCallback(() => {
        bufferRef.current = '';

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                const kode = bufferRef.current.trim();
                clearInput();

                if (kode) {
                    spawnScan(kode);
                }
            }
        },
        [spawnScan, clearInput],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            bufferRef.current = e.target.value;
        },
        [],
    );

    const handleLogoTap = useCallback(() => {
        if (tapResetRef.current) {
            clearTimeout(tapResetRef.current);
        }

        setTapCount((prev) => {
            const next = prev + 1;

            if (next >= 5) {
                exitFullscreen();
                router.visit('/dashboard');

                return 0;
            }

            tapResetRef.current = setTimeout(() => setTapCount(0), 2000);

            return next;
        });
    }, [exitFullscreen]);

    useEffect(
        () => () => {
            timersRef.current.forEach(clearTimeout);
            timersRef.current.clear();

            if (tapResetRef.current) {
                clearTimeout(tapResetRef.current);
            }
        },
        [],
    );

    const visibleCards = cards;
    const activeCount = cards.filter(
        (c) => c.state === 'loading' && !c.exiting,
    ).length;

    return (
        <>
            <Head title="Mode Absensi" />

            <input
                ref={inputRef}
                className="pointer-events-none fixed -left-[9999px] opacity-0"
                aria-hidden="true"
                tabIndex={-1}
                autoComplete="off"
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onBlur={refocus}
            />

            <div className="scanner-root relative h-screen w-screen overflow-hidden bg-[#F6F8FC] dark:bg-[#060812]">
                {isFullscreen && (
                    <>
                        <div
                            className="absolute top-0 right-0 z-50 h-32 w-32 cursor-pointer"
                            onPointerDown={handleCornerDoubleTap}
                        />
                        {ripples.map((r) => (
                            <span
                                key={r.id}
                                className="corner-ripple"
                                style={{ left: r.x, top: r.y }}
                            />
                        ))}
                    </>
                )}
                <TopBar
                    tapCount={tapCount}
                    onLogoTap={handleLogoTap}
                    isFullscreen={isFullscreen}
                    onFullscreen={enterFullscreen}
                    activeCount={activeCount}
                />
                <BottomBar jadwal={jadwal} />

                <div className="absolute inset-0 flex items-center justify-center px-10">
                    {visibleCards.length === 0 ? (
                        <IdleHero />
                    ) : (
                        <div className="flex max-w-275 flex-wrap items-start justify-center gap-4">
                            {visibleCards.map((card) => (
                                <ScanCardView key={card.id} card={card} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

AbsensiScanner.layout = null;
