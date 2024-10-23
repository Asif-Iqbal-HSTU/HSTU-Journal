<?php

namespace App\Http\Controllers;

use App\Mail\ReviewerMail;
use App\Models\Connectedreviewer;
use App\Models\Paper;
use App\Models\Reviewer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ReviewerController extends Controller
{
    //
    public function gotoReviewerPageForAuthor():Response
    {
//        flash()->success('Author Login Success.');
        $userID = Auth::user()->id;
        $reviewers = Reviewer::all(); // Eager load 'status', 'author', and 'user'
        //dd($reviewers);
        return Inertia::render('Paper/ReviewerList', [
            'reviewers' => $reviewers,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        //dd($request);
        //$user = Session::get('curr_user');
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:reviewers,email',
            'affiliation' => 'required|string',
            'academicTitle' => 'required|string',
        ]);

        //$materialFilePath = $this->uploadFile($request, 'file', 'public/materialFile');

        try {
            Reviewer::create([
                'name' => $request->name,
                'email' => $request->email,
                'affiliation' => $request->affiliation,
                'academicTitle' => $request->academicTitle,
            ]);

            flash()->success('Reviewer added successfully.');
            return back();

        } catch (\Exception $e) {

            flash()->error('Something is WRONG');
            return back();
        }
    }

    public function connect(Request $request): RedirectResponse
    {
        $request->validate([
            'reviewer_id' => 'required',
            'paper_id' => 'required',
        ]);

        try {
            Connectedreviewer::create([
                'reviewer_id' => $request->reviewer_id,
                'paper_id' => $request->paper_id,
            ]);

            $r = Reviewer::where('id', $request->reviewer_id)->first();
            $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications'])->where('id', $request->paper_id)->first();
            $title = $paper->title;
            $abstract = $paper->abstract;

            Mail::to($r->email)->send(new ReviewerMail($title, $abstract));

            $status = $paper->status;

            $status->name = "Approved";

            $status->save();


            return back();

        } catch (\Exception $e) {
            \Log::error('Mail sending failed: '.$e->getMessage());
            flash()->error('Something is WRONG');
            return back();
        }
    }

//    public function gotoReviewerForm():Response
//    {
//        return Inertia::render('Paper/ReviewerForm');
//    }

    public function gotoReviewerForm($paper)
    {
        $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewer.reviewer'])->where('id', $paper)->first();
        return Inertia::render('Paper/ReviewerForm', [
            'paper' => $paper,
        ]);
    }


}
