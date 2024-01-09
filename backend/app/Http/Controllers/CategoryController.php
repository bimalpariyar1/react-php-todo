<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index() {

        return response( [
            'message' => 'Connection Successfull',
            'categories'=> Category::where( 'user_id', auth()->id() )->orderBy( 'id', 'DESC' )->get()

        ] );
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store( Request $request ) {

        // return response( [
        //     'message' => 'From Create Category'
        // ] );

        $existingCategory = Category::where( 'name', '=', $request->name )->where( 'user_id', '=', auth()->id() )->first();

        if ( $existingCategory ) {
            return response( [
                'message' => 'Category Already Exist.',
                'cat' => $existingCategory
            ], 400 );
        }

        $formFields = $request->validate( [
            'name' => 'required|string'
        ] );

        $formFields[ 'user_id' ] = auth()->id();

        return response( [
            'message' => 'Category Created.',
            'category' => Category::create( $formFields )
        ], 201 );
    }

    /**
    * Display the specified resource.
    */

    public function show( Category $category ) {

        if ( $category->user_id !== auth()->id() ) {
            return $this->unauthoriezed();
        }

        return response( [
            'message' => 'Connection Successfull',
            'category' => $category
        ] );
    }

    /**
    * Update the specified resource in storage.
    */

    public function update( Request $request, Category $category ) {
        if ( $category->user_id != auth()->id() ) {
            return $this->unauthoriezed();
        }

        $formFields = $request->validate( [
            'name' => 'required',
            'user_id' => 'required'
        ] );

        $category->update( $formFields );

        return response( [
            'message' => 'category update route',
            'category' => $category
        ] );
    }

    /**
    * Remove the specified resource from storage.
    */

    public function destroy( Category $category ) {

        if ( $category->user_id != auth()->id() ) {
            return $this->unauthoriezed();
        }

        Category::destroy( $category->id );

        return response( [
            'message' => 'Category Deleted Successfully.',
            'id' => $category->id
        ] );

    }

    public function unauthoriezed() {
        return response( [
            'message' => 'Unauthorized',
            'errors' =>[
                'category' => 'You are not authorized to make this action.'
            ]

        ], 401 );
    }
}
