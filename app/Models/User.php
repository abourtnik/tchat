<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'banned_at' => 'datetime',
            'last_login_at' => 'datetime',
            'connected' => 'boolean',
        ];
    }

    public function messages() : HasMany {
        return $this->hasMany(Message::class);
    }

    protected function json(): Attribute
    {
        return Attribute::make(
            get: fn () =>
            collect([
                'id' => $this->id,
                'username' => $this->username,
                'avatar' => $this->avatar
            ])->toJson()
        );
    }

    protected function avatar(): Attribute
    {
        return Attribute::make(
            get: fn () => "https://api.dicebear.com/9.x/avataaars/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&backgroundType=solid&seed=" .$this->id
        );
    }

    protected function isBanned(): Attribute
    {
        return Attribute::make(
            get: fn () => !is_null($this->banned_at)
        );
    }

    protected function uploadedMediasSize(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->messages()
                ->sum('file_size')
        );
    }
}
