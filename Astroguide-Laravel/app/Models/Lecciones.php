<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecciones extends Model
{
    use HasFactory;

    protected $table = "lecciones";

    protected $fillable = [
        "Nombre_de_la_leccion",
        "Contenido",
        "Lecciones_Diarias_realizadas",
        "Lecciones_Totales_realizadas",
        "Tipo_de_leccion",
        
    ];




    public function quiz()
    {
        return $this->hasOne(Quiz::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
