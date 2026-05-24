<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TahunAjaran>
 */
class TahunAjaranFactory extends Factory
{
    public function definition(): array
    {
        $start = fake()->numberBetween(2020, 2027);

        return [
            'nama' => "{$start}/" . ($start + 1),
            'is_active' => false,
        ];
    }
}
