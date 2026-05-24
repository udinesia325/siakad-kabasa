import { type RefObject, useEffect, useRef, useState } from 'react';

export function useContainerWidth(
    ref: RefObject<HTMLElement | null>,
    fallback = 300,
): number {
    const [width, setWidth] = useState<number>(fallback);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;

            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
                setWidth(Math.floor(entry.contentRect.width));
            }, 150);
        });

        observer.observe(el);

        // Ukur segera tanpa menunggu debounce pertama
        setWidth(Math.floor(el.getBoundingClientRect().width) || fallback);

        return () => {
            observer.disconnect();
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        };
    }, [ref, fallback]);

    return width;
}
