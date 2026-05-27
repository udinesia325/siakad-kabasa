<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTingkatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $tingkatId = $this->route('tingkat')->id;

        return [
            'nama' => ['required', 'string', 'max:20'],
            'urutan' => ['required', 'integer', 'min:1',
                Rule::unique('m_tingkat')
                    ->where('jenjang', $this->input('jenjang'))
                    ->ignore($tingkatId)],
            'jenjang' => ['required', 'string', 'max:20'],
        ];
    }
}
