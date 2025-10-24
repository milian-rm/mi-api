<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Empleado;
use Illuminate\Http\Request;

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empleados = Empleado::all();
        return response()->json([
            "empleados" => $empleados
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $empleado = new Empleado();

        $empleado->nombre = $request->input("nombre");
        $empleado->apellido = $request->input("apellido");
        $empleado->noDpi = $request->input("noDpi");
        $empleado->cargo = $request->input("cargo");

        $empleado->save();

        return response()->json([
            "message"=> "Empleado Creado Exitosamente",
            "empleado" => $empleado
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Empleado $empleado, $id)
    {
        $empleados = Empleado::find($id);
        return response()->json([
            "empleados" => $empleados
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $empleado = Empleado::find( $id );

        $empleado->nombre = $request->input("nombre");
        $empleado->apellido = $request->input("apellido");
        $empleado->noDpi = $request->input("noDpi");
        $empleado->cargo = $request->input("cargo");

        $empleado->save();

        return response()->json([
            "message"=> "Empleado Modificado Exitosamente",
            "empleado" => $empleado
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $empleado = Empleado::find($id);

        $empleado->delete();

        return response()->json([
            "message"=> "Se eliminó el Empleado"
        ]);

    }
}
