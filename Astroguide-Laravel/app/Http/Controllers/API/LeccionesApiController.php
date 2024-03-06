<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lecciones;

class LeccionesApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lecciones = Lecciones::all();
        return response()->json($lecciones, 200);

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
        $lecciones->contenido = $request -> contenido;
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
        $lecciones->contenido = $request -> contenido;
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
}
