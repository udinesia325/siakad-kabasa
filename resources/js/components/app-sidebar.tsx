import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    BriefcaseBusiness,
    CalendarCheck,
    CalendarClock,
    CalendarOff,
    ChartColumn,
    Clock,
    FileText,
    GraduationCap,
    Handshake,
    KeyRound,
    LayoutGrid,
    MapPin,
    NotebookPen,
    Package,
    School,
    Settings,
    ShieldCheck,
    Tag,
    Truck,
    UserCheck,
    Users,
    Wrench,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavSection } from '@/components/nav-section';
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
import type { Auth, NavItem, NavSection as NavSectionType } from '@/types';

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;

    const canModule = (key: string): boolean => {
        if (auth.is_superadmin || auth.permissions.includes('*')) {
            return true;
        }

        return auth.permissions.some((p) => p.startsWith(`${key}.`));
    };

    const sections: NavSectionType[] = [
        {
            key: 'beranda',
            label: 'Beranda',
            collapsible: false,
            items: [
                {
                    title: 'Dashboard',
                    href: dashboard(),
                    icon: LayoutGrid,
                },
                {
                    title: 'Statistik Absensi',
                    href: '/statistik-absensi',
                    icon: ChartColumn,
                    key: 'statistik-absensi',
                },
            ],
        },
        {
            key: 'operasional',
            label: 'Operasional',
            collapsible: false,
            items: [
                {
                    title: 'Kehadiran',
                    href: '/kehadiran',
                    icon: UserCheck,
                    key: 'kehadiran',
                },
                {
                    title: 'Jadwal Mengajar',
                    href: '/jadwal-mengajar',
                    icon: NotebookPen,
                    key: 'jadwal-mengajar',
                },
                {
                    title: 'Jadwal Absensi',
                    href: '/jadwal-absensi',
                    icon: CalendarClock,
                    key: 'jadwal-absensi',
                },
                {
                    title: 'Hari Libur',
                    href: '/hari-libur',
                    icon: CalendarOff,
                    key: 'hari-libur',
                },
            ],
        },
        {
            key: 'master-data',
            label: 'Master Data',
            collapsible: true,
            defaultOpen: true,
            items: [
                {
                    title: 'Tahun Ajaran',
                    href: '/tahun-ajaran',
                    icon: School,
                    key: 'tahun-ajaran',
                },
                {
                    title: 'Kelas',
                    href: '/kelas',
                    icon: GraduationCap,
                    key: 'kelas',
                },
                {
                    title: 'Siswa',
                    href: '/siswa',
                    icon: Users,
                    key: 'siswa',
                },
                {
                    title: 'Pegawai',
                    href: '/pegawai',
                    icon: BriefcaseBusiness,
                    key: 'pegawai',
                },
                {
                    title: 'Mata Pelajaran',
                    href: '/mata-pelajaran',
                    icon: BookOpen,
                    key: 'mata-pelajaran',
                },
                {
                    title: 'Jam Pelajaran',
                    href: '/jam-pelajaran',
                    icon: Clock,
                    key: 'jam-pelajaran',
                },
            ],
        },
        {
            key: 'sarpras',
            label: 'Sarpras',
            collapsible: true,
            defaultOpen: false,
            items: [
                {
                    title: 'Dashboard',
                    href: '/sarpras',
                    icon: LayoutGrid,
                    key: 'sarpras.dashboard',
                },
                {
                    title: 'Data Barang',
                    href: '/sarpras/barang',
                    icon: Package,
                    key: 'sarpras.barang',
                },
                {
                    title: 'Kategori Barang',
                    href: '/sarpras/kategori',
                    icon: Tag,
                    key: 'sarpras.kategori',
                },
                {
                    title: 'Lokasi / Ruangan',
                    href: '/sarpras/lokasi',
                    icon: MapPin,
                    key: 'sarpras.lokasi',
                },
                {
                    title: 'Vendor / Supplier',
                    href: '/sarpras/vendor',
                    icon: Truck,
                    key: 'sarpras.vendor',
                },
                {
                    title: 'Peminjaman',
                    href: '/sarpras/peminjaman',
                    icon: Handshake,
                    key: 'sarpras.peminjaman',
                },
                {
                    title: 'Booking Ruangan',
                    href: '/sarpras/booking-ruangan',
                    icon: CalendarCheck,
                    key: 'sarpras.booking-ruangan',
                },
                {
                    title: 'Laporan Kerusakan',
                    href: '/sarpras/kerusakan',
                    icon: Wrench,
                    key: 'sarpras.kerusakan',
                },
                {
                    title: 'Maintenance',
                    href: '/sarpras/maintenance',
                    icon: Settings,
                    key: 'sarpras.maintenance',
                },
                {
                    title: 'Laporan',
                    href: '/sarpras/laporan',
                    icon: FileText,
                    key: 'sarpras.laporan',
                },
            ],
        },
        {
            key: 'sistem',
            label: 'Sistem',
            collapsible: true,
            defaultOpen: true,
            items: [
                {
                    title: 'Pengguna',
                    href: '/users',
                    icon: ShieldCheck,
                    key: 'users',
                },
                {
                    title: 'Role',
                    href: '/master/roles',
                    icon: KeyRound,
                    key: 'roles',
                },
            ],
        },
    ];

    const visibleSections = sections
        .map((s) => ({
            ...s,
            items: s.items.filter((item) => !item.key || canModule(item.key)),
        }))
        .filter((s) => s.items.length > 0);

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
                {visibleSections.map((section) => (
                    <NavSection key={section.key} section={section} />
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
