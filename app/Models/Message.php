<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Message extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected function filePath(): Attribute
    {
        return Attribute::make(
            get: fn () => asset('storage/'.$this->file)
        );
    }

}
