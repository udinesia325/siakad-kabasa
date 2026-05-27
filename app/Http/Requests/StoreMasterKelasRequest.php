<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMasterKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:100'],
            'rombel' => ['nullable', 'string', 'size:1', 'regex:/^[A-Z]$/'],
            'jurusan_id' => ['nullable', 'exists:m_jurusan,id'],
            'jenis_kelas_id' => ['nullable', 'exists:m_jenis_kelas,id'],
        ];
    }
}
