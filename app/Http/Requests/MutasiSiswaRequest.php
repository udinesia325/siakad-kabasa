<?php

namespace App\Http\Requests;

use App\Models\Kelas;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MutasiSiswaRequest extends FormRequest
{
    private const AKSI_BUTUH_TUJUAN = ['pindah_kelas', 'turunkan_tingkat', 'reaktivasi'];

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'aksi' => ['required', Rule::in(['pindah_kelas', 'turunkan_tingkat', 'set_lulus', 'set_keluar', 'reaktivasi'])],
            'kelas_tujuan_id' => [
                Rule::requiredIf(fn () => in_array($this->input('aksi'), self::AKSI_BUTUH_TUJUAN, true)),
                'nullable',
                'integer',
                'exists:m_kelas,id',
            ],
            'keterangan' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($v) {
            $siswa = $this->route('siswa');
            $aksi = $this->input('aksi');
            if (! $siswa) {
                return;
            }

            $aktifAksi = ['pindah_kelas', 'turunkan_tingkat', 'set_lulus', 'set_keluar'];
            if (in_array($aksi, $aktifAksi, true) && $siswa->status !== 'aktif') {
                $v->errors()->add('aksi', 'Aksi ini hanya berlaku untuk siswa dengan status aktif.');
            }
            if ($aksi === 'reaktivasi' && $siswa->status === 'aktif') {
                $v->errors()->add('aksi', 'Reaktivasi hanya berlaku untuk siswa lulus atau keluar.');
            }

            if ($aksi === 'turunkan_tingkat' && $this->input('kelas_tujuan_id')) {
                $tujuan = Kelas::find($this->input('kelas_tujuan_id'));
                $kelasAktif = $siswa->kelas;
                $urut = ['X' => 1, 'XI' => 2, 'XII' => 3];
                if ($tujuan && $kelasAktif && ($urut[$tujuan->tingkat] ?? 0) >= ($urut[$kelasAktif->tingkat] ?? 0)) {
                    $v->errors()->add('kelas_tujuan_id', 'Tujuan turun tingkat harus tingkat lebih rendah dari kelas saat ini.');
                }
            }
        });
    }
}
