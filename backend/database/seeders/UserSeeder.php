<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        User::updateOrCreate(
            [
                'email' => 'user1@example.com',
            ],
            [
                'name' => 'user1',
                'password' => 'password',
            ]);

        // ユーザー2はアイテムを持たない
        User::updateOrCreate(
            [
                'name' => 'user2',
            ],
            [
                'email' => 'user2@example.com',
                'password' => 'password',
            ]);
    }
}
