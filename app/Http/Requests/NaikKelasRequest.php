<?php

namespace App\Http\Requests;

use App\Models\Kelas;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NaikKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $kelasAsal = $this->route('kelas');

        return [
            'kelas_tujuan_id' => [
                'required',
                'integer',
                Rule::exists('m_kelas', 'id')->where(fn ($q) => $q->where('id', '!=', $kelasAsal->id)),
            ],
            'keterangan' => ['nullable', 'string', 'max:500'],
            'paksa' => ['nullable', 'boolean'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($v) {
            $tujuan = Kelas::find($this->input('kelas_tujuan_id'));
            $asal = $this->route('kelas');
            if (! $tujuan || ! $asal) {
                return;
            }
            $urut = ['X' => 1, 'XI' => 2, 'XII' => 3];
            if (($urut[$tujuan->tingkat] ?? 0) <= ($urut[$asal->tingkat] ?? 0)) {
                $v->errors()->add('kelas_tujuan_id', 'Kelas tujuan harus tingkat lebih tinggi dari kelas asal.');
            }
            if ($tujuan->tahun_ajaran_id === $asal->tahun_ajaran_id) {
                $v->errors()->add('kelas_tujuan_id', 'Kelas tujuan harus berada di tahun ajaran berbeda.');
            }
        });
    }
}
