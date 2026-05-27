import { Form, router } from '@inertiajs/react';
import { AlertTriangle, CheckCircle, RefreshCw, WifiOff, Zap } from 'lucide-react';
import { useState } from 'react';
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
import { logout, qr, reconnect, restart, stop } from '@/routes/settings/whatsapp';

type Props = {
    waState: 'connected' | 'disconnected' | 'error';
    profile: { id?: string; pushname?: string; number?: string } | null;
    sessionInfo: { name?: string; engine?: string | Record<string, unknown>; status?: string } | null;
    errorMessage: string | null;
};

function engineLabel(engine: string | Record<string, unknown> | undefined): string {
    if (!engine) return '—';
    if (typeof engine === 'string') return engine;
    // WAHA returns engine as object e.g. { engine: "WEBJS", WWebVersion: "2.x" }
    if (typeof engine === 'object') {
        const name = (engine as Record<string, unknown>).engine;
        return typeof name === 'string' ? name : JSON.stringify(engine);
    }
    return '—';
}

function LogoutButton() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button type="button" size="sm" variant="destructive">
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
                        onClick={() => router.post(logout.url())}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Logout
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function RestartButton({ disabled }: { disabled?: boolean }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300"
                >
                    <Zap className="mr-1 h-4 w-4" /> Restart
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
                    <AlertDialogAction onClick={() => router.post(restart.url())}>Restart</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function StopButton({ disabled }: { disabled?: boolean }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300"
                >
                    ⏹ Stop
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
                    <AlertDialogAction onClick={() => router.post(stop.url())}>Stop</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function StateBanner({
    waState,
    sessionInfo,
    errorMessage,
}: Pick<Props, 'waState' | 'sessionInfo' | 'errorMessage'>) {
    if (waState === 'connected') {
        return (
            <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 dark:border-green-800 dark:bg-green-950/30">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-sm font-semibold text-green-800 dark:text-green-300">
                        Sesi Aktif · {sessionInfo?.name ?? 'default'}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Form {...reconnect()}>
                        {({ processing }) => (
                            <Button
                                type="submit"
                                size="sm"
                                variant="outline"
                                disabled={processing}
                                className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300"
                            >
                                Reconnect
                            </Button>
                        )}
                    </Form>
                    <LogoutButton />
                </div>
            </div>
        );
    }

    if (waState === 'disconnected') {
        return (
            <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/30">
                <div className="flex items-center gap-2">
                    <WifiOff className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                        Sesi tidak aktif · Scan QR untuk terhubung
                    </span>
                </div>
                <Form {...reconnect()}>
                    {({ processing }) => (
                        <Button type="submit" size="sm" disabled={processing} className="bg-amber-600 text-white hover:bg-amber-700">
                            Reconnect
                        </Button>
                    )}
                </Form>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 dark:border-orange-800 dark:bg-orange-950/30">
            <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                    Tidak dapat terhubung ke WAHA server{errorMessage ? ` — ${errorMessage}` : ''}
                </span>
            </div>
            <Button size="sm" variant="outline" onClick={() => router.reload()}>
                Coba Lagi
            </Button>
        </div>
    );
}

export default function Whatsapp({ waState, profile, sessionInfo, errorMessage }: Props) {
    const [qrTimestamp, setQrTimestamp] = useState(() => Date.now());
    const qrSrc = `${qr.url()}?t=${qrTimestamp}`;

    const actionsDisabled = waState === 'error';
    const profileInitial = profile?.pushname ? profile.pushname.charAt(0).toUpperCase() : 'W';

    return (
        <div className="space-y-6">
            <StateBanner waState={waState} sessionInfo={sessionInfo} errorMessage={errorMessage} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Profil WhatsApp */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            Profil WhatsApp
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {profile ? (
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-700 text-xl font-bold text-white">
                                    {profileInitial}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{profile.pushname ?? '—'}</p>
                                    <p className="text-sm text-muted-foreground">{profile.number ?? profile.id ?? '—'}</p>
                                </div>
                            </div>
                        ) : waState === 'connected' ? (
                            <p className="text-sm text-muted-foreground">Profil tidak tersedia</p>
                        ) : (
                            <div className="space-y-2">
                                <div className="h-4 w-3/4 rounded bg-muted" />
                                <div className="h-3 w-1/2 rounded bg-muted" />
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
                        {waState === 'connected' ? (
                            <>
                                <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-green-300 dark:border-green-700">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <p className="text-center text-xs text-muted-foreground">✓ Terhubung — QR tidak diperlukan</p>
                                <Button variant="outline" size="sm" onClick={() => setQrTimestamp(Date.now())}>
                                    <RefreshCw className="mr-1 h-3 w-3" /> Refresh QR
                                </Button>
                            </>
                        ) : (
                            <>
                                {waState === 'disconnected' ? (
                                    <img src={qrSrc} alt="WhatsApp QR Code" className="h-36 w-36 rounded-lg border object-contain" />
                                ) : (
                                    <div className="flex h-36 w-36 items-center justify-center rounded-lg border bg-muted">
                                        <WifiOff className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQrTimestamp(Date.now())}
                                    disabled={actionsDisabled}
                                >
                                    <RefreshCw className="mr-1 h-3 w-3" /> Refresh QR
                                </Button>
                            </>
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
                <RestartButton disabled={actionsDisabled} />
                <StopButton disabled={actionsDisabled} />
            </div>
        </div>
    );
}

Whatsapp.layout = {
    breadcrumbs: [{ title: 'WhatsApp Session', href: settingsWhatsapp.url() }],
};
