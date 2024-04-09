<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Logros;
use App\Models\LogroUser;
use Illuminate\Support\Facades\Auth;

class LogroApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $logros = Logros::all();
        return response()->json($logros, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $logros = new Logros();
        $logros->Nombre_del_Logro = $request->Nombre_del_Logro;
        $logros->Rareza = $request->Rareza;
        $logros->leccion_id = $request->leccion_id;

        
        $logros->save();
        return response()->json($logros, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $logros = Logros::find($id);

        
        if (!$logro) {
            return response()->json(['message' => 'Logro no encontrado'], 404);
        }


        return response()->json($logros, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
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
        $logros = Logros::find($id);
        $logros->Nombre_del_Logro = $request->Nombre_del_Logro;
        $logros->Rareza = $request->Rareza;

        $logros->save() ;
        return response()->json($logros);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $logros = Logros::find($id);
        $logros->delete();
        return response()->json($logros);
    }
    //muestra los logros que tiene X usuario en su cuenta
    public function mostrarLogrosUser()
    {
        $user = Auth::user();
        $logrosuser = LogroUser::where('user_id', $user->id)->get();
        $logros = array();
        foreach ($logrosuser as $logrouser) {
            $logro = Logros::where('id', $logrouser->logro_id)->first();
            array_push($logros, $logro);
        }
        
        return response()->json($logros);
    }
}
//me cago en la puta del github