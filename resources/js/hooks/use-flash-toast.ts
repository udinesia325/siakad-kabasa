import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

export function useFlashToast(): void {
    useEffect(() => {
        // Gunakan 'navigate' bukan 'flash' — fired synchronously setelah page update,
        // sehingga tidak ada race condition dengan useEffect mount timing.
        // 'flash' event menggunakan queueMicrotask yang bisa terjadi sebelum listener terpasang.
        return router.on('navigate', (event) => {
            const page = (event as CustomEvent).detail?.page;
            const data = page?.flash?.toast as FlashToast | undefined;
            if (!data) return;
            toast[data.type](data.message);
        });
    }, []);
}
