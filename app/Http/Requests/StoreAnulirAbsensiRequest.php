<?php

// app/Http/Requests/StoreAnulirAbsensiRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAnulirAbsensiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'siswa_id' => ['required', 'exists:m_siswa,id'],
            'tanggal' => ['required', 'date', 'before_or_equal:today'],
            'status' => ['required', Rule::in(['hadir', 'sakit', 'izin', 'dispensasi', 'terlambat', 'alpha'])],
            'keterangan' => ['nullable', 'string', 'max:1000'],
            'bukti' => ['nullable', 'array', 'max:5'],
            'bukti.*' => ['image', 'max:2048'],
        ];
    }
}
