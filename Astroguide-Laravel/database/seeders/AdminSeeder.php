<?php

namespace Database\Seeders;
use App\Models\User;

use Illuminate\Database\Seeder;


class AdminSeeder extends Seeder{
    /**
     * Run the database seeds.
     *
     * @return void
     */

     public function run()
     {
        $user = User::create([
            'name' => "Admin",
            'email' => "admin@gmail.com",
            'password' => bcrypt('123456'),
            'username' => "NewAdmin", // Agrega el nombre de usuario aquí
            'rol_id' => 1,

        ]);
        
     }
}
