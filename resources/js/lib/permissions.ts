import { usePage } from '@inertiajs/react';

import type { Auth } from '@/types';

export function useCan() {
    const { auth } = usePage<{ auth: Auth }>().props;

    return (permission: string): boolean => {
        if (auth.is_superadmin || auth.permissions.includes('*')) {
            return true;
        }

        return auth.permissions.includes(permission);
    };
}

export function useCanAnyModule(moduleKey: string): boolean {
    const { auth } = usePage<{ auth: Auth }>().props;

    if (auth.is_superadmin || auth.permissions.includes('*')) {
        return true;
    }

    return auth.permissions.some((p) => p.startsWith(`${moduleKey}.`));
}
