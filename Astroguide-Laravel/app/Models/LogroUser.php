<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogroUser extends Model
{
    use HasFactory;
    protected $table = "logro_user";    
    protected $fillable = [
        'user_id',
        'logro_id'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
     
    public function logro(){
        return $this->belongsTo(Logros::class);
    }

}
