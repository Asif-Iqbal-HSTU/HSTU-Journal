import Layout from "@/Layouts/Layout.jsx";
import { Head, usePage, router, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faFilePdf, faUserGraduate, faBarcode, faCode } from "@fortawesome/free-solid-svg-icons";

export default function BackIssueEntry({ papers, paper, isEditing = false }) {
    const user = usePage().props.auth.user;

    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [notification, setNotification] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    const [data, setData] = useState({
        title: '',
        abstract: '',
        keywords: '',
        volume: '',
        issue: '',
        serial: '',
        published_at: '',
        doi: '',
        pdfFile: null,
        authors: [
            { name: '', email: '', affiliation: '', orcid: '' }
        ]
    });

    // Auto-generate DOI
    useEffect(() => {
        if (data.volume && data.issue && data.serial) {
            setData(prev => ({
                ...prev,
                doi: `10.66039/${prev.volume}_${prev.issue}_${prev.serial}`
            }));
        }
    }, [data.volume, data.issue, data.serial]);

    // Load paper data if editing
    useEffect(() => {
        if (isEditing && paper) {
            const authors = [];
            // Assuming paper.author.user is the first author
            if (paper.author && paper.author.user) {
                authors.push({
                    name: paper.author.user.name,
                    email: paper.author.user.email,
                    affiliation: paper.author.user.affiliation || '',
                    orcid: paper.author.user.orcid_id || ''
                });
            }
            // Add coauthors
            if (paper.coauthors) {
                paper.coauthors.forEach(ca => {
                    authors.push({
                        name: ca.name,
                        email: ca.email,
                        affiliation: ca.affiliation || '',
                        orcid: ca.orcid_id || ''
                    });
                });
            }

            setData({
                title: paper.title || '',
                abstract: paper.abstract || '',
                keywords: paper.keywords || '',
                volume: paper.volume || '',
                issue: paper.issue || '',
                serial: paper.serial || '',
                published_at: paper.published_at ? paper.published_at.split(' ')[0] : '',
                doi: paper.doi || '',
                pdfFile: null,
                authors: authors.length > 0 ? authors : [{ name: '', email: '', affiliation: '', orcid: '' }]
            });
        }
    }, [isEditing, paper]);

    const addAuthor = () => {
        setData({
            ...data,
            authors: [...data.authors, { name: '', email: '', affiliation: '', orcid: '' }]
        });
    };

    const removeAuthor = (index) => {
        if (data.authors.length > 1) {
            const updated = data.authors.filter((_, i) => i !== index);
            setData({ ...data, authors: updated });
        }
    };

    const updateAuthor = (index, field, value) => {
        const updated = [...data.authors];
        updated[index][field] = value;
        setData({ ...data, authors: updated });
    };

    const submitForm = (e) => {
        e.preventDefault();

        const url = isEditing
            ? route('backIssues.update', paper.id)
            : route('backIssues.store');

        router.post(url, data, {
            forceFormData: true,
            onSuccess: () => {
                setNotification(isEditing ? "Article updated successfully!" : "Back issue article added successfully!");
                setShowModal(true);
                setShowErrorModal(false);

                if (!isEditing) {
                    // Reset form
                    setData({
                        title: '',
                        abstract: '',
                        keywords: '',
                        volume: '',
                        issue: '',
                        serial: '',
                        published_at: '',
                        doi: '',
                        pdfFile: null,
                        authors: [{ name: '', email: '', affiliation: '', orcid: '' }]
                    });
                }
            },
            onError: (errors) => {
                setErrorMessages(Object.values(errors).flat());
                setShowErrorModal(true);
                setShowModal(false);
            }
        });
    };

    const deletePaper = (id) => {
        if (confirm('Are you sure you want to delete this back issue entry?')) {
            router.delete(route('backIssues.destroy', id), {
                onSuccess: () => {
                    setNotification("Entry deleted successfully!");
                    setShowModal(true);
                }
            });
        }
    };

    const assignDoi = (id, hasDoi = false) => {
        if (hasDoi && !confirm('This article already has a DOI. Are you sure you want to reassign it?')) {
            return;
        }

        router.post(route('doi.assign', id), {}, {
            onSuccess: () => {
                setNotification(hasDoi ? "DOI Reassigned Successfully!" : "DOI Assigned Successfully!");
                setShowModal(true);
            },
            preserveScroll: true
        });
    };

    return (
        <Layout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 flex justify-between items-center">
                    <span>{isEditing ? 'Edit Back Issue Article' : 'Back Issue Article Management'}</span>
                    {isEditing && (
                        <Link href={route('backIssues.create')} className="text-sm bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New
                        </Link>
                    )}
                </h2>
            }
        >
            <Head title="Back Issue Management" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">

                    {/* Form Section */}
                    <div className="lg:w-1/2">
                        <div className="bg-white shadow-xl sm:rounded-2xl p-8 border border-green-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={isEditing ? faEdit : faPlus} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {isEditing ? 'Update Metadata' : 'New Article Metadata'}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Fill in the published article details for record keeping.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={submitForm} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Article Title</label>
                                        <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            placeholder="Enter full title of the article"
                                            value={data.title}
                                            onChange={e => setData({ ...data, title: e.target.value })} required />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Abstract</label>
                                        <textarea className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            rows="4"
                                            placeholder="Paste the article abstract here..."
                                            value={data.abstract}
                                            onChange={e => setData({ ...data, abstract: e.target.value })} required />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Keywords</label>
                                        <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            placeholder="Separated by commas (e.g. Science, Technology, Engineering)"
                                            value={data.keywords}
                                            onChange={e => setData({ ...data, keywords: e.target.value })} required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Volume</label>
                                        <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            placeholder="e.g. 4"
                                            value={data.volume}
                                            onChange={e => setData({ ...data, volume: e.target.value })} required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Issue</label>
                                        <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            placeholder="e.g. 2"
                                            value={data.issue}
                                            onChange={e => setData({ ...data, issue: e.target.value })} required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Serial</label>
                                        <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            placeholder="e.g. 1"
                                            value={data.serial}
                                            onChange={e => setData({ ...data, serial: e.target.value })} required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Publication Date</label>
                                        <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            value={data.published_at}
                                            onChange={e => setData({ ...data, published_at: e.target.value })} required />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">DOI (Optional)</label>
                                        <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            placeholder="e.g. 10.1234/baustj.2024.1"
                                            value={data.doi}
                                            onChange={e => setData({ ...data, doi: e.target.value })} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Article PDF {isEditing && '(Leave empty to keep current)'}</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-400 transition-colors">
                                            <div className="space-y-1 text-center">
                                                <FontAwesomeIcon icon={faFilePdf} className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                                                        <span>Upload a file</span>
                                                        <input type="file" className="sr-only" accept="application/pdf"
                                                            onChange={e => setData({ ...data, pdfFile: e.target.files[0] })} />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF up to 10MB</p>
                                            </div>
                                        </div>
                                        {data.pdfFile && <p className="mt-2 text-sm text-green-600 font-medium italic">Selected: {data.pdfFile.name}</p>}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faUserGraduate} className="text-green-600" />
                                            Author Details
                                        </h3>
                                        <button type="button" onClick={addAuthor}
                                            className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full font-bold hover:bg-green-100 transition-colors">
                                            <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Author
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {data.authors.map((author, index) => (
                                            <div key={index} className="relative p-6 bg-gray-50 rounded-2xl border border-gray-200 group">
                                                {index > 0 && (
                                                    <button type="button" onClick={() => removeAuthor(index)}
                                                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                )}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="md:col-span-2">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                                            {index === 0 ? 'Primary Author' : `Contributor #${index + 1}`}
                                                        </p>
                                                    </div>
                                                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                                        placeholder="Full Name"
                                                        value={author.name}
                                                        onChange={e => updateAuthor(index, 'name', e.target.value)} required />
                                                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                                        placeholder="Email Address"
                                                        value={author.email}
                                                        onChange={e => updateAuthor(index, 'email', e.target.value)} required />
                                                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                                        placeholder="Affiliation (Department, University)"
                                                        value={author.affiliation}
                                                        onChange={e => updateAuthor(index, 'affiliation', e.target.value)} required />
                                                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                                        placeholder="ORCID ID (Optional)"
                                                        value={author.orcid}
                                                        onChange={e => updateAuthor(index, 'orcid', e.target.value)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex gap-4">
                                    <button type="submit" className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]">
                                        {isEditing ? 'Update Article' : 'Save & Publish Article'}
                                    </button>
                                    {isEditing && (
                                        <Link href={route('backIssues.create')} className="bg-gray-100 text-gray-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all">
                                            Cancel
                                        </Link>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="lg:w-1/2">
                        <div className="bg-white shadow-xl sm:rounded-2xl overflow-hidden border border-gray-100">
                            <div className="bg-gray-900 p-6">
                                <h3 className="text-white font-bold text-lg">Published Back Issues</h3>
                                <p className="text-gray-400 text-sm">Manage entries previously uploaded to the system</p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Article Info</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Volume/Issue</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">DOI / XML</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {papers && papers.length > 0 ? (
                                            papers.map((p) => (
                                                <tr key={p.id} className="hover:bg-green-50/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-1">{p.title}</span>
                                                            <span className="text-xs text-gray-500 mt-1">
                                                                {p.author?.user?.name || 'Unknown'}
                                                                {p.coauthors?.length > 0 && ` + ${p.coauthors.length} others`}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-gray-900">Vol {p.volume}, Issue {p.issue}, Serial {p.serial}</span>
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase">{new Date(p.published_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-2 items-start">
                                                            {p.doi && (
                                                                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono border border-blue-100 truncate max-w-[140px]" title={p.doi}>
                                                                    {p.doi}
                                                                </span>
                                                            )}

                                                            <div className="flex gap-2">
                                                                {p.doi && (
                                                                    <a href={route('doi.xml', p.id)}
                                                                        className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 hover:text-gray-900 transition-colors flex items-center gap-1 border border-gray-200"
                                                                        target="_blank"
                                                                        title="Download Crossref XML">
                                                                        <FontAwesomeIcon icon={faCode} /> XML
                                                                    </a>
                                                                )}

                                                                <button onClick={() => assignDoi(p.id, !!p.doi)}
                                                                    className={`text-[10px] px-2 py-1 rounded border flex items-center gap-1 font-medium transition-all ${p.doi
                                                                        ? 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100'
                                                                        : 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 hover:shadow-sm'
                                                                        }`}
                                                                    title={p.doi ? "Reassign DOI" : "Assign DOI"}>
                                                                    <FontAwesomeIcon icon={faBarcode} /> {p.doi ? "Reassign" : "Assign"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Link href={route('backIssues.edit', p.id)}
                                                                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                                                <FontAwesomeIcon icon={faEdit} size="xs" />
                                                            </Link>
                                                            <button onClick={() => deletePaper(p.id)}
                                                                className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                                                <FontAwesomeIcon icon={faTrash} size="xs" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-12 text-center text-gray-400 italic">
                                                    No back issue articles found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Success Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                <div className="p-8 text-center bg-white rounded-3xl">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">Success!</h2>
                    <p className="text-gray-600 mb-6">{notification}</p>
                    <button onClick={() => setShowModal(false)}
                        className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
                        Continue
                    </button>
                </div>
            </Modal>

            {/* Error Modal */}
            <Modal show={showErrorModal} onClose={() => setShowErrorModal(false)} maxWidth="md">
                <div className="p-8 text-center bg-white rounded-3xl text-red-600">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Validation Errors</h2>
                    <div className="text-left space-y-2 mb-6">
                        {errorMessages.map((error, index) => (
                            <div key={index} className="flex gap-2 text-sm">
                                <span className="flex-shrink-0 text-red-400 mt-1">•</span>
                                <span className="text-gray-700">{error}</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setShowErrorModal(false)}
                        className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                        Fix Errors
                    </button>
                </div>
            </Modal>

        </Layout>
    );
}
