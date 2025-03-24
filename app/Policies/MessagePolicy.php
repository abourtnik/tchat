<?php

namespace App\Policies;

use App\Models\Message;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\RateLimiter;

class MessagePolicy
{
    /**
     * Determine whether the user can create message.
     */
    public function create(User $user):  Response
    {
        if (RateLimiter::tooManyAttempts('send-message:'.$user->id, $perMinute = 20)) {

            $seconds = RateLimiter::availableIn('send-message:'.$user->id);

            return Response::denyWithStatus(429, 'You are sending messages too fast. Please wait '.$seconds.' seconds before trying again.');
        }

        if (request()->has('file') && $user->uploaded_medias_size > 524288000) { // 500MB
            return Response::deny( 'You have reached the maximum number of files you can upload');
        }

        if ($user->is_banned) {
            return Response::deny( 'Your account is banned');
        }

        return Response::allow();

    }

    /**
     * Determine whether the user can delete models.
     */
    public function delete(User $user, Message $message):  Response
    {
        return $message->user()->is($user)
            ? Response::allow()
            : Response::deny( 'Your are not allowed to delete this message');
    }
}
