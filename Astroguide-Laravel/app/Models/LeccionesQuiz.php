<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeccionesQuiz extends Model
{
    use HasFactory;

    protected $table = "lecciones_quiz";

    protected $fillable = [
        "lecciones_id",
        "quiz_id"
    ];

    public function lecciones()
    {
        return $this->belongsTo(Lecciones::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }   





}
