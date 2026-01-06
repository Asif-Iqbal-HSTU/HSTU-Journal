<?php

use App\Http\Controllers\PaperController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReviewerController;
use App\Http\Middleware\EditorMiddleware;
use App\Http\Middleware\ReviewerMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Http\Middleware\AuthorMiddleware;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $currentUser = Auth::user();
    return Inertia::render('Dashboard', [
        'currentUser' => $currentUser,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/author', [\App\Http\Controllers\DashboardController::class, 'gotoAuthorDashboard'])->middleware(['auth', 'verified'])->name('authorDashboard')->middleware(AuthorMiddleware::class);
//Route::get('/dashboard/author', [\App\Http\Controllers\DashboardController::class, 'gotoAuthorDashboard'])->middleware(['auth', 'verified'])->name('authorDashboard')->middleware(AuthorMiddleware::class);
Route::get('/dashboard/editor', [\App\Http\Controllers\DashboardController::class, 'gotoEditorDashboard'])->middleware(['auth', 'verified'])->name('editorDashboard')->middleware(EditorMiddleware::class);
//Route::get('/dashboard/editor', [\App\Http\Controllers\DashboardController::class, 'gotoEditorDashboard'])->middleware(['auth', 'verified'])->name('editorDashboard');
Route::get('/dashboard/reviewer', [\App\Http\Controllers\DashboardController::class, 'gotoReviewerDashboard'])->middleware(['auth', 'verified'])->name('reviewerDashboard')->middleware(ReviewerMiddleware::class);
//Route::get('/dashboard/reviewer', [\App\Http\Controllers\DashboardController::class, 'gotoReviewerDashboard'])->middleware(['auth', 'verified'])->name('reviewerDashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/newManuscript', [PaperController::class, 'newManuscriptPage'])->name('newManuscriptPage')->middleware(AuthorMiddleware::class);
    Route::post('/paper/store', [PaperController::class, 'storePaper'])->name('storePaper')->middleware(AuthorMiddleware::class);

    Route::get('/abcd', [PaperController::class, 'abcd'])->name('abcd');
    Route::get('/papers/{paper}', [PaperController::class, 'show'])->name('showPaper');
    // Route for downloading the editable DOCX file
    Route::get('/papers/{id}/download-docx', [PaperController::class, 'downloadEditableFile'])->name('papers.download.docx');

// Route for downloading the PDF file
    Route::get('/papers/{id}/download-pdf', [PaperController::class, 'downloadPdfFile'])->name('papers.download.pdf');
    Route::get('/papers/{id}/download-zip', [PaperController::class, 'downloadZipFile'])->name('papers.download.zip');

// Route for downloading the ZIP file
    Route::get('/reviewerlist', [ReviewerController::class, 'gotoReviewerPageForAuthor'])->name('gotoReviewerPageForAuthor')->middleware(AuthorMiddleware::class);
    Route::post('/reviewer', [ReviewerController::class, 'store'])->name('storeReviewer')->middleware(AuthorMiddleware::class);
    Route::post('/reviewer/connect', [ReviewerController::class, 'connect'])->name('connectReviewer')->middleware(EditorMiddleware::class);

    Route::get('/reviewerForm/{paper}', [ReviewerController::class, 'gotoReviewerForm'])->name('gotoReviewerForm')->middleware(ReviewerMiddleware::class);
    Route::post('/review', [ReviewerController::class, 'storeReview'])->name('storeReview')->middleware(ReviewerMiddleware::class);

    Route::post('/reviewerStateUpdate', [ReviewerController::class, 'updateReviewerState'])->name('updateReviewerState')->middleware(ReviewerMiddleware::class);
    Route::get('/review-confirmation', function () {
        return view('review-confirmation');
    })->name('review-confirmation');


    Route::get('/papers/{paper_id}/review', [ReviewController::class, 'showReviewPage'])->name('showReviewPage');
    Route::post('/statusChange', [PaperController::class, 'statusChange'])->name('statusChange');

    Route::get('/papers/edit/{paper_id}', [PaperController::class, 'editSubmission'])->name('editSubmission')->middleware(AuthorMiddleware::class);
    Route::post('/paper/update/{paper_id}', [PaperController::class, 'updatePaper'])->name('updatePaper')->middleware(AuthorMiddleware::class);


});

Route::get('/reviewer/accept/{reviewer_id}/{paper_id}', [ReviewerController::class, 'acceptReviewerState'])->name('reviewer.accept');
Route::get('/reviewer/decline/{reviewer_id}/{paper_id}', [ReviewerController::class, 'declineReviewerState'])->name('reviewer.decline');

require __DIR__.'/auth.php';
