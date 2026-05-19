import { Link } from '@inertiajs/react';
import { ChevronLeft, Monitor, Moon, Sun } from 'lucide-react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

type Crumb = { label: string; href?: string };

type Props = {
    breadcrumbs?: Crumb[];
    tahunAjaranAktif: { nama: string } | null;
    children: React.ReactNode;
};

const NAMA_SEKOLAH = 'SMK Babussalam';

const APPEARANCE_OPTIONS: { value: Appearance; icon: typeof Sun; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
];

function AppearanceToggleCompact() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="inline-flex gap-0.5 rounded-md border bg-muted/40 p-0.5">
            {APPEARANCE_OPTIONS.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => updateAppearance(value)}
                    aria-label={`Tema ${label}`}
                    title={`Tema ${label}`}
                    className={cn(
                        'rounded p-1.5 transition-colors',
                        appearance === value
                            ? 'bg-background text-foreground shadow-xs'
                            : 'text-muted-foreground hover:text-foreground',
                    )}
                >
                    <Icon className="h-3.5 w-3.5" />
                </button>
            ))}
        </div>
    );
}

export default function PublikLayout({
    breadcrumbs = [],
    tahunAjaranAktif,
    children,
}: Props) {
    const backCrumb = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2] : null;

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-background">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3 md:px-6">
                    <Link href="/jadwal" className="flex items-center gap-2">
                        <img
                            src="/images/smkn-babussalam.png"
                            alt="Logo SMK Babussalam"
                            className="h-9 w-9 object-contain"
                        />
                        <span className="font-semibold">{NAMA_SEKOLAH}</span>
                    </Link>
                    <AppearanceToggleCompact />
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-4 py-6 md:px-6">
                {backCrumb?.href && (
                    <Link
                        href={backCrumb.href}
                        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Kembali ke {backCrumb.label}
                    </Link>
                )}
                {tahunAjaranAktif && (
                    <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Tahun Ajaran {tahunAjaranAktif.nama}
                    </p>
                )}
                {children}
            </main>
        </div>
    );
}
