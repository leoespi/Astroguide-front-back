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
        try {
            //code...
            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }

            $categories = Categories::all();

            return response()->json(['Categorias'=>$categories], 200,[], JSON_NUMERIC_CHECK);
        } catch (\Throwable $th) {
            return response()->json(['msg' => 'Ocurrio un error al obtener las categorias','error'=>$th], 501);   
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required'
            ]
        );


        $category= Category::create(['name'=>$request->name,]);
        return response()->json(['msg' => 'Categoria creada exitosamente'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Categories::find($id);
        return response()->json(['category'=>$category], 200,[], JSON_NUMERIC_CHECK);
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
        $request->validate(
            [
                'name' => 'required'
            ]
        );

        $category = Categories::find($id);
        $category->name=$request->name;
        $category->save();
        return response()->json(['category'=>$category], 201,[], JSON_NUMERIC_CHECK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Categories::find($id); //Lunas
        $feeds = Feed::where('category_id', $category->id)->get();
        foreach ($feeds as $feed){
            $feed->update([
                'category_id' => 1
            ]);
        }

        $category->delete();
        return response()->json(['category'=>$category], 201,[], JSON_NUMERIC_);
    }

}
