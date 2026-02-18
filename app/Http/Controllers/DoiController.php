<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use App\Services\DoiService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DoiController extends Controller
{
    protected $doiService;

    public function __construct(DoiService $doiService)
    {
        $this->doiService = $doiService;
    }

    public function assign(Paper $paper)
    {
        if ($paper->doi) {
            // Allow reassignment, but maybe log it?
            // return back()->with('error', 'DOI already assigned.');
        }

        $doi = $this->doiService->generateDoi($paper);
        $paper->update(['doi' => $doi]);

        return back()->with('success', "DOI assigned: {$doi}");
    }

    public function downloadXml(Paper $paper)
    {
        $xmlContent = $this->doiService->generateXml($paper);
        $filename = 'crossref-' . Str::slug($paper->id) . '.xml';

        return response($xmlContent)
            ->header('Content-Type', 'text/xml')
            ->header('Content-Disposition', "attachment; filename=\"{$filename}\"");
    }
}
