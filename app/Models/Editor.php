<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Editor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'designation',
        'role',
        'image_path',
        'sort_order',
        'is_active',
    ];
}
