<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Authenticated;
use Illuminate\Events\Dispatcher;

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

    /**
     * Register the listeners for the subscriber.
     *
     * @return array<string, string>
     */
    public function subscribe(Dispatcher $events): array
    {
        return [
            Authenticated::class => 'handleUserAuth',
        ];
    }
}
