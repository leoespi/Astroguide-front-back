<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogroQuizPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logro_quiz', function (Blueprint $table) {
            $table->id();
            $table->foreignId('logro_id')->constrained()->onDelete('cascade');
            $table->foreignId('quiz_id')->constrained('quizs')->onDelete('cascade');
            $table->timestamps();
        });
        
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logro_quiz_pivot');
    }
}
