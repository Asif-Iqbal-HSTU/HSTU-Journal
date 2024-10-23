<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Author extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function paper(): BelongsTo
    {
        return $this->belongsTo(Paper::class);
    }

    // Define the relationship to the User model
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
