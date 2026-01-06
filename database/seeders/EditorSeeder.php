<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EditorSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'editor_bj@baust.edu.bd'], // unique identifier
            [
                'name' => 'Editor',
                'username' => 'editor',
                'password' => Hash::make('password123'),
                'role' => 'editor',
            ]
        );
    }
}
