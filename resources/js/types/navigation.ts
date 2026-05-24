import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    /**
     * Stable key untuk persistensi state collapsible di localStorage.
     * Wajib diisi untuk item yang punya children.
     */
    key?: string;
    /**
     * Jika true, item hanya aktif pada kecocokan URL tepat (bukan prefix).
     * Gunakan untuk dashboard/root route agar tidak aktif di sub-halaman.
     */
    exact?: boolean;
    /**
     * Sub-items untuk parent collapsible. Jika ada minimal 1 child,
     * item dirender sebagai collapsible parent. Jika tidak,
     * dirender sebagai flat link.
     */
    children?: NavItem[];
};

export type NavSection = {
    /** Stable key untuk persistensi state collapsible section. */
    key: string;
    label: string;
    items: NavItem[];
    /** Apakah section dapat di-collapse. Default false. */
    collapsible?: boolean;
    /** Default open state saat belum ada saved state. Default true. */
    defaultOpen?: boolean;
    /** Hide section secara kondisional (mis. permission check sederhana). */
    hidden?: boolean;
};
