<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller {
    public function register( Request $request ) {
        $formFields = $request->validate( [
            'first_name'=> 'required|string',
            'last_name'=> 'required|string',
            'email'=> 'required|string|email|unique:users',
            'phone_number'=> 'required|string',
            'profile_image'=> 'required|file',
            'password'=> 'required|string|confirmed',
        ] );

        if ( $request->hasFile( 'profile_image' ) ) {
            $formFields[ 'profile_image_path' ] = $request->file( 'profile_image' )->store( 'uploads' );

        }

        $user = User::create( $formFields );

        $token = $user->createToken( $user->name . 'myappToken' )->plainTextToken;

        return response( [
            'user' => $user,
            'token' => $token
        ] );
    }

    public function login( Request $request ) {

        $request->validate( [
            'email' => 'required',
            'password' =>'required'
        ] );

        //Check User Existence
        $user = User::where( 'email', $request->email )->first();

        //Compare Password
        if ( !$user || !Hash::check( $request->password, $user->password ) ) {
            return response( [

                'errors'=> [
                    'message' => [ 'Email or Password in incorrect' ]
                ]

            ], 400 );
        }

        $token = $user->createToken( 'myappToken' )->plainTextToken;

        return response( [
            'user' => $user,
            'token' => $token
        ], 200 );
    }

    public function logout() {

        $status = auth()->user()->tokens()->delete();

        return response( [
            'message' => 'Logged Out Successfully.',
            'status' => 'Success'
        ] );
    }
}
