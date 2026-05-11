import { addDays, differenceInCalendarDays, format, isBefore, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const MAX_RANGE_DAYS = 45;

type Props = {
    dari?: string;
    sampai?: string;
    onChange: (dari: string, sampai: string) => void;
    className?: string;
};

type Phase = 'idle' | 'picking-end';

export function DateRangePicker({ dari, sampai, onChange, className }: Props) {
    const [open, setOpen] = useState(false);
    // Fase: idle = belum mulai pilih, picking-end = start sudah dipilih, tunggu end
    const [phase, setPhase] = useState<Phase>('idle');
    const [pendingStart, setPendingStart] = useState<Date | undefined>(undefined);
    const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);

    const committedFrom = dari ? parseISO(dari) : undefined;
    const committedTo   = sampai ? parseISO(sampai) : undefined;

    // Apa yang ditampilkan di kalender:
    // - Saat picking-end + hover: preview range dari pendingStart ke hoverDate
    // - Saat picking-end tanpa hover: hanya start
    // - Saat idle: committed range
    const previewTo =
        phase === 'picking-end' && pendingStart && hoverDate
            ? (isBefore(hoverDate, pendingStart) ? pendingStart : hoverDate)
            : undefined;
    const previewFrom =
        phase === 'picking-end' && pendingStart && hoverDate && isBefore(hoverDate, pendingStart)
            ? hoverDate
            : pendingStart;

    const selected =
        phase === 'picking-end' && pendingStart
            ? { from: previewFrom, to: previewTo }
            : committedFrom && committedTo
              ? { from: committedFrom, to: committedTo }
              : undefined;

    function handleDayClick(day: Date) {
        if (phase === 'idle') {
            // Klik pertama → set start, masuk fase picking-end
            setPendingStart(day);
            setPhase('picking-end');
            return;
        }

        // Klik kedua → set end
        if (!pendingStart) return;

        let start = pendingStart;
        let end   = day;

        // Jika user klik tanggal sebelum start, tukar
        if (isBefore(end, start)) {
            [start, end] = [end, start];
        }

        // Clamp max 45 hari
        if (differenceInCalendarDays(end, start) >= MAX_RANGE_DAYS) {
            end = addDays(start, MAX_RANGE_DAYS - 1);
        }

        setPhase('idle');
        setPendingStart(undefined);
        onChange(format(start, 'yyyy-MM-dd'), format(end, 'yyyy-MM-dd'));
        setOpen(false);
    }

    function handleDayMouseEnter(day: Date) {
        if (phase === 'picking-end') setHoverDate(day);
    }

    function handleDayMouseLeave() {
        setHoverDate(undefined);
    }

    function handleOpenChange(v: boolean) {
        if (!v) {
            // Popover ditutup — reset fase agar tidak menggantung
            setPhase('idle');
            setPendingStart(undefined);
            setHoverDate(undefined);
        }
        setOpen(v);
    }

    const label =
        committedFrom && committedTo
            ? `${format(committedFrom, 'd MMM', { locale: localeId })} — ${format(committedTo, 'd MMM yyyy', { locale: localeId })}`
            : 'Pilih rentang tanggal';

    const hint =
        phase === 'picking-end'
            ? `Pilih tanggal akhir (maks. ${MAX_RANGE_DAYS} hari)`
            : `Rentang maks. ${MAX_RANGE_DAYS} hari`;

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant={phase === 'picking-end' ? 'default' : 'outline'}
                    size="sm"
                    className={cn('justify-start gap-2 font-normal', className)}
                >
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span className="text-xs">
                        {phase === 'picking-end' && pendingStart
                            ? `${format(pendingStart, 'd MMM', { locale: localeId })} — ...`
                            : label}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="border-b px-3 py-2 text-xs text-muted-foreground">
                    {phase === 'picking-end' ? (
                        <span className="font-medium text-foreground">
                            Mulai: {pendingStart ? format(pendingStart, 'd MMMM yyyy', { locale: localeId }) : '—'}
                        </span>
                    ) : hint}
                </div>
                <Calendar
                    mode="range"
                    selected={selected}
                    locale={localeId}
                    numberOfMonths={2}
                    disabled={(date) => {
                        // Saat picking-end, nonaktifkan tanggal > 45 hari dari start
                        if (phase === 'picking-end' && pendingStart) {
                            const diff = differenceInCalendarDays(date, pendingStart);
                            const diffFromStart = Math.abs(diff);
                            return diffFromStart >= MAX_RANGE_DAYS;
                        }
                        return false;
                    }}
                    onDayClick={handleDayClick}
                    onDayMouseEnter={handleDayMouseEnter}
                    onDayMouseLeave={handleDayMouseLeave}
                    // Matikan behaviour bawaan DayPicker agar tidak auto-submit saat from dipilih
                    onSelect={() => {}}
                />
                <div className="border-t px-3 py-2 text-xs text-muted-foreground">{hint}</div>
            </PopoverContent>
        </Popover>
    );
}
