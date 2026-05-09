<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:100'],
            'tingkat' => ['required', Rule::in(['X', 'XI', 'XII'])],
            'tahun_ajaran_id' => ['required', 'exists:m_tahun_ajaran,id'],
        ];
    }
}
