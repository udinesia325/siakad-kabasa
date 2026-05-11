<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSiswaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nik' => ['required', 'string', 'max:20', 'unique:m_siswa,nik'],
            'nisn' => ['nullable', 'string', 'max:20', 'unique:m_siswa,nisn'],
            'nama' => ['required', 'string', 'max:255'],
            'jenis_kelamin' => ['required', Rule::in(['L', 'P'])],
            'email' => ['nullable', 'email'],
            'alamat' => ['nullable', 'string'],
            'foto' => ['nullable', 'string'],
            'kelas_id' => ['nullable', 'exists:m_kelas,id'],
        ];
    }
}
