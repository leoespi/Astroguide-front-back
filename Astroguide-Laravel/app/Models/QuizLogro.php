<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizLogro extends Model
{
    use HasFactory;

    protected $table = "quiz_logro";

    protected $fillable = [
        "quiz_id",
        "logro_id"
    ];
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function logro()
    {
        return $this->belongsTo(Logros::class);
    }   


}
