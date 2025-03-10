<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

use Symfony\Component\HttpFoundation\Response;

class AuthUser
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Auth::viaRemember();

        if (Auth::guest()) {

            $user = User::factory()->create();

            Auth::login($user, true);

        }

        return $next($request);
    }
}
