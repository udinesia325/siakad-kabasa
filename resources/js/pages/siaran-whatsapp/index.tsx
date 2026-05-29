import { Head } from '@inertiajs/react';
import { CheckCircle, Clock, Loader2, MessageCircle, UserX } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import axios from '@/lib/axios';
import { siswa as siswaRoute, kirim as kirimRoute } from '@/routes/siaran-whatsapp';

// ─── Types ────────────────────────────────────────────────────────────────────

type Kelas = { id: number; nama: string; jumlah_siswa: number };
type Siswa = { id: number; nama: string; no_telepon: string | null };
type Tipe = 'alpha' | 'terlambat';
type Step = 1 | 2 | 3 | 4;

type Props = { kelas: Kelas[] };

// ─── Step 1: Pilih Kelas ──────────────────────────────────────────────────────

function PilihKelas({ kelas, onPilih }: { kelas: Kelas[]; onPilih: (k: Kelas) => void }) {
    return (
        <div>
            <p className="text-muted-foreground mb-6 text-sm">Pilih kelas untuk mengirim pesan siaran.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {kelas.map((k) => (
                    <Card
                        key={k.id}
                        className="hover:border-primary cursor-pointer transition-colors"
                        onClick={() => onPilih(k)}
                    >
                        <CardContent className="p-4">
                            <p className="font-semibold">{k.nama}</p>
                            <p className="text-muted-foreground text-xs">{k.jumlah_siswa} siswa</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// ─── Step 2: Pilih Tipe ───────────────────────────────────────────────────────

function PilihTipe({
    loadingTipe,
    onPilih,
    onBack,
}: {
    loadingTipe: Tipe | null;
    onPilih: (t: Tipe) => void;
    onBack: () => void;
}) {
    return (
        <div>
            <p className="text-muted-foreground mb-6 text-sm">Pilih jenis pesan yang akan dikirim ke orang tua siswa.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Card Alpha */}
                <Card
                    className={`cursor-pointer border-2 transition-colors ${
                        loadingTipe === 'alpha'
                            ? 'border-red-300 bg-red-50'
                            : 'border-red-200 bg-red-50 hover:border-red-400'
                    }`}
                    onClick={() => !loadingTipe && onPilih('alpha')}
                >
                    <CardContent className="flex flex-col items-center gap-3 py-8">
                        {loadingTipe === 'alpha' ? (
                            <Loader2 className="h-10 w-10 animate-spin text-red-500" />
                        ) : (
                            <UserX className="h-10 w-10 text-red-500" />
                        )}
                        <div className="text-center">
                            <p className="font-semibold text-red-700">Siaran Alpha</p>
                            <p className="text-xs text-red-500">Kirim pesan ke orang tua siswa yang tidak hadir hari ini</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Card Terlambat */}
                <Card
                    className={`cursor-pointer border-2 transition-colors ${
                        loadingTipe === 'terlambat'
                            ? 'border-yellow-300 bg-yellow-50'
                            : 'border-yellow-200 bg-yellow-50 hover:border-yellow-400'
                    }`}
                    onClick={() => !loadingTipe && onPilih('terlambat')}
                >
                    <CardContent className="flex flex-col items-center gap-3 py-8">
                        {loadingTipe === 'terlambat' ? (
                            <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
                        ) : (
                            <Clock className="h-10 w-10 text-yellow-500" />
                        )}
                        <div className="text-center">
                            <p className="font-semibold text-yellow-700">Siaran Terlambat</p>
                            <p className="text-xs text-yellow-600">Kirim pesan ke orang tua siswa yang terlambat hari ini</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Button variant="ghost" className="mt-6" onClick={onBack}>
                ← Kembali
            </Button>
        </div>
    );
}

// ─── Step 3: List Siswa ───────────────────────────────────────────────────────

function ListSiswa({
    tipe,
    siswaList,
    checkedIds,
    loadingSend,
    onToggle,
    onToggleAll,
    onKirim,
    onBack,
}: {
    tipe: Tipe;
    siswaList: Siswa[];
    checkedIds: Set<number>;
    loadingSend: boolean;
    onToggle: (id: number) => void;
    onToggleAll: () => void;
    onKirim: () => void;
    onBack: () => void;
}) {
    const siswaWithPhone = siswaList.filter((s) => s.no_telepon !== null);
    const allChecked = siswaWithPhone.length > 0 && siswaWithPhone.every((s) => checkedIds.has(s.id));

    return (
        <div>
            <div className="mb-4 flex items-center gap-2">
                <Badge
                    variant={tipe === 'alpha' ? 'destructive' : 'outline'}
                    className={tipe === 'terlambat' ? 'border-yellow-400 bg-yellow-100 text-yellow-700' : ''}
                >
                    {tipe === 'alpha' ? 'Alpha' : 'Terlambat'}
                </Badge>
                <span className="text-muted-foreground text-sm">
                    {checkedIds.size} siswa dipilih dari {siswaList.length} siswa
                </span>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="select-all"
                            checked={allChecked}
                            onCheckedChange={onToggleAll}
                            disabled={siswaWithPhone.length === 0}
                        />
                        <label htmlFor="select-all" className="cursor-pointer text-sm font-medium">
                            Pilih semua
                        </label>
                    </div>
                </CardHeader>
                <CardContent className="divide-y p-0">
                    {siswaList.map((s) => {
                        const hasPhone = s.no_telepon !== null;
                        return (
                            <div
                                key={s.id}
                                className={`flex items-center gap-3 px-4 py-3 ${!hasPhone ? 'bg-muted/50' : ''}`}
                            >
                                <Checkbox
                                    id={`siswa-${s.id}`}
                                    checked={hasPhone ? checkedIds.has(s.id) : false}
                                    disabled={!hasPhone}
                                    onCheckedChange={() => hasPhone && onToggle(s.id)}
                                />
                                <label
                                    htmlFor={`siswa-${s.id}`}
                                    className={`flex flex-1 flex-col ${!hasPhone ? 'cursor-default' : 'cursor-pointer'}`}
                                >
                                    <span className={`text-sm font-medium ${!hasPhone ? 'text-muted-foreground' : ''}`}>
                                        {s.nama}
                                    </span>
                                    {hasPhone ? (
                                        <span className="text-muted-foreground text-xs">{s.no_telepon}</span>
                                    ) : (
                                        <span className="text-muted-foreground text-xs italic">Tidak memiliki nomor telepon</span>
                                    )}
                                </label>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            <div className="mt-4 flex flex-col gap-2">
                <Button className="w-full" disabled={checkedIds.size === 0 || loadingSend} onClick={onKirim}>
                    {loadingSend ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Mengirim...
                        </>
                    ) : (
                        `Kirim Pesan (${checkedIds.size} siswa)`
                    )}
                </Button>
                <Button variant="ghost" onClick={onBack} disabled={loadingSend}>
                    ← Kembali
                </Button>
            </div>
        </div>
    );
}

// ─── Step 4: Konfirmasi Sukses ────────────────────────────────────────────────

function KonfirmasiSukses({ jumlah, onReset }: { jumlah: number; onReset: () => void }) {
    return (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <div>
                <p className="text-xl font-semibold">Pesan berhasil dikirim!</p>
                <p className="text-muted-foreground text-sm">Pesan telah dikirimkan ke {jumlah} orang tua siswa.</p>
            </div>
            <Button onClick={onReset}>Kembali ke Pilih Kelas</Button>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SiaranWhatsappIndex({ kelas }: Props) {
    const [step, setStep] = useState<Step>(1);
    const [selectedKelas, setSelectedKelas] = useState<Kelas | null>(null);
    const [selectedTipe, setSelectedTipe] = useState<Tipe | null>(null);
    const [siswaList, setSiswaList] = useState<Siswa[]>([]);
    const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
    const [loadingTipe, setLoadingTipe] = useState<Tipe | null>(null);
    const [loadingSend, setLoadingSend] = useState(false);
    const [jumlahTerkirim, setJumlahTerkirim] = useState(0);

    const breadcrumbs = [{ title: 'Siaran WhatsApp', href: '/siaran-whatsapp' }];

    async function handlePilihTipe(tipe: Tipe) {
        if (!selectedKelas) return;
        setLoadingTipe(tipe);
        try {
            const res = await axios.get(siswaRoute.url({ query: { kelas_id: selectedKelas.id, tipe } }));
            const data: Siswa[] = res.data.data;
            setSiswaList(data);
            const withPhone = new Set(data.filter((s) => s.no_telepon !== null).map((s) => s.id));
            setCheckedIds(withPhone);
            setSelectedTipe(tipe);
            setStep(3);
        } catch {
            toast.error('Gagal memuat data siswa. Coba lagi.');
        } finally {
            setLoadingTipe(null);
        }
    }

    function handleToggle(id: number) {
        setCheckedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function handleToggleAll() {
        const withPhone = siswaList.filter((s) => s.no_telepon !== null).map((s) => s.id);
        const allChecked = withPhone.every((id) => checkedIds.has(id));
        setCheckedIds(allChecked ? new Set() : new Set(withPhone));
    }

    async function handleKirim() {
        if (!selectedKelas || !selectedTipe) return;
        setLoadingSend(true);
        try {
            const res = await axios.post(kirimRoute.url(), {
                kelas_id: selectedKelas.id,
                tipe: selectedTipe,
                siswa_ids: Array.from(checkedIds),
            });
            setJumlahTerkirim(res.data.jumlah);
            setStep(4);
        } catch {
            toast.error('Gagal mengirim pesan. Coba lagi.');
        } finally {
            setLoadingSend(false);
        }
    }

    function handleReset() {
        setStep(1);
        setSelectedKelas(null);
        setSelectedTipe(null);
        setSiswaList([]);
        setCheckedIds(new Set());
        setJumlahTerkirim(0);
    }

    function stepTitle() {
        if (step === 1) return 'Pilih Kelas';
        if (step === 2) return selectedKelas?.nama ?? 'Pilih Tipe';
        if (step === 3) return selectedKelas?.nama ?? 'Daftar Siswa';
        return 'Pesan Terkirim';
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Siaran WhatsApp" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <MessageCircle className="text-primary h-6 w-6" />
                    <h1 className="text-xl font-semibold">{stepTitle()}</h1>
                </div>

                {step === 1 && (
                    <PilihKelas
                        kelas={kelas}
                        onPilih={(k) => {
                            setSelectedKelas(k);
                            setStep(2);
                        }}
                    />
                )}

                {step === 2 && selectedKelas && (
                    <PilihTipe
                        loadingTipe={loadingTipe}
                        onPilih={handlePilihTipe}
                        onBack={() => setStep(1)}
                    />
                )}

                {step === 3 && selectedKelas && selectedTipe && (
                    <ListSiswa
                        tipe={selectedTipe}
                        siswaList={siswaList}
                        checkedIds={checkedIds}
                        loadingSend={loadingSend}
                        onToggle={handleToggle}
                        onToggleAll={handleToggleAll}
                        onKirim={handleKirim}
                        onBack={() => setStep(2)}
                    />
                )}

                {step === 4 && (
                    <KonfirmasiSukses jumlah={jumlahTerkirim} onReset={handleReset} />
                )}
            </div>
        </AppLayout>
    );
}
