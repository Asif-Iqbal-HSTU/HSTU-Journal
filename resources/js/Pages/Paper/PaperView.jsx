import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faQuoteRight, faCalendarAlt, faUser, faTags, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

export default function PaperView() {
    const { paper } = usePage().props;

    return (
        <PublicLayout>
            <Head title={paper.title} />

            {/* Article Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wide mb-4">
                            <span className="bg-primary-50 px-2 py-1 rounded">Vol {paper.volume}, Issue {paper.issue}</span>
                            <span className="text-gray-300">•</span>
                            <span>Original Research</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                            {paper.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-gray-700">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                <span className="font-medium text-gray-900">{paper.author?.user?.name || 'Unknown'}</span>
                            </div>
                            {paper.coauthors && paper.coauthors.length > 0 && (
                                <>
                                    <span className="text-gray-300">|</span>
                                    {paper.coauthors.map((author, index) => (
                                        <span key={index} className="text-gray-600">
                                            {author.name}
                                        </span>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                Published: {dayjs(paper.published_at).format('MMMM D, YYYY')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12">

                    {/* Left Content Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 border-gray-100">Abstract</h2>
                            <p className="text-gray-700 leading-relaxed text-lg text-justify">
                                {paper.abstract}
                            </p>
                        </div>

                        {paper.keywords && (
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faTags} className="text-primary-500" /> Keywords
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {paper.keywords.split(',').map((keyword, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition">
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {paper.classifications && paper.classifications.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faLayerGroup} className="text-primary-500" /> Classifications
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {paper.classifications.map((c, index) => (
                                        <span key={index} className="border border-gray-200 text-gray-600 px-3 py-1 rounded text-sm">
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
                        <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Access Full Text</h3>
                            {paper.pdfFile ? (
                                <a
                                    href={`/archive/papers/${paper.id}/download-pdf`}
                                    className="flex items-center justify-center gap-2 w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition shadow-sm"
                                >
                                    <FontAwesomeIcon icon={faFilePdf} />
                                    Download PDF
                                </a>
                            ) : (
                                <div className="text-gray-500 italic text-center">PDF Unavailable</div>
                            )}
                        </div>

                        {/* Citation Card */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faQuoteRight} className="text-gray-400" /> Cite this article
                            </h3>
                            <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 font-mono break-words border border-gray-200">
                                {paper.author?.user?.name?.split(' ').pop()}, {paper.author?.user?.name?.charAt(0)}.,
                                {paper.coauthors?.map(c => ` ${c.name.split(' ').pop()}, ${c.name.charAt(0)}.`).join('')} ({dayjs(paper.published_at).format('YYYY')}).
                                {paper.title}. <em>BAUST Journal</em>, {paper.volume}({paper.issue}).
                            </div>
                        </div>

                        {/* Share/Info */}
                        {/* Placeholder for future share buttons or DOI */}
                        {paper.doi && (
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">DOI</h3>
                                <a href={`https://doi.org/${paper.doi}`} className="text-primary-600 hover:underline break-all">
                                    https://doi.org/{paper.doi}
                                </a>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </PublicLayout>
    );
}
