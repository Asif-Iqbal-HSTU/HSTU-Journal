<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use App\Models\Editor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class PublicController extends Controller
{
    public function welcome()
    {
        $latestPapers = Paper::where('is_published', 1)
            ->with(['author.user', 'coauthors'])
            ->orderBy('published_at', 'desc')
            ->orderByRaw('CAST(serial AS UNSIGNED) ASC')
            ->limit(6)
            ->get();

        $editors = Editor::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'latestPapers' => $latestPapers,
            'editors' => $editors,
        ]);
    }

    public function currentIssue()
    {
        // Get the latest volume and issue
        $latestIssue = Paper::where('is_published', 1)
            ->orderBy('published_at', 'desc')
            ->orderBy('volume', 'desc')
            ->orderBy('issue', 'desc')
            ->first();

        $papers = collect();
        $volume = null;
        $issue = null;
        $published_at = null;

        if ($latestIssue) {
            $volume = $latestIssue->volume;
            $issue = $latestIssue->issue;
            $published_at = $latestIssue->published_at;

            $papers = Paper::where('is_published', 1)
                ->where('volume', $volume)
                ->where('issue', $issue)
                ->with(['author.user', 'coauthors'])
                ->orderByRaw('CAST(serial AS UNSIGNED) ASC')
                ->get();
        }

        return Inertia::render('CurrentIssue', [
            'papers' => $papers,
            'volume' => $volume,
            'issue' => $issue,
            'published_at' => $published_at,
        ]);
    }

    public function editorialBoard()
    {
        $editors = Editor::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        // Group by role for the display
        $groupedEditors = $editors->groupBy('role')->map(function ($items, $role) {
            return [
                'role' => $role,
                'members' => $items
            ];
        })->values();

        return Inertia::render('EditorialBoard', [
            'boardMembers' => $groupedEditors
        ]);
    }
}
