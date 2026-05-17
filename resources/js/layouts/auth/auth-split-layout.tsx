import { Link, usePage } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* ── Kiri: panel dekoratif ── */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-[oklch(0.20_0.04_250)] p-10 lg:flex">
                {/* Grid pattern overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `linear-gradient(oklch(0.75 0.18 220) 1px, transparent 1px),
                                          linear-gradient(90deg, oklch(0.75 0.18 220) 1px, transparent 1px)`,
                        backgroundSize: '48px 48px',
                    }}
                />
                {/* Glow blob */}
                <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[oklch(0.55_0.22_220)] opacity-20 blur-[120px]" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-[oklch(0.50_0.20_260)] opacity-15 blur-[100px]" />

                {/* Logo + nama */}
                <Link href={home()} className="relative z-10 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                        <img
                            src="/images/kabasa.png"
                            alt="KABASA"
                            className="h-9 w-9 object-contain drop-shadow-lg"
                        />
                    </div>
                    <span className="text-base font-semibold tracking-tight text-white/90">
                        {name}
                    </span>
                </Link>

                {/* Quote tengah */}
                <div className="relative z-10">
                    {/* Ikon kutip */}
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        className="mb-5 text-sky-400/60"
                    >
                        <path
                            d="M8 26c0-6.627 5.373-12 12-12V8C10.954 8 4 14.954 4 24v8h12v-6H8zm20 0c0-6.627 5.373-12 12-12V8c-9.046 0-16 6.954-16 16v8h12v-6h-8z"
                            fill="currentColor"
                        />
                    </svg>
                    <blockquote className="text-xl leading-relaxed font-light text-white/80">
                        "Pendidikan adalah senjata paling ampuh yang dapat kamu gunakan
                        untuk mengubah dunia."
                    </blockquote>
                    <p className="mt-5 text-sm font-medium text-white/40">— Nelson Mandela</p>
                </div>

                {/* Footer logo sekolah */}
                <div className="relative z-10 flex items-center gap-3">
                    <img
                        src="/images/smkn-babussalam.png"
                        alt="SMK Babussalam"
                        className="h-10 w-10 object-contain opacity-80"
                    />
                    <div>
                        <p className="text-xs font-semibold text-white/70">SMK Babussalam</p>
                        <p className="text-xs text-white/35">Sistem Informasi Akademik</p>
                    </div>
                </div>
            </div>

            {/* ── Kanan: form ── */}
            <div className="flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    {/* Logo mobile */}
                    <div className="mb-8 flex items-center gap-3 lg:hidden">
                        <img
                            src="/images/kabasa.png"
                            alt="KABASA"
                            className="h-8 w-8 object-contain"
                        />
                        <span className="text-sm font-semibold text-foreground">{name}</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            {title}
                        </h1>
                        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
