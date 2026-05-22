import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
    id: number;
    nama: string;
    tingkat: string;
};

export default function KelasCard({ id, nama, tingkat }: Props) {
    return (
        <Link href={`/jadwal/kelas/${id}`} className="group">
            <Card className="h-full transition group-hover:border-primary group-hover:shadow-sm">
                <CardContent className="flex items-center justify-between gap-3 p-4">
                    <div>
                        <p className="text-lg font-semibold">{nama}</p>
                        <p className="text-xs text-muted-foreground">
                            Tingkat {tingkat}
                        </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" />
                </CardContent>
            </Card>
        </Link>
    );
}
