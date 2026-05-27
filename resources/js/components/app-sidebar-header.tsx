import { Link, usePage } from '@inertiajs/react';
import { BookMarked, ScanLine } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import type { Auth } from '@/types/auth';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const canScan =
        auth.is_superadmin ||
        auth.permissions.includes('*') ||
        auth.permissions.includes('absensi.scan');
    const canCreateJurnal =
        auth.is_superadmin ||
        auth.permissions.includes('*') ||
        auth.permissions.includes('jurnal.create');

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {(canScan || canCreateJurnal) && (
                <div className="ml-auto flex items-center gap-2">
                    {canCreateJurnal && (
                        <Button asChild size="sm" variant="outline">
                            <Link href="/jurnal/buat">
                                <BookMarked className="h-4 w-4" />
                                Buat Jurnal
                            </Link>
                        </Button>
                    )}
                    {canScan && (
                        <Button asChild size="sm">
                            <Link href="/absensi">
                                <ScanLine className="h-4 w-4" />
                                Mode Absensi
                            </Link>
                        </Button>
                    )}
                </div>
            )}
        </header>
    );
}
