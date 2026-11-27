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
            [['name' => '木の剣'], ['rarity' => 1,'image_url' => '/images/item-n.png']],
            [['name' => '布の服'], ['rarity' => 1, 'image_url' => '/images/item-n.png']],
            [['name' => '木の盾'], ['rarity' => 1, 'image_url' => '/images/item-n.png']],
            [['name' => '薬草'], ['rarity' => 1, 'image_url' => '/images/item-n.png']],
            [['name' => '錆びた短剣'], ['rarity' => 1, 'image_url' => '/images/item-n.png']],

            [['name' => '鋼鉄の剣'], ['rarity' => 2, 'image_url' => '/images/item-r.png']],
            [['name' => '魔力の指輪'], ['rarity' => 2, 'image_url' => '/images/item-r.png']],
            [['name' => '騎士の鎧'], ['rarity' => 2, 'image_url' => '/images/item-r.png']],

            [['name' => '炎竜の大剣'], ['rarity' => 3, 'image_url' => '/images/item-sr.png']],
            [['name' => '精霊王の杖'], ['rarity' => 3, 'image_url' => '/images/item-sr.png']],

            [['name' => '神剣エクスカリバー'], ['rarity' => 4, 'image_url' => '/images/item-ssr.png']],
        ];

        foreach ($items as [$key, $value]) {
            Item::updateOrCreate($key, $value);
        }
    }
}
