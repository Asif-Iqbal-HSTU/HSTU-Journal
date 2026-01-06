<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Paper extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function coauthors(): HasMany
    {
        return $this->hasMany(Coauthor::class);
    }
    public function classifications(): HasMany
    {
        return $this->hasMany(Classification::class);
    }
    public function keywords(): HasMany
    {
        return $this->hasMany(Keyword::class);
    }

    public function status(): HasOne
    {
        return $this->hasOne(Status::class);
    }

    public function author(): HasOne
    {
        return $this->hasOne(Author::class);
    }

    // public function connectedReviewer(): HasOne
    // {
    //     return $this->HasOne(Connectedreviewer::class);
    // }

    public function connectedReviewers(): HasMany
    {
        return $this->hasMany(Connectedreviewer::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
