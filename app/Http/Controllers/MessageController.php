<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Support\Facades\RateLimiter;
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

    public function send(StoreMessageRequest $request) : MessageResource
    {
        $validated = $request->safe()
            ->merge(['user_id' => Auth::id()])
            ->merge($this->storeFile($request))
            ->toArray();

        $message = Message::query()->create($validated);

        broadcast(new NewMessage($message))->toOthers();

        Cache::forget('messages.count');

        RateLimiter::increment('send-message:'. Auth::id());

        return new MessageResource($message);
    }

    private function storeFile (StoreMessageRequest $request) : array
    {
        $file = $request->file('file');

        if (!$file) {
            return [];
        }

        return [
            'file' => $file->store('files', 'public'),
            'file_type' => $file->getClientMimeType(),
            'file_size' => $file->getSize()
        ];
    }
}
