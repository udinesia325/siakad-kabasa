import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

type Crumb = { label: string; href?: string };

type Props = {
    breadcrumbs?: Crumb[];
    tahunAjaranAktif: { nama: string } | null;
    children: React.ReactNode;
};

const NAMA_SEKOLAH = 'SMK Babussalam';

export default function PublikLayout({
    breadcrumbs = [],
    tahunAjaranAktif,
    children,
}: Props) {
    const backCrumb = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2] : null;

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-background">
                <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 md:px-6">
                    <Link href="/jadwal" className="flex items-center gap-2">
                        <AppLogoIcon className="h-7 w-7" />
                        <span className="font-semibold">{NAMA_SEKOLAH}</span>
                    </Link>
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
