import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import PhoneInput from '@/components/phone-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type Jurusan = { id: number; nama: string; singkatan: string };
export type TahunAjaran = { id: number; nama: string };

export type PpdbDokumen = {
    id: number;
    nama_dokumen: string;
    file_path: string;
    file_url?: string;
};

export type PpdbFormData = {
    tahun_ajaran_id: string;
    jurusan_id: string;
    nomor_registrasi: string;
    tanggal_daftar: string;
    nama: string;
    nik: string;
    nisn: string;
    jenis_kelamin: 'L' | 'P' | '';
    tempat_lahir: string;
    tanggal_lahir: string;
    agama: string;
    sekolah_asal: string;
    no_telepon: string;
    penerima_kip: boolean;
    no_kip: string;
    no_registrasi_akta: string;
    alamat: string;
    rt: string;
    rw: string;
    kelurahan: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    kode_pos: string;
    nama_ayah: string;
    pekerjaan_ayah: string;
    pendidikan_ayah: string;
    penghasilan_ayah: string;
    nama_ibu: string;
    pekerjaan_ibu: string;
    pendidikan_ibu: string;
    penghasilan_ibu: string;
};

export type DokumenBaru = { nama: string; file: File | null };

const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];
const pendidikanOptions = ['SD', 'SMP', 'SMA/SMK', 'D3', 'S1', 'S2', 'S3', 'Tidak Sekolah'];
const penghasilanOptions = [
    '< 1.000.000',
    '1.000.000–3.000.000',
    '3.000.000–5.000.000',
    '> 5.000.000',
    'Tidak Ada Penghasilan',
];

const STEPS = ['Identitas', 'Alamat', 'Orang Tua', 'Dokumen'];

type Props = {
    defaultValues?: Partial<PpdbFormData>;
    tahunAjaranList: TahunAjaran[];
    jurusanList: Jurusan[];
    existingDokumen?: PpdbDokumen[];
    errors?: Partial<Record<keyof PpdbFormData | string, string>>;
    submitUrl: string;
    method: 'post' | 'put';
    submitLabel: string;
    cancelUrl: string;
};

