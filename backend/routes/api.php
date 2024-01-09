<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\BimalController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Public Routes
Route::post('/register',[AuthController::class,'register']);

Route::post('/login',[AuthController::class,'login']); 


//Protected Routes

Route::group(['middleware' =>'auth:sanctum'],function(){
    Route::put('/update-user/{id}',[UserController::class,'updateUser']);
    Route::post('/logout',[AuthController::class,'logout']);  

    // Route::get('/categories',[CategoryController::class,'index']);
    // Route::post('/categories',[CategoryController::class,'store']);
    // Route::put('/categories/{id}',[CategoryController::class,'update']);
    // Route::delete('/categories',[CategoryController::class,'destroy']);

    Route::resource('categories',CategoryController::class);
    Route::resource('todos',TodoController::class);


 

});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
