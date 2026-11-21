<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $items = [
            [['name' => '木の剣'], ['rarity' => 1]],
            [['name' => '布の服'], ['rarity' => 1]],
            [['name' => '木の盾'], ['rarity' => 1]],
            [['name' => '薬草'], ['rarity' => 1]],
            [['name' => '錆びた短剣'], ['rarity' => 1]],

            [['name' => '鋼鉄の剣'], ['rarity' => 2]],
            [['name' => '魔力の指輪'], ['rarity' => 2]],
            [['name' => '騎士の鎧'], ['rarity' => 2]],

            [['name' => '炎竜の大剣'], ['rarity' => 3]],
            [['name' => '精霊王の杖'], ['rarity' => 3]],

            [['name' => '神剣エクスカリバー'], ['rarity' => 4]],
        ];

        foreach ($items as [$key, $value]) {
            Item::updateOrCreate($key, $value);
        }
    }
}
