<?php

namespace App\Http\Requests;

use App\Models\TahunAjaran;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTahunAjaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tahun_mulai' => ['required', 'integer', 'min:2000', 'max:2100'],
            'tahun_selesai' => ['required', 'integer', 'min:2000', 'max:2100', 'gt:tahun_mulai'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($v) {
            if ($v->errors()->isNotEmpty()) {
                return;
            }

            $nama = $this->tahun_mulai.'/'.$this->tahun_selesai;

            if (TahunAjaran::where('nama', $nama)->where('id', '!=', $this->tahunAjaran->id)->exists()) {
                $v->errors()->add('tahun_mulai', 'Tahun ajaran '.$nama.' sudah ada.');
            }
        });
    }

    public function getNama(): string
    {
        return $this->tahun_mulai.'/'.$this->tahun_selesai;
    }
}
