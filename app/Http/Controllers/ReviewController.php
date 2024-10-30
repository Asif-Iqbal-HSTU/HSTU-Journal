<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function showReviewPage($paper_id)
    {
        $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewer.reviewer', 'review'])->where('id', $paper_id)->first();
        $p_r = Review::where('paper_id', $paper_id)->get();
        return Inertia::render('Paper/PaperReview', [
            'paper' => $paper,
            'paper_review' => $p_r,
        ]);
    }
}
