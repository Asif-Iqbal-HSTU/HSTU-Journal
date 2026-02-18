import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faQuoteRight, faCalendarAlt, faUser, faTags, faLayerGroup, faFingerprint, faChevronDown, faChevronUp, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function PaperView() {
    const { paper } = usePage().props;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (!paper) return null;

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pdfUrl = `${origin}/archive/papers/${paper.id}/download-pdf`;

    const [citationFormat, setCitationFormat] = useState('APA');
    const [isCitationMenuOpen, setIsCitationMenuOpen] = useState(true);

    const citationStyles = [
        'ACM', 'ACS', 'APA', 'ABNT', 'Chicago', 'Harvard', 'IEEE', 'MLA', 'Turabian', 'Vancouver'
    ];

    const getFormattedCitation = (style) => {
        const title = paper.title || '';
        const year = dayjs(paper.published_at).format('YYYY');
        const month = dayjs(paper.published_at).format('MMM');
        const day = dayjs(paper.published_at).format('D');
        const journal = "BAUST Journal";
        const vol = paper.volume || '';
        const issue = paper.issue || '';
        const doiUrl = paper.doi ? `https://doi.org/${paper.doi}` : '';
        const doi = paper.doi || '';

        // Helper to get authors
        const getAuthorsHelper = (type) => {
            let names = [];
            if (paper.author?.user?.name) names.push(paper.author.user.name);
            if (paper.coauthors) paper.coauthors.forEach(c => names.push(c.name));

            return names.map(n => {
                const parts = n.trim().split(' ');
                const last = parts.length > 1 ? parts.pop() : parts[0];
                const first = parts.length > 1 ? parts.join(' ') : '';

                if (type === 'last_first_initial') {
                    return `${last}, ${first ? first.charAt(0) + '.' : ''}`;
                } else if (type === 'last_first') {
                    return `${last}, ${first}`;
                } else if (type === 'first_initial_last') {
                    return `${first ? first.charAt(0) + '.' : ''} ${last}`;
                } else if (type === 'all_caps') {
                    return `${last.toUpperCase()}, ${first ? first.charAt(0) + '.' : ''}`;
                }
                return n; // normal
            });
        };

        const authorsLFI = getAuthorsHelper('last_first_initial'); // Doe, J.
        const authorsLF = getAuthorsHelper('last_first'); // Doe, John
        const authorsFIL = getAuthorsHelper('first_initial_last'); // J. Doe
        const authorsCaps = getAuthorsHelper('all_caps'); // DOE, J.

        switch (style) {
            case 'APA':
                return `${authorsLFI.join(', & ')} (${year}). ${title}. ${journal}, ${vol}(${issue}). ${doiUrl}`;
            case 'MLA':
                return `${authorsLF.join(', ')}. "${title}." ${journal}, vol. ${vol}, no. ${issue}, ${year}${doiUrl ? `, ${doiUrl}` : ''}.`;
            case 'Chicago':
                return `${authorsLF.join(', and ')}. "${title}." ${journal} ${vol}, no. ${issue} (${year}).${doiUrl ? ` ${doiUrl}` : ''}`;
            case 'Harvard':
                return `${authorsLFI.join(', ')} (${year}) '${title}', ${journal}, ${vol}(${issue}). Available at: ${doiUrl}`;
            case 'IEEE':
                return `${authorsFIL.join(', ')}, "${title}," ${journal}, vol. ${vol}, no. ${issue}, ${month} ${year}.`;
            case 'ACM':
                return `${authorsFIL.join(', ')}. ${year}. ${title}. ${journal} ${vol}, ${issue} (${month} ${year}). DOI:${doiUrl}`;
            case 'ACS':
                return `${authorsLFI.join('; ')} ${title}. ${journal} ${year}, ${vol} (${issue}).`;
            case 'ABNT':
                return `${authorsCaps.join('; ')}. ${title}. ${journal}, v. ${vol}, n. ${issue}, ${year}.`;
            case 'Turabian':
                return `${authorsLF.join(', ')}. "${title}." ${journal} ${vol}, no. ${issue} (${year}).`;
            case 'Vancouver':
                return `${authorsLFI.map(a => a.replace(',', '')).join(', ')}. ${title}. ${journal}. ${year} ${month};${vol}(${issue}).`;
            default:
                return `${authorsLFI.join(', & ')} (${year}). ${title}. ${journal}, ${vol}(${issue}). ${doiUrl}`;
        }
    };

    const downloadCitation = (format) => {
        let content = '';
        const filename = `citation-${paper.slug || paper.id}.${format === 'bibtex' ? 'bib' : 'ris'}`;

        if (format === 'bibtex') {
            const authorsBib = getAuthorsHelper('normal').join(' and ');
            content = `@article{${paper.slug || paper.id},
  title={${paper.title}},
  author={${authorsBib}},
  journal={BAUST Journal},
  volume={${paper.volume}},
  number={${paper.issue}},
  year={${dayjs(paper.published_at).format('YYYY')}},
  month={${dayjs(paper.published_at).format('MMM')}},
  doi={${paper.doi || ''}}
}`;
        } else {
            // RIS
            content = `TY  - JOUR
TI  - ${paper.title}
${getAuthorsHelper('normal').map(a => `AU  - ${a}`).join('\n')}
JO  - BAUST Journal
VL  - ${paper.volume}
IS  - ${paper.issue}
PY  - ${dayjs(paper.published_at).format('YYYY')}
DO  - ${paper.doi || ''}
ER  -`;
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`${paper.title || 'Paper'} | BAUST Journal`}</title>
                {paper.abstract ? <meta name="description" content={paper.abstract.substring(0, 160)} /> : null}

                {/* Highwire Press tags */}
                <meta name="citation_title" content={paper.title || ''} />
                {paper.author?.user?.name ? <meta name="citation_author" content={paper.author.user.name} /> : null}
                {paper.coauthors && paper.coauthors.length > 0 ? paper.coauthors.map((ca, idx) => (
                    <meta key={`ca-${idx}`} name="citation_author" content={ca.name} />
                )) : null}
                {paper.published_at ? <meta name="citation_publication_date" content={dayjs(paper.published_at).format('YYYY/MM/DD')} /> : null}
                <meta name="citation_journal_title" content="BAUST Journal" />
                {paper.volume ? <meta name="citation_volume" content={paper.volume} /> : null}
                {paper.issue ? <meta name="citation_issue" content={paper.issue} /> : null}
                <meta name="citation_pdf_url" content={pdfUrl} />
                <meta name="citation_abstract_html_url" content={currentUrl} />
                {paper.doi ? <meta name="citation_doi" content={paper.doi} /> : null}

                {/* Dublin Core tags */}
                <meta name="DC.title" content={paper.title || ''} />
                {paper.author?.user?.name ? <meta name="DC.creator" content={paper.author.user.name} /> : null}
                {paper.published_at ? <meta name="DC.issued" content={dayjs(paper.published_at).format('YYYY-MM-DD')} /> : null}
                <meta name="DC.publisher" content="Bangladesh Army University of Science and Technology (BAUST)" />
                {paper.abstract ? <meta name="DC.description" content={paper.abstract} /> : null}
                {paper.doi ? <meta name="DC.identifier" content={paper.doi} /> : null}
            </Head>

            {/* Article Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wide mb-4">
                            <span className="bg-primary-50 px-2 py-1 rounded">Vol {paper.volume}, Issue {paper.issue}</span>
                            <span className="text-gray-300">•</span>
                            <span>Original Research</span>
                            {paper.doi && (
                                <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-accent font-bold flex items-center gap-1">
                                        <FontAwesomeIcon icon={faFingerprint} className="text-[10px]" />
                                        DOI: {paper.doi}
                                    </span>
                                </>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                            {paper.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-gray-700">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                <span className="font-medium text-gray-900 underline decoration-primary-200">{paper.author?.user?.name || 'Unknown'}</span>
                            </div>
                            {paper.coauthors && paper.coauthors.length > 0 && (
                                <>
                                    {paper.coauthors.map((author, index) => (
                                        <span key={index} className="text-gray-600 before:content-['|'] before:mr-4 before:text-gray-300">
                                            {author.name}
                                        </span>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-400" />
                                Published: <span className="text-gray-900 ml-1">{dayjs(paper.published_at).format('MMMM D, YYYY')}</span>
                            </div>
                            {paper.doi && (
                                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 text-amber-800">
                                    <FontAwesomeIcon icon={faFingerprint} />
                                    DOI: <a href={`https://doi.org/${paper.doi}`} className="hover:underline ml-1 font-mono">{paper.doi}</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12">

                    {/* Left Content Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 border-gray-100 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                                Abstract
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg text-justify italic">
                                {paper.abstract}
                            </p>
                        </div>

                        {paper.keywords && (
                            <div className="mb-10">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faTags} className="text-primary-500" />
                                    Article Keywords
                                </h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {(typeof paper.keywords === 'string' ? paper.keywords.split(/[,;]\s*|\s{2,}/) : []).map((keyword, index) => {
                                        const trimmed = keyword.trim();
                                        if (!trimmed) return null;
                                        return (
                                            <span
                                                key={index}
                                                className="bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-xs font-semibold hover:border-primary-300 hover:text-primary-600 hover:shadow-md transition-all cursor-default"
                                            >
                                                {trimmed}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {paper.classifications && paper.classifications.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faLayerGroup} className="text-primary-500" />
                                    Academic Classifications
                                </h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {paper.classifications.map((c, index) => (
                                        <span
                                            key={index}
                                            className="bg-primary-50 text-primary-700 px-4 py-2 rounded-xl border border-primary-100 text-xs font-semibold shadow-sm hover:bg-primary-100 transition-all cursor-default"
                                        >
                                            {c.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar Column */}
                    <aside className="lg:col-span-1 space-y-8 mt-8 lg:mt-0">
                        {/* Download Card */}
                        <div className="bg-primary-900 rounded-2xl p-6 shadow-xl border border-primary-800 text-white">
                            <h3 className="text-lg font-bold mb-4">Access Full Text</h3>
                            {paper.pdfFile ? (
                                <a
                                    href={`/archive/papers/${paper.id}/download-pdf`}
                                    className="flex items-center justify-center gap-2 w-full bg-white text-primary-900 font-bold py-4 px-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg active:scale-95 group"
                                >
                                    <FontAwesomeIcon icon={faFilePdf} className="text-red-600 group-hover:scale-110 transition-transform" />
                                    Download PDF
                                </a>
                            ) : (
                                <div className="bg-primary-800/50 text-primary-200 italic text-center py-4 rounded-xl border border-primary-700/50">PDF Unavailable</div>
                            )}
                            <p className="text-[10px] text-primary-300 mt-4 text-center uppercase tracking-widest font-semibold">Open Access Article</p>
                        </div>

                        {/* Citation Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faQuoteRight} className="text-primary-500" /> How to Cite
                            </h3>

                            <div className="bg-gray-50 p-4 rounded-t-xl text-xs text-gray-700 leading-relaxed break-words border border-gray-200 font-serif min-h-[80px]">
                                {getFormattedCitation(citationFormat)}
                            </div>

                            <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden">
                                <button
                                    onClick={() => setIsCitationMenuOpen(!isCitationMenuOpen)}
                                    className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    <span>More Citation Formats</span>
                                    <FontAwesomeIcon icon={isCitationMenuOpen ? faChevronUp : faChevronDown} />
                                </button>

                                {isCitationMenuOpen && (
                                    <div className="bg-white max-h-48 overflow-y-auto custom-scrollbar">
                                        {citationStyles.map(style => (
                                            <button
                                                key={style}
                                                onClick={() => setCitationFormat(style)}
                                                className={`w-full text-left px-4 py-2 text-xs border-b border-gray-100 last:border-0 hover:bg-primary-50 hover:text-primary-700 transition-colors ${citationFormat === style ? 'bg-primary-50 text-primary-700 font-bold' : 'text-gray-600'}`}
                                            >
                                                {style}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Download Citation</h4>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => downloadCitation('ris')}
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all shadow-sm"
                                    >
                                        <FontAwesomeIcon icon={faDownload} /> Endnote/RIS
                                    </button>
                                    <button
                                        onClick={() => downloadCitation('bibtex')}
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all shadow-sm"
                                    >
                                        <FontAwesomeIcon icon={faDownload} /> BibTeX
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Journal Info */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Journal Information</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Journal</span>
                                    <span className="font-bold text-gray-900">BAUST Journal</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">ISSN (Print)</span>
                                    <span className="font-bold text-gray-900">2521-5256</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Publisher</span>
                                    <span className="font-bold text-gray-900 text-right">BAUST</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </PublicLayout>
    );
}
