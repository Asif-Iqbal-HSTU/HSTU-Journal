<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    //
    public function gotoAuthorDashboard():Response
    {
//        flash()->success('Author Login Success.');
        $userID = Auth::user()->id;
        $papers = Paper::with(['status', 'author.user'])->where('user_id', $userID)->get(); // Eager load 'status', 'author', and 'user'
        return Inertia::render('Dashboards/Author', [
            'papers' => $papers,
        ]);
    }
    public function gotoEditorDashboard():Response
    {
//        flash()->success('Author Login Success.');
//        $userID = Auth::user()->id;
        $papers = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewer.reviewer'])->get(); // Eager load 'status', 'author', and 'user'
        return Inertia::render('Dashboards/Editor', [
            'papers' => $papers,
        ]);
    }
    public function gotoReviewerDashboard():Response
    {
//        flash()->success('Author Login Success.');
//        $userID = Auth::user()->id;
        $papers = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewer.reviewer'])->get(); // Eager load 'status', 'author', and 'user'
        return Inertia::render('Dashboards/Reviewer', [
            'papers' => $papers,
        ]);
    }
}
