import { Form, Head, Link, usePage } from '@inertiajs/react';
import { ChevronDown, ShieldCheck, User } from 'lucide-react';
import { useState } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';

function initials(name: string) {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase();
}

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;
    const [dangerOpen, setDangerOpen] = useState(false);

    return (
        <>
            <Head title="Pengaturan Profil" />

            <div className="space-y-6">
                {/* Avatar card */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardContent className="flex items-center gap-4 py-5">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                            {initials(auth.user.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-base font-semibold">{auth.user.name}</p>
                            <p className="truncate text-sm text-muted-foreground">{auth.user.email}</p>
                            <div className="mt-1.5 flex items-center gap-2">
                                <Badge variant="secondary" className="text-[10px]">
                                    <ShieldCheck className="mr-1 size-3" />
                                    Pengguna
                                </Badge>
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                                    <span className="size-1.5 rounded-full bg-emerald-500" />
                                    Aktif
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form */}
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <User className="size-4" />
                            Informasi Profil
                        </CardTitle>
                        <CardDescription>Perbarui nama dan alamat email Anda</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            {...ProfileController.update()}
                            options={{ preserveScroll: true }}
                            className="space-y-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="name">Nama Lengkap</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                defaultValue={auth.user.name}
                                                required
                                                autoComplete="name"
                                                placeholder="Nama lengkap"
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                defaultValue={auth.user.email}
                                                required
                                                autoComplete="username"
                                                placeholder="Alamat email"
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                    </div>

                                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                                        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-200">
                                            Email belum diverifikasi.{' '}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className="underline underline-offset-4 hover:text-amber-900"
                                            >
                                                Kirim ulang link verifikasi
                                            </Link>
                                            {status === 'verification-link-sent' && (
                                                <p className="mt-1 font-medium text-green-600">
                                                    Link verifikasi telah dikirim ke email Anda.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex justify-end">
                                        <Button disabled={processing}>Simpan</Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                {/* Danger Zone collapsible */}
                <div className="rounded-lg border border-destructive/30">
                    <button
                        type="button"
                        onClick={() => setDangerOpen((v) => !v)}
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5"
                    >
                        <span>Zona Berbahaya</span>
                        <ChevronDown
                            className={cn(
                                'size-4 transition-transform duration-200',
                                dangerOpen && 'rotate-180',
                            )}
                        />
                    </button>
                    {dangerOpen && (
                        <div className="border-t border-destructive/20 px-4 py-4">
                            <DeleteUser />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [{ title: 'Pengaturan Profil', href: edit() }],
};
