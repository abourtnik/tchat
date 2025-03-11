<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;


class MessagePolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user):  Response
    {
        return !$user->is_banned
            ? Response::allow()
            : Response::deny( 'Your account is banned');
    }
}
