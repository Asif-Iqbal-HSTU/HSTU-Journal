<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Classification;
use App\Models\Coauthor;
use App\Models\Connectedreviewer;
use App\Models\Paper;
use App\Models\Review;
use App\Models\Reviewer;
use App\Models\Status;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\Types\Integer;

class PaperController extends Controller
{
    public function newManuscriptPage(): Response
    {
        $reviewers = Reviewer::all(); 
        return Inertia::render('Paper/NewManuscript', [
            'reviewers' => $reviewers,
        ]);
    }

    public function storePaper(Request $request): RedirectResponse
    {
        $randomPaperID = 'PAPER_' . Str::random(10);

        // Handle file uploads without validation
        $editableFilePath = $this->uploadFile($request, $randomPaperID, 'docFile', 'public/editable');
        $pdfFilePath = $this->uploadFile($request, $randomPaperID, 'pdfFile', 'public/pdf');
        $imageFilePath = $this->uploadFile($request, $randomPaperID, 'zipFile', 'public/imageZip');

        $request->validate([
            // 'paperID' => 'required',
            // 'user_id' => 'required',
            // 'status_id' => 'required',
            'type' => 'required',
            'language_option' => 'required',
            'comments' => 'required',
            'title' => 'required',
            'abstract' => 'required',
            'keywords' => 'required',
            'funding' => 'required',
            'conflictsOfInterest' => 'required',
            'ethicalStatement' => 'required',
            'consentToPolicies' => 'required',
            'docFile' => 'required',
            'pdfFile' => 'required',
        ]);

        // Create paper
        $paper = Paper::create([
            'paperID' => $randomPaperID,
            'user_id' => $request->user_id,
            'status_id' => 1,
            'type' => $request->type,
            'language_option' => $request->language_option,
            'comments' => $request->comments,
            'title' => $request->title,
            'abstract' => $request->abstract,
            'keywords' => $request->keywords,
            'funding' => $request->funding,
            'conflictsOfInterest' => $request->conflictsOfInterest,
            'ethicalStatement' => $request->ethicalStatement,
            'consentToPolicies' => $request->consentToPolicies,
            'docFile' => $editableFilePath,
            'pdfFile' => $pdfFilePath,
            'zipFile' => $imageFilePath,
        ]);

        $status = Status::create([
            'paper_id' => $paper->id,
            'name' => 'Pending',
        ]);

        $author = Author::create([
            'paper_id' => $paper->id,
            'user_id' => $paper->user_id,
        ]);

        // Handle co-authors directly from the array
        $coAuthors = $request->coAuthors;
        if ($coAuthors) {
            foreach ($coAuthors as $coAuthor) {
                Coauthor::create([
                    'paper_id' => $paper->id,
                    'name' => $coAuthor['name'],
                    'email' => $coAuthor['email'],
                ]);
            }
        }

        // Handle classifications directly from the array
        $classifications = $request->classification;
        if ($classifications) {
            foreach ($classifications as $classification) {
                Classification::create([
                    'paper_id' => $paper->id,
                    'name' => $classification,
                ]);
            }
        }

        //dd($paper);

        flash()->success('Paper Uploaded successfully.');

        return back();
//        return redirect()->intended(route('adb', absolute: false));
    }


    private function uploadFile(Request $request, string $randomPaperID, string $fileKey, string $directory): string
    {
        if ($request->hasFile($fileKey)) {
            $fileName = $randomPaperID . '_' . $request->file($fileKey)->getClientOriginalName();
            $filePath = $request->file($fileKey)->storeAs($directory, $fileName, 'public'); // Explicitly use 'public' disk
            return $filePath;
        }

        return '';  // Return an empty string if no file is uploaded
    }

    public function downloadEditableFile($id)
    {
        $paper = \App\Models\Paper::where('id', $id)->first();
        $filePath = $paper->docFile;

        // Construct the full file path using storage_path
        $fullFilePath = storage_path('app/public/public/editable/' . basename($filePath));

        if (file_exists($fullFilePath)) {
            return response()->download($fullFilePath);
        } else {
            abort(404, 'File not found');
        }
    }

    public function downloadPdfFile($id)
    {
        $paper = \App\Models\Paper::where('id', $id)->first();
        $filePath = $paper->pdfFile;

        // Construct the full file path using storage_path
        $fullFilePath = storage_path('app/public/public/pdf/' . basename($filePath));

        if (file_exists($fullFilePath)) {
            return response()->download($fullFilePath);
        } else {
            abort(404, 'File not found');
        }
    }

    public function downloadZipFile($id)
    {
        $paper = \App\Models\Paper::where('id', $id)->first();
        $filePath = $paper->zipFile;

        // Construct the full file path using storage_path
        $fullFilePath = storage_path('app/public/public/imageZip/' . basename($filePath));

        if (file_exists($fullFilePath)) {
            return response()->download($fullFilePath);
        } else {
            abort(404, 'File not found');
        }
    }


