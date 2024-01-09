<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model {
    use HasFactory;

    protected $fillable = [
        'title',
        'thumbnail',
        'category_id',
        'user_id',
        'excitment',
        'description',
        'difficulty',
        'done'

    ];

    public function user() {
        return $this->belongsTo( User::class, 'user_id' );
    }

    public function category() {
        return $this->belongsTo( User::class, 'category_id' );
    }
}
