<?php

namespace Database\Seeders;
use App\Models\Category;
use Illuminate\Database\Seeder;

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
