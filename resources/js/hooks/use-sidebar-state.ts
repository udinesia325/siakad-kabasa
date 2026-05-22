import { useCallback, useEffect, useState } from 'react';

const STORAGE_PREFIX = 'siakad:sidebar:';

type Scope = 'group' | 'item';

function storageKey(scope: Scope, key: string): string {
    return `${STORAGE_PREFIX}${scope}:${key}`;
}

function readStored(scope: Scope, key: string): boolean | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const raw = window.localStorage.getItem(storageKey(scope, key));

        if (raw === 'open') {
            return true;
        }

        if (raw === 'closed') {
            return false;
        }

        return null;
    } catch {
        return null;
    }
}

function writeStored(scope: Scope, key: string, open: boolean): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        window.localStorage.setItem(
            storageKey(scope, key),
            open ? 'open' : 'closed',
        );
    } catch {
        // localStorage may be unavailable (Safari private mode, etc.); ignore.
    }
}

/**
 * State persisten open/close untuk sebuah collapsible section atau item.
 *
 * @param scope    'group' untuk section, 'item' untuk parent item
 * @param key      stable identifier untuk persistensi
 * @param defaultOpen  fallback saat belum ada saved state
 * @param forceOpen    saat true, return open tanpa mengubah saved state
 *                     (dipakai untuk auto-open saat child active)
 */
export function useSidebarState(
    scope: Scope,
    key: string,
    defaultOpen: boolean,
    forceOpen: boolean = false,
): [boolean, (open: boolean) => void] {
    const [stored, setStored] = useState<boolean>(defaultOpen);

    // Reconcile with localStorage after mount so SSR and initial client render
    // both use defaultOpen, avoiding hydration mismatch.
    useEffect(() => {
        const saved = readStored(scope, key);
        if (saved !== null) {
            setStored(saved);
        }
    }, [scope, key]);

    const setOpen = useCallback(
        (open: boolean) => {
            setStored(open);
            writeStored(scope, key, open);
        },
        [scope, key],
    );

    const effectiveOpen = forceOpen ? true : stored;

    return [effectiveOpen, setOpen];
}
