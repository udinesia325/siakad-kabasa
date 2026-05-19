import { Link } from '@inertiajs/react';
import { ChevronRight, UserCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
    id: number;
    nama: string;
};

export default function GuruCard({ id, nama }: Props) {
    return (
        <Link href={`/jadwal/guru/${id}`} className="group">
            <Card className="h-full transition group-hover:border-primary group-hover:shadow-sm">
                <CardContent className="flex items-center gap-3 p-4">
                    <UserCircle2 className="h-9 w-9 text-muted-foreground" />
                    <p className="flex-1 truncate font-medium" title={nama}>
                        {nama}
                    </p>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" />
                </CardContent>
            </Card>
        </Link>
    );
}
