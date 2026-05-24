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
        $tingkat = $this->faker->randomElement(['X', 'XI', 'XII']);
        $jurusan = $this->faker->randomElement(['IPA', 'IPS', 'RPL', 'TKJ']);
        $nomor = $this->faker->numberBetween(1, 4);

        $tahunAjaran = TahunAjaran::first() ?? TahunAjaran::create([
            'nama' => '2025/2026',
            'is_active' => true,
        ]);

        return [
            'nama' => "{$tingkat} {$jurusan} {$nomor}",
            'tingkat' => $tingkat,
            'tahun_ajaran_id' => $tahunAjaran->id,
        ];
    }
}
