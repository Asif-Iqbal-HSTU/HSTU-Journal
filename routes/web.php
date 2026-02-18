<?php

use App\Http\Controllers\BackIssueController;
use App\Http\Controllers\PaperController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReviewerController;
use App\Http\Controllers\PublicController;
use App\Http\Middleware\EditorMiddleware;
use App\Http\Middleware\ReviewerMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Http\Middleware\AuthorMiddleware;

Route::get('/', [PublicController::class, 'welcome'])->name('welcome');

Route::get('/editorial-board', [PublicController::class, 'editorialBoard'])->name('editorial-board');

Route::get('/current-issue', [PublicController::class, 'currentIssue'])->name('current-issue');

Route::get('/guidelines', function () {
    return Inertia::render('Guidelines');
})->name('guidelines');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/publication-ethics', function () {
    return Inertia::render('PublicationEthics');
})->name('publication-ethics');

Route::get('/downloads', function () {
    return Inertia::render('Downloads');
})->name('downloads');

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

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

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/editors', [\App\Http\Controllers\EditorManagementController::class, 'index'])->name('admin.editors.index');
    Route::post('/admin/editors', [\App\Http\Controllers\EditorManagementController::class, 'store'])->name('admin.editors.store');
    Route::post('/admin/editors/{editor}', [\App\Http\Controllers\EditorManagementController::class, 'update'])->name('admin.editors.update'); // Using POST for multipart/form-data compatibility
    Route::delete('/admin/editors/{editor}', [\App\Http\Controllers\EditorManagementController::class, 'destroy'])->name('admin.editors.destroy');
    Route::post('/admin/editors/reorder', [\App\Http\Controllers\EditorManagementController::class, 'updateOrder'])->name('admin.editors.reorder');
});

Route::middleware(['auth', 'verified', EditorMiddleware::class])->group(function () {
    Route::get('/editor/back-issue-entry', [BackIssueController::class, 'create'])->name('backIssues.create');
    Route::post('/editor/back-issue-entry', [BackIssueController::class, 'store'])->name('backIssues.store');
    Route::get('/editor/back-issue-entry/{id}/edit', [BackIssueController::class, 'edit'])->name('backIssues.edit');
    Route::post('/editor/back-issue-entry/{id}', [BackIssueController::class, 'update'])->name('backIssues.update');
    Route::delete('/editor/back-issue-entry/{id}', [BackIssueController::class, 'destroy'])->name('backIssues.destroy');

    // DOI Management
    Route::post('/doi/assign/{paper}', [\App\Http\Controllers\DoiController::class, 'assign'])->name('doi.assign');
    Route::get('/doi/xml/{paper}', [\App\Http\Controllers\DoiController::class, 'downloadXml'])->name('doi.xml');
});

Route::get('/archive', [BackIssueController::class, 'index'])->name('backIssues.index');

Route::get('/archive/papers/{paper}', [BackIssueController::class, 'show'])->name('viewPaper');
Route::get('/article/{slug}', [BackIssueController::class, 'showBySlug'])->name('article.show');
Route::get('/archive/papers/{id}/download-pdf', [BackIssueController::class, 'downloadPdfFile'])->name('archive.papers.download.pdf');

Route::get('/reviewer/accept/{reviewer_id}/{paper_id}', [ReviewerController::class, 'acceptReviewerState'])->name('reviewer.accept');
Route::get('/reviewer/decline/{reviewer_id}/{paper_id}', [ReviewerController::class, 'declineReviewerState'])->name('reviewer.decline');

require __DIR__ . '/auth.php';
