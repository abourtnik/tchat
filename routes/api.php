<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;

use App\Models\Message;

Route::middleware('auth:sanctum')->group(function () {

    // MESSAGES
    Route::controller(MessageController::class)->prefix('messages')->name('messages.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/send', 'send')->name('send')->can('create', Message::class);
        Route::delete('/{message}', 'delete')->name('delete')->can('delete', 'message');
    });

    // USERS
    Route::controller(UserController::class)->prefix('user')->name('user.')->group(function () {
        Route::post('/update', 'update')->name('update');
    });
});
