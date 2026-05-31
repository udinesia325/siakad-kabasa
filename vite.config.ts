import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const devHost = env.VITE_DEV_SERVER_HOST || undefined;

    return {
    server: devHost ? {
        host: devHost,
        hmr: { host: devHost },
    } : undefined,
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                bunny('Plus Jakarta Sans', {
                    weights: [400, 500, 600, 700],
                }),
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: [
                    ['babel-plugin-react-compiler', {
                        // react-day-picker tidak kompatibel dengan React Compiler
                        sources: (filename: string) => !filename.includes('react-day-picker'),
                    }],
                ],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    };
});
