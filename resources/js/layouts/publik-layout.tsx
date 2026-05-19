import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type Crumb = { label: string; href?: string };

type Props = {
    breadcrumbs?: Crumb[];
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
    children: React.ReactNode;
};

export default function PublikLayout({
    breadcrumbs = [],
    tahunAjaranAktif,
    namaSekolah,
    children,
}: Props) {
    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
                    <Link href="/jadwal" className="flex items-center gap-2">
                        <AppLogoIcon className="h-8 w-8" />
                        <span className="font-semibold">{namaSekolah}</span>
                    </Link>
                    {tahunAjaranAktif && (
                        <span className="rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                            Tahun Ajaran {tahunAjaranAktif.nama}
                        </span>
                    )}
                </div>
                {breadcrumbs.length > 0 && (
                    <div className="border-t bg-muted/30">
                        <div className="mx-auto max-w-7xl px-4 py-2 md:px-6">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbs.map((c, idx) => {
                                        const isLast = idx === breadcrumbs.length - 1;
                                        return (
                                            <BreadcrumbItem key={`${c.label}-${idx}`}>
                                                {isLast || !c.href ? (
                                                    <BreadcrumbPage>{c.label}</BreadcrumbPage>
                                                ) : (
                                                    <>
                                                        <BreadcrumbLink asChild>
                                                            <Link href={c.href}>{c.label}</Link>
                                                        </BreadcrumbLink>
                                                        <BreadcrumbSeparator />
                                                    </>
                                                )}
                                            </BreadcrumbItem>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                )}
            </header>
            <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">{children}</main>
            <footer className="border-t bg-muted/20">
                <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground md:px-6">
                    © {new Date().getFullYear()} {namaSekolah}
                </div>
            </footer>
        </div>
    );
}
