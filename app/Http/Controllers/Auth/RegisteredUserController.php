<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.User::class,
            'role' => 'required|string|max:255',
            'affiliation' => 'required|string',
            'academicTitle' => 'required|string',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'username' => $request->username,
            'role' => $request->role,
            'affiliation' => $request->affiliation,
            'academicTitle' => $request->academicTitle,
            'orcid_id' => $request->orcid_id,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        $user = Auth::User();

        if($user->role === "author")
        {
            //flash()->success('Author Login Success.');
            return redirect()->intended(route('authorDashboard', absolute: false));
        }
        if($user->role === "editor")
        {
            //flash()->success('Author Login Success.');
            return redirect()->intended(route('editorDashboard', absolute: false));
        }
        if($user->role === "reviewer")
        {
            //flash()->success('Author Login Success.');
            return redirect()->intended(route('reviewerDashboard', absolute: false));
        }

        return redirect()->back();
    }
}
