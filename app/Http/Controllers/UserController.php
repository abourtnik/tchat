<?php

namespace App\Http\Controllers;

use App\Events\UserUpdated;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function update(UpdateUserRequest $request): JsonResponse
    {
        $user = $request->user();

        $user->update($request->validated());

        UserUpdated::dispatch($user);

        return response()->json([
            'username' => $user->username,
        ]);
    }

}
