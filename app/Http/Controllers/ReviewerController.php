<?php

namespace App\Http\Controllers;

use App\Mail\ReviewerMail;
use App\Models\Connectedreviewer;
use App\Models\Paper;
use App\Models\Review;
use App\Models\Reviewer;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

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
        //dd($request);
        $request->validate([
            'reviewer_id' => 'required',
            'paper_id' => 'required',
        ]);

        try {
            Connectedreviewer::create([
                'reviewer_id' => $request->reviewer_id,
                'paper_id' => $request->paper_id,
            ]);

            $reviewer = Reviewer::where('id', $request->reviewer_id)->first();
            $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications'])->where('id', $request->paper_id)->first();
            $title = $paper->title;
            $abstract = $paper->abstract;
            $paper_id = $paper->id;

            $u = User::where('email', $reviewer->email)->first();
            //dd($u->id);
//            $rnd_str = Str::random(4); // Generates a random alphanumeric string of 8 characters
//            $u_name = $reviewer->name . $rnd_str;
            if($u == null)
            {
                //dd($u->id);
                $rnd_str = Str::random(4); // Generates a random alphanumeric string of 8 characters
                $u_name = $reviewer->name . $rnd_str;
                $user = User::create([
                    'name' => $reviewer->name,
                    'username' => $u_name,
                    'email' => $reviewer->email,
                    'affiliation' => $reviewer->affiliation,
                    'academicTitle' => $reviewer->academicTitle,
                    'role' => 'reviewer',
                    'password' => Hash::make($u_name),
                ]);
                Mail::to($reviewer->email)->send(new ReviewerMail($title, $abstract, $u_name));
            }
            else{
                $u_name = $u->username;
                Mail::to($reviewer->email)->send(new ReviewerMail($title, $abstract, $u_name));
            }



            $status = $paper->status;
            //dd($status);
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

    public function storeReview(Request $request): RedirectResponse
    {
        $request->validate([
            'paper_id' => 'required',
            'overallRecommendation' => 'required',
            'generalComments' => 'required',
            'detailedFeedback' => 'required',
            'criticalAssessment' => 'required',
            'suggestionsForImprovement' => 'required',
            'summaryOfFindings' => 'required',
            'assessmentOfOriginality' => 'required',
            'assessmentOfClarity' => 'required',
            'assessmentOfMethodology' => 'required',
            'assessmentOfResults' => 'required',
            'assessmentOfReferences' => 'required',
            'additionalReferencesOrResources' => 'required',
            'completionTimeframe' => 'required',
        ]);

        Review::create([
            'paper_id' => $request->paper_id,
            'overallRecommendation' => $request->overallRecommendation,
            'generalComments' => $request->generalComments,
            'detailedFeedback' => $request->detailedFeedback,
            'criticalAssessment' => $request->criticalAssessment,
            'suggestionsForImprovement' => $request->suggestionsForImprovement,
            'summaryOfFindings' => $request->summaryOfFindings,
            'assessmentOfOriginality' => $request->assessmentOfOriginality,
            'assessmentOfClarity' => $request->assessmentOfClarity,
            'assessmentOfMethodology' => $request->assessmentOfMethodology,
            'assessmentOfResults' => $request->assessmentOfResults,
            'assessmentOfReferences' => $request->assessmentOfReferences,
            'confidentialCommentsToTheEditor' => $request->confidentialCommentsToTheEditor,
            'additionalReferencesOrResources' => $request->additionalReferencesOrResources,
            'completionTimeframe' => $request->completionTimeframe,
        ]);

        $c_r = Connectedreviewer::where('paper_id', $request->paper_id)->first();
        $c_r->reviewerState = 'Reviewed';
        $c_r->save();

        flash()->success('Review added successfully.');
        return back();

    }

    public function updateReviewerState(Request $request): RedirectResponse
    {
        try {
            $connectedReviewer = Connectedreviewer::where('reviewer_id', $request->reviewer_id)->where('paper_id', $request->paper_id)->first();
            $connectedReviewer->reviewerState = $request->reviewerState;
            $connectedReviewer->save();

            return back();

        } catch (\Exception $e) {
            \Log::error('Mail sending failed: '.$e->getMessage());
            flash()->error('Something is WRONG');
            return back();
        }
    }



}
