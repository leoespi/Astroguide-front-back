<?php

namespace Database\Seeders;
use App\Models\User;


class AdminSeeder extends Seeder{
    /**
     * Run the database seeds.
     *
     * @return void
     */

     public function run()
     {
        $user = User::create([
            'name'=>"Admin",
            'email'=>"admin@gmail.com",
            'password'=>bcrypt('123456')
        ]);
     }
}
