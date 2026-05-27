<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $kelasAjaranId = $this->route('kelasAjaran')->id;

        return [
            'kelas_id' => [
                'required',
                'exists:m_kelas,id',
                Rule::unique('t_kelas_ajaran')
                    ->where('tingkat_id', $this->input('tingkat_id'))
                    ->where('tahun_ajaran_id', $this->input('tahun_ajaran_id'))
                    ->ignore($kelasAjaranId),
            ],
            'tingkat_id' => ['required', 'exists:m_tingkat,id'],
            'tahun_ajaran_id' => ['required', 'exists:m_tahun_ajaran,id'],
            'pegawai_id' => ['nullable', 'exists:m_pegawai,id'],
        ];
    }
}
