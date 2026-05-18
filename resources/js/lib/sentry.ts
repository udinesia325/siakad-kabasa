import * as Sentry from '@sentry/react';

const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;

if (dsn) {
    Sentry.init({
        dsn,
        environment:
            (import.meta.env.VITE_SENTRY_ENVIRONMENT as string) ||
            import.meta.env.MODE,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
        ],
        // Kirim 10% transaksi untuk performance monitoring
        tracesSampleRate: 0.1,
        // Rekam 10% session, 100% session yang ada error-nya
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });
}

export { Sentry };
