import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useFlashToast } from '@/hooks/use-flash-toast';
import { NAMA_HARI } from '@/types/akademik';
import type { JadwalAbsensi } from '@/types/akademik';

type Props = { jadwal: JadwalAbsensi[] };

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
        router.patch(
            `/jadwal-absensi/${j.id}`,
            { ...form.data, is_libur: v },
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
                                <Input
                                    type="time"
                                    value={form.data.jam_masuk_min}
                                    onChange={(e) =>
                                        form.setData(
                                            'jam_masuk_min',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Masuk — Batas</Label>
                                <Input
                                    type="time"
                                    value={form.data.jam_masuk_max}
                                    onChange={(e) =>
                                        form.setData(
                                            'jam_masuk_max',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Pulang — Mulai</Label>
                                <Input
                                    type="time"
                                    value={form.data.jam_pulang_min}
                                    onChange={(e) =>
                                        form.setData(
                                            'jam_pulang_min',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Pulang — Batas</Label>
                                <Input
                                    type="time"
                                    value={form.data.jam_pulang_max}
                                    onChange={(e) =>
                                        form.setData(
                                            'jam_pulang_max',
                                            e.target.value,
                                        )
                                    }
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
