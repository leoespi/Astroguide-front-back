<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeccionesQuizTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lecciones_quiz', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lecciones_id');
            $table->unsignedBigInteger('quiz_id');
            $table->timestamps();

            $table->foreign('lecciones_id')->references('id')->on('lecciones')->onDelete('cascade');
            $table->foreign('quiz_id')->references('id')->on('quizs')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lecciones_quiz');
    }
}
