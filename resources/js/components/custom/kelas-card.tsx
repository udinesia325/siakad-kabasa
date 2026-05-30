import {
    ArrowUpRight,
    Calendar,
    Clock,
    MoreVertical,
    Pencil,
    Trash2,
    User,
    Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Kelas } from '@/types/akademik';

type AccentColor = string;

type KelasCardActions = {
    onNaikKelas?: () => void;
    onLuluskan?: () => void;
    onRiwayat?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
};

type KelasCardProps = {
    kelas: Kelas;
    accentColor: AccentColor;
    badgeClass: string;
    actions?: KelasCardActions;
    // showActions=false untuk konteks read-only (misal: preview pilih kelas)
    showActions?: boolean;
    // showFooterButtons=false sembunyikan seluruh baris tombol footer
    showFooterButtons?: boolean;
};

export function KelasCard({
    kelas: k,
    accentColor,
    badgeClass,
    actions = {},
    showActions = true,
    showFooterButtons = true,
}: KelasCardProps) {
    const canDelete = (k.siswa_count ?? 0) === 0;
    const footerCols = showActions ? 'grid-cols-[1fr_1fr_auto]' : 'grid-cols-2';

    return (
        <Card
            className="group relative rounded-2xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-card dark:shadow-none"
            style={{
                border: '1px solid hsl(var(--border))',
                borderTop: `3px solid ${accentColor}`,
            }}
        >
            <div className="px-5 pt-5 pb-4">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-xl font-bold leading-tight tracking-tight text-foreground">
                            {k.nama}
                        </h3>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 shrink-0" />
                            {k.tahun_ajaran?.nama}
                        </div>
                    </div>
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold ${badgeClass}`}>
                        {k.tingkat}
                    </div>
                </div>

                {/* Tags */}
                {(k.rombel || k.jurusan || k.jenis_kelas) && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {k.rombel && (
                            <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                                Rombel {k.rombel}
                            </span>
                        )}
                        {k.jurusan && (
                            <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                                {k.jurusan.singkatan}
                            </span>
                        )}
                        {k.jenis_kelas && (
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                                {k.jenis_kelas.nama}
                            </span>
                        )}
                    </div>
                )}

                {/* Divider */}
                <div className="mb-4 h-px bg-border" />

                {/* Info rows */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400">
                            <User className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                Wali Kelas
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                                {k.wali_kelas ? k.wali_kelas.nama : (
                                    <span className="italic font-normal text-muted-foreground">Belum ada wali</span>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-500 dark:bg-violet-950/40 dark:text-violet-400">
                            <Users className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                Siswa Aktif
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                                {k.siswa_count ?? 0}{' '}
                                <span className="font-normal text-muted-foreground">siswa</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer buttons */}
                {showFooterButtons && <div className={`mt-5 grid ${footerCols} gap-2`}>
                    {k.tingkat !== 'XII' ? (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-10 gap-1.5 rounded-xl border border-blue-200 bg-blue-50 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50"
                            onClick={actions.onNaikKelas}
                        >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            Naik Kelas
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-10 gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
                            onClick={actions.onLuluskan}
                        >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            Luluskan
                        </Button>
                    )}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-10 gap-1.5 rounded-xl border border-border bg-muted/50 text-sm font-semibold text-muted-foreground hover:bg-muted dark:hover:bg-muted/80"
                        onClick={actions.onRiwayat}
                    >
                        <Clock className="h-3.5 w-3.5" />
                        Riwayat
                    </Button>

                    {showActions && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-10 w-10 rounded-xl border border-border bg-muted/50 p-0 hover:bg-muted dark:hover:bg-muted/80"
                                >
                                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={actions.onEdit}>
                                    <Pencil className="mr-2 h-3.5 w-3.5" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    disabled={!canDelete}
                                    className={canDelete ? 'text-destructive focus:text-destructive' : ''}
                                    onSelect={canDelete ? actions.onDelete : undefined}
                                >
                                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                                    Hapus
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>}
            </div>
        </Card>
    );
}
