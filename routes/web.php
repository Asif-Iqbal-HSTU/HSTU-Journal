<?php

use App\Http\Controllers\PaperController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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

Route::get('/dashboard/author', [\App\Http\Controllers\DashboardController::class, 'gotoAuthorDashboard'])->middleware(['auth', 'verified'])->name('authorDashboard');
Route::get('/dashboard/editor', [\App\Http\Controllers\DashboardController::class, 'gotoEditorDashboard'])->middleware(['auth', 'verified'])->name('editorDashboard');
Route::get('/dashboard/reviewer', [\App\Http\Controllers\DashboardController::class, 'gotoReviewerDashboard'])->middleware(['auth', 'verified'])->name('reviewerDashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/newManuscript', [PaperController::class, 'newManuscriptPage'])->name('newManuscriptPage');
    Route::post('/paper/store', [PaperController::class, 'storePaper'])->name('storePaper');

    Route::get('/abcd', [PaperController::class, 'abcd'])->name('abcd');
    Route::get('/papers/{paper}', [PaperController::class, 'show'])->name('showPaper');
    // Route for downloading the editable DOCX file
    Route::get('/papers/{id}/download-docx', [PaperController::class, 'downloadEditableFile'])->name('papers.download.docx');

// Route for downloading the PDF file
    Route::get('/papers/{id}/download-pdf', [PaperController::class, 'downloadPdfFile'])->name('papers.download.pdf');

// Route for downloading the ZIP file
    Route::get('/reviewerlist', [ReviewerController::class, 'gotoReviewerPageForAuthor'])->name('gotoReviewerPageForAuthor');
    Route::post('/reviewer', [ReviewerController::class, 'store'])->name('storeReviewer');
    Route::post('/reviewer/connect', [ReviewerController::class, 'connect'])->name('connectReviewer');

    Route::get('/reviewerForm/{paper}', [ReviewerController::class, 'gotoReviewerForm'])->name('gotoReviewerForm');

});

require __DIR__.'/auth.php';
