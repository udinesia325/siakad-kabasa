import { Head } from '@inertiajs/react';
import { CalendarOff, CheckCircle, CheckCircle2, Clock, Loader2, MessageCircle, Send, UserX } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import axios from '@/lib/axios';
import {
    siswa as siswaRoute,
    kirim as kirimRoute,
} from '@/routes/siaran-whatsapp';

// ─── Types ────────────────────────────────────────────────────────────────────

type Kelas = { id: number; nama: string; jumlah_siswa: number };
type Siswa = { id: number; nama: string; no_telepon: string | null };
type Tipe = 'alpha' | 'terlambat';
type Step = 1 | 2 | 3 | 4;

type Props = { kelas: Kelas[] };

// ─── Step Indicator ───────────────────────────────────────────────────────────

const STEP_LABELS = ['Pilih Kelas', 'Jenis Pesan', 'Pilih Siswa', 'Selesai'];

function StepIndicator({ currentStep }: { currentStep: Step }) {
    return (
        <div className="flex items-center gap-0">
            {STEP_LABELS.map((label, i) => {
                const stepNum = i + 1;
                const done = stepNum < currentStep;
                const active = stepNum === currentStep;

                return (
                    <div key={label} className="flex flex-1 items-center">
                        <div className="flex flex-col items-center gap-1">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                                    done
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : active
                                          ? 'border-primary text-primary'
                                          : 'border-muted-foreground/30 text-muted-foreground'
                                }`}
                            >
                                {done ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                    <span className="text-xs font-semibold">{stepNum}</span>
                                )}
                            </div>
                            <span
                                className={`text-xs font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}
                            >
                                {label}
                            </span>
                        </div>
                        {i < STEP_LABELS.length - 1 && (
                            <div
                                className={`mx-2 mb-5 h-0.5 flex-1 transition-colors ${done ? 'bg-primary' : 'bg-muted'}`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ─── Step 1: Pilih Kelas ──────────────────────────────────────────────────────

function getTingkat(nama: string): string {
    const match = nama.match(/^(X{1,3}|XI{0,2}I?|[IVX]+)/i);

    if (!match) {
return 'Lainnya';
}

    const prefix = match[0].toUpperCase();

    if (prefix === 'X') {
return 'Kelas X';
}

    if (prefix === 'XI') {
return 'Kelas XI';
}

    if (prefix === 'XII') {
return 'Kelas XII';
}

    return `Kelas ${prefix}`;
}

function PilihKelas({ kelas, onPilih }: { kelas: Kelas[]; onPilih: (k: Kelas) => void }) {
    const grouped = kelas.reduce<Record<string, Kelas[]>>((acc, k) => {
        const key = getTingkat(k.nama);

        if (!acc[key]) {
acc[key] = [];
}

        acc[key].push(k);

        return acc;
    }, {});

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-xl font-semibold">Siaran WhatsApp</h1>
                <p className="text-sm text-muted-foreground">Pilih kelas untuk mengirim pesan siaran ke orang tua siswa.</p>
            </div>

            {kelas.length === 0 && (
                <div className="rounded-lg border p-10 text-center text-muted-foreground">
                    Belum ada kelas tersedia.
                </div>
            )}

            {Object.entries(grouped).map(([tingkat, list]) => (
                <div key={tingkat} className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-muted-foreground">{tingkat}</h2>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {list.map((k) => (
                            <button
                                key={k.id}
                                onClick={() => onPilih(k)}
                                className="group flex items-center justify-between rounded-lg border p-4 text-left transition-colors hover:bg-accent"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-primary/10 p-2 text-primary">
                                        <MessageCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{k.nama}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {k.jumlah_siswa} siswa
                                        </div>
                                    </div>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Step 2: Pilih Tipe ───────────────────────────────────────────────────────

function PilihTipe({
    kelasTerpilih,
    loadingTipe,
    onPilih,
    onBack,
}: {
    kelasTerpilih: Kelas;
    loadingTipe: Tipe | null;
    onPilih: (t: Tipe) => void;
    onBack: () => void;
}) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Jenis Pesan</h1>
                    <Badge variant="outline">{kelasTerpilih.nama}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                    Pilih jenis pesan yang akan dikirim ke orang tua siswa.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                    className={`group flex items-center gap-4 rounded-lg border-2 p-5 text-left transition-all ${
                        loadingTipe === 'alpha'
                            ? 'border-red-300 bg-red-50'
                            : 'border-red-200 bg-red-50/60 hover:border-red-400 hover:bg-red-50'
                    }`}
                    onClick={() => !loadingTipe && onPilih('alpha')}
                    disabled={!!loadingTipe}
                >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                        {loadingTipe === 'alpha' ? (
                            <Loader2 className="h-6 w-6 animate-spin text-red-500" />
                        ) : (
                            <UserX className="h-6 w-6 text-red-500" />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-red-700">Siaran Alpha</p>
                        <p className="mt-0.5 text-xs text-red-500">
                            Kirim pesan ke orang tua siswa yang tidak hadir hari ini
                        </p>
                    </div>
                </button>

                <button
                    className={`group flex items-center gap-4 rounded-lg border-2 p-5 text-left transition-all ${
                        loadingTipe === 'terlambat'
                            ? 'border-yellow-300 bg-yellow-50'
                            : 'border-yellow-200 bg-yellow-50/60 hover:border-yellow-400 hover:bg-yellow-50'
                    }`}
                    onClick={() => !loadingTipe && onPilih('terlambat')}
                    disabled={!!loadingTipe}
                >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                        {loadingTipe === 'terlambat' ? (
                            <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
                        ) : (
                            <Clock className="h-6 w-6 text-yellow-500" />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-yellow-700">Siaran Terlambat</p>
                        <p className="mt-0.5 text-xs text-yellow-600">
                            Kirim pesan ke orang tua siswa yang terlambat hari ini
                        </p>
                    </div>
                </button>
            </div>

            <div>
                <Button variant="ghost" size="sm" onClick={onBack} disabled={!!loadingTipe}>
                    ← Kembali
                </Button>
            </div>
        </div>
    );
}

// ─── Step 3: List Siswa ───────────────────────────────────────────────────────

function ListSiswa({
    kelasTerpilih,
    tipe,
    siswaList,
    checkedIds,
    loadingSend,
    isLibur,
    liburKeterangan,
    onToggle,
    onToggleAll,
    onKirim,
    onBack,
}: {
    kelasTerpilih: Kelas;
    tipe: Tipe;
    siswaList: Siswa[];
    checkedIds: Set<number>;
    loadingSend: boolean;
    isLibur: boolean;
    liburKeterangan: string | null;
    onToggle: (id: number) => void;
    onToggleAll: () => void;
    onKirim: () => void;
    onBack: () => void;
}) {
    const siswaWithPhone = siswaList.filter((s) => s.no_telepon !== null);
    const allChecked =
        siswaWithPhone.length > 0 && siswaWithPhone.every((s) => checkedIds.has(s.id));

    const tipeLabel = tipe === 'alpha' ? 'Alpha' : 'Terlambat';
    const tipeColor = tipe === 'alpha' ? 'destructive' : 'outline';
    const tipeClass =
        tipe === 'terlambat' ? 'border-yellow-400 bg-yellow-100 text-yellow-700' : '';

    const isEmpty = isLibur || siswaList.length === 0;
    const tipeKeterangan = tipe === 'alpha' ? 'tidak hadir' : 'terlambat';

    return (
        <div className="flex flex-col gap-4">
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Pilih Siswa</h1>
                    <Badge variant={tipeColor} className={tipeClass}>
                        {tipeLabel}
                    </Badge>
                    <Badge variant="outline">{kelasTerpilih.nama}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                    {isLibur
                        ? 'Siaran tidak dapat dikirim pada hari libur.'
                        : isEmpty
                          ? `Tidak ada siswa yang ${tipeKeterangan} hari ini.`
                          : `${checkedIds.size} dari ${siswaList.length} siswa dipilih untuk dikirim pesan.`}
                </p>
            </div>

            {isLibur ? (
                <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-14 text-center text-muted-foreground">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <CalendarOff className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="font-medium text-foreground">Hari ini adalah hari libur</p>
                        {liburKeterangan ? (
                            <p className="mt-0.5 text-sm">Hari ini adalah hari libur {liburKeterangan}</p>
                        ) : (
                            <p className="mt-0.5 text-sm">Tidak ada kegiatan absensi hari ini.</p>
                        )}
                    </div>
                </div>
            ) : isEmpty ? (
                <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-14 text-center text-muted-foreground">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        {tipe === 'alpha' ? (
                            <UserX className="h-6 w-6" />
                        ) : (
                            <Clock className="h-6 w-6" />
                        )}
                    </div>
                    <div>
                        <p className="font-medium">Tidak ada siswa {tipeKeterangan}</p>
                        <p className="mt-0.5 text-sm">Semua siswa {kelasTerpilih.nama} sudah hadir tepat waktu hari ini.</p>
                    </div>
                </div>
            ) : (
                <div className="rounded-lg border">
                    {/* Header tabel */}
                    <div className="flex items-center gap-3 border-b bg-muted/40 px-4 py-3">
                        <Checkbox
                            id="select-all"
                            checked={allChecked}
                            onCheckedChange={onToggleAll}
                            disabled={siswaWithPhone.length === 0}
                        />
                        <label htmlFor="select-all" className="flex flex-1 cursor-pointer items-center gap-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            <span className="w-6 text-center">#</span>
                            <span className="flex-1">Nama Siswa</span>
                            <span className="w-36">No. Telepon Ortu</span>
                        </label>
                    </div>

                    {/* Baris siswa */}
                    <div className="divide-y">
                        {siswaList.map((s, idx) => {
                            const hasPhone = s.no_telepon !== null;
                            const checked = hasPhone && checkedIds.has(s.id);

                            return (
                                <div
                                    key={s.id}
                                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                                        !hasPhone
                                            ? 'opacity-50'
                                            : checked
                                              ? 'bg-primary/5'
                                              : 'hover:bg-muted/30'
                                    }`}
                                >
                                    <Checkbox
                                        id={`siswa-${s.id}`}
                                        checked={checked}
                                        disabled={!hasPhone}
                                        onCheckedChange={() => hasPhone && onToggle(s.id)}
                                    />
                                    <label
                                        htmlFor={`siswa-${s.id}`}
                                        className={`flex flex-1 items-center gap-4 ${!hasPhone ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        <span className="w-6 text-center text-xs text-muted-foreground">
                                            {idx + 1}
                                        </span>
                                        <span className="flex-1 text-sm font-medium">{s.nama}</span>
                                        <span className="w-36 text-xs text-muted-foreground">
                                            {hasPhone ? (
                                                s.no_telepon
                                            ) : (
                                                <span className="italic">Tidak ada</span>
                                            )}
                                        </span>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Action bar */}
            <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3 shadow-sm">
                <Button variant="ghost" size="sm" onClick={onBack} disabled={loadingSend}>
                    ← Kembali
                </Button>
                <Button
                    disabled={isEmpty || checkedIds.size === 0 || loadingSend}
                    onClick={onKirim}
                    className="gap-2"
                >
                    {loadingSend ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Mengirim...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            {isEmpty ? 'Tidak Ada Siswa' : `Kirim Pesan (${checkedIds.size} siswa)`}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

// ─── Step 4: Konfirmasi Sukses ────────────────────────────────────────────────

function KonfirmasiSukses({ jumlah, onReset }: { jumlah: number; onReset: () => void }) {
    return (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
                <p className="text-xl font-semibold">Pesan berhasil dikirim!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Pesan telah dikirimkan ke <span className="font-medium text-foreground">{jumlah} orang tua siswa</span>.
                </p>
            </div>
            <Button onClick={onReset} variant="outline" className="mt-2">
                Kirim Siaran Lain
            </Button>
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
    const [isLibur, setIsLibur] = useState(false);
    const [liburKeterangan, setLiburKeterangan] = useState<string | null>(null);

    async function handlePilihTipe(tipe: Tipe) {
        if (!selectedKelas) {
return;
}

        setLoadingTipe(tipe);

        try {
            const res = await axios.get(
                siswaRoute.url({ query: { kelas_id: selectedKelas.id, tipe } }),
            );
            const data: Siswa[] = res.data.data;
            const libur: boolean = res.data.libur ?? false;
            const keterangan: string | null = res.data.libur_keterangan ?? null;
            setSiswaList(data);
            setIsLibur(libur);
            setLiburKeterangan(keterangan);

            if (!libur) {
                const withPhone = new Set(
                    data.filter((s) => s.no_telepon !== null).map((s) => s.id),
                );
                setCheckedIds(withPhone);
            } else {
                setCheckedIds(new Set());
            }

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

            if (next.has(id)) {
next.delete(id);
} else {
next.add(id);
}

            return next;
        });
    }

    function handleToggleAll() {
        const withPhone = siswaList.filter((s) => s.no_telepon !== null).map((s) => s.id);
        const allChecked = withPhone.every((id) => checkedIds.has(id));
        setCheckedIds(allChecked ? new Set() : new Set(withPhone));
    }

    async function handleKirim() {
        if (!selectedKelas || !selectedTipe) {
return;
}

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
        setIsLibur(false);
        setLiburKeterangan(null);
    }

    return (
        <>
            <Head title="Siaran WhatsApp" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                {/* Step indicator — sembunyikan di step 4 */}
                {step !== 4 && <StepIndicator currentStep={step} />}

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
                        kelasTerpilih={selectedKelas}
                        loadingTipe={loadingTipe}
                        onPilih={handlePilihTipe}
                        onBack={() => setStep(1)}
                    />
                )}

                {step === 3 && selectedKelas && selectedTipe && (
                    <ListSiswa
                        kelasTerpilih={selectedKelas}
                        tipe={selectedTipe}
                        siswaList={siswaList}
                        checkedIds={checkedIds}
                        loadingSend={loadingSend}
                        isLibur={isLibur}
                        liburKeterangan={liburKeterangan}
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
        </>
    );
}

SiaranWhatsappIndex.layout = {
    breadcrumbs: [{ title: 'Siaran WhatsApp', href: '/siaran-whatsapp' }],
};
