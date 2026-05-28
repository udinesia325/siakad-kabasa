import { router } from '@inertiajs/react';
import { AlertTriangle, CheckCircle, Loader2, RefreshCw, Square, WifiOff, Zap } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { whatsapp as settingsWhatsapp } from '@/routes/settings';
import { logout, qr, reconnect, restart, status, stop } from '@/routes/settings/whatsapp';

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
    waState: 'connected' | 'disconnected' | 'error';
    profile: { id?: string; name?: string; number?: string; picture?: string | null } | null;
    sessionInfo: { name?: string; engine?: string | Record<string, unknown>; status?: string } | null;
    errorMessage: string | null;
};

/**
 * 4-state machine driven by WAHA session status.
 *
 * logged_in    — WAHA status WORKING, user fully connected
 * logging_in   — WAHA status STARTING, waiting for session to come up
 * logged_out   — WAHA status STOPPED / SCAN_QR_CODE / FAILED, QR needed
 * logging_out  — transient: logout/stop action fired, polling until confirmed logged out
 */
type SessionState = 'logged_in' | 'logging_in' | 'logged_out' | 'logging_out';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function engineLabel(engine: string | Record<string, unknown> | undefined): string {
    if (!engine) {
return '—';
}

    if (typeof engine === 'string') {
return engine;
}

    const name = (engine as Record<string, unknown>).engine;

    return typeof name === 'string' ? name : JSON.stringify(engine);
}

function waStateToSessionState(waState: Props['waState']): SessionState {
    if (waState === 'connected') {
return 'logged_in';
}

    return 'logged_out';
}

const POLL_INTERVAL_MS = 3000;

function getCsrfToken(): string {
    return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
}

// ─── Universal status poller ───────────────────────────────────────────────────
/**
 * Selalu aktif selama component mounted. Setiap POLL_INTERVAL_MS hit /status
 * dan update sessionState langsung dari server — satu-satunya sumber kebenaran.
 * Action handler hanya perlu fire-and-forget; polling yang akan reflect hasilnya.
 */
function useStatusPoller(onStatus: (state: SessionState) => void) {
    const onStatusRef = useRef(onStatus);
    useEffect(() => { onStatusRef.current = onStatus; }, [onStatus]);

    useEffect(() => {
        const controller = new AbortController();
        let timerId: ReturnType<typeof setTimeout> | null = null;
        let destroyed = false;

        const poll = async () => {
            if (destroyed) return;

            try {
                const res = await fetch(status.url(), {
                    signal: controller.signal,
                    headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                });

                if (destroyed) return;
                const data = (await res.json()) as { sessionState: SessionState };
                onStatusRef.current(data.sessionState);
            } catch (e) {
                if ((e as Error).name === 'AbortError') return;
            }

            if (!destroyed) {
                timerId = setTimeout(poll, POLL_INTERVAL_MS);
            }
        };

        timerId = setTimeout(poll, POLL_INTERVAL_MS);

        return () => {
            destroyed = true;
            if (timerId) clearTimeout(timerId);
            controller.abort();
        };
    }, []);
}

// ─── QR Image with loading / error states ─────────────────────────────────────

