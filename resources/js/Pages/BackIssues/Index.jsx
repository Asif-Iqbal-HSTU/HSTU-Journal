import {Head, Link, useForm, usePage} from '@inertiajs/react';
import Layout from '@/Layouts/Layout.jsx';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileWord, faFileArchive } from '@fortawesome/free-solid-svg-icons';

export default function BackIssuesIndex({ backIssues, volumes, years, filters }) {
    const user = usePage().props.auth.user;
    const { data, setData, get } = useForm({
        volume: filters.volume || '',
        year: filters.year || '',
    });

    const handleFilterChange = (e) => {
        setData(e.target.name, e.target.value);
        get(route('backIssues.index'), { preserveState: true, data: { ...data, [e.target.name]: e.target.value } });
    };

    return (
        <Layout
            user={user}
            header={
            <h2 className="text-xl font-semibold text-gray-800">
                Back Issues Archive
            </h2>
        }
        >
            <Head title="Back Issues Archive" />

            {/* Filters */}
            <div className="container mx-auto px-4 py-6 flex flex-wrap gap-4 items-center">
                <div>
                    <label className="text-gray-700 font-medium mr-2">Volume:</label>
                    <select name="volume" value={data.volume} onChange={handleFilterChange} className="border rounded px-2 py-1">
                        <option value="">All</option>
                        {volumes.map(v => <option key={v} value={v}>Vol {v}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-gray-700 font-medium mr-2">Year:</label>
                    <select name="year" value={data.year} onChange={handleFilterChange} className="border rounded px-2 py-1">
                        <option value="">All</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
            </div>

            {/* Paper Grid */}
            <div className="container mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {backIssues.data.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">No papers found.</p>
                )}

                {backIssues.data.map((paper) => (
                    <div key={paper.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col">
                        <div className="mb-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                                Vol {paper.volume}, Issue {paper.issue}
                            </span>
                            <span className="ml-2 bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                                {dayjs(paper.published_at).format('YYYY-MM-DD')}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{paper.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            {paper.author?.user?.name || 'Unknown'}
                            {paper.coauthors && paper.coauthors.length > 0 && (
                                <> , {paper.coauthors.map(c => c.name).join(', ')}</>
                            )}
                        </p>
                        <p className="text-sm text-gray-500 flex-1 line-clamp-3">Abstract: {paper.abstract}</p>

                        {/*<div className="flex space-x-3 mt-3">
                            {paper.pdfFile && (
                                <a href={`/papers/${paper.id}/download-pdf`} className="text-red-600 hover:text-red-800">
                                    <FontAwesomeIcon icon={faFilePdf} size="lg" />
                                </a>
                            )}
                            {paper.docFile && (
                                <a href={`/papers/${paper.id}/download-docx`} className="text-blue-600 hover:text-blue-800">
                                    <FontAwesomeIcon icon={faFileWord} size="lg" />
                                </a>
                            )}
                            {paper.pdfFile && (
                                <a href={`/papers/${paper.id}/download-zip`} className="text-yellow-600 hover:text-yellow-800">
                                    <FontAwesomeIcon icon={faFileArchive} size="lg" />
                                </a>
                            )}
                        </div>*/}

                        <Link href={`/archive/papers/${paper.id}`} className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm">
                            View Full Paper →
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="container mx-auto px-4 py-4 flex justify-center">
                {backIssues.links && (
                    <div className="space-x-2">
                        {backIssues.links.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => link.url && get(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
