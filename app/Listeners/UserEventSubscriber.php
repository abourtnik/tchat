<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Authenticated;
use Illuminate\Auth\Events\Logout;
use Illuminate\Events\Dispatcher;

class UserEventSubscriber
{
    /**
     * Handle user authenticated events.
     */

    public function handleUserAuth(Authenticated $event): void {
    }

    /**
     * Handle user logout events.
     */
    public function handleUserLogout(Logout $event): void {

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
            Logout::class => 'handleUserLogout'
        ];
    }
}
