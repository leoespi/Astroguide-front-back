<?php

namespace Database\Seeders;
use App\Models\Category;

class CategorieSeeder extends Seeder{
    /**
     * Run the database seeds.
     *
     * @return void
     */

     public function run()
     {
        $category = Category::create([
            'name'=>"Sin categoria",
            'id'=>1
        ]);
     }
}
