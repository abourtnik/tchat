<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Http\Requests\StoreMessage;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;


class MessageController extends Controller
{
    public function index(Request $request): ResourceCollection
    {
        $page = $request->query('page', 1);

        $perPage = 15;

        $latestQuery = Message::query()
            ->latest()
            ->limit($perPage)
            ->offset(($page - 1) * $perPage);

        $count = Cache::rememberForever('messages.count', function () {
            return Message::query()->count();
        });

        return (
            MessageResource::collection(
                Message::query()
                    ->select('*')
                    ->fromSub($latestQuery, 'latest')
                    ->oldest()
                    ->with('user')
                    ->get()
            )->additional([
                'next_page' => $page * $perPage < $count ? $page + 1 : null
            ])
        );
    }

    public function send(StoreMessage $request) : MessageResource
    {
        $validated = $request->safe()->merge([
            'user_id' => Auth::id()
        ])->toArray();

        $message = Message::query()->create($validated);

        broadcast(new NewMessage($message))->toOthers();

        Cache::forget('messages.count');

        return new MessageResource($message);
    }
}
