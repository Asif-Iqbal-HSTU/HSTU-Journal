<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use App\Models\Editor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return redirect()->route('admin.editors.index');
        } elseif ($user->role === 'editor') {
            return redirect()->route('editorDashboard');
        } elseif ($user->role === 'reviewer') {
            return redirect()->route('reviewerDashboard');
        } elseif ($user->role === 'author') {
            return redirect()->route('authorDashboard');
        }

        return Inertia::render('Dashboard');
    }

    public function gotoAuthorDashboard(): Response
    {
        $userID = Auth::user()->id;
        $papers = Paper::with(['status', 'author.user'])->where('user_id', $userID)->get();
        return Inertia::render('Dashboards/Author', [
            'papers' => $papers,
        ]);
    }

    public function gotoEditorDashboard(): Response
    {
        $papers = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewers.reviewer'])->get();
        return Inertia::render('Dashboards/Editor', [
            'papers' => $papers,
        ]);
    }

    public function gotoReviewerDashboard(): Response
    {
        $papers = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewers.reviewer'])->get();
        return Inertia::render('Dashboards/Reviewer', [
            'papers' => $papers,
        ]);
    }
}
