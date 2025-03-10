<?php

namespace App\Http\Resources;

use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Message
 */
class MessageResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'user' => UserResource::make($this->user),
            'date' => $this->created_at,
            'formated_date' => $this->created_at->diffForHumans(['options' => Carbon::JUST_NOW]),
        ];
    }
}
