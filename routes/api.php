<?php

use Illuminate\Http\Request;

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

Route::post('auth/login', 'AuthController@login');
Route::post('weixin/login', 'AuthController@weappStore');

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::group([
        'prefix' => 'auth'
    ], function () {
        Route::delete('logout', 'AuthController@logout');
        Route::put('refresh', 'AuthController@refresh');
        Route::get('me', 'AuthController@me');
    });

    Route::group([
        'prefix' => 'project'
    ], function () {
        Route::put('order', 'ProjectController@updateOrder');
    });

    Route::group([
        'prefix' => 'timeline'
    ], function () {
        Route::put('order', 'TimelineController@updateOrder');
    });

    Route::group([
        'prefix' => 'expertProject'
    ], function () {
        Route::post('/', 'ExpertProjectController@store');
        Route::post('expertAddProject/{expert}', 'ExpertProjectController@expertAddProject');
        Route::post('projectAddExpert/{project}', 'ExpertProjectController@projectAddExpert');
    });

    Route::group([
        'prefix' => 'expert'
    ], function () {
        Route::get('all', 'ExpertController@indexAll');
    });

    Route::group([
        'prefix' => 'reservation'
    ], function () {
        Route::get('indexTable', 'ReservationController@indexTable');
        Route::get('count', 'ReservationController@count');
        Route::delete('multiple/{ids}', 'ReservationController@multipleDestroy');
    });

    Route::apiResource('expert', 'ExpertController');
    Route::apiResource('timeline', 'TimelineController');
    Route::apiResource('project', 'ProjectController');
    Route::apiResource('user', 'UserController');
    Route::apiResource('expertRest', 'ExpertRestController');
    Route::apiResource('reservation', 'ReservationController');
    Route::apiResource('permission', 'PermissionController');
    Route::apiResource('role', 'RoleController');
    Route::resource('activity', 'ActivityController', ['only' => ['index']]);
});
