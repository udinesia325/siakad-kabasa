<?php

namespace Database\Factories;

use App\Models\TahunAjaran;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TahunAjaran>
 */
class TahunAjaranFactory extends Factory
{
    public function definition(): array
    {
        $start = fake()->numberBetween(2020, 2027);

        return [
            'nama' => "{$start}/".($start + 1),
            'is_active' => false,
        ];
    }
}
