<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Classification;
use App\Models\Coauthor;
use App\Models\Connectedreviewer;
use App\Models\Paper;
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
        return Inertia::render('Paper/NewManuscript');
    }

    public function storePaper(Request $request): RedirectResponse
    {
        $randomPaperID = 'PAPER_' . Str::random(10);

        // Handle file uploads without validation
        $editableFilePath = $this->uploadFile($request, $randomPaperID, 'docFile', 'public/editable');
        $pdfFilePath = $this->uploadFile($request, $randomPaperID, 'pdfFile', 'public/pdf');
        $imageFilePath = $this->uploadFile($request, $randomPaperID, 'zipFile', 'public/imageZip');

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

    public function show($paper)
    {

        // Eager load the author and status for the paper
//        $paper->load(['author.user', 'status']);
        $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewer.reviewer'])->where('id', $paper)->first(); // Eager load 'status', 'author', and 'user'
//        $paper = Paper::where('id', $paper)->first(); // Eager load 'status', 'author', and 'user'
        //dd($paper);
        $reviewers = Reviewer::all();
        $paperReviewer = Connectedreviewer::where('paper_id', $paper)->first();
        return Inertia::render('Paper/PaperPreview', [
            'paper' => $paper,
            'reviewers' => $reviewers,
            'connectedReviewer' => $paper->connectedReviewer,
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

    public function abcd(): Response
    {
        $coauthors = Paper::find(1)->connectedReviewer()->reviewer_id;
        // Display a success toast with no title
        //flash()->success('Operation completed successfully.');
        dd($coauthors);
        //return Inertia::render('Paper/NewManuscript');
    }
}
