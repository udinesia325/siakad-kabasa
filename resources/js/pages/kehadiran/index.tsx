import { Head, router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KelasCard } from '@/components/custom/kelas-card';
import { Input } from '@/components/ui/input';
import type { Kelas } from '@/types/akademik';

type Props = {
    kelas: {
        data: Kelas[];
        current_page: number;
        last_page: number;
        next_page_url: string | null;
    };
    filters: { search?: string };
    view_scope: 'semua_kelas' | 'wali_kelas';
};

function accentForTingkat(tingkat: string | null) {
    if (tingkat === 'X') return '#3b82f6';
    if (tingkat === 'XI') return '#8b5cf6';
    return '#10b981';
}

function badgeClassForTingkat(tingkat: string | null) {
    if (tingkat === 'X')
        return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900';
    if (tingkat === 'XI')
        return 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900';
    return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900';
}

export default function KehadiranIndex({ kelas, filters, view_scope }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [items, setItems] = useState<Kelas[]>(kelas.data);
    const [currentPage, setCurrentPage] = useState(kelas.current_page);
    const [lastPage, setLastPage] = useState(kelas.last_page);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        setItems(kelas.data);
        setCurrentPage(kelas.current_page);
        setLastPage(kelas.last_page);
    }, [kelas]);
    /* eslint-enable react-hooks/set-state-in-effect */

    function loadNextPage() {
        if (loading || currentPage >= lastPage) return;
        setLoading(true);
        router.get(
            '/kehadiran',
            { search: search || undefined, page: currentPage + 1 },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['kelas'],
                onSuccess: (page) => {
                    const next = (page.props as unknown as Props).kelas;
                    setItems((prev) => [...prev, ...next.data]);
                    setCurrentPage(next.current_page);
                    setLastPage(next.last_page);
                    setLoading(false);
                },
            },
        );
    }

    const handleSearch = useCallback((value: string) => {
        setSearch(value);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            router.get(
                '/kehadiran',
                { search: value || undefined },
                {
                    preserveState: true,
                    preserveScroll: false,
                    only: ['kelas', 'filters'],
                    onSuccess: (page) => {
                        const fresh = (page.props as unknown as Props).kelas;
                        setItems(fresh.data);
                        setCurrentPage(fresh.current_page);
                        setLastPage(fresh.last_page);
                    },
                },
            );
        }, 300);
    }, []);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) loadNextPage(); },
            { threshold: 0.1 },
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [currentPage, lastPage, loading, search]);

    return (
        <>
            <Head title="Kehadiran" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Kehadiran</h1>
                    <p className="text-sm text-muted-foreground">
                        Pilih kelas untuk melihat dan mengelola data kehadiran siswa.
                    </p>
                </div>

                <Input
                    placeholder="Cari nama kelas..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="max-w-xs"
                />

                {items.length === 0 && !loading ? (
                    <div className="flex flex-col items-center gap-1 py-8 text-center text-muted-foreground">
                        <p>
                            {view_scope === 'wali_kelas'
                                ? 'Anda tidak memiliki kelas yang diwalikan.'
                                : 'Belum ada data kelas.'}
                        </p>
                        {view_scope === 'wali_kelas' && (
                            <p className="text-xs">
                                Hanya kelas dengan wali kelas yang sesuai akun ini yang ditampilkan.
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {items
                            .reduce<{ tingkat: string; tingkat_id: number; items: Kelas[] }[]>((acc, k) => {
                                const existing = acc.find((g) => g.tingkat_id === (k.tingkat_id ?? 0));
                                if (existing) {
                                    existing.items.push(k);
                                } else {
                                    acc.push({ tingkat: k.tingkat ?? '', tingkat_id: k.tingkat_id ?? 0, items: [k] });
                                }
                                return acc;
                            }, [])
                            .map((group) => (
                                <div key={group.tingkat_id} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <h2
                                            className="text-sm font-semibold tracking-wide uppercase"
                                            style={{ color: accentForTingkat(group.tingkat) }}
                                        >
                                            Tingkat {group.tingkat}
                                        </h2>
                                        <div className="flex-1 border-t border-dashed border-border" />
                                        <span className="text-xs text-muted-foreground">
                                            {group.items.length} kelas
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {group.items.map((k) => (
                                            <div
                                                key={k.id}
                                                className="cursor-pointer"
                                                onClick={() => router.visit(`/kehadiran/${k.id}`)}
                                            >
                                                <KelasCard
                                                    kelas={k}
                                                    accentColor={accentForTingkat(k.tingkat)}
                                                    badgeClass={badgeClassForTingkat(k.tingkat)}
                                                    showActions={false}
                                                    showFooterButtons={false}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}

                {loading && (
                    <p className="text-center text-sm text-muted-foreground">Memuat...</p>
                )}
                <div ref={sentinelRef} className="h-1" />
            </div>
        </>
    );
}

KehadiranIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kehadiran', href: '/kehadiran' },
    ],
};
