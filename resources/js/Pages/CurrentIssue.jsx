import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';

export default function CurrentIssue({ papers, volume, issue, published_at }) {
    const formattedDate = published_at
        ? new Date(published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Current Issue';

    return (
        <PublicLayout>
            <Head title="Current Issue" />

            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div>
                            {volume && issue ? (
                                <span className="text-primary-600 font-semibold tracking-wide uppercase">
                                    Volume {volume}, Issue {issue}
                                </span>
                            ) : (
                                <span className="text-primary-600 font-semibold tracking-wide uppercase">
                                    No Current Issue Available
                                </span>
                            )}
                            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                {formattedDate}
                            </h1>
                        </div>
                        {papers && papers.length > 0 && (
                            <div className="mt-8 lg:mt-0">
                                <a
                                    href="#"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert("Full issue download coming soon. Please download individual papers for now.");
                                    }}
                                >
                                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                    Download Full Issue
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Articles List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {papers && papers.length > 0 ? (
                    <div className="space-y-8">
                        {papers.map((article) => (
                            <div key={article.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                                            <Link href={route('viewPaper', article.id)}>{article.title}</Link>
                                        </h2>
                                        <p className="text-sm text-gray-600 font-medium mb-4">
                                            {article.author?.user?.name}
                                            {article.coauthors?.map(ca => `, ${ca.name}`)}
                                        </p>
                                        <div className="text-gray-500 mb-6 line-clamp-3 text-justify">
                                            {article.abstract}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 flex flex-col space-y-3">
                                        <a
                                            href={route('archive.papers.download.pdf', article.id)}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faFilePdf} className="mr-2 text-red-500" />
                                            Download PDF
                                        </a>
                                        <Link
                                            href={route('viewPaper', article.id)}
                                            className="inline-flex items-center px-4 py-2 border border-primary-100 shadow-sm text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-dashed border-gray-300 py-20 text-center">
                        <FontAwesomeIcon icon={faFilePdf} className="text-gray-200 text-6xl mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No articles in this issue</h3>
                        <p className="text-gray-500 mt-2">Articles will appear here once they are published.</p>
                        <Link href={route('backIssues.index')} className="mt-6 inline-flex text-primary-600 font-bold hover:underline">
                            Browse Archive
                        </Link>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
