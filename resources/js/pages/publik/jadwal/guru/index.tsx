import { Head, Link, router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import PublikLayout from '@/layouts/publik-layout';
import GuruCard from '@/components/publik/jadwal/guru-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Pegawai = { id: number; nama: string };

type PaginationLink = { url: string | null; label: string; active: boolean };

type Paginator<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
};

type Props = {
    guru: Paginator<Pegawai>;
    filters: { search: string };
    tahunAjaranAktif: { nama: string } | null;
    namaSekolah: string;
};

export default function PublikGuruIndex({ guru, filters, tahunAjaranAktif, namaSekolah }: Props) {
    const [search, setSearch] = useState(filters.search);

    useEffect(() => {
        if (search === filters.search) return;
        const t = setTimeout(() => {
            router.get(
                '/jadwal/guru',
                search ? { search } : {},
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);
        return () => clearTimeout(t);
    }, [search, filters.search]);

    return (
        <PublikLayout
            tahunAjaranAktif={tahunAjaranAktif}
            breadcrumbs={[
                { label: 'Jadwal', href: '/jadwal' },
                { label: 'Guru' },
            ]}
        >
            <Head title={`Jadwal Guru — ${namaSekolah}`} />
            <h1 className="mb-1 text-2xl font-semibold">Jadwal Guru</h1>
            <p className="mb-4 text-sm text-muted-foreground">
                Cari nama guru untuk melihat jadwal mengajarnya.
            </p>

            <div className="relative mb-6 max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama guru..."
                    className="pl-9 pr-9"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted"
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {guru.data.length === 0 ? (
                <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                    {filters.search
                        ? `Tidak ada guru cocok dengan "${filters.search}".`
                        : 'Belum ada guru dengan jadwal di tahun ajaran aktif.'}
                </div>
            ) : (
                <>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {guru.data.map((g) => (
                            <GuruCard key={g.id} {...g} />
                        ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
                        <p className="text-muted-foreground">
                            Menampilkan {guru.from ?? 0}–{guru.to ?? 0} dari {guru.total} guru
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {guru.links.map((link, idx) =>
                                link.url ? (
                                    <Button
                                        key={idx}
                                        asChild
                                        size="sm"
                                        variant={link.active ? 'default' : 'outline'}
                                    >
                                        <Link
                                            href={link.url}
                                            preserveState
                                            preserveScroll
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        key={idx}
                                        size="sm"
                                        variant="outline"
                                        disabled
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </>
            )}
        </PublikLayout>
    );
}
