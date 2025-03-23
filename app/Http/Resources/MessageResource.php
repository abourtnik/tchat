<?php

namespace App\Http\Resources;

use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

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
            'content' => $this->parsed_content,
            'user' => UserResource::make($this->user),
            'date' => $this->created_at,
            'formated_date' => $this->created_at->diffForHumans(['options' => Carbon::JUST_NOW]),
            $this->mergeWhen($this->file, [
                'file' => $this->file_path,
                'is_media' =>$this->is_media,
                'is_image' => $this->is_image,
                'is_video' => $this->is_video,
                'file_type' => $this->file_type,
                'file_size' => $this->file_size,
                'file_original_name' => Str::limit($this->file_original_name, 50),
            ])
        ];
    }
}
