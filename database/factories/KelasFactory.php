<?php

namespace Database\Factories;

use App\Models\TahunAjaran;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kelas>
 */
class KelasFactory extends Factory
{
    public function definition(): array
    {
        $tingkat = fake()->randomElement(['X', 'XI', 'XII']);
        $jurusan = fake()->randomElement(['IPA', 'IPS', 'RPL', 'TKJ']);
        $nomor = fake()->numberBetween(1, 4);

        return [
            'nama' => "{$tingkat} {$jurusan} {$nomor}",
            'tingkat' => $tingkat,
            'tahun_ajaran_id' => TahunAjaran::factory(),
        ];
    }
}