export default function PpdbForm({
    defaultValues,
    tahunAjaranList,
    jurusanList,
    existingDokumen = [],
    errors = {},
    submitUrl,
    method,
    submitLabel,
    cancelUrl,
}: Props) {
    const [step, setStep] = useState(0);
    const [processing, setProcessing] = useState(false);

    const [data, setData] = useState<PpdbFormData>({
        tahun_ajaran_id: defaultValues?.tahun_ajaran_id ?? '',
        jurusan_id: defaultValues?.jurusan_id ?? '',
        nomor_registrasi: defaultValues?.nomor_registrasi ?? '',
        tanggal_daftar: defaultValues?.tanggal_daftar ?? format(new Date(), 'yyyy-MM-dd'),
        nama: defaultValues?.nama ?? '',
        nik: defaultValues?.nik ?? '',
        nisn: defaultValues?.nisn ?? '',
        jenis_kelamin: defaultValues?.jenis_kelamin ?? '',
        tempat_lahir: defaultValues?.tempat_lahir ?? '',
        tanggal_lahir: defaultValues?.tanggal_lahir ?? '',
        agama: defaultValues?.agama ?? '',
        sekolah_asal: defaultValues?.sekolah_asal ?? '',
        no_telepon: defaultValues?.no_telepon ?? '',
        penerima_kip: defaultValues?.penerima_kip ?? false,
        no_kip: defaultValues?.no_kip ?? '',
        no_registrasi_akta: defaultValues?.no_registrasi_akta ?? '',
        alamat: defaultValues?.alamat ?? '',
        rt: defaultValues?.rt ?? '',
        rw: defaultValues?.rw ?? '',
        kelurahan: defaultValues?.kelurahan ?? '',
        kecamatan: defaultValues?.kecamatan ?? '',
        kabupaten: defaultValues?.kabupaten ?? '',
        provinsi: defaultValues?.provinsi ?? '',
        kode_pos: defaultValues?.kode_pos ?? '',
        nama_ayah: defaultValues?.nama_ayah ?? '',
        pekerjaan_ayah: defaultValues?.pekerjaan_ayah ?? '',
        pendidikan_ayah: defaultValues?.pendidikan_ayah ?? '',
        penghasilan_ayah: defaultValues?.penghasilan_ayah ?? '',
        nama_ibu: defaultValues?.nama_ibu ?? '',
        pekerjaan_ibu: defaultValues?.pekerjaan_ibu ?? '',
        pendidikan_ibu: defaultValues?.pendidikan_ibu ?? '',
        penghasilan_ibu: defaultValues?.penghasilan_ibu ?? '',
    });

    const [dokumenExisting, setDokumenExisting] = useState<PpdbDokumen[]>(existingDokumen);
    const [dokumenBaru, setDokumenBaru] = useState<DokumenBaru[]>([]);
    const [hapusDokumenIds, setHapusDokumenIds] = useState<number[]>([]);

    function set<K extends keyof PpdbFormData>(key: K, value: PpdbFormData[K]) {
        setData((prev) => ({ ...prev, [key]: value }));
    }

    function handleHapusDokumenExisting(id: number) {
        setHapusDokumenIds((prev) => [...prev, id]);
        setDokumenExisting((prev) => prev.filter((d) => d.id !== id));
    }

    function addDokumenBaru() {
        setDokumenBaru((prev) => [...prev, { nama: '', file: null }]);
    }

    function removeDokumenBaru(index: number) {
        setDokumenBaru((prev) => prev.filter((_, i) => i !== index));
    }

    function updateDokumenBaru(index: number, field: 'nama' | 'file', value: string | File | null) {
        setDokumenBaru((prev) => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
    }

    function submit() {
        const fd = new FormData();
        Object.entries(data).forEach(([key, val]) => {
            fd.append(key, val === null || val === undefined ? '' : String(val));
        });
        dokumenBaru.forEach((dok, i) => {
            fd.append(`dokumen[${i}][nama]`, dok.nama);

            if (dok.file) {
fd.append(`dokumen[${i}][file]`, dok.file);
}
        });
        hapusDokumenIds.forEach((id, i) => {
            fd.append(`hapus_dokumen_ids[${i}]`, String(id));
        });

        if (method === 'put') {
fd.append('_method', 'PUT');
}

        setProcessing(true);
        router.post(submitUrl, fd, {
            forceFormData: true,
            onError: () => setProcessing(false),
            onSuccess: () => setProcessing(false),
        });
    }

    const err = (key: string) =>
        errors[key] ? <p className="mt-1 text-xs text-destructive">{errors[key]}</p> : null;

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            {/* Stepper */}
            <div className="flex items-center gap-0">
                {STEPS.map((label, i) => (
                    <div key={label} className="flex flex-1 items-center">
                        <button
                            type="button"
                            onClick={() => setStep(i)}
                            className="flex flex-col items-center gap-1"
                        >
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                                    i < step
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : i === step
                                          ? 'border-primary text-primary'
                                          : 'border-muted-foreground/30 text-muted-foreground'
                                }`}
                            >
                                {i < step ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                    <span className="text-xs font-semibold">{i + 1}</span>
                                )}
                            </div>
                            <span className={`text-xs font-medium ${i === step ? 'text-primary' : 'text-muted-foreground'}`}>
                                {label}
                            </span>
                        </button>
                        {i < STEPS.length - 1 && (
                            <div
                                className={`mx-2 h-0.5 flex-1 transition-colors ${i < step ? 'bg-primary' : 'bg-muted'}`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step content */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
                {/* Step 0: Identitas */}
                {step === 0 && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <h2 className="text-base font-semibold">Data Identitas Peserta</h2>
                            <p className="text-sm text-muted-foreground">Informasi dasar pendaftar</p>
                        </div>

                        <div className="space-y-1">
                            <Label>
                                Tahun Ajaran <span className="text-destructive">*</span>
                            </Label>
                            <Select value={data.tahun_ajaran_id} onValueChange={(v) => set('tahun_ajaran_id', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tahun ajaran" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tahunAjaranList.map((t) => (
                                        <SelectItem key={t.id} value={String(t.id)}>
                                            {t.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {err('tahun_ajaran_id')}
                        </div>
                        <div className="space-y-1">
                            <Label>
                                Jurusan <span className="text-destructive">*</span>
                            </Label>
                            <Select value={data.jurusan_id} onValueChange={(v) => set('jurusan_id', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih jurusan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jurusanList.map((j) => (
                                        <SelectItem key={j.id} value={String(j.id)}>
                                            {j.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {err('jurusan_id')}
                        </div>

                        <div className="space-y-1">
                            <Label>
                                No. Registrasi <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                value={data.nomor_registrasi}
                                onChange={(e) => set('nomor_registrasi', e.target.value)}
                                placeholder="Contoh: PPDB-2026-001"
                            />
                            {err('nomor_registrasi')}
                        </div>
                        <div className="space-y-1">
                            <Label>
                                Tanggal Daftar <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                type="date"
                                value={data.tanggal_daftar}
                                onChange={(e) => set('tanggal_daftar', e.target.value)}
                            />
                            {err('tanggal_daftar')}
                        </div>

                        <div className="col-span-2 space-y-1">
                            <Label>
                                Nama Lengkap <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                value={data.nama}
                                onChange={(e) => set('nama', e.target.value)}
                                placeholder="Sesuai akta lahir, huruf kapital"
                            />
                            {err('nama')}
                        </div>

                        <div className="space-y-1">
                            <Label>
                                NIK <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                value={data.nik}
                                onChange={(e) => set('nik', e.target.value)}
                                maxLength={20}
                                placeholder="16 digit"
                            />
                            {err('nik')}
                        </div>
                        <div className="space-y-1">
                            <Label>NISN</Label>
                            <Input
                                value={data.nisn}
                                onChange={(e) => set('nisn', e.target.value)}
                                maxLength={10}
                                placeholder="10 digit"
                            />
                            {err('nisn')}
                        </div>

                        <div className="space-y-1">
                            <Label>
                                Jenis Kelamin <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={data.jenis_kelamin}
                                onValueChange={(v) => set('jenis_kelamin', v as 'L' | 'P')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">Laki-laki</SelectItem>
                                    <SelectItem value="P">Perempuan</SelectItem>
                                </SelectContent>
                            </Select>
                            {err('jenis_kelamin')}
                        </div>
                        <div className="space-y-1">
                            <Label>
                                Agama <span className="text-destructive">*</span>
                            </Label>
                            <Select value={data.agama} onValueChange={(v) => set('agama', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    {agamaOptions.map((a) => (
                                        <SelectItem key={a} value={a}>
                                            {a}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {err('agama')}
                        </div>

                        <div className="space-y-1">
                            <Label>
                                Tempat Lahir <span className="text-destructive">*</span>
                            </Label>
                            <Input value={data.tempat_lahir} onChange={(e) => set('tempat_lahir', e.target.value)} />
                            {err('tempat_lahir')}
                        </div>
                        <div className="space-y-1">
                            <Label>
                                Tanggal Lahir <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                type="date"
                                value={data.tanggal_lahir}
                                onChange={(e) => set('tanggal_lahir', e.target.value)}
                            />
                            {err('tanggal_lahir')}
                        </div>

                        <div className="col-span-2 space-y-1">
                            <Label>
                                Sekolah Asal <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                value={data.sekolah_asal}
                                onChange={(e) => set('sekolah_asal', e.target.value)}
                                placeholder="Nama lengkap SMP/MTs asal"
                            />
                            {err('sekolah_asal')}
                        </div>

                        <div className="space-y-1">
                            <Label>No. Telepon</Label>
                            <PhoneInput
                                value={data.no_telepon}
                                onChange={(v) => set('no_telepon', v)}
                            />
                            {err('no_telepon')}
                        </div>
                        <div className="space-y-1">
                            <Label>No. Registrasi Akta Lahir</Label>
                            <Input
                                value={data.no_registrasi_akta}
                                onChange={(e) => set('no_registrasi_akta', e.target.value)}
                            />
                        </div>

                        <div className="col-span-2 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="penerima_kip"
                                checked={data.penerima_kip}
                                onChange={(e) => set('penerima_kip', e.target.checked)}
                                className="h-4 w-4 rounded border"
                            />
                            <Label htmlFor="penerima_kip">Penerima KIP (Kartu Indonesia Pintar)</Label>
                        </div>
                        {data.penerima_kip && (
                            <div className="col-span-2 space-y-1">
                                <Label>
                                    No KIP <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    value={data.no_kip}
                                    onChange={(e) => set('no_kip', e.target.value)}
                                    maxLength={10}
                                />
                                {err('no_kip')}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 1: Alamat */}
                {step === 1 && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <h2 className="text-base font-semibold">Alamat Tempat Tinggal</h2>
                            <p className="text-sm text-muted-foreground">Alamat lengkap peserta saat ini</p>
                        </div>

                        <div className="col-span-2 space-y-1">
                            <Label>
                                Alamat (Jalan / Dusun) <span className="text-destructive">*</span>
                            </Label>
                            <textarea
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                rows={3}
                                value={data.alamat}
                                onChange={(e) => set('alamat', e.target.value)}
                                placeholder="Nama jalan, nomor rumah, dusun"
                            />
                            {err('alamat')}
                        </div>

                        <div className="space-y-1">
                            <Label>RT</Label>
                            <Input
                                value={data.rt}
                                onChange={(e) => set('rt', e.target.value)}
                                maxLength={5}
                                placeholder="003"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>RW</Label>
                            <Input
                                value={data.rw}
                                onChange={(e) => set('rw', e.target.value)}
                                maxLength={5}
                                placeholder="005"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Kelurahan / Desa</Label>
                            <Input value={data.kelurahan} onChange={(e) => set('kelurahan', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Kecamatan</Label>
                            <Input value={data.kecamatan} onChange={(e) => set('kecamatan', e.target.value)} />
                        </div>

                        <div className="space-y-1">
                            <Label>Kabupaten / Kota</Label>
                            <Input value={data.kabupaten} onChange={(e) => set('kabupaten', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Provinsi</Label>
                            <Input value={data.provinsi} onChange={(e) => set('provinsi', e.target.value)} />
                        </div>

                        <div className="space-y-1">
                            <Label>Kode Pos</Label>
                            <Input
                                value={data.kode_pos}
                                onChange={(e) => set('kode_pos', e.target.value)}
                                maxLength={10}
                                placeholder="5 digit"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Orang Tua */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-base font-semibold">Data Orang Tua</h2>
                            <p className="text-sm text-muted-foreground">Informasi ayah dan ibu kandung</p>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">Data Ayah Kandung</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-1">
                                    <Label>
                                        Nama Ayah <span className="text-destructive">*</span>
                                    </Label>
                                    <Input value={data.nama_ayah} onChange={(e) => set('nama_ayah', e.target.value)} />
                                    {err('nama_ayah')}
                                </div>
                                <div className="space-y-1">
                                    <Label>Pekerjaan</Label>
                                    <Input
                                        value={data.pekerjaan_ayah}
                                        onChange={(e) => set('pekerjaan_ayah', e.target.value)}
                                        placeholder="PNS, Wiraswasta, dll."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Pendidikan Terakhir</Label>
                                    <Select
                                        value={data.pendidikan_ayah || 'none'}
                                        onValueChange={(v) => set('pendidikan_ayah', v === 'none' ? '' : v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">— Pilih —</SelectItem>
                                            {pendidikanOptions.map((p) => (
                                                <SelectItem key={p} value={p}>
                                                    {p}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <Label>Penghasilan Bulanan</Label>
                                    <Select
                                        value={data.penghasilan_ayah || 'none'}
                                        onValueChange={(v) => set('penghasilan_ayah', v === 'none' ? '' : v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">— Pilih —</SelectItem>
                                            {penghasilanOptions.map((p) => (
                                                <SelectItem key={p} value={p}>
                                                    {p}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <p className="mb-3 text-sm font-medium text-muted-foreground">Data Ibu Kandung</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-1">
                                    <Label>
                                        Nama Ibu <span className="text-destructive">*</span>
                                    </Label>
                                    <Input value={data.nama_ibu} onChange={(e) => set('nama_ibu', e.target.value)} />
                                    {err('nama_ibu')}
                                </div>
                                <div className="space-y-1">
                                    <Label>Pekerjaan</Label>
                                    <Input
                                        value={data.pekerjaan_ibu}
                                        onChange={(e) => set('pekerjaan_ibu', e.target.value)}
                                        placeholder="Ibu Rumah Tangga, dll."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Pendidikan Terakhir</Label>
                                    <Select
                                        value={data.pendidikan_ibu || 'none'}
                                        onValueChange={(v) => set('pendidikan_ibu', v === 'none' ? '' : v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">— Pilih —</SelectItem>
                                            {pendidikanOptions.map((p) => (
                                                <SelectItem key={p} value={p}>
                                                    {p}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <Label>Penghasilan Bulanan</Label>
                                    <Select
                                        value={data.penghasilan_ibu || 'none'}
                                        onValueChange={(v) => set('penghasilan_ibu', v === 'none' ? '' : v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">— Pilih —</SelectItem>
                                            {penghasilanOptions.map((p) => (
                                                <SelectItem key={p} value={p}>
                                                    {p}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Dokumen */}
                {step === 3 && (
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-base font-semibold">Dokumen Pendukung</h2>
                            <p className="text-sm text-muted-foreground">Upload dokumen (foto/PDF, maks. 5MB per file)</p>
                        </div>

                        {dokumenExisting.map((dok) => (
                            <div key={dok.id} className="flex items-center gap-3 rounded-md border px-4 py-3">
                                <span className="flex-1 text-sm">{dok.nama_dokumen}</span>
                                <a href={dok.file_url ?? '#'} target="_blank" rel="noreferrer" className="text-xs text-primary underline">
                                    Lihat
                                </a>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => handleHapusDokumenExisting(dok.id)}
                                >
                                    Hapus
                                </Button>
                            </div>
                        ))}

                        {dokumenBaru.map((dok, i) => (
                            <div key={i} className="grid grid-cols-2 gap-3 rounded-md border p-3">
                                <div className="space-y-1">
                                    <Label>Nama Dokumen</Label>
                                    <Input
                                        value={dok.nama}
                                        onChange={(e) => updateDokumenBaru(i, 'nama', e.target.value)}
                                        placeholder="Kartu Keluarga, Akta Lahir, dll."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>File</Label>
                                    <Input
                                        type="file"
                                        accept="image/*,.pdf,.doc,.docx"
                                        onChange={(e) => updateDokumenBaru(i, 'file', e.target.files?.[0] ?? null)}
                                    />
                                </div>
                                <div className="col-span-2 flex justify-end">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => removeDokumenBaru(i)}
                                    >
                                        Hapus baris ini
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <Button type="button" variant="outline" onClick={addDokumenBaru}>
                            + Tambah Dokumen
                        </Button>

                        {dokumenExisting.length === 0 && dokumenBaru.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                Belum ada dokumen. Klik tombol di atas untuk menambah.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Button type="button" variant="outline" onClick={() => router.get(cancelUrl)}>
                    Batal
                </Button>
                <div className="flex gap-2">
                    {step > 0 && (
                        <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
                            &larr; Sebelumnya
                        </Button>
                    )}
                    {step < STEPS.length - 1 ? (
                        <Button type="button" onClick={() => setStep((s) => s + 1)}>
                            Selanjutnya &rarr;
                        </Button>
                    ) : (
                        <Button type="button" onClick={submit} disabled={processing}>
                            {processing ? 'Menyimpan...' : submitLabel}
                        </Button>
                    )}
                </div>
            </div>

            {/* Error summary jika ada error dari server */}
            {Object.keys(errors).length > 0 && (
                <div className="rounded-md border border-destructive bg-destructive/5 p-4">
                    <p className="text-sm font-medium text-destructive">Terdapat kesalahan pada form:</p>
                    <ul className="mt-2 list-inside list-disc text-xs text-destructive">
                        {Object.entries(errors).map(([, msg]) => (
                            <li key={msg}>{msg}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
