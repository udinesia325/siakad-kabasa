<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AssignRfidRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $siswaId = $this->route('siswa')->id;

        return [
            'kode_rfid' => [
                'required',
                'string',
                'max:255',
                Rule::unique('t_rfid', 'kode_rfid')->where(function ($query) use ($siswaId) {
                    return $query->where('reff_type', 'm_siswa')->where('reff_id', '!=', $siswaId);
                }),
            ],
        ];
    }
}
