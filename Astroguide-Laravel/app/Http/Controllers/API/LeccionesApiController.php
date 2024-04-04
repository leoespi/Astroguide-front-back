<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lecciones;
use Illuminate\Support\Facades\Auth;
use App\Models\User_has_lecciones;


class LeccionesApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        $lecciones = Lecciones::all();

        $data = array();
        foreach ($lecciones as $l){
            $leccionesusuario = User_has_lecciones::where('lecciones_id', $l->id)
                ->where('user_id', $user->id)->get();      
            if (count($leccionesusuario) > 0 || $l->id==1) {
                $l->desbloqueda=true;
            } else {
                $l->desbloqueda=false;
            }
            array_push($data, $l);
        }
        return response()->json($data, 200,[], JSON_NUMERIC_CHECK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $lecciones = new Lecciones();
        $lecciones->Nombre_de_la_leccion= $request->Nombre_de_la_leccion;
        $lecciones->Contenido = $request -> Contenido;
        //$lecciones->Lecciones_Diarias_realizadas= $request->Lecciones_Diarias_realizadas;
        //$lecciones->Lecciones_Totales_realizadas= $request->Lecciones_Totales_realizadas;
        $lecciones->Tipo_de_leccion= $request->Tipo_de_leccion;
        //$lecciones->user_id= $request->user_id;
        $lecciones->save();
        return response()->json($lecciones, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $lecciones = Lecciones::find($id);
        return response()->json($lecciones, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $lecciones = Lecciones::find($id);
        $lecciones->Nombre_de_la_leccion= $request->Nombre_de_la_leccion;
        $lecciones->Contenido = $request -> Contenido;
        //$lecciones->Lecciones_Diarias_realizadas= $request->Lecciones_Diarias_realizadas;
        //$lecciones->Lecciones_Totales_realizadas= $request->Lecciones_Totales_realizadas;
        $lecciones->Tipo_de_leccion= $request->Tipo_de_leccion;
        //$lecciones->user_id= $request->user_id;
        $lecciones->save();
        return response()->json($lecciones);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $lecciones = Lecciones::find($id);
        $lecciones->delete();
        return response()->json($lecciones);
    }

    public function desbloquearleccion($id)
    {
        $user_has_lecciones = User_has_lecciones::create([
            'user_id' => Auth::user()->id,
            'lecciones_id' => $id+1,
            "orden" => 2 
        ]);
        return response()->json(["message" => "Desbloqueatse la siguiene leccion"]);
    }
}
