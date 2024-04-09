<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quizs', function (Blueprint $table) {
            $table->id();
            $table->text('Titulo');
            $table->integer('Duracion');
            $table->text('Pregunta');
            $table->text('RespuestaCorrecta');
            $table->text('Respuesta2');
            $table->text('Respuesta3');
            $table->text('Respuesta4');
            $table->text('Pregunta2');
            $table->text('RespuestaCorrecta2');
            $table->text('Respuesta5');
            $table->text('Respuesta6');
            $table->text('Respuesta7');
            $table->text('Pregunta3');
            $table->text('RespuestaCorrecta3');
            $table->text('Respuesta8');
            $table->text('Respuesta9');
            $table->text('Respuesta10');
            $table->unsignedBigInteger('logro_id')->nullable();
            $table->boolean('bloqueada');
            $table->timestamps();
        
            $table->foreign('logro_id')->references('id')->on('logros')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('quizs', function (Blueprint $table) {
            $table->dropForeign(['logro_id']);
        });

        Schema::dropIfExists('quizs');
    }
}
