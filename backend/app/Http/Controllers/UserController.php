<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\User;

class UserController extends Controller {
    public function updateUser( Request $request ) {

        if ( $request->id != auth()->id() ) {
            return response( [
                'message' => 'User Not Found!!.'
            ], 404 );
        }

        $otherUserWithSameEmail = User::where( 'email', $request->email )->get()[ 0 ];

        if ( $otherUserWithSameEmail->id !== auth()->id() ) {
            return response( [
                'errors' => [
                    'email' => [ 'Email address already taken.' ]
                ]
            ], 400 );
        }

        $user = User::find( $request->id );

        $formFields = $request->validate( [
            'first_name'=> 'required|string',
            'last_name'=> 'required|string',
            'email'=> 'required|string',
            'phone_number'=> 'required|string',
        ] );

        if ( $request->hasFile( 'profile_image' ) ) {
            $formFields[ 'profile_image_path' ] = $request->file( 'profile_image' )->store( 'uploads' );
        }

        $user->update( $formFields );

        return response( [
            'message' => 'User Updated Successfully.',
            'user' =>  $user
        ], 201 );

    }
}
