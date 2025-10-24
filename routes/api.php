<?php

use App\Http\Controllers\Api\EmpleadoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/empleados', [EmpleadoController::class, "index"]);
Route::get('/empleados/{id}', [EmpleadoController::class, "show"]);
Route::post('/empleados', [EmpleadoController::class, "store"]);
Route::put('/empleados/{id}', [EmpleadoController::class, "update"]);
Route::delete('/empleados/{id}', [EmpleadoController::class, "destroy"]);
Route::get("/", function (){
    return view("app");
});
