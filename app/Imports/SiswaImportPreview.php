<?php

namespace App\Imports;

use App\Models\KelasAjaran;
use App\Models\Rfid;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Support\PhoneNormalizer;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class SiswaImportPreview implements WithMultipleSheets
{
    public array $valid = [];

    public array $invalid = [];

    private string $error = '';

    public function sheets(): array
    {
        return [
            0 => new SiswaDataSheetImport($this),
        ];
    }

    public function hasError(): bool
    {
        return $this->error !== '';
    }

    public function getError(): string
    {
        return $this->error;
    }

    public function setError(string $msg): void
    {
        $this->error = $msg;
    }
}

class SiswaDataSheetImport implements ToCollection
{
    private SiswaImportPreview $preview;

    private const EXPECTED_HEADERS = ['NIK*', 'NISN', 'Nama Siswa*', 'Jenis Kelamin*', 'Email', 'No Telepon', 'Alamat', 'Kelas', 'RFID'];

    private const HEADER_ROW = 7;

    public function __construct(SiswaImportPreview $preview)
    {
        $this->preview = $preview;
    }

    public function collection(Collection $rows): void
    {
        // Fingerprint: header harus ada di baris ke-6 (index 5)
        $headerRow = $rows->get(self::HEADER_ROW - 1);
        if (! $headerRow) {
            $this->preview->setError('Format file Excel tidak dikenali. Pastikan Anda menggunakan template yang telah disediakan.');

            return;
        }

        $actualHeaders = $headerRow->values()->take(9)->map(fn ($v) => trim((string) $v))->toArray();
        if ($actualHeaders !== self::EXPECTED_HEADERS) {
            $this->preview->setError('Format file Excel tidak dikenali. Pastikan Anda menggunakan template yang telah disediakan.');

            return;
        }

        // Build kelas lookup map: "nama_lengkap" => kelas_ajaran_id
        $tahunAktif = TahunAjaran::where('is_active', true)->first();
        $kelasMap = [];
        if ($tahunAktif) {
            KelasAjaran::with(['kelas', 'tingkat'])
                ->where('tahun_ajaran_id', $tahunAktif->id)
                ->get()
                ->each(function ($ka) use (&$kelasMap) {
                    $key = strtolower(trim($ka->nama_lengkap));
                    $kelasMap[$key] = ['id' => $ka->id, 'label' => $ka->nama_lengkap];
                });
        }

        // Load existing NIK & NISN dari DB untuk duplikat check
        $existingNik = Siswa::pluck('nik')->map(fn ($v) => strtolower($v))->flip()->toArray();
        $existingNisn = Siswa::whereNotNull('nisn')->pluck('nisn')->map(fn ($v) => strtolower($v))->flip()->toArray();
        $existingRfid = Rfid::where('reff_type', 'm_siswa')->pluck('kode_rfid')->map(fn ($v) => strtolower($v))->flip()->toArray();

        $seenNik = [];
        $seenNisn = [];
        $seenRfid = [];

        // Data mulai baris ke-7 (index 6)
        $dataRows = $rows->slice(self::HEADER_ROW);

        foreach ($dataRows as $row) {
            $values = $row->values()->toArray();

            $nik = trim((string) ($values[0] ?? ''));
            $nisn = trim((string) ($values[1] ?? ''));
            $nama = trim((string) ($values[2] ?? ''));
            $jenisKelamin = strtoupper(trim((string) ($values[3] ?? '')));
            $email = trim((string) ($values[4] ?? '')) ?: null;
            $noTelepon = trim((string) ($values[5] ?? '')) ?: null;
            $alamat = trim((string) ($values[6] ?? '')) ?: null;
            $kelasRaw = trim((string) ($values[7] ?? ''));
            $rfid = trim((string) ($values[8] ?? '')) ?: null;

            if ($noTelepon !== null) {
                $noTelepon = PhoneNormalizer::normalize($noTelepon);
            }

            // Skip baris kosong total
            if ($nik === '' && $nisn === '' && $nama === '' && $jenisKelamin === '' && $kelasRaw === '') {
                continue;
            }

            $alasan = [];

            // Validasi NIK
            if ($nik === '') {
                $alasan[] = 'NIK tidak boleh kosong';
            } elseif (isset($seenNik[strtolower($nik)])) {
                $alasan[] = 'NIK duplikat dalam file';
            } elseif (isset($existingNik[strtolower($nik)])) {
                $alasan[] = 'NIK sudah terdaftar di sistem';
            }

            // Validasi NISN
            if ($nisn !== '') {
                if (isset($seenNisn[strtolower($nisn)])) {
                    $alasan[] = 'NISN duplikat dalam file';
                } elseif (isset($existingNisn[strtolower($nisn)])) {
                    $alasan[] = 'NISN sudah terdaftar di sistem';
                }
            }

            // Validasi RFID
            if ($rfid !== null) {
                if (isset($seenRfid[strtolower($rfid)])) {
                    $alasan[] = 'RFID duplikat dalam file';
                } elseif (isset($existingRfid[strtolower($rfid)])) {
                    $alasan[] = 'RFID sudah terdaftar di sistem';
                }
            }

            // Validasi Nama
            if ($nama === '') {
                $alasan[] = 'Nama tidak boleh kosong';
            } elseif (preg_match('/\d/', $nama)) {
                $alasan[] = 'Nama tidak boleh mengandung angka';
            }

            // Validasi Jenis Kelamin
            if (! in_array($jenisKelamin, ['L', 'P'])) {
                $alasan[] = 'Jenis kelamin harus diisi L atau P';
            }

            // Validasi Kelas
            $kelasAjaranId = null;
            $kelasLabel = null;
            if ($kelasRaw !== '') {
                $kelasKey = strtolower($kelasRaw);
                if (isset($kelasMap[$kelasKey])) {
                    $kelasAjaranId = $kelasMap[$kelasKey]['id'];
                    $kelasLabel = $kelasMap[$kelasKey]['label'];
                } else {
                    $alasan[] = 'Kelas tidak ditemukan di sistem';
                }
            }

            if ($nik !== '') {
                $seenNik[strtolower($nik)] = true;
            }
            if ($nisn !== '') {
                $seenNisn[strtolower($nisn)] = true;
            }
            if ($rfid !== null) {
                $seenRfid[strtolower($rfid)] = true;
            }

            if (empty($alasan)) {
                $this->preview->valid[] = [
                    'nik' => $nik,
                    'nisn' => $nisn !== '' ? $nisn : null,
                    'nama' => $nama,
                    'jenis_kelamin' => $jenisKelamin,
                    'email' => $email,
                    'no_telepon' => $noTelepon,
                    'alamat' => $alamat,
                    'kelas_ajaran_id' => $kelasAjaranId,
                    'kelas_label' => $kelasLabel,
                    'rfid' => $rfid,
                ];
            } else {
                $this->preview->invalid[] = [
                    'nik' => $nik ?: null,
                    'nama' => $nama ?: null,
                    'jenis_kelamin' => $jenisKelamin ?: null,
                    'kelas' => $kelasRaw ?: null,
                    'alasan' => $alasan,
                ];
            }
        }
    }
}
