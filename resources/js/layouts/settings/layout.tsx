import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { Auth } from '@/types';

type TabItem = {
    title: string;
    href: string;
    permission?: string;
};

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const { auth } = usePage<{ auth: Auth }>().props;

    const canTab = (permission?: string): boolean => {
        if (!permission) {
return true;
}

        if (auth.is_superadmin || auth.permissions.includes('*')) {
return true;
}

        return auth.permissions.includes(permission);
    };

    const tabs: TabItem[] = [
        { title: 'Profil', href: editProfile.url() },
        { title: 'Keamanan', href: editSecurity.url() },
        { title: 'Tampilan', href: editAppearance.url() },
        { title: 'WhatsApp', href: '/settings/whatsapp', permission: 'whatsapp.view' },
        { title: 'Template WA', href: '/settings/whatsapp-template', permission: 'whatsapp.view' },
    ];

    const visibleTabs = tabs.filter((t) => canTab(t.permission));

    return (
        <div className="px-4 py-6">
            <Heading
                title="Pengaturan"
                description="Kelola profil dan konfigurasi akun Anda"
            />

            <div className="mt-6">
                <div className="border-b border-border">
                    <nav className="-mb-px flex gap-0 overflow-x-auto">
                        {visibleTabs.map((tab) => {
                            const active = isCurrentOrParentUrl(tab.href);

                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={cn(
                                        'shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                                        active
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
                                    )}
                                >
                                    {tab.title}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-8 max-w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
