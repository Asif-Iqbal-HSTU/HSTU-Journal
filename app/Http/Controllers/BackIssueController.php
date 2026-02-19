<?php

namespace App\Http\Controllers;

use App\Models\Connectedreviewer;
use App\Models\Paper;
use App\Models\Author;
use App\Models\Coauthor;
use App\Models\Reviewer;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BackIssueController extends Controller
{
    public function index(Request $request)
    {
        // Get filters from query parameters
        $volume = $request->query('volume');
        $year = $request->query('year');

        $query = Paper::query()
            ->where('is_published', 1) // Assuming 3 = Published/Accepted
            ->orderBy('published_at', 'desc')
            ->orderByRaw('CAST(serial AS UNSIGNED) ASC')
            ->with(['author.user', 'coauthors']); // eager load authors

        if ($volume) {
            $query->where('volume', $volume);
        }

        if ($year) {
            $query->whereYear('published_at', $year);
        }

        $papers = $query->paginate(12)->withQueryString(); // Pagination, 12 per page

        // Get distinct volumes and years for filter dropdowns
        $volumes = Paper::select('volume')->distinct()->orderBy('volume', 'desc')->pluck('volume');
        $years = Paper::selectRaw('YEAR(published_at) as year')->distinct()->orderByDesc('year')->pluck('year');

        return Inertia::render('BackIssues/Index', [
            'backIssues' => $papers,
            'volumes' => $volumes,
            'years' => $years,
            'filters' => [
                'volume' => $volume,
                'year' => $year,
            ]
        ]);
    }

    public function create()
    {
        $papers = Paper::where('type', 'Back Issue')
            ->orderBy('published_at', 'desc')
            ->orderByRaw('CAST(serial AS UNSIGNED) ASC')
            ->with(['author.user', 'coauthors'])
            ->get();

        return inertia('Editor/BackIssueEntry', [
            'papers' => $papers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'abstract' => 'required',
            'keywords' => 'required',
            'pdfFile' => 'required|file|mimes:pdf',
            'authors' => 'required|array|min:1',
            'volume' => 'required',
            'issue' => 'required',
            'serial' => 'required',
            'published_at' => 'required|date'
        ]);

        $paperID = 'BACK_' . Str::random(8);

        // Store PDF
        /*$pdfPath = $request->file('pdfFile')
            ->storeAs('public/pdf', $paperID . '_' . $request->file('pdfFile')->getClientOriginalName());*/

        $pdfPath = $this->uploadFile($request, $paperID, 'pdfFile', 'public/pdf');

        $docPath = $pdfPath;

        // Create Paper
        $paper = Paper::create([
            'paperID' => $paperID,
            'user_id' => auth()->id(), // uploader
            'type' => 'Back Issue',
            'title' => $request->title,
            'abstract' => $request->abstract,
            'keywords' => $request->keywords,
            'pdfFile' => $pdfPath,
            'docFile' => $docPath, // ✅ added
            'language_option' => 'N/A',
            'comments' => 'Imported from previous issue',
            'is_published' => true,
            'published_at' => $request->published_at,
            'volume' => $request->volume,
            'issue' => $request->issue,
            'serial' => $request->serial,
            'doi' => $request->doi ?? null,
        ]);

        // Generate slug
        $paper->slug = Str::slug($paper->title . '-' . $paper->id);
        $paper->save();

        $status = Status::create([
            'paper_id' => $paper->id,
            'name' => 'Published',
            'comment' => 'From Back Issue',
        ]);

        // First author = main author
        foreach ($request->authors as $index => $author) {

            if ($index == 0) {
                // create dummy user record if not exists
                $user = \App\Models\User::firstOrCreate(
                    ['email' => $author['email']],
                    [
                        'name' => $author['name'],
                        'password' => bcrypt(Str::random(10)),
                        'username' => Str::random(8),
                        'role' => 'author',
                        'affiliation' => $author['affiliation'],
                        'orcid_id' => $author['orcid'] ?? null
                    ]
                );

                Author::create([
                    'paper_id' => $paper->id,
                    'user_id' => $user->id
                ]);
            } else {
                Coauthor::create([
                    'paper_id' => $paper->id,
                    'name' => $author['name'],
                    'email' => $author['email'],
                    'affiliation' => $author['affiliation'],
                    'orcid_id' => $author['orcid'] ?? null
                ]);
            }
        }

        return back()->with('success', 'Back issue article added successfully');
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

    public function show($p_id)
    {
        $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewers.reviewer'])->where('id', $p_id)->first();

        if (!$paper) {
            $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewers.reviewer'])->where('slug', $p_id)->first();
        }

        if (!$paper) {
            abort(404);
        }

        return Inertia::render('Paper/PaperView', [
            'paper' => $paper,
        ]);
    }

    public function showBySlug($slug)
    {
        $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewers.reviewer'])
            ->where('slug', $slug)
            ->first();

        if (!$paper) {
            // Try ID as fallback
            $paper = Paper::with(['status', 'author.user', 'coauthors', 'classifications', 'connectedReviewers.reviewer'])
                ->where('id', $slug)
                ->first();
        }

        if (!$paper) {
            abort(404);
        }

        return Inertia::render('Paper/PaperView', [
            'paper' => $paper,
        ]);
    }
    public function downloadEditableFile($id)
    {
        $paper = Paper::find($id);
        $filePath = $paper?->docFile;

        if (!$paper || !$filePath) {
            return response()->json(['error' => 'no-file'], 404);
        }

        $fullFilePath = storage_path('app/public/public/editable/' . basename($filePath));

        if (!file_exists($fullFilePath)) {
            return response()->json(['error' => 'file-not-found'], 404);
        }

        return response()->download($fullFilePath);
    }
    public function downloadPdfFile($id)
    {
        //dd($id);
        $paper = Paper::find($id);
        $filePath = $paper?->pdfFile;

        if (!$paper || !$filePath) {
            return response()->json(['error' => 'no-file'], 404);
        }

        $fullFilePath = storage_path('app/public/public/pdf/' . basename($filePath));

        if (!file_exists($fullFilePath)) {
            return response()->json(['error' => 'file-not-found'], 404);
        }

        return response()->download($fullFilePath);
    }

    public function edit($id)
    {
        $paper = Paper::with(['author.user', 'coauthors'])->findOrFail($id);

        $papers = Paper::where('type', 'Back Issue')
            ->orderBy('published_at', 'desc')
            ->orderByRaw('CAST(serial AS UNSIGNED) ASC')
            ->with(['author.user', 'coauthors'])
            ->get();

        return inertia('Editor/BackIssueEntry', [
            'paper' => $paper,
            'papers' => $papers,
            'isEditing' => true
        ]);
    }

    public function update(Request $request, $id)
    {
        $paper = Paper::with(['author.user'])->findOrFail($id);

        $request->validate([
            'title' => 'required',
            'abstract' => 'required',
            'keywords' => 'required',
            'volume' => 'required',
            'issue' => 'required',
            'serial' => 'required',
            'published_at' => 'required|date',
            'authors' => 'required|array|min:1',
        ]);

        $data = [
            'title' => $request->title,
            'abstract' => $request->abstract,
            'keywords' => $request->keywords,
            'volume' => $request->volume,
            'issue' => $request->issue,
            'serial' => $request->serial,
            'published_at' => $request->published_at,
            'doi' => $request->doi ?? null,
        ];

        if ($request->hasFile('pdfFile')) {
            $data['pdfFile'] = $this->uploadFile($request, $paper->paperID, 'pdfFile', 'public/pdf');
            $data['docFile'] = $data['pdfFile'];
        }

        $paper->update($data);

        // Update authors
        // This part is tricky if we want to sync. For simplicity, let's delete and recreate Coauthors
        // and update the main author

        foreach ($request->authors as $index => $authorData) {
            if ($index == 0) {
                $user = $paper->author->user;
                $user->update([
                    'name' => $authorData['name'],
                    'email' => $authorData['email'],
                    'affiliation' => $authorData['affiliation'],
                    'orcid_id' => $authorData['orcid'] ?? null,
                ]);
            }
        }

        // Handle Coauthors
        $paper->coauthors()->delete();
        foreach ($request->authors as $index => $authorData) {
            if ($index > 0) {
                Coauthor::create([
                    'paper_id' => $paper->id,
                    'name' => $authorData['name'],
                    'email' => $authorData['email'],
                    'affiliation' => $authorData['affiliation'],
                    'orcid_id' => $authorData['orcid'] ?? null
                ]);
            }
        }

        return redirect()->route('backIssues.create')->with('success', 'Back issue article updated successfully');
    }

    public function destroy($id)
    {
        $paper = Paper::findOrFail($id);

        // Optional: delete files

        $paper->coauthors()->delete();
        $paper->author()->delete();
        $paper->status()->delete();
        $paper->delete();

        return back()->with('success', 'Back issue article deleted successfully');
    }
}
