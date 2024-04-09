<?php

namespace Database\Seeders;

class AdminSeeder extends Seeder{
    /**
     * Run the database seeds.
     *
     * @return void
     */

     public function run()
     {
        $category = Categorie::create([
            'name'=>"Sin categoria",
            'id'=>1
        ]);
     }
}
