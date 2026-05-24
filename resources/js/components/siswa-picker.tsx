import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export interface SiswaOption {
    id: number;
    nama: string;
    nisn: string | null;
    kelas_id: number | null;
    kelas: string | null;
    status: string;
}

export interface SiswaPickerProps {
    value: number | null;
    onChange: (siswa: SiswaOption | null) => void;
    placeholder?: string;
    disabled?: boolean;
    kelasId?: number;
    className?: string;
}

export function SiswaPicker({
    value,
    onChange,
    placeholder = 'Cari nama atau NISN...',
    disabled = false,
    kelasId,
    className,
}: SiswaPickerProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SiswaOption[]>([]);
    const [selected, setSelected] = useState<SiswaOption | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync selected state jika value di-reset dari luar (misal form.reset())
    useEffect(() => {
        if (value === null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelected(null);
            setQuery('');
        }
    }, [value]);

    // Debounce search
    useEffect(() => {
        if (query.length < 3) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResults([]);
            setOpen(false);

            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);

            try {
                const params = new URLSearchParams({ q: query });

                if (kelasId) {
                    params.set('kelas_id', String(kelasId));
                }

                const res = await fetch(`/api/siswa/search?${params}`, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Accept: 'application/json',
                    },
                    credentials: 'same-origin',
                });
                const data: SiswaOption[] = await res.json();
                setResults(data);
                setOpen(true);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query, kelasId]);

    // Tutup dropdown saat klik di luar
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleSelect(siswa: SiswaOption) {
        setSelected(siswa);
        setOpen(false);
        setQuery('');
        setResults([]);
        onChange(siswa);
    }

    function handleClear() {
        setSelected(null);
        setQuery('');
        setResults([]);
        onChange(null);
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    // Tampilan setelah siswa dipilih
    if (selected) {
        return (
            <div
                className={cn(
                    'flex items-center justify-between rounded-md border border-primary bg-primary/5 px-3 py-2',
                    disabled && 'cursor-not-allowed opacity-50',
                    className,
                )}
            >
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{selected.nama}</p>
                    <p className="truncate text-xs text-muted-foreground">
                        {selected.kelas ?? '—'} · NISN {selected.nisn ?? '—'}
                    </p>
                </div>
                {!disabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="ml-2 shrink-0 text-muted-foreground hover:text-foreground"
                        aria-label="Hapus pilihan"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        );
    }

    // Tampilan input + dropdown
    return (
        <div ref={containerRef} className={cn('relative', className)}>
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
                    'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                )}
            />
            {open && (
                <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
                    {loading && (
                        <p className="px-3 py-2 text-sm text-muted-foreground">Mencari...</p>
                    )}
                    {!loading && results.length === 0 && (
                        <p className="px-3 py-2 text-sm text-muted-foreground">Tidak ditemukan.</p>
                    )}
                    {!loading &&
                        results.map((siswa) => (
                            <button
                                key={siswa.id}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleSelect(siswa)}
                                className="w-full px-3 py-2 text-left hover:bg-accent"
                            >
                                <p className="text-sm font-medium">{siswa.nama}</p>
                                <p className="text-xs text-muted-foreground">
                                    {siswa.kelas ?? '—'} · NISN {siswa.nisn ?? '—'}
                                </p>
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}
