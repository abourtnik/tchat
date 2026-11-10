<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Authenticated;

class UserEventSubscriber
{
    /**
     * Handle user authenticated events.
     */

    public function handleUserAuth(Authenticated $event): void {
        $event->user->update([
            'last_login_at' => now(),
            'last_login_ip' => request()->getClientIp(),
            'connected' => true,
            'user_agent' => request()->userAgent()
        ]);
    }
}
