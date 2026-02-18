import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCalendarAlt, faBook } from '@fortawesome/free-solid-svg-icons';

export default function BackIssuesIndex({ backIssues, volumes, years, filters }) {
    const { data, setData, get } = useForm({
        volume: filters.volume || '',
        year: filters.year || '',
    });

    const handleFilterChange = (e) => {
        setData(e.target.name, e.target.value);
        get(route('backIssues.index'), { preserveState: true, data: { ...data, [e.target.name]: e.target.value } });
    };

    return (
        <PublicLayout>
            <Head title="Archive" />

            {/* Header */}
            <div className="bg-primary-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Archive
                    </h1>
                    <p className="mt-2 text-primary-200">
                        Explore our collection of past volumes and research papers.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:col-span-1 mb-8 lg:mb-0">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faFilter} className="text-primary-600" />
                                Filters
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="volume" className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
                                    <select
                                        id="volume"
                                        name="volume"
                                        value={data.volume}
                                        onChange={handleFilterChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All Volumes</option>
                                        {volumes.map(v => <option key={v} value={v}>Volume {v}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                    <select
                                        id="year"
                                        name="year"
                                        value={data.year}
                                        onChange={handleFilterChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All Years</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Papers Grid */}
                    <div className="lg:col-span-3">
                        {backIssues.data.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                                <FontAwesomeIcon icon={faSearch} className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No papers found</h3>
                                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {backIssues.data.map((paper) => (
                                    <div key={paper.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600">
                                                <span className="bg-primary-50 px-2 py-1 rounded">Vol {paper.volume}, Issue {paper.issue}</span>
                                                <span className="text-gray-400">•</span>
                                                <span className="flex items-center gap-1 text-gray-500">
                                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                                    {dayjs(paper.published_at).format('MMM D, YYYY')}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            <Link href={route('article.show', paper.slug || paper.id)} className="hover:text-primary-600 transition-colors">
                                                {paper.title}
                                            </Link>
                                        </h3>

                                        <p className="text-sm text-gray-700 font-medium mb-3">
                                            {paper.author?.user?.name || 'Unknown'}
                                            {paper.coauthors && paper.coauthors.length > 0 && (
                                                <span className="text-gray-500 font-normal">, {paper.coauthors.map(c => c.name).join(', ')}</span>
                                            )}
                                        </p>

                                        <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                                            {paper.abstract}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                            <Link href={route('article.show', paper.slug || paper.id)} className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center gap-1">
                                                <FontAwesomeIcon icon={faBook} />
                                                Read Article
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {backIssues.links && backIssues.links.length > 3 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex gap-1 overflow-x-auto pb-4">
                                    {backIssues.links.map((link, i) => (
                                        <button
                                            key={i}
                                            onClick={() => link.url && get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${link.active
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
