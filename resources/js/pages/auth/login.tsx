import { Form, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { register } from '@/routes';
import { store } from '@/routes/login';

const QUOTES: { text: string; author: string }[] = [
    {
        text: 'Pendidikan adalah senjata paling ampuh untuk mengubah dunia.',
        author: 'Nelson Mandela',
    },
    {
        text: 'Akar pendidikan itu pahit, tetapi buahnya manis.',
        author: 'Aristoteles',
    },
    {
        text: 'Pendidikan adalah paspor menuju masa depan, karena hari esok hanya milik mereka yang mempersiapkannya hari ini.',
        author: 'Malcolm X',
    },
    {
        text: 'Pendidikan bukanlah persiapan untuk hidup; pendidikan adalah hidup itu sendiri.',
        author: 'John Dewey',
    },
    {
        text: 'Pendidikan adalah apa yang tersisa setelah kita melupakan semua yang dipelajari di sekolah.',
        author: 'Albert Einstein',
    },
    {
        text: 'Pendidikan adalah kemampuan mendengarkan hampir apa saja tanpa kehilangan ketenangan atau rasa percaya diri.',
        author: 'Robert Frost',
    },
    {
        text: 'Hiduplah seolah engkau mati besok. Belajarlah seolah engkau hidup selamanya.',
        author: 'Mahatma Gandhi',
    },
];

type Props = {
    status?: string;
    canRegister: boolean;
};

const BG_IMAGES = [
    '/images/gedung_smk_babussalam.webp',
    '/images/gedung_smk_babussalam_2.webp',
];

export default function Login({ status, canRegister }: Props) {
    const [bgIndex, setBgIndex] = useState(0);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const FADE_MS = 600;
        const HOLD_MS = 7000;

        const tick = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setBgIndex((i) => (i + 1) % BG_IMAGES.length);
                setFading(false);
            }, FADE_MS);
        }, HOLD_MS);

        return () => clearInterval(tick);
    }, []);

    return (
        <>
            <Head title="Masuk" />

            <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-white p-6 md:p-10">
                <div
                    className={cn(
                        'absolute -inset-4 bg-cover bg-center opacity-30 blur-xs transition-opacity duration-600',
                        fading ? 'opacity-0' : 'opacity-80',
                    )}
                    style={{ backgroundImage: `url(${BG_IMAGES[bgIndex]})` }}
                />
                <div className="relative z-10 w-full max-w-sm md:max-w-3xl">
                    <LoginForm status={status} canRegister={canRegister} />
                </div>
            </div>
        </>
    );
}

Login.layout = null;

function LoginForm({
    className,
    status,
    canRegister,
    ...props
}: React.ComponentProps<'div'> & Props) {
    const [remember, setRemember] = useState(false);

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            {/* Card — pakai div manual untuk hindari default py-6 gap-6 dari komponen Card */}
            <div className="bg-card text-card-foreground overflow-hidden rounded-xl border shadow-sm">
                {/* CardContent — grid 2 kolom */}
                <div className="grid p-0 md:grid-cols-2">
                    {/* Kiri: form */}
                    <Form
                        {...store()}
                        resetOnSuccess={['password']}
                        className="p-6 md:p-8"
                    >
                        {({ processing, errors }) => (
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Selamat datang
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Masuk ke akun SIAKAD Kabasa
                                    </p>
                                </div>

                                {status && (
                                    <div className="text-center text-sm font-medium text-green-600">
                                        {status}
                                    </div>
                                )}

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="email@contoh.com"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Kata Sandi</Label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        checked={remember}
                                        onCheckedChange={(v) =>
                                            setRemember(v === true)
                                        }
                                        tabIndex={3}
                                    />
                                    <input
                                        type="hidden"
                                        name="remember"
                                        value={remember ? '1' : ''}
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="cursor-pointer text-sm font-normal"
                                    >
                                        Ingat saya
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Masuk
                                </Button>
                            </div>
                        )}
                    </Form>

                    {/* Kanan: panel image / decorative */}
                    <div className="bg-muted relative hidden md:block">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                            <img
                                src="/images/smkn-babussalam.png"
                                alt="SMK Babussalam"
                                className="h-24 w-24 object-contain"
                            />
                            <div className="text-center">
                                <h2 className="text-foreground text-lg font-semibold">
                                    SMK Babussalam
                                </h2>
                                <p className="text-muted-foreground mt-1 text-sm">
                                    Sistem Informasi Akademik
                                </p>
                            </div>
                            <QuoteRotator />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuoteRotator() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const FADE_MS = 400;
        const HOLD_MS = 10000;

        const tick = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((i) => (i + 1) % QUOTES.length);
                setVisible(true);
            }, FADE_MS);
        }, HOLD_MS);

        return () => clearInterval(tick);
    }, []);

    const quote = QUOTES[index];

    return (
        <div className="flex min-h-22 max-w-72 flex-col items-center text-center">
            <div
                className={cn(
                    'transition-opacity duration-400 ease-out',
                    visible ? 'opacity-100' : 'opacity-0',
                )}
            >
                <p className="text-muted-foreground text-sm italic">
                    "{quote.text}"
                </p>
                <p className="text-muted-foreground/70 mt-2 text-xs font-medium not-italic">
                    — {quote.author}
                </p>
            </div>
        </div>
    );
}
