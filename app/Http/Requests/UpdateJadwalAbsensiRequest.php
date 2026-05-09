<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJadwalAbsensiRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $isLibur = $this->boolean('is_libur');

        return [
            'is_libur' => ['required', 'boolean'],
            'jam_masuk_min' => [$isLibur ? 'nullable' : 'required', 'date_format:H:i'],
            'jam_masuk_max' => [$isLibur ? 'nullable' : 'required', 'date_format:H:i', 'after:jam_masuk_min'],
            'jam_pulang_min' => [$isLibur ? 'nullable' : 'required', 'date_format:H:i', 'after:jam_masuk_max'],
            'jam_pulang_max' => [$isLibur ? 'nullable' : 'required', 'date_format:H:i', 'after:jam_pulang_min'],
        ];
    }
}
