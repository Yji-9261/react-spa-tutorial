<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Seeder;

class ItemUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $items = Item::all();
        $ownedItems01 = $items->pluck('id')->values();
        $ownedItems02 = [];

        // dd($ownedItems01);

        User::findOrFail(1)->items()->sync($ownedItems01);
        User::findOrFail(2)->items()->sync($ownedItems02);
    }
}
