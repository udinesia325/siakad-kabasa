<?php

namespace Database\Factories;

use App\Models\Kelas;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Kelas>
 */
class KelasFactory extends Factory
{
    public function definition(): array
    {
        $jurusan = fake()->randomElement(['RPL', 'TKJ', 'FARMASI']);
        $rombel = fake()->randomElement(['A', 'B', 'C']);

        return [
            'nama' => "{$jurusan} {$rombel}",
            'rombel' => $rombel,
        ];
    }
}
