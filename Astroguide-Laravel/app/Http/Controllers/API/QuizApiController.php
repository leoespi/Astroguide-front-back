<?php

namespace App\Http\Controllers\API;



use Illuminate\Http\Request;
use App\Models\Quiz; // Importa el modelo Quiz
use App\Models\QuizLogro; // Importa el modelo Quiz
use App\Models\Logros;
use App\Models\UserQuiz;
use App\Models\User_has_lecciones;
use App\Models\Lecciones;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class QuizApiController extends Controller
{
    //funcion eliminar quiz al conseguir logro
    
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }


        $logros = DB::table('logro_user')->where('user_id', $user->id)->pluck('logro_id')->all();
        $quizlogros = QuizLogro::whereIn('logro_id', $logros)->pluck('quiz_id')->all();
        $quizs =  Quiz::whereNotIn('id', $quizlogros)->get();
        $user_quiz = DB::table("user_haz_quizes")->where('user_id', $user->id)->get();
        $data = array();
        $i = 0;
        if (count($user_quiz) > 0)  {
            foreach ($quizs as $q) {
                if (count($user_quiz) > $i) {
                    if ($user_quiz[$i]!=null && $user_quiz[$i]->bloqueada == false) {
                        $q->bloqueada = false;
                    } else {
                        $q->bloqueada = true;
                    }
                } else {
                    $q->bloqueada = true;
                }
                array_push($data, $q);
               
                $i++;
            }
        } else {
            foreach ($quizs as $q) {
                $q->bloqueada = true;
                array_push($data, $q);
                $i++;
            }
        }


        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $quizs = new Quiz();
        $quizs->Titulo= $request->Titulo;
        $quizs->Duracion= $request->Duracion;
        $quizs->Pregunta= $request->Pregunta;
        $quizs->RespuestaCorrecta= $request->RespuestaCorrecta;
        $quizs->Respuesta2= $request->Respuesta2;
        $quizs->Respuesta3= $request->Respuesta3;
        $quizs->Respuesta4= $request->Respuesta4;

        $quizs->Pregunta2= $request->Pregunta2;
        $quizs->RespuestaCorrecta2= $request->RespuestaCorrecta2;
        $quizs->Respuesta5= $request->Respuesta5;
        $quizs->Respuesta6= $request->Respuesta6;
        $quizs->Respuesta7= $request->Respuesta7;


        $quizs->Pregunta3= $request->Pregunta3;
        $quizs->RespuestaCorrecta3= $request->RespuestaCorrecta3;
        $quizs->Respuesta8= $request->Respuesta8;
        $quizs->Respuesta9= $request->Respuesta9;
        $quizs->Respuesta10= $request->Respuesta10;

        $quizs->logro_id = $request->logro_id;
        
        $quizs->save();
        return response()->json($quizs, 200);
        //return redirect()->route('quizs.index');
    }

    //Acualizar la informacion de los quizes
    public function update(Request $request, $id){
        $quizs = Quiz::find($id);
        $quizs->Titulo= $request->Titulo;
        $quizs->Duracion= $request->Duracion;
        $quizs->Pregunta= $request->Pregunta;
        $quizs->RespuestaCorrecta= $request->RespuestaCorrecta;
        $quizs->Respuesta2= $request->Respuesta2;
        $quizs->Respuesta3= $request->Respuesta3;
        $quizs->Respuesta4= $request->Respuesta4;

        $quizs->Pregunta2= $request->Pregunta2;
        $quizs->RespuestaCorrecta2= $request->RespuestaCorrecta2;
        $quizs->Respuesta5= $request->Respuesta5;
        $quizs->Respuesta6= $request->Respuesta6;
        $quizs->Respuesta7= $request->Respuesta7;


        $quizs->Pregunta3= $request->Pregunta3;
        $quizs->RespuestaCorrecta3= $request->RespuestaCorrecta3;
        $quizs->Respuesta8= $request->Respuesta8;
        $quizs->Respuesta9= $request->Respuesta9;
        $quizs->Respuesta10= $request->Respuesta10;

        $quizs->save();
        return response()->json($user);
        
    }

    public function show($id)
    {
        $quizs = Quiz::find($id);
        return response()->json($quizs, 200);
    }
    //eliminar los quizes desde el apartado del admin
    public function destroy($id)
    {
        $quizs = Quiz::find($id);
        $quizs ->delete();
        return response()->json($quizs);
        
    }
    //esta funcion es para verificar si el usuario contesto correctamente el quiz
    public function validarTerminacion(Request $request)
    {
       try {
         // Traer el id del quiz y la respuesta del usuario
         $quizId = $request->input('quiz_id');
         $respuestasClientes = $request->input('respuestas_clientes');
         // BUSCAR QUIZ
         $quiz = Quiz::find($quizId);
         $respuestasCorrectas = [$quiz->RespuestaCorrecta,
                                 $quiz->RespuestaCorrecta2,
                                 $quiz->RespuestaCorrecta3];
 
         // quiz existe??
         if (!$quiz) {
             return response()->json(['error' => 'El quiz no existe'], 404);
         }
         $quizTerminadoCorrectamente = false;
                 if($respuestasCorrectas == $respuestasClientes){
                     $quizTerminadoCorrectamente = true;
             
         }//si el quiz se termina con exito se le asigna el logro al usuario
         if ($quizTerminadoCorrectamente) {
             $logro = Logros::find($quiz->logro_id);
         $user = Auth::user();
         $logro->users()->syncWithoutDetaching($user->id);
         $leccionDesbloqueada = $this->desbloquearleccion();
         if (!$leccionDesbloqueada) {
             return response()->json(["message" => "Ultima leccion"], 200, [], JSON_NUMERIC_CHECK);
         }
         }  
         // Retorna el resultado
         return response()->json(['message' => $quizTerminadoCorrectamente], 200, [], JSON_NUMERIC_CHECK);
       } catch (\Throwable $th) {
        return response()->json(['message' => $th->getMessage()], 400, [], JSON_NUMERIC_CHECK);
       }
    }


    //aqui se estipula el orden en el cual se desbloquearan las lecciones
    public function desbloquearleccion()
    {
        $id = 0;
        $lecciones = User_has_lecciones::where('user_id',Auth::user()->id)->get();
        if (count($lecciones) <= 0) {
            $id = 2;
        }  else {
            $id = $lecciones[count($lecciones)-1]->lecciones_id + 1;    
        }
        $lecciones = Lecciones::all();
        $ultimaLeccionId = $lecciones[count($lecciones)-1]->id+1;
        if ($ultimaLeccionId == $id) {
            return false;
        } 

        $user_has_lecciones = User_has_lecciones::create([
            'user_id' => Auth::user()->id,
            'lecciones_id' => $id,
            "orden" => 2 
        ]);
        return true;
    }
    

    public function desbloquearquiz($id)
    {
        $quiz = Quiz::find($id);
        $user_has_lecciones = DB::table("user_haz_quizes")->insert([
            'user_id' => Auth::user()->id,
            'quiz_id' => $id,
            "bloqueada" => false 
        ]);
        return response()->json($user_has_lecciones); 
    }
}