    public function getAllPapers()
    {
        $papers = Paper::all();

        return response()->json(
            [
                'papers' => $papers,
            ],
            201
        );
    }

    public function show($p_id) 
    {

        // Eager load the author and status for the paper
    //    $paper->load(['author.user', 'status']);
        // $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewer.reviewer'])->where('id', $paper)->first(); // Eager load 'status', 'author', and 'user'
        $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewers.reviewer'])->where('id', $p_id)->first(); // Eager load 'status', 'author', and 'user'
//        $paper = Paper::where('id', $paper)->first(); // Eager load 'status', 'author', and 'user'
        //dd($paper);

        $reviewers = Reviewer::all();
        $paperReviewers = Connectedreviewer::where('paper_id', $p_id)->get();
        // $paperReviewers = Connectedreviewer::all();
        return Inertia::render('Paper/PaperPreview2', [
            'paper' => $paper,
            'reviewers' => $reviewers,
            'paperReviewers' => $paperReviewers,
        ]);
    }

//    public function show(Paper $paper)
//    {
//        // Eager load coauthors, author, and status
//        $paper->load(['coauthors', 'author.user', 'status']);
//
//        return Inertia::render('PaperPreview', [
//            'paper' => $paper,
//        ]);
//    }

    public function statusChange(Request $request)
    {
        $status = Status::where('paper_id', $request->paper_id)->first();
        $status->name = $request->name;
        $status->comment = $request->comment;
        $status->save();
        return back();
    }

    public function abcd(): Response
    {
        $coauthors = Paper::find(1)->connectedReviewer()->reviewer_id;
        // Display a success toast with no title
        //flash()->success('Operation completed successfully.');
        dd($coauthors);
        //return Inertia::render('Paper/NewManuscript');
    }

    public function editSubmission($paper): Response
    {
        // $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewer.reviewer'])->where('id', $paper)->first(); // Eager load 'status', 'author', and 'user'
        $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewers'])->where('id', $paper)->first(); // Eager load 'status', 'author', and 'user'

        return Inertia::render('Paper/EditManuscript', [
            'paper' => $paper,
        ]);
    }

    public function updatePaper(Request $request, $paper_id): RedirectResponse
    {
        //dd($request);
        // Find the existing paper by ID
        $paper = Paper::findOrFail($paper_id);

        // Handle file updates if new files are uploaded
        $editableFilePath = $this->uploadFile($request, $paper->paperID, 'docFile', 'public/editable') ?: $paper->docFile;
        $pdfFilePath = $this->uploadFile($request, $paper->paperID, 'pdfFile', 'public/pdf') ?: $paper->pdfFile;
        $imageFilePath = $this->uploadFile($request, $paper->paperID, 'zipFile', 'public/imageZip') ?: $paper->zipFile;

        // Update the paper attributes
        $paper->update([
            'type' => $request->type,
            'language_option' => $request->language_option,
            'comments' => $request->comments,
            'title' => $request->title,
            'abstract' => $request->abstract,
            'keywords' => $request->keywords,
            'funding' => $request->funding,
            'conflictsOfInterest' => $request->conflictsOfInterest,
            'ethicalStatement' => $request->ethicalStatement,
            'consentToPolicies' => $request->consentToPolicies,
            'docFile' => $editableFilePath,
            'pdfFile' => $pdfFilePath,
            'zipFile' => $imageFilePath,
        ]);

        $status = Status::where('paper_id', $paper->id)->first();
        $status->name = "Pending";
        $status->save();

        //$status = Status::where('paper_id', $paper->id)->first();
        //dd($status);
        Connectedreviewer::where('paper_id', $paper->id)->delete();
        Review::where('paper_id', $paper->id)->delete();

        // Update co-authors if provided
        $coAuthors = $request->coAuthors;
        if ($coAuthors) {
            // Delete existing co-authors
            Coauthor::where('paper_id', $paper->id)->delete();

            // Create new co-authors from the provided data
            foreach ($coAuthors as $coAuthor) {
                Coauthor::create([
                    'paper_id' => $paper->id,
                    'name' => $coAuthor['name'],
                    'email' => $coAuthor['email'],
                ]);
            }
        }

        // Update classifications if provided
        $classifications = $request->classification;
        if ($classifications) {
            // Delete existing classifications
            Classification::where('paper_id', $paper->id)->delete();

            // Create new classifications from the provided data
            foreach ($classifications as $classification) {
                Classification::create([
                    'paper_id' => $paper->id,
//                    'name' => $classification,
                    'name' => $classification['name'],
                ]);
            }
        }

        flash()->success('Paper updated successfully.');

        return back();
    }



}