function QrImage({ src, onRefresh }: { src: string; onRefresh: () => void }) {
    const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');

    useEffect(() => {
        setState('loading');
    }, [src]);

    return (
        <>
            <div className="relative h-36 w-36">
                {state !== 'error' && (
                    <img
                        key={src}
                        src={src}
                        alt="WhatsApp QR Code"
                        className={`h-36 w-36 rounded-lg border object-contain transition-opacity duration-200 ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setState('ok')}
                        onError={() => setState('error')}
                    />
                )}
                {state === 'loading' && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg border bg-muted">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                )}
                {state === 'error' && (
                    <div className="flex h-36 w-36 flex-col items-center justify-center gap-1 rounded-lg border bg-muted text-center">
                        <WifiOff className="h-6 w-6 text-muted-foreground" />
                        <span className="px-2 text-xs text-muted-foreground">QR tidak tersedia</span>
                    </div>
                )}
            </div>
            <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="mr-1 h-3 w-3" /> Refresh QR
            </Button>
        </>
    );
}

// ─── State banner ─────────────────────────────────────────────────────────────

function StateBanner({
    sessionState,
    sessionName,
    errorMessage,
    onLogout,
    onReconnect,
}: {
    sessionState: SessionState;
    sessionName: string;
    errorMessage: string | null;
    onLogout: () => void;
    onReconnect: () => void;
}) {
    if (sessionState === 'logged_in') {
        return (
            <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 dark:border-green-800 dark:bg-green-950/30">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-sm font-semibold text-green-800 dark:text-green-300">
                        Sesi Aktif · {sessionName}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onReconnect}
                        className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300"
                    >
                        Reconnect
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                                Logout
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Logout WhatsApp?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Sesi WhatsApp akan dihentikan dan QR code baru diperlukan untuk terhubung kembali.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={onLogout}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Logout
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        );
    }

    if (sessionState === 'logging_out') {
        return (
            <div className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 dark:border-orange-800 dark:bg-orange-950/30">
                <Loader2 className="h-4 w-4 animate-spin text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                    Sedang logout… menunggu konfirmasi dari server
                </span>
            </div>
        );
    }

    if (sessionState === 'logging_in') {
        return (
            <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-950/30">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                    Sedang menghubungkan…
                </span>
            </div>
        );
    }

    if (errorMessage && sessionState === 'logged_out') {
        return (
            <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 dark:border-orange-800 dark:bg-orange-950/30">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                        Tidak dapat terhubung ke WAHA server — {errorMessage}
                    </span>
                </div>
                <Button size="sm" variant="outline" onClick={() => router.reload()}>
                    Coba Lagi
                </Button>
            </div>
        );
    }

    // logged_out (normal — no error)
    return (
        <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/30">
            <div className="flex items-center gap-2">
                <WifiOff className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    Sesi tidak aktif · Scan QR untuk terhubung
                </span>
            </div>
            <Button size="sm" onClick={onReconnect} className="bg-amber-600 text-white hover:bg-amber-700">
                Reconnect
            </Button>
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Whatsapp({ waState, profile: initialProfile, sessionInfo, errorMessage }: Props) {
    const [sessionState, setSessionState] = useState<SessionState>(() => waStateToSessionState(waState));
    const [profile, setProfile] = useState(initialProfile);
    const [qrTimestamp, setQrTimestamp] = useState(0);

    // Set timestamp setelah hydration agar <img> load ulang dengan URL unik
    useEffect(() => {
        setQrTimestamp(Date.now());
    }, []);

    const prevSessionStateRef = useRef(sessionState);

    const profileInitial = profile?.name ? profile.name.charAt(0).toUpperCase() : 'W';
    const sessionName = sessionInfo?.name ?? 'default';
    const actionsDisabled = sessionState === 'logging_out' || sessionState === 'logging_in';

    // ── Universal status poller — selalu aktif selama mounted ─────────────────
    useStatusPoller(
        useCallback((incoming: SessionState) => {
            const prev = prevSessionStateRef.current;

            setSessionState(incoming);
            prevSessionStateRef.current = incoming;

            if (incoming === 'logged_out' && prev !== 'logged_out') {
                setProfile(null);
                setQrTimestamp(Date.now());
            }

            if (incoming === 'logged_in' && prev !== 'logged_in') {
                router.reload({ only: ['profile', 'sessionInfo', 'waState'] });
            }
        }, []),
    );

    // ── Retry reload profile jika logged_in tapi profile belum tersedia ────────
    useEffect(() => {
        if (sessionState !== 'logged_in' || profile !== null) return;

        const timer = setTimeout(() => {
            router.reload({ only: ['profile', 'sessionInfo', 'waState'] });
        }, 2000);

        return () => clearTimeout(timer);
    }, [sessionState, profile]);

    // ── Action handlers — fire-and-forget, polling reflect hasilnya ───────────
    const postAction = useCallback(async (url: string, optimisticState: SessionState) => {
        setSessionState(optimisticState);
        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'X-Requested-With': 'XMLHttpRequest' },
            });
        } catch {
            // polling akan reflect state sebenarnya
        }
    }, []);

    const handleLogout    = useCallback(() => postAction(logout.url(),    'logging_out'), [postAction]);
    const handleStop      = useCallback(() => postAction(stop.url(),      'logging_out'), [postAction]);
    const handleRestart   = useCallback(() => postAction(restart.url(),   'logging_in'),  [postAction]);
    const handleReconnect = useCallback(() => postAction(reconnect.url(), 'logging_in'),  [postAction]);

    // ── Derived display flags ──────────────────────────────────────────────────
    const showQr = sessionState === 'logged_out' || sessionState === 'logging_in';
    const showConnectedQr = sessionState === 'logged_in';

    return (
        <div className="space-y-6">
            <StateBanner
                sessionState={sessionState}
                sessionName={sessionName}
                errorMessage={errorMessage}
                onLogout={handleLogout}
                onReconnect={handleReconnect}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Profil WhatsApp */}
                <Card className="overflow-hidden">
                    {/* green header strip — mimics WA profile background */}
                    <div className="h-16 bg-linear-to-br from-green-500 to-green-700" />
                    <CardContent className="relative pt-0">
                        {profile ? (
                            <>
                                {/* Avatar — overlaps the green strip */}
                                <div className="-mt-10 mb-3 flex justify-center">
                                    {profile.picture ? (
                                        <img
                                            src={profile.picture}
                                            alt={profile.name ?? 'WhatsApp'}
                                            className="h-20 w-20 rounded-full border-4 border-background object-cover shadow-md"
                                        />
                                    ) : (
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-linear-to-br from-green-400 to-green-700 text-3xl font-bold text-white shadow-md">
                                            {profileInitial}
                                        </div>
                                    )}
                                </div>
                                {/* Name + number */}
                                <div className="pb-2 text-center">
                                    <p className="text-base font-semibold text-foreground">{profile.name ?? '—'}</p>
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {profile.number ?? profile.id ?? '—'}
                                    </p>
                                </div>
                            </>
                        ) : sessionState === 'logged_in' ? (
                            <div className="-mt-10 flex flex-col items-center gap-2 pb-2">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-muted shadow-md" />
                                <p className="text-sm text-muted-foreground">Profil tidak tersedia</p>
                            </div>
                        ) : (
                            <div className="-mt-10 flex flex-col items-center gap-2 pb-2">
                                <div className="h-20 w-20 rounded-full border-4 border-background bg-muted shadow-md" />
                                <div className="h-4 w-28 rounded bg-muted" />
                                <div className="h-3 w-20 rounded bg-muted" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* QR Code */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            QR Code
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-3">
                        {showConnectedQr ? (
                            <>
                                <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-green-300 dark:border-green-700">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <p className="text-center text-xs text-muted-foreground">✓ Terhubung — QR tidak diperlukan</p>
                            </>
                        ) : showQr ? (
                            <QrImage src={`${qr.url()}?t=${qrTimestamp}`} onRefresh={() => setQrTimestamp(Date.now())} />
                        ) : (
                            <div className="flex h-36 w-36 items-center justify-center rounded-lg border bg-muted">
                                <WifiOff className="h-8 w-8 text-muted-foreground" />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Info Sesi */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Info Sesi</CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                    {[
                        { label: 'Session', value: sessionInfo?.name ?? '—' },
                        { label: 'Engine', value: engineLabel(sessionInfo?.engine) },
                        { label: 'Status', value: sessionInfo?.status ?? '—' },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between py-2">
                            <span className="text-sm text-muted-foreground">{label}</span>
                            <span className="text-sm font-medium text-foreground">
                                {label === 'Status' ? (
                                    <Badge variant={value === 'WORKING' ? 'default' : 'secondary'}>{value}</Badge>
                                ) : (
                                    value
                                )}
                            </span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={actionsDisabled}
                            className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300"
                        >
                            {sessionState === 'logging_in' ? (
                                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            ) : (
                                <Zap className="mr-1 h-4 w-4" />
                            )}
                            Restart
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Restart sesi WhatsApp?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Sesi akan di-restart. Koneksi WhatsApp mungkin terputus sebentar.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleRestart}>Restart</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={actionsDisabled}
                            className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300"
                        >
                            {sessionState === 'logging_out' ? (
                                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            ) : (
                                <Square className="mr-1 h-4 w-4" />
                            )}
                            Stop
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Stop sesi WhatsApp?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Sesi akan dihentikan. WhatsApp tidak akan bisa mengirim atau menerima pesan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleStop}>Stop</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

Whatsapp.layout = {
    breadcrumbs: [{ title: 'WhatsApp Session', href: settingsWhatsapp.url() }],
};
