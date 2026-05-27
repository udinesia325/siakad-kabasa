<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJenisKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:50', 'unique:m_jenis_kelas,nama'],
            'urutan' => ['required', 'integer', 'min:0', 'max:255'],
        ];
    }
}
