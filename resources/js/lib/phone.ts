export function normalizePhone(value: string): string {
    const cleaned = value.replace(/[^0-9+]/g, '').trim();

    if (!cleaned) {
        return '';
    }

    if (cleaned.startsWith('+62')) {
        return '62' + cleaned.slice(3);
    }

    if (cleaned.startsWith('62')) {
        return cleaned;
    }

    if (cleaned.startsWith('08')) {
        return '62' + cleaned.slice(1);
    }

    if (cleaned.startsWith('8')) {
        return '62' + cleaned;
    }

    return cleaned;
}
