import { Head, router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

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
    | { status: 'diluar_jadwal' };

type Phase = 'idle' | 'loading' | 'success' | 'error';

type Props = { jadwal: Jadwal | null };

/* --------------------------------------------------------------- FadeSwap */
function FadeSwap({
    keyId,
    render,
}: {
    keyId: string;
    render: (key: string) => React.ReactNode;
}) {
    const [active, setActive] = useState({ key: keyId, phase: 'active' });

    useEffect(() => {
        if (keyId === active.key) {
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActive((a) => ({ ...a, phase: 'exit' }));
        const t = setTimeout(() => {
            setActive({ key: keyId, phase: 'enter' });
            requestAnimationFrame(() =>
                requestAnimationFrame(() =>
                    setActive({ key: keyId, phase: 'active' }),
                ),
            );
        }, 260);

        return () => clearTimeout(t);
    }, [keyId]);

    const cls =
        active.phase === 'enter'
            ? 'fs-enter'
            : active.phase === 'exit'
              ? 'fs-exit'
              : 'fs-enter fs-active';

    return (
        <div className={`${cls} absolute inset-0 will-change-transform`}>
            {render(active.key)}
        </div>
    );
}

/* --------------------------------------------------------------- SideWaves */
function SideWaves({ flipped }: { flipped?: boolean }) {
    return (
        <svg
            viewBox="0 0 130 128"
            width="130"
            height="128"
            fill="none"
            className="pointer-events-none shrink-0"
            style={{ transform: flipped ? 'scaleX(-1)' : undefined }}
        >
            {/* Arcs open toward the card (right side). waveRipple moves them left (away). */}
            <path
                className="wave-ripple-inline r1"
                d="M115 32 A 32 32 0 0 0 115 96"
                stroke="rgba(14,165,233,0.95)"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
            <path
                className="wave-ripple-inline r2"
                d="M115 20 A 44 44 0 0 0 115 108"
                stroke="rgba(14,165,233,0.65)"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                className="wave-ripple-inline r3"
                d="M115  6 A 58 58 0 0 0 115 122"
                stroke="rgba(14,165,233,0.4)"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

/* --------------------------------------------------------------- IdleScene */
function IdleScene() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex max-w-3xl flex-col items-center px-10 text-center">
                {/* Card + waves in a single flex row so they're naturally vertically centred */}
                <div className="mb-10 flex items-center">
                    <SideWaves />
                    <div className="float-card relative mx-6">
                        <svg
                            width="200"
                            height="128"
                            viewBox="0 0 200 128"
                            fill="none"
                            className="drop-shadow-[0_22px_32px_rgba(14,165,233,0.35)]"
                        >
                            <defs>
                                <linearGradient
                                    id="cardg"
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="1"
                                >
                                    <stop offset="0%" stopColor="#38BDF8" />
                                    <stop offset="100%" stopColor="#4F46E5" />
                                </linearGradient>
                            </defs>
                            <rect
                                x="2"
                                y="2"
                                width="196"
                                height="124"
                                rx="16"
                                fill="url(#cardg)"
                            />
                            <rect
                                x="2"
                                y="2"
                                width="196"
                                height="124"
                                rx="16"
                                fill="white"
                                fillOpacity="0.05"
                            />
                            <rect
                                x="20"
                                y="34"
                                width="36"
                                height="28"
                                rx="5"
                                fill="#FCD34D"
                            />
                            <g stroke="#B45309" strokeWidth="1" opacity="0.5">
                                <line x1="28" y1="34" x2="28" y2="62" />
                                <line x1="38" y1="34" x2="38" y2="62" />
                                <line x1="48" y1="34" x2="48" y2="62" />
                                <line x1="20" y1="44" x2="56" y2="44" />
                                <line x1="20" y1="52" x2="56" y2="52" />
                            </g>
                            <rect
                                x="20"
                                y="82"
                                width="96"
                                height="7"
                                rx="3.5"
                                fill="white"
                                fillOpacity="0.9"
                            />
                            <rect
                                x="20"
                                y="96"
                                width="58"
                                height="6"
                                rx="3"
                                fill="white"
                                fillOpacity="0.5"
                            />
                            <path
                                d="M0 18 L70 0 L94 0 L0 48 Z"
                                fill="white"
                                opacity="0.06"
                            />
                        </svg>
                    </div>
                    <SideWaves flipped />
                </div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3.5 py-1.5 ring-1 ring-sky-500/20">
                    <span className="live-dot h-1.5 w-1.5 rounded-full bg-sky-500"></span>
                    <span className="text-xs font-medium tracking-widest text-sky-700 uppercase dark:text-sky-300">
                        Siap memindai
                    </span>
                </div>

                <h1 className="mb-3 text-[44px] leading-tight font-semibold tracking-tight text-balance text-slate-900 dark:text-white">
                    Tempelkan kartu pada pemindai
                </h1>
                <p className="text-lg text-pretty text-slate-500 dark:text-slate-400">
                    Dekatkan kartu RFID kamu ke perangkat untuk memulai absensi
                    otomatis.
                </p>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------ ResultPanel */
function ResultPanel({
    phase,
    result,
}: {
    phase: Phase;
    result: ScanResult | null;
}) {
    const tone =
        phase === 'success'
            ? 'success'
            : phase === 'error'
              ? 'error'
              : 'loading';

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex w-[640px] flex-col items-center px-10 text-center">
                <ResultVisual tone={tone} result={result} />
                <div className="mt-7 min-h-[140px] w-full">
                    {tone === 'loading' && <LoadingBody />}
                    {tone === 'success' && result?.status === 'success' && (
                        <SuccessBody data={result} />
                    )}
                    {tone === 'error' && result && <ErrorBody data={result} />}
                </div>
            </div>
        </div>
    );
}

function ResultVisual({
    tone,
    result,
}: {
    tone: 'loading' | 'success' | 'error';
    result: ScanResult | null;
}) {
    if (tone === 'loading') {
        return (
            <div className="relative h-[120px] w-[120px]">
                <div className="absolute inset-0 rounded-full ring-1 ring-slate-200 dark:ring-white/10"></div>
                <svg
                    className="spin-360 absolute inset-0"
                    viewBox="0 0 120 120"
                    fill="none"
                >
                    <circle
                        cx="60"
                        cy="60"
                        r="54"
                        stroke="rgb(14,165,233)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="60 280"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M5 9a9 9 0 0 1 14 0"
                            stroke="rgb(14,165,233)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M8 12.5a5.5 5.5 0 0 1 8 0"
                            stroke="rgb(14,165,233)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                        <circle
                            cx="12"
                            cy="16.5"
                            r="1.6"
                            fill="rgb(14,165,233)"
                        />
                    </svg>
                </div>
            </div>
        );
    }

    if (tone === 'success' && result?.status === 'success') {
        const initials = result.nama
            .split(' ')
            .slice(0, 2)
            .map((s) => s[0])
            .join('')
            .toUpperCase();

        return (
            <div className="relative h-[120px] w-[120px]">
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-500 shadow-[0_18px_40px_-12px_rgba(16,185,129,0.55)]">
                    <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-white dark:bg-slate-900">
                        <span className="text-2xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">
                            {initials}
                        </span>
                    </div>
                </div>
                <div className="absolute -right-1 -bottom-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-[#F6F8FC] dark:ring-[#060812]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            className="check-path"
                            d="M5 12.5l4.5 4.5L19 7.5"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        );
    }

    // error
    const cfg = errorConfig(result);

    return (
        <div className="nudge-x relative h-[120px] w-[120px]">
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-rose-500/10 ring-1 ring-rose-500/30">
                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-rose-500 shadow-[0_18px_40px_-12px_rgba(244,63,94,0.55)]">
                    {cfg.icon === 'x' && (
                        <svg
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                className="x-path"
                                d="M7 7l10 10"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                className="x-path d2"
                                d="M17 7L7 17"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    )}
                    {cfg.icon === 'clock' && (
                        <svg
                            width="46"
                            height="46"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="circle-path"
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="white"
                                strokeWidth="2.5"
                            />
                            <path
                                className="check-path"
                                d="M12 7.5V12l3 2"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
}

function LoadingBody() {
    return (
        <div className="row-in" style={{ animationDelay: '80ms' }}>
            <div className="text-lg text-slate-500 dark:text-slate-400">
                Memverifikasi kartu…
            </div>
            <div className="mt-2 text-sm text-slate-400 dark:text-slate-500">
                Memuat data dari server absensi
            </div>
        </div>
    );
}

function SuccessBody({
    data,
}: {
    data: Extract<ScanResult, { status: 'success' }>;
}) {
    return (
        <div>
            <div className="row-in" style={{ animationDelay: '40ms' }}>
                <h2 className="text-3xl font-semibold tracking-tight text-balance text-slate-900 dark:text-white">
                    {data.nama}
                </h2>
            </div>
            <div className="row-in mt-2" style={{ animationDelay: '130ms' }}>
                <div className="text-base text-slate-500 dark:text-slate-400">
                    {data.kelas && <>{data.kelas}</>}
                </div>
            </div>
            <div
                className="row-in mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 ring-1 ring-emerald-500/30"
                style={{ animationDelay: '220ms' }}
            >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    {data.tipe === 'masuk' ? 'Hadir — Masuk' : 'Pulang'} ·{' '}
                    {data.waktu_absen} WIB
                </span>
            </div>
        </div>
    );
}

function errorConfig(result: ScanResult | null): {
    title: string;
    desc: string;
    icon: 'x' | 'clock';
} {
    if (!result) {
        return { title: 'Terjadi kesalahan', desc: '', icon: 'x' };
    }

    if (result.status === 'duplicate') {
        return {
            title: 'Sudah melakukan absensi',
            desc: `${'nama' in result ? result.nama : ''} sudah tercatat ${'tipe' in result ? result.tipe : ''} pada pukul ${'waktu_absen' in result ? result.waktu_absen : ''}.`,
            icon: 'clock',
        };
    }

    if (result.status === 'libur') {
        return {
            title: 'Hari Libur',
            desc: 'Tidak ada jadwal absensi hari ini.',
            icon: 'x',
        };
    }

    if (result.status === 'diluar_jadwal') {
        return {
            title: 'Di luar jam absensi',
            desc: 'Waktu saat ini berada di luar rentang jam masuk maupun pulang.',
            icon: 'clock',
        };
    }

    return {
        title: 'Kartu tidak terdaftar',
        desc: 'Kartu RFID ini belum terdaftar dalam sistem. Hubungi petugas tata usaha.',
        icon: 'x',
    };
}

function ErrorBody({ data }: { data: ScanResult }) {
    const cfg = errorConfig(data);

    return (
        <div>
            <div className="row-in" style={{ animationDelay: '40ms' }}>
                <h2 className="text-3xl font-semibold tracking-tight text-balance text-rose-600 dark:text-rose-400">
                    {cfg.title}
                </h2>
            </div>
            <div className="row-in mt-2" style={{ animationDelay: '130ms' }}>
                <p className="mx-auto max-w-md text-base text-pretty text-slate-500 dark:text-slate-400">
                    {cfg.desc}
                </p>
            </div>
        </div>
    );
}

/* ----------------------------------------------------------------- TopBar */
function TopBar({
    phase,
    tapCount,
    onLogoTap,
    isFullscreen,
    onFullscreen,
}: {
    phase: Phase;
    tapCount: number;
    onLogoTap: () => void;
    isFullscreen: boolean;
    onFullscreen: () => void;
}) {
    const [time, setTime] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);

        return () => clearInterval(id);
    }, []);

    const tone =
        phase === 'success'
            ? {
                  bg: 'bg-emerald-500/10 ring-emerald-500/30',
                  dot: 'bg-emerald-500',
                  text: 'text-emerald-700 dark:text-emerald-300',
                  label: 'Tersambung',
              }
            : phase === 'error'
              ? {
                    bg: 'bg-rose-500/10 ring-rose-500/30',
                    dot: 'bg-rose-500',
                    text: 'text-rose-700 dark:text-rose-300',
                    label: 'Peringatan',
                }
              : {
                    bg: 'bg-sky-500/10 ring-sky-500/30',
                    dot: 'bg-sky-500',
                    text: 'text-sky-700 dark:text-sky-300',
                    label: 'Tersambung',
                };

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

    // Show pip indicators for each tap (max 5)
    const pips = tapCount > 0 ? Array.from({ length: 5 }) : [];

    return (
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onLogoTap}
                    className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30 transition-transform select-none focus:outline-none active:scale-95"
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
                    {/* Tap progress pips */}
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
                <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 transition-colors duration-500 ${tone.bg}`}
                >
                    <span
                        className={`live-dot h-1.5 w-1.5 rounded-full ${tone.dot}`}
                    ></span>
                    <span
                        className={`text-xs font-medium tracking-wide ${tone.text}`}
                    >
                        {tone.label}
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
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    const [phase, setPhase] = useState<Phase>('idle');
    const [result, setResult] = useState<ScanResult | null>(null);
    const [tapCount, setTapCount] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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

    // Double tap pojok kanan atas untuk exit fullscreen
    const cornerTapRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cornerTapCountRef = useRef(0);
    const [cornerFlash, setCornerFlash] = useState(0);
    const handleCornerDoubleTap = useCallback(() => {
        setCornerFlash((n) => n + 1);
        cornerTapCountRef.current += 1;
        if (cornerTapCountRef.current >= 2) {
            cornerTapCountRef.current = 0;
            if (cornerTapRef.current) clearTimeout(cornerTapRef.current);
            exitFullscreen();
            return;
        }
        if (cornerTapRef.current) clearTimeout(cornerTapRef.current);
        cornerTapRef.current = setTimeout(() => {
            cornerTapCountRef.current = 0;
        }, 400);
    }, [exitFullscreen]);
    const bufferRef = useRef('');
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const tapResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };
    const addTimer = (fn: () => void, ms: number) => {
        const t = setTimeout(fn, ms);
        timersRef.current.push(t);

        return t;
    };

    // Keep hidden input focused
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

    const doScan = useCallback(
        async (kode: string) => {
            if (phase !== 'idle') {
                return;
            }

            clearTimers();
            setPhase('loading');
            setResult(null);

            // Minimum time loading spinner is shown — prevents flicker on fast responses
            const MIN_LOADING_MS = 500;
            const HOLD_SUCCESS_MS = 2000;
            const HOLD_ERROR_MS = 1800;

            const startedAt = Date.now();

            try {
                const res = await fetch('/api/absensi/scan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN':
                            (
                                document.querySelector(
                                    'meta[name="csrf-token"]',
                                ) as HTMLMetaElement
                            )?.content ?? '',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({ kode_rfid: kode }),
                });
                const data: ScanResult = await res.json();
                setResult(data);

                const elapsed = Date.now() - startedAt;
                const delay = Math.max(0, MIN_LOADING_MS - elapsed);
                const nextPhase: Phase =
                    data.status === 'success' ? 'success' : 'error';
                const hold =
                    nextPhase === 'success' ? HOLD_SUCCESS_MS : HOLD_ERROR_MS;

                addTimer(() => setPhase(nextPhase), delay);
                addTimer(() => {
                    setPhase('idle');
                    refocus();
                }, delay + hold);
            } catch {
                const elapsed = Date.now() - startedAt;
                const delay = Math.max(0, MIN_LOADING_MS - elapsed);
                setResult({ status: 'not_registered' });
                addTimer(() => setPhase('error'), delay);
                addTimer(() => {
                    setPhase('idle');
                    refocus();
                }, delay + HOLD_ERROR_MS);
            } finally {
                bufferRef.current = '';

                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            }
        },
        [phase, refocus],
    );

    const clearInput = useCallback(() => {
        bufferRef.current = '';

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, []);

    // Accumulate keyboard input from RFID HID reader
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                const kode = bufferRef.current.trim();
                clearInput();

                if (phase === 'loading') {
                    // Scan masuk saat loading — buang, jangan ganggu proses
                    return;
                }

                if (kode && phase === 'idle') {
                    doScan(kode);
                    return;
                }

                if (phase === 'success' || phase === 'error') {
                    clearTimers();
                    setPhase('idle');
                    refocus();
                }
            }
        },
        [phase, doScan, refocus, clearInput],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (phase !== 'idle') {
                if (inputRef.current) inputRef.current.value = '';
                bufferRef.current = '';
                return;
            }

            bufferRef.current = e.target.value;
        },
        [phase],
    );

    // Tap logo 5x to exit to dashboard
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

            // Reset after 2s of inactivity
            tapResetRef.current = setTimeout(() => setTapCount(0), 2000);

            return next;
        });
    }, [exitFullscreen]);

    useEffect(
        () => () => {
            clearTimers();

            if (tapResetRef.current) {
                clearTimeout(tapResetRef.current);
            }
        },
        [],
    );

    const panelKey = phase === 'idle' ? 'idle' : 'active';

    return (
        <>
            <Head title="Mode Absensi" />

            {/* Hidden RFID input — always focused */}
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
                {/* Double-tap zone pojok kanan atas untuk exit fullscreen.
                    Hanya aktif saat fullscreen — saat tidak fullscreen, area ini
                    menutupi tombol fullscreen di TopBar dan memblokir klik.
                    Lingkaran digeser ke pojok sehingga hanya seperempat lingkaran
                    terlihat, dan berkedip saat di-tap. */}
                {isFullscreen && (
                    <div
                        className="absolute top-0 right-0 z-50 h-32 w-32 cursor-pointer overflow-hidden"
                        onPointerDown={handleCornerDoubleTap}
                    >
                        <span
                            key={cornerFlash}
                            className={`absolute -top-16 -right-16 block h-32 w-32 rounded-full bg-white/30 dark:bg-white/20 ${cornerFlash > 0 ? 'corner-flash' : 'opacity-0'}`}
                        />
                    </div>
                )}
                <TopBar
                    phase={phase}
                    tapCount={tapCount}
                    onLogoTap={handleLogoTap}
                    isFullscreen={isFullscreen}
                    onFullscreen={enterFullscreen}
                />
                <BottomBar jadwal={jadwal} />
                <div className="absolute inset-0">
                    <FadeSwap
                        keyId={panelKey}
                        render={(key) =>
                            key === 'idle' ? (
                                <IdleScene />
                            ) : (
                                <ResultPanel phase={phase} result={result} />
                            )
                        }
                    />
                </div>
            </div>
        </>
    );
}

// No sidebar layout for this page
AbsensiScanner.layout = null;
