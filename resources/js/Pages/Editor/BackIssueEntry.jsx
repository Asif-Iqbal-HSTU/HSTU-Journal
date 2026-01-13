import Layout from "@/Layouts/Layout.jsx";
import { Head, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal.jsx";

export default function BackIssueEntry() {

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
        published_at: '',
        doi: '',
        pdfFile: null,
        authors: [
            { name:'', email:'', affiliation:'', orcid:'' }
        ]
    });

    const addAuthor = () => {
        setData({
            ...data,
            authors: [...data.authors, { name:'', email:'', affiliation:'', orcid:'' }]
        });
    };

    const updateAuthor = (index, field, value) => {
        const updated = [...data.authors];
        updated[index][field] = value;
        setData({ ...data, authors: updated });
    };

    const submitForm = (e) => {
        e.preventDefault();

        router.post('/editor/back-issue-entry', data, {
            forceFormData: true,

            onSuccess: () => {
                setNotification("Back issue article added successfully!");
                setShowModal(true);
                setShowErrorModal(false);

                // Reset form
                setData({
                    title: '',
                    abstract: '',
                    keywords: '',
                    volume: '',
                    issue: '',
                    published_at: '',
                    doi: '',
                    pdfFile: null,
                    authors: [{ name:'', email:'', affiliation:'', orcid:'' }]
                });
            },

            onError: (errors) => {
                setErrorMessages(Object.values(errors).flat());
                setShowErrorModal(true);
                setShowModal(false);
            }
        });
    };

    return (
        <Layout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Back Issue Article Entry
                </h2>
            }
        >
            <Head title="Back Issue Entry" />

            <div className="py-10">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">

                    <div className="bg-white shadow-md sm:rounded-lg p-6">

                        <h2 className="text-lg font-bold text-gray-900">
                            Enter Published Article Metadata
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Use this form to add already-published articles for DOI registration.
                        </p>

                        <hr className="h-px my-3 bg-green-300 border-0"/>

                        <form onSubmit={submitForm} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <input className="mt-1 input w-full"
                                       value={data.title}
                                       onChange={e => setData({...data,title:e.target.value})}/>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Abstract</label>
                                <textarea className="mt-1 input w-full" rows="4"
                                          value={data.abstract}
                                          onChange={e => setData({...data,abstract:e.target.value})}/>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Keywords</label>
                                <input className="mt-1 input w-full"
                                       value={data.keywords}
                                       onChange={e => setData({...data,keywords:e.target.value})}/>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Volume</label>
                                    <input className="mt-1 input w-full"
                                           value={data.volume}
                                           onChange={e => setData({...data,volume:e.target.value})}/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Issue</label>
                                    <input className="mt-1 input w-full"
                                           value={data.issue}
                                           onChange={e => setData({...data,issue:e.target.value})}/>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Publication Date</label>
                                <input type="date" className="mt-1 input w-full"
                                       value={data.published_at}
                                       onChange={e => setData({...data,published_at:e.target.value})}/>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">DOI (optional)</label>
                                <input className="mt-1 input w-full"
                                       value={data.doi}
                                       onChange={e => setData({...data,doi:e.target.value})}/>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Article PDF</label>
                                <input type="file" accept="application/pdf"
                                       className="mt-1 block"
                                       onChange={e => setData({...data,pdfFile:e.target.files[0]})}/>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Authors</h3>
                                {data.authors.map((author,index)=>(
                                    <div key={index} className="border rounded p-3 mb-3 bg-gray-50 space-y-2">
                                        <input className="input w-full" placeholder="Author Name"
                                               value={author.name}
                                               onChange={e=>updateAuthor(index,'name',e.target.value)}/>
                                        <input className="input w-full" placeholder="Email"
                                               value={author.email}
                                               onChange={e=>updateAuthor(index,'email',e.target.value)}/>
                                        <input className="input w-full" placeholder="Affiliation"
                                               value={author.affiliation}
                                               onChange={e=>updateAuthor(index,'affiliation',e.target.value)}/>
                                        <input className="input w-full" placeholder="ORCID"
                                               value={author.orcid}
                                               onChange={e=>updateAuthor(index,'orcid',e.target.value)}/>
                                    </div>
                                ))}

                                <button type="button"
                                        onClick={addAuthor}
                                        className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                                    + Add Another Author
                                </button>
                            </div>

                            <div className="pt-4">
                                <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
                                    Save Article
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                <div className="p-6 text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-green-600">Success</h2>
                    <p>{notification}</p>
                    <button onClick={() => setShowModal(false)}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
                        Close
                    </button>
                </div>
            </Modal>

            {/* Error Modal */}
            <Modal show={showErrorModal} onClose={() => setShowErrorModal(false)} maxWidth="md">
                <div className="p-6 text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-red-600">Validation Errors</h2>
                    <ul>
                        {errorMessages.map((error,index)=>(
                            <li key={index} className="mb-2 text-red-500">{error}</li>
                        ))}
                    </ul>
                    <button onClick={() => setShowErrorModal(false)}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
                        Close
                    </button>
                </div>
            </Modal>

        </Layout>
    );
}
