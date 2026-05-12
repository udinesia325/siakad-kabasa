import { Head, router, useForm } from '@inertiajs/react';
import { CheckCircle, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TahunAjaran } from '@/types/akademik';

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    total: number;
};

type Props = {
    tahunAjaran: Paginated<TahunAjaran>;
    filters: { search?: string };
};

export default function TahunAjaranIndex({ tahunAjaran, filters }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<TahunAjaran | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [items, setItems] = useState<TahunAjaran[]>(tahunAjaran.data);
    const [currentPage, setCurrentPage] = useState(tahunAjaran.current_page);
    const [lastPage, setLastPage] = useState(tahunAjaran.last_page);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const form = useForm({ nama: '' });

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        setItems(tahunAjaran.data);
        setCurrentPage(tahunAjaran.current_page);
        setLastPage(tahunAjaran.last_page);
    }, [tahunAjaran]);
    /* eslint-enable react-hooks/set-state-in-effect */

    function loadNextPage() {
        if (loading || currentPage >= lastPage) {
            return;
        }

        setLoading(true);
        router.get(
            '/tahun-ajaran',
            { search: search || undefined, page: currentPage + 1 },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['tahunAjaran'],
                onSuccess: (page) => {
                    const next = (page.props as unknown as Props).tahunAjaran;
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
                '/tahun-ajaran',
                { search: value || undefined },
                {
                    preserveState: true,
                    preserveScroll: false,
                    only: ['tahunAjaran', 'filters'],
                    onSuccess: (page) => {
                        const fresh = (page.props as unknown as Props)
                            .tahunAjaran;
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

    function openCreate() {
        form.reset();
        setEditing(null);
        setOpen(true);
    }

    function openEdit(ta: TahunAjaran) {
        form.setData({ nama: ta.nama });
        setEditing(ta);
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            form.patch(`/tahun-ajaran/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/tahun-ajaran', { onSuccess: () => setOpen(false) });
        }
    }

    function hapus(ta: TahunAjaran) {
        if (confirm(`Hapus tahun ajaran ${ta.nama}?`)) {
            form.delete(`/tahun-ajaran/${ta.id}`);
        }
    }

    function setAktif(ta: TahunAjaran) {
        form.patch(`/tahun-ajaran/${ta.id}/set-aktif`);
    }

    return (
        <>
            <Head title="Tahun Ajaran" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Tahun Ajaran</h1>
                    <Button onClick={openCreate}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                <Input
                    placeholder="Cari tahun ajaran..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="max-w-xs"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((ta) => (
                        <Card key={ta.id}>
                            <CardContent className="pt-4">
                                <div className="flex items-start justify-between gap-2">
                                    <span className="text-lg font-medium">
                                        {ta.nama}
                                    </span>
                                    {ta.is_active ? (
                                        <Badge>Aktif</Badge>
                                    ) : (
                                        <Badge variant="outline">
                                            Tidak Aktif
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                {!ta.is_active && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setAktif(ta)}
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEdit(ta)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                {!ta.is_active && (
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => hapus(ta)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}

                    {items.length === 0 && !loading && (
                        <p className="col-span-full text-center text-muted-foreground">
                            Belum ada data tahun ajaran.
                        </p>
                    )}
                </div>

                {loading && (
                    <p className="text-center text-sm text-muted-foreground">
                        Memuat...
                    </p>
                )}

                <div ref={sentinelRef} className="h-1" />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing
                                ? 'Edit Tahun Ajaran'
                                : 'Tambah Tahun Ajaran'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="nama">Nama</Label>
                                <Input
                                    id="nama"
                                    placeholder="contoh: 2025/2026"
                                    value={form.data.nama}
                                    onChange={(e) =>
                                        form.setData('nama', e.target.value)
                                    }
                                />
                                {form.errors.nama && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.nama}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={form.processing}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

TahunAjaranIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tahun Ajaran', href: '/tahun-ajaran' },
    ],
};
