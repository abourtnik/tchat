<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;
use App\Http\Resources\UserResource;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat', function (User $user) {
    return new UserResource($user);
});
