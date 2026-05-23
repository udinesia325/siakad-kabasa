import { Head, router } from '@inertiajs/react';
import { UserCheck } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Kelas } from '@/types/akademik';

type KelasWithCount = Kelas & { siswa_count: number };

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    total: number;
};

type Props = {
    kelas: Paginated<KelasWithCount>;
    filters: { search?: string };
    view_scope: 'semua_kelas' | 'wali_kelas';
};

export default function KehadiranIndex({ kelas, filters, view_scope }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [items, setItems] = useState<KelasWithCount[]>(kelas.data);
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
        if (loading || currentPage >= lastPage) {
            return;
        }

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

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

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

        if (!sentinel) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadNextPage();
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [currentPage, lastPage, loading, search]);

    return (
        <>
            <Head title="Kehadiran" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-2">
                    <UserCheck className="h-6 w-6" />
                    <h1 className="text-2xl font-semibold">Kehadiran</h1>
                </div>

                <Input
                    placeholder="Cari nama kelas..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="max-w-xs"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((k) => (
                        <Card
                            key={k.id}
                            className="cursor-pointer transition-shadow hover:shadow-md"
                            onClick={() => router.visit(`/kehadiran/${k.id}`)}
                        >
                            <CardContent className="pt-4">
                                <div className="flex items-start justify-between gap-2">
                                    <span className="text-lg font-medium">
                                        {k.nama}
                                    </span>
                                    <Badge variant="outline">{k.tingkat}</Badge>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {k.tahun_ajaran?.nama}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {k.siswa_count} siswa
                                </p>
                            </CardContent>
                        </Card>
                    ))}

                    {items.length === 0 && !loading && (
                        <div className="col-span-full flex flex-col items-center gap-1 py-8 text-center text-muted-foreground">
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
                    )}
                </div>

                {loading && (
                    <p className="text-center text-sm text-muted-foreground">
                        Memuat...
                    </p>
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
