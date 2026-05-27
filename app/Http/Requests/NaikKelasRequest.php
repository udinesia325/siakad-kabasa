<?php

namespace App\Http\Requests;

use App\Models\KelasAjaran;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NaikKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $kelasAsal = $this->route('kelasAjaran');

        return [
            'kelas_tujuan_id' => [
                'required',
                'integer',
                Rule::exists('t_kelas_ajaran', 'id')->where(fn ($q) => $q->where('id', '!=', $kelasAsal->id)),
            ],
            'keterangan' => ['nullable', 'string', 'max:500'],
            'paksa' => ['nullable', 'boolean'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($v) {
            $tujuan = KelasAjaran::with('tingkat')->find($this->input('kelas_tujuan_id'));
            $asal = $this->route('kelasAjaran');
            if (! $tujuan || ! $asal) {
                return;
            }

            $asal->loadMissing('tingkat');

            if ($tujuan->tingkat->jenjang !== $asal->tingkat->jenjang) {
                $v->errors()->add('kelas_tujuan_id', 'Kelas tujuan harus berada di jenjang yang sama.');

                return;
            }

            if ($tujuan->tingkat->urutan <= $asal->tingkat->urutan) {
                $v->errors()->add('kelas_tujuan_id', 'Kelas tujuan harus tingkat lebih tinggi dari kelas asal.');
            }
        });
    }
}
