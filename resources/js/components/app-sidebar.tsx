import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    BriefcaseBusiness,
    CalendarClock,
    CalendarOff,
    Clock,
    GraduationCap,
    LayoutGrid,
    NotebookPen,
    School,
    ShieldCheck,
    UserCheck,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { Auth, NavItem } from '@/types';

const platformNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const masterNavItems: NavItem[] = [
    {
        title: 'Tahun Ajaran',
        href: '/tahun-ajaran',
        icon: School,
    },
    {
        title: 'Kelas',
        href: '/kelas',
        icon: GraduationCap,
    },
    {
        title: 'Siswa',
        href: '/siswa',
        icon: Users,
    },
    {
        title: 'Pegawai',
        href: '/pegawai',
        icon: BriefcaseBusiness,
    },
    {
        title: 'Mata Pelajaran',
        href: '/mata-pelajaran',
        icon: BookOpen,
    },
    {
        title: 'Jam Pelajaran',
        href: '/jam-pelajaran',
        icon: Clock,
    },
];

const manajemenNavItems: NavItem[] = [
    {
        title: 'Kehadiran',
        href: '/kehadiran',
        icon: UserCheck,
    },
    {
        title: 'Jadwal Mengajar',
        href: '/jadwal-mengajar',
        icon: NotebookPen,
    },
    {
        title: 'Jadwal Absensi',
        href: '/jadwal-absensi',
        icon: CalendarClock,
    },
    {
        title: 'Hari Libur',
        href: '/hari-libur',
        icon: CalendarOff,
    },
];

const sistemNavItems: NavItem[] = [
    {
        title: 'Pengguna',
        href: '/users',
        icon: ShieldCheck,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const canSeeSistem =
        auth.roles?.includes('superadmin') || auth.roles?.includes('admin');

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain label="Platform" items={platformNavItems} />
                <NavMain label="Master" items={masterNavItems} />
                <NavMain label="Manajemen" items={manajemenNavItems} />
                {canSeeSistem && (
                    <NavMain label="Sistem" items={sistemNavItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
