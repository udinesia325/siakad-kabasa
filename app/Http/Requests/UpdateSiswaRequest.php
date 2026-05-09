<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSiswaRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $siswaId = $this->route('siswa')->id;

        return [
            'nik' => ['required', 'string', 'max:20', Rule::unique('m_siswa', 'nik')->ignore($siswaId)],
            'nis' => ['nullable', 'string', 'max:20', Rule::unique('m_siswa', 'nis')->ignore($siswaId)],
            'nama' => ['required', 'string', 'max:255'],
            'jenis_kelamin' => ['required', Rule::in(['L', 'P'])],
            'email' => ['nullable', 'email'],
            'alamat' => ['nullable', 'string'],
            'foto' => ['nullable', 'string'],
            'kelas_id' => ['nullable', 'exists:m_kelas,id'],
        ];
    }
}
