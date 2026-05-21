<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePegawaiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nik' => ['nullable', 'string', 'max:30', 'unique:m_pegawai,nik'],
            'nuptk' => ['nullable', 'string', 'max:30', 'unique:m_pegawai,nuptk'],
            'nama' => ['required', 'string', 'max:255'],
            'jenis_kelamin' => ['required', Rule::in(['L', 'P'])],
            'jenis' => ['required', Rule::in(['guru', 'staff_tu', 'kepala_sekolah', 'lainnya'])],
            'jabatan' => ['nullable', 'string', 'max:255'],
            'status_kepegawaian' => ['nullable', Rule::in(['gty', 'pppk', 'honorer', 'kontrak', 'lainnya'])],
            'no_hp' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'alamat' => ['nullable', 'string'],
            'foto' => ['nullable', 'string'],
            'aktif' => ['nullable', 'boolean'],
        ];
    }
}
