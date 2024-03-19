<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Lecciones;

class User_has_lecciones extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lecciones_id', // Agrega la coma al final de esta línea
        'orden', // Agrega el nuevo campo al fillable
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function lecciones()
    {
        return $this->belongsTo(Lecciones::class, 'lecciones_id', 'id');
    }
}
