import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faQuoteRight, faCalendarAlt, faUser, faTags, faLayerGroup, faFingerprint } from '@fortawesome/free-solid-svg-icons';

export default function PaperView() {
    const { paper } = usePage().props;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (!paper) return null;

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pdfUrl = `${origin}/archive/papers/${paper.id}/download-pdf`;

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
                                <FontAwesomeIcon icon={faQuoteRight} className="text-primary-500" /> Cite this article
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-600 leading-relaxed break-words border border-gray-100 font-serif">
                                {paper.author?.user?.name?.split(' ').pop()}, {paper.author?.user?.name?.charAt(0)}.,
                                {paper.coauthors?.map(c => ` ${c.name.split(' ').pop()}, ${c.name.charAt(0)}.`).join('')} ({dayjs(paper.published_at).format('YYYY')}).
                                "{paper.title}". <em>BAUST Journal</em>, Vol. {paper.volume}, Issue {paper.issue}.
                                {paper.doi && ` https://doi.org/${paper.doi}`}
                            </div>
                            <button
                                onClick={() => {
                                    const text = `${paper.author?.user?.name?.split(' ').pop()}, ${paper.author?.user?.name?.charAt(0)}., ${paper.coauthors?.map(c => ` ${c.name.split(' ').pop()}, ${c.name.charAt(0)}.`).join('')} (${dayjs(paper.published_at).format('YYYY')}). "${paper.title}". BAUST Journal, ${paper.volume}(${paper.issue}).`;
                                    navigator.clipboard.writeText(text);
                                    alert('Citation copied to clipboard!');
                                }}
                                className="mt-3 text-primary-600 text-xs font-bold hover:text-primary-700 transition"
                            >
                                Copy Citation
                            </button>
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
