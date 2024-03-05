<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rol;


class RolApiController extends Controller
{
    
    public function index()
    {
        $rol = Rol::all();
        return response()->json($rol, 200);
    }

    
    public function store(Request $request)
    {
        $rol = new Rol();
        $rol->Tipo_de_rol= $request->Tipo_de_rol;
        $rol->save();
        return response()->json($rol, 200);
    }

   
    

   
    public function update(Request $request, $id)
    {
        $rol = Rol::find($id);
        $rol->Tipo_de_rol= $request->Tipo_de_rol;
        $rol->save();
        return response()->json($rol);
    }

   
    public function destroy($id)
    {
        $rol = Rol::find($id);
        $rol->delete();
        return response()->json($rol);
    }
}
