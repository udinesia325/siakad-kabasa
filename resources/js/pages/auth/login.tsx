import { Form, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

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
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <>
            <Head title="Masuk" />

            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <LoginForm
                        status={status}
                        canResetPassword={canResetPassword}
                        canRegister={canRegister}
                    />
                </div>
            </div>
        </>
    );
}

Login.layout = null;

function LoginForm({
    className,
    status,
    canResetPassword,
    canRegister,
    ...props
}: React.ComponentProps<'div'> & Props) {
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            {/* Card — pakai div manual untuk hindari default py-6 gap-6 dari komponen Card */}
            <div className="bg-card text-card-foreground overflow-hidden rounded-xl border shadow-sm">
                {/* CardContent — grid 2 kolom */}
                <div className="grid p-0 md:grid-cols-2">
                    {/* Kiri: form */}
                    <Form
                        {...store.form()}
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
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Kata Sandi
                                        </Label>
                                        {canResetPassword && (
                                            <a
                                                href={request().url}
                                                className="ml-auto text-sm underline-offset-2 hover:underline"
                                                tabIndex={5}
                                            >
                                                Lupa kata sandi?
                                            </a>
                                        )}
                                    </div>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                    />
                                    <InputError message={errors.password} />
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

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                Dengan masuk, kamu menyetujui <a href="#">Ketentuan Layanan</a>{' '}
                dan <a href="#">Kebijakan Privasi</a>.
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
