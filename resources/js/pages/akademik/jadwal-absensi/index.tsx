import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useFlashToast } from '@/hooks/use-flash-toast';
import { NAMA_HARI } from '@/types/akademik';
import type { JadwalAbsensi } from '@/types/akademik';

type Props = { jadwal: JadwalAbsensi[] };

// ─── Time Select ──────────────────────────────────────────────────────────────

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

function TimeSelect({
    value,
    onChange,
    disabled,
}: {
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
}) {
    const [hh, mm] = value ? value.split(':') : ['', ''];

    function setHour(h: string) {
        onChange(`${h}:${mm || '00'}`);
    }

    function setMinute(m: string) {
        onChange(`${hh || '00'}:${m}`);
    }

    return (
        <div className="flex items-center gap-1">
            <Select value={hh} onValueChange={setHour} disabled={disabled}>
                <SelectTrigger className="w-20">
                    <SelectValue placeholder="Jam" />
                </SelectTrigger>
                <SelectContent>
                    {HOURS.map((h) => (
                        <SelectItem key={h} value={h}>
                            {h}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <span className="text-muted-foreground">:</span>
            <Select value={mm} onValueChange={setMinute} disabled={disabled}>
                <SelectTrigger className="w-20">
                    <SelectValue placeholder="Menit" />
                </SelectTrigger>
                <SelectContent>
                    {MINUTES.map((m) => (
                        <SelectItem key={m} value={m}>
                            {m}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

function JadwalCard({ j }: { j: JadwalAbsensi }) {
    const form = useForm({
        is_libur: j.is_libur,
        jam_masuk_min: j.jam_masuk_min?.slice(0, 5) ?? '',
        jam_masuk_max: j.jam_masuk_max?.slice(0, 5) ?? '',
        jam_pulang_min: j.jam_pulang_min?.slice(0, 5) ?? '',
        jam_pulang_max: j.jam_pulang_max?.slice(0, 5) ?? '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.patch(`/jadwal-absensi/${j.id}`, {
            preserveScroll: true,
            preserveState: true,
        });
    }

    function toggleLibur(v: boolean) {
        form.setData('is_libur', v);

        // Kirim langsung dengan data eksplisit — tidak mengandalkan form.data
        // yang belum tentu terupdate saat closure ini dieksekusi.
        // Saat toggle ke non-libur, gunakan jam dari form (sudah diedit user)
        // atau fallback ke jam dari server (j.*) agar validasi backend tidak gagal.
        router.patch(
            `/jadwal-absensi/${j.id}`,
            {
                is_libur: v,
                jam_masuk_min: form.data.jam_masuk_min || j.jam_masuk_min?.slice(0, 5) || '',
                jam_masuk_max: form.data.jam_masuk_max || j.jam_masuk_max?.slice(0, 5) || '',
                jam_pulang_min: form.data.jam_pulang_min || j.jam_pulang_min?.slice(0, 5) || '',
                jam_pulang_max: form.data.jam_pulang_max || j.jam_pulang_max?.slice(0, 5) || '',
            },
            { preserveScroll: true, preserveState: true },
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{NAMA_HARI[j.hari]}</span>
                    <div className="flex items-center gap-2">
                        <Label
                            htmlFor={`libur-${j.id}`}
                            className="text-sm font-normal"
                        >
                            Hari Libur
                        </Label>
                        <Switch
                            id={`libur-${j.id}`}
                            checked={form.data.is_libur}
                            onCheckedChange={toggleLibur}
                            disabled={form.processing}
                        />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    {!form.data.is_libur && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Masuk — Mulai</Label>
                                <TimeSelect
                                    value={form.data.jam_masuk_min}
                                    onChange={(v) => form.setData('jam_masuk_min', v)}
                                    disabled={form.processing}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Masuk — Batas</Label>
                                <TimeSelect
                                    value={form.data.jam_masuk_max}
                                    onChange={(v) => form.setData('jam_masuk_max', v)}
                                    disabled={form.processing}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Pulang — Mulai</Label>
                                <TimeSelect
                                    value={form.data.jam_pulang_min}
                                    onChange={(v) => form.setData('jam_pulang_min', v)}
                                    disabled={form.processing}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Pulang — Batas</Label>
                                <TimeSelect
                                    value={form.data.jam_pulang_max}
                                    onChange={(v) => form.setData('jam_pulang_max', v)}
                                    disabled={form.processing}
                                />
                            </div>
                        </div>
                    )}
                    {!form.data.is_libur && (
                        <Button
                            type="submit"
                            size="sm"
                            disabled={form.processing}
                        >
                            Simpan
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}

export default function JadwalAbsensiIndex({ jadwal }: Props) {
    useFlashToast();

    return (
        <>
            <Head title="Jadwal Absensi" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold">Jadwal Absensi</h1>
                <p className="text-sm text-muted-foreground">
                    Atur jam masuk dan pulang per hari. Absensi hanya bisa
                    dilakukan dalam rentang waktu yang ditentukan.
                </p>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {jadwal.map((j) => (
                        <JadwalCard key={j.id} j={j} />
                    ))}
                </div>
            </div>
        </>
    );
}

JadwalAbsensiIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jadwal Absensi', href: '/jadwal-absensi' },
    ],
};
