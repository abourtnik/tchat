<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'app')->name('app')->middleware(\App\Http\Middleware\AuthUser::class);
