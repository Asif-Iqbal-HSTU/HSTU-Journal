<?php

namespace App\Services;

use App\Models\Paper;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DoiService
{
    protected $prefix;
    protected $depositorName;
    protected $depositorEmail;

    public function __construct()
    {
        $this->prefix = config('services.crossref.doi_prefix', '10.66039');
        $this->depositorName = 'Md. Asif Iqbal'; // Technical Contact
        $this->depositorEmail = 'asif.ase@baust.edu.bd';
    }

    public function generateDoi(Paper $paper): string
    {
        // Pattern: Prefix/volume_issue_id
        // Example: 10.66039/4_1_25
        return "{$this->prefix}/{$paper->volume}_{$paper->issue}_{$paper->id}";
    }

    public function generateXml(Paper $paper): string
    {
        $timestamp = time();
        $batchId = "baust-{$paper->id}-{$timestamp}";
        $doi = $paper->doi ?? $this->generateDoi($paper);
        $url = route('article.show', $paper->slug ?? $paper->id);

        $xml = new \SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><doi_batch version="4.4.2" xmlns="http://www.crossref.org/schema/4.4.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.crossref.org/schema/4.4.2 http://www.crossref.org/schemas/crossref4.4.2.xsd"></doi_batch>');

        // Head
        $head = $xml->addChild('head');
        $head->addChild('doi_batch_id', $batchId);
        $head->addChild('timestamp', $timestamp);

        $depositor = $head->addChild('depositor');
        $depositor->addChild('depositor_name', $this->depositorName);
        $depositor->addChild('email_address', $this->depositorEmail);

        $head->addChild('registrant', 'Bangladesh Army University of Science and Technology');

        // Body
        $body = $xml->addChild('body');
        $journal = $body->addChild('journal');

        $journalMeta = $journal->addChild('journal_metadata');
        $journalMeta->addChild('full_title', 'BAUST Journal');
        $journalMeta->addChild('abbrev_title', 'BAUSTJ');
        // $journalMeta->addChild('issn', 'XXXX-XXXX'); // Add ISSN if available

        $journalIssue = $journal->addChild('journal_issue');
        $pubDate = Carbon::parse($paper->published_at);
        $publicationDate = $journalIssue->addChild('publication_date');
        $publicationDate->addAttribute('media_type', 'online');
        $publicationDate->addChild('month', $pubDate->format('m'));
        $publicationDate->addChild('day', $pubDate->format('d'));
        $publicationDate->addChild('year', $pubDate->format('Y'));

        $journalIssue->addChild('journal_volume')->addChild('volume', $paper->volume);
        $journalIssue->addChild('issue', $paper->issue);

        $article = $journal->addChild('journal_article');
        $article->addAttribute('publication_type', 'full_text');

        $titles = $article->addChild('titles');
        $titles->addChild('title', $paper->title);

        $contributors = $article->addChild('contributors');

        // Main Author
        if ($paper->author && $paper->author->user) {
            $person = $contributors->addChild('person_name');
            $person->addAttribute('sequence', 'first');
            $person->addAttribute('contributor_role', 'author');

            $names = explode(' ', $paper->author->user->name);
            $lastName = array_pop($names);
            $firstName = implode(' ', $names);

            $person->addChild('given_name', $firstName ?: $lastName); // Fallback if single name
            $person->addChild('surname', $lastName);
            if ($paper->author->affiliation) {
                $person->addChild('affiliation', $paper->author->affiliation);
            }
        }

        // Coauthors
        if ($paper->coauthors) {
            foreach ($paper->coauthors as $coauthor) {
                $person = $contributors->addChild('person_name');
                $person->addAttribute('sequence', 'additional');
                $person->addAttribute('contributor_role', 'author');

                $names = explode(' ', $coauthor->name);
                $lastName = array_pop($names);
                $firstName = implode(' ', $names);

                $person->addChild('given_name', $firstName ?: $lastName);
                $person->addChild('surname', $lastName);
                if ($coauthor->affiliation) {
                    $person->addChild('affiliation', $coauthor->affiliation);
                }
            }
        }

        $artPubDate = $article->addChild('publication_date');
        $artPubDate->addAttribute('media_type', 'online');
        $artPubDate->addChild('month', $pubDate->format('m'));
        $artPubDate->addChild('day', $pubDate->format('d'));
        $artPubDate->addChild('year', $pubDate->format('Y'));

        $doiData = $article->addChild('doi_data');
        $doiData->addChild('doi', $doi);
        $doiData->addChild('resource', $url);

        return $xml->asXML();
    }
}
