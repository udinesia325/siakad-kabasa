<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTahunAjaranRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:20', Rule::unique('m_tahun_ajaran', 'nama')->ignore($this->tahunAjaran)],
        ];
    }
}
