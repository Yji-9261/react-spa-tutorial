<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $rarity = $this->faker->numberBetween(1, 4);

        return [
            'name' => 'アイテム',
            'rarity' => $rarity,
            'image_url' => 'http://localhost',
            'image_alt' => $this->faker->sentence(30),
        ];
    }
}
