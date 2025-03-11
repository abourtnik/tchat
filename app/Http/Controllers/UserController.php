<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\JsonResponse;


class UserController extends Controller
{
    public function update(UpdateUserRequest $request): JsonResponse
    {
        $request->user()->update($request->validated());

        return response()->json([
            'username' => $request->user()->username,
        ]);
    }

}
