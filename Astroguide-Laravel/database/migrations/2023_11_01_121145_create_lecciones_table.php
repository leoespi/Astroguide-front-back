<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeccionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lecciones', function (Blueprint $table) {
            $table->id();
            $table->text('Nombre_de_la_leccion');
            $table->text('Contenido');
            //$table->integer('Lecciones_Diarias_realizadas');
            //$table->integer('Lecciones_Totales_realizadas');
            $table->text('Tipo_de_leccion');
            //$table->foreignId('user_id');
            //$table->foreign('user_id')->references('id')->on('users');

            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lecciones');
    }
}
