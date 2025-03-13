<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\RateLimiter;

class MessagePolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user):  Response
    {
        if (RateLimiter::tooManyAttempts('send-message:'.$user->id, $perMinute = 20)) {

            $seconds = RateLimiter::availableIn('send-message:'.$user->id);

            return Response::denyWithStatus(429, 'You are sending messages too fast. Please wait '.$seconds.' seconds before trying again.');
        }

        return !$user->is_banned
            ? Response::allow()
            : Response::deny( 'Your account is banned');
    }
}
