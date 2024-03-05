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
Route::apiResource('lecciones', LeccionesApiController::class);
Route::apiResource('user', UserApiController::class);
Route::apiResource('rol', RolApiController::class);
Route::apiResource('logro', LogroApiController::class);
Route::get('/feeds', [FeedController::class, 'index'])->middleware('auth:sanctum');
Route::post('/feed/store', [FeedController::class, 'store'])->middleware('auth:sanctum');
Route::post('/feed/like/{feed_id}', [FeedController::class, 'likePost'])->middleware('auth:sanctum');
Route::post('/feed/comment/{feed_id}', [FeedController::class, 'comment'])->middleware('auth:sanctum');
Route::get('/feed/comments/{feed_id}', [FeedController::class, 'getComments'])->middleware('auth:sanctum');

Route::get('/test', function () {
    return response([
        'message' => 'Api is working'
    ], 200);
});

Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);
Route::post('quiz/validarTerminacion', [QuizApiController::class, 'validarTerminacion'])->middleware('auth:api');
Route::get('/logroUser', [LogroApiController::class, 'mostrarLogrosUser'])->middleware('auth:api');
Route::get('/get/user', [UserApiController::class, 'indexUser'])->middleware('auth:api');
