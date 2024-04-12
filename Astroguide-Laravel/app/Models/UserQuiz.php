<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserQuiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quiz_id', // Agrega la coma al final de esta línea
        'bloqueada', // Agrega el nuevo campo al fillable
    ];
}
