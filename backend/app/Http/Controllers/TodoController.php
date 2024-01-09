<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use App\Models\Category;

class TodoController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index() {

        $todos = Todo::where( 'user_id', auth()->id() )->orderBy( 'id', 'DESC' )->get()->toArray();

        $result = array_map( function( $todo ) {
            return [
                ...$todo,
                'category' => Category::find( $todo[ 'category_id' ] )->toArray()[ 'name' ]
            ];
        }
        , $todos );

        return response( [
            'message' => 'Connection Successfull.',
            'data' => $result
        ] );
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store( Request $request ) {

        $formFields = $request->validate( [
            'title'=> 'required',
            'thumbnail'=> 'required',
            'category_id'=> 'required',
            'excitment'=> 'required',
            'description'=> 'required',
            'difficulty'=> 'required',
        ] );

        if ( $request->hasFile( 'thumbnail' ) ) {
            $formFields[ 'thumbnail' ] = $request->file( 'thumbnail' )->store( 'uploads' );
        }

        $formFields[ 'user_id' ] = auth()->id();

        return response( [
            'message' => 'Todo Added Successfully',
            'todo'=> Todo::create( $formFields )
        ] );
    }

    /**
    * Display the specified resource.
    */

    public function show( string $id ) {
        //
    }

    /**
    * Update the specified resource in storage.
    */

    public function update( Request $request, Todo $todo ) {

        if ( $todo->user_id !== auth()->id() ) {
            return $this->unauthoriezed();
        }

        $formFields = $request->validate( [
            'title'=> 'required',
            'category_id'=> 'required',
            'excitment'=> 'required',
            'description'=> 'required',
            'difficulty'=> 'required',
        ] );

        if ( $request->hasFile( 'thumbnail' ) ) {
            $formFields[ 'thumbnail' ] = $request->file( 'thumbnail' )->store( 'uploads' );
        }

        $formFields[ 'user_id' ] = auth()->id();
        $formFields[ 'done' ] = $request->done == 'true' ? 1 : 0;

        $todo->update( $formFields );

        return response( [
            'message' => 'Todo Updated Successfully.',
            'data'=> [
                'category' => Category::find( $todo[ 'category_id' ] )->toArray()[ 'name' ],
                'id' => $todo->id,
                'title'=> $todo->title,
                'category_id'=> $todo->category_id,
                'excitment'=> $todo->excitment,
                'description'=> $todo->description,
                'difficulty'=> $todo->difficulty,
                'thumbnail'=> $todo->thumbnail,
            ]
        ] );

    }

    /**
    * Remove the specified resource from storage.
    */

    public function destroy( Todo $todo ) {

        if ( $todo->user_id != auth()->id() ) {
            return $this->unauthoriezed();
        }

        Todo::destroy( $todo->id );

        return response( [
            'message' => 'Category Deleted Successfully.',
            'id' => $todo->id
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
