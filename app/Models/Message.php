<?php

namespace App\Models;

use App\Helpers\Parser;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * @mixin IdeHelperMessage
 */
class Message extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    const array IMAGES_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
    const array VIDEOS_MIME_TYPES = ['video/mp4', 'video/webm'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_image' => 'boolean',
            'is_video' => 'boolean'
        ];
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected function filePath(): Attribute
    {
        return Attribute::make(
            get: fn () => asset('storage/'.$this->file)
        );
    }

    protected function isMedia(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->is_image || $this->is_video
        );
    }

    protected function parsedContent(): Attribute
    {
        return Attribute::make(
            get: fn () => Parser::applyParsers($this->content, ['links'])
        );
    }

}
