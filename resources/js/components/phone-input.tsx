import { Input } from '@/components/ui/input';
import { normalizePhone } from '@/lib/phone';

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export default function PhoneInput({ value, onChange, placeholder = '08xxxxxxxxxx', className }: Props) {
    const preview = normalizePhone(value);
    const showPreview = value.trim() !== '' && preview !== value.replace(/[^0-9+]/g, '');

    return (
        <div className="space-y-1">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={className}
                inputMode="tel"
            />
            {showPreview && (
                <p className="text-xs text-muted-foreground">
                    Akan disimpan sebagai: <span className="font-mono">{preview}</span>
                </p>
            )}
        </div>
    );
}
