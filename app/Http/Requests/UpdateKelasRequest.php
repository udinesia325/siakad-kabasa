<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateKelasRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $kelasId = $this->route('kelas')->id;

        return [
            'nama' => [
                'required', 'string', 'max:100',
                Rule::unique('m_kelas')->where('tahun_ajaran_id', $this->input('tahun_ajaran_id'))->ignore($kelasId),
            ],
            'tingkat' => ['required', Rule::in(['X', 'XI', 'XII'])],
            'tahun_ajaran_id' => ['required', 'exists:m_tahun_ajaran,id'],
        ];
    }
}
