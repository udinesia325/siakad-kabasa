<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMasterKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Untuk update, ignore record yang sedang diedit
        $ignoreId = $this->route('kelas')?->id;

        return [
            'nama' => [
                'required',
                'string',
                'max:100',
                Rule::unique('m_kelas', 'nama')
                    ->where('rombel', $this->input('rombel'))
                    ->where('jurusan_id', $this->input('jurusan_id'))
                    ->where('jenis_kelas_id', $this->input('jenis_kelas_id'))
                    ->ignore($ignoreId),
            ],
            'rombel' => ['nullable', 'string', 'size:1', 'regex:/^[A-Z]$/'],
            'jurusan_id' => ['nullable', 'exists:m_jurusan,id'],
            'jenis_kelas_id' => ['nullable', 'exists:m_jenis_kelas,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama.unique' => 'Kombinasi nama, rombel, jurusan, dan jenis kelas sudah ada.',
        ];
    }
}
