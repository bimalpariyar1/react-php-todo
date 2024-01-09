<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model {
    use HasFactory;

    protected $fillable = [ 'name', 'user_id' ];

    // Relationship To User

    public function user() {
        return $this->belongsTo( User::class, 'user_id' );
    }

    public function todos() {
        return $this->hasMany( Category::class, 'category_id' );
    }

}
