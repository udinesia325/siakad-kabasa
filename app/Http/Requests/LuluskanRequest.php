<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LuluskanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'keterangan' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($v) {
            $kelas = $this->route('kelas');
            if ($kelas && $kelas->tingkat !== 'XII') {
                $v->errors()->add('kelas', 'Hanya kelas tingkat XII yang dapat diluluskan.');
            }
        });
    }
}
