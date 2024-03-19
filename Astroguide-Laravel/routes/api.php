<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\QuizApiController;
use App\Http\Controllers\API\ForoApiController;
use App\Http\Controllers\API\LeccionesApiController;
use App\Http\Controllers\API\UserApiController;
use App\Http\Controllers\API\RolApiController;
use App\Http\Controllers\API\RespuestasApiController;
use App\Http\Controllers\API\LogroApiController;
use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\Feed\FeedController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('quiz', QuizApiController::class)->middleware('auth:api');
Route::apiResource('lecciones', LeccionesApiController::class)->middleware('auth:api');
Route::apiResource('user', UserApiController::class)->middleware('auth:api');
Route::apiResource('rol', RolApiController::class);
Route::apiResource('logro', LogroApiController::class);

Route::get('/users', [UserApiController::class, 'index'])->middleware('auth:api');

// Ruta para mostrar un logro específico
Route::get('/logros/{id}', [LogroApiController::class, 'show'])->middleware('auth:api');

Route::get('/quiz/admin', [QuizApiController::class, 'indexadmin']);

Route::delete('/feeds/{id}', [FeedController::class, 'destroy'])->middleware('auth:api');

Route::get('/feeds/all', [FeedController::class, 'indexall'])->middleware('auth:api');
Route::get('/feeds', [FeedController::class, 'index'])->middleware('auth:api');
Route::post('/feed/store', [FeedController::class, 'store'])->middleware('auth:api');
Route::post('/feed/like/{feed_id}', [FeedController::class, 'likePost'])->middleware('auth:api');
Route::post('/feed/comment/{feed_id}', [FeedController::class, 'comment'])->middleware('auth:api');
Route::get('/feed/comments/{feed_id}', [FeedController::class, 'getComments'])->middleware('auth:api');

Route::get('/test', function () {
    return response([
        'message' => 'Api is working'
    ], 200);
});

Route::put('/updateUser', [UserApiController::class, 'update'])->middleware('auth:api');

Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);
Route::post('quiz/validarTerminacion', [QuizApiController::class, 'validarTerminacion'])->middleware('auth:api');

Route::get('/logroUser', [LogroApiController::class, 'mostrarLogrosUser'])->middleware('auth:api');

Route::get('/get/user', [UserApiController::class, 'indexUser'])->middleware('auth:api');
Route::put('/updateUser', [UserApiController::class, 'update'])->middleware('auth:api');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/desbloquearleccion/{id}', [LeccionesApiController::class, 'desbloquearleccion'])->middleware('auth:api');
