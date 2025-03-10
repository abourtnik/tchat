<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;

Route::middleware('auth:sanctum')->group(function () {

    // MESSAGES
    Route::controller(MessageController::class)->prefix('messages')->name('messages.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/send', 'send')->name('send');
    });
});
