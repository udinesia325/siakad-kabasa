<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateJenisKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:50', Rule::unique('m_jenis_kelas', 'nama')->ignore($this->route('jenis_kelas'))],
            'urutan' => ['required', 'integer', 'min:0', 'max:255'],
        ];
    }
}
