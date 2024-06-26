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
    
     /*dentro de esta funcion de "index" encontramos una funcion de "bloque y desbloqueo" la cual los permite desbloquear las leccion siguiente
     despues de leer la leccion previa a esa*/

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
        $lecciones->Tipo_de_leccion= $request->Tipo_de_leccion;
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
        $lecciones->Tipo_de_leccion= $request->Tipo_de_leccion;
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

    
    
}
