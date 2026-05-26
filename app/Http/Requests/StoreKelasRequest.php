<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kelas_id' => ['required', 'exists:m_kelas,id'],
            'tingkat_id' => ['required', 'exists:m_tingkat,id'],
            'tahun_ajaran_id' => ['required', 'exists:m_tahun_ajaran,id'],
            'pegawai_id' => ['nullable', 'exists:m_pegawai,id'],
        ];
    }
}
