import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout.jsx';
import dayjs from 'dayjs';
import { faFileWord, faFilePdf, faFileArchive, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useState} from "react";
import Modal from "@/Components/Modal.jsx";
import axios from 'axios';

export default function PaperPreview() {
    const { paper, reviewers, connectedReviewer } = usePage().props;
    const user = usePage().props.auth.user;
    const [noFileModal, setNoFileModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        reviewer_id: '',
        paper_id: paper.id,
    });



    const initialData2 = connectedReviewer
        ? {
            reviewer_id: connectedReviewer.reviewer.id,
            paper_id: paper.id,
            reviewerState: '',
        }
        : {
            reviewer_id: '',
            paper_id: paper.id,
            reviewerState: '',
        };

    const { data: data2, setData: setData2, post: post2, processing: processing2, errors: errors2, reset: reset2 } = useForm(initialData2);

    const initialData3 =
    {
        paper_id: paper.id,
        name: '',
    }

    const { data: data3, setData: setData3, post: post3, processing: processing3, errors: errors3, reset: reset3 } = useForm(initialData3);

    /*const handleDownload = (file, url) => {
        if (!file) {
            setNoFileModal(true);
        } else {
            window.location.href = url;
        }
    };*/

    const handleDownload = (file, url) => {
        if (!file) {
            setNoFileModal(true);
            return;
        }

        axios.head(url)
            .then(() => {
                window.location.href = url;
            })
            .catch(() => {
                setNoFileModal(true);
            });
    };


    const submit = (e) => {
        e.preventDefault();

        post(route('connectReviewer'));
    };

    const submit2 = (e) => {
        e.preventDefault();
        const formData2 = {
            reviewer_id: data2.reviewer_id,
            paper_id: data2.paper_id,
            reviewerState: data2.reviewerState,
        };
        router.post(route('updateReviewerState'), formData2, {
            onSuccess: () => {
                console.log("OK");
            },
            onError: (errors2) => {
                console.log(errors2);
            }
        });

        //post(route('updateReviewerState'));
    };

    const submit3 = (e) => {
        e.preventDefault();
        const formData3 = {
            paper_id: data3.paper_id,
            name: data3.name,
        };
        router.post(route('statusChange'), formData3, {
            onSuccess: () => {
                console.log("status Changed");
            },
            onError: (errors2) => {
                console.log(errors2);
            }
        });

        //post(route('updateReviewerState'));
    };

    return (
        <Layout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Paper Preview
                </h2>
            }
        >
            <Head title="Paper Preview" />

            <div className="container mx-auto py-12">
                {user.role === 'editor' ? (
                    // Render this part only if the user is an editor
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <div className="col-span-3">
                            <div
                                className="bg-amber-50 max-w-4xl mx-auto p-6 dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20"
                            >
                                <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-amber-50 dark:bg-gray-900 antialiased">
                                    <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                                        <article
                                            className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
                                        >
                                            <span
                                                className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                                            >
                                                {paper.status.name}
                                            </span>
                                            <header className="mb-4 lg:mb-6 not-format">
                                                <address className="flex items-center mb-6 not-italic">
                                                    <div
                                                        className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                        <div>
                                                            <a href="#" rel="author"
                                                                className="text-xl font-bold text-gray-900 dark:text-white">
                                                                {paper.author ? paper.author.user.name : 'Unknown'}
                                                            </a>

                                                            {paper.coauthors && paper.coauthors.length > 0 && (
                                                                <p className="text-base text-gray-500 dark:text-gray-400">
                                                                    Co-authors: {paper.coauthors.map((c) => c.name).join(', ')}
                                                                </p>
                                                            )}

                                                            <p className="text-base text-gray-500 dark:text-gray-400">
                                                                <time>{dayjs(paper.created_at).format('MMM D, YYYY')}</time>
                                                            </p>

                                                            {paper.classifications && paper.classifications.length > 0 && (
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                                                    Classifications: <span
                                                                        className="font-thin">{paper.classifications.map((c) => c.name).join(', ')}</span>
                                                                </p>
                                                            )}

                                                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                                                Keywords: {paper.keywords}
                                                            </p>

                                                        </div>
                                                    </div>
                                                </address>
                                                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                                    {paper.title}
                                                </h1>
                                            </header>

                                            <p className="lead text-justify">
                                                {paper.abstract}
                                            </p>

                                            {/* Download buttons for DOCX, PDF, and ZIP */}
                                            {/*<div className="flex space-x-4 mt-4">
                                                 Download DOCX
                                                <a
                                                    href={`/papers/${paper.id}/download-docx`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Download DOCX"
                                                >
                                                    <FontAwesomeIcon icon={faFileWord} size="2x" />
                                                </a>

                                                 Download PDF
                                                <a
                                                    href={`/papers/${paper.id}/download-pdf`}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Download PDF"
                                                >
                                                    <FontAwesomeIcon icon={faFilePdf} size="2x" />
                                                </a>

                                                 Download ZIP
                                                <a
                                                    href={`/papers/${paper.id}/download-zip`}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                    title="Download ZIP"
                                                >
                                                    <FontAwesomeIcon icon={faFileArchive} size="2x" />
                                                </a>
                                            </div>*/}

                                            {/* Download DOCX */}
                                            {paper.docFile && (
                                                <button
                                                    onClick={() => handleDownload(`/papers/${paper.id}/download-docx`)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <FontAwesomeIcon icon={faFileWord} size="2x" />
                                                </button>
                                            )}

                                            {/* Download PDF */}
                                            {paper.pdfFile && (
                                                <button
                                                    onClick={() => handleDownload(`/papers/${paper.id}/download-pdf`)}
                                                    className="text-yellow-300 hover:text-red-800"
                                                >
                                                    <FontAwesomeIcon icon={faFilePdf} size="2x" />
                                                </button>
                                            )}

                                            {/* Download ZIP */}
                                            {paper.zipFile && (
                                                <button
                                                    onClick={() => handleDownload(`/papers/${paper.id}/download-zip`)}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                >
                                                    <FontAwesomeIcon icon={faFileArchive} size="2x" />
                                                </button>
                                            )}

                                            <Modal show={noFileModal} onClose={() => setNoFileModal(false)}>
                                                <div className="p-6 text-center">
                                                    <h2 className="text-xl font-bold">No File Attached</h2>
                                                    <p className="mt-2">There is no file available for download.</p>
                                                </div>
                                            </Modal>

                                        </article>
                                    </div>
                                </main>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div
                                className="bg-amber-50 max-w-4xl mx-auto p-6 dark:bg-gray-800/50
                dark:bg-gradient-to-bl from-gray-700/50 via-transparent
                dark:ring-1 dark:ring-inset dark:ring-white/5
                rounded-lg shadow-2xl shadow-gray-500/20">

                                {/* If paperReviewer is present (i.e., not null), display the reviewer name */}
                                {paper.status.name === "Approved" ? (
                                    <>
                                        <div>
                                            <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">
                                                {/* This paper is distributed to a reviewer. {connectedReviewer.reviewer.name} */}
                                                This paper is distributed to
                                            </h2>
                                            {paper.connected_reviewers && paper.connected_reviewers.length > 0 ? (
                                                <div className="text-base text-gray-500 dark:text-gray-400">
                                                    {paper.connected_reviewers.map((c, index) => (
                                                        <p key={index}>
                                                            Reviewer Name: {c.reviewer.name || 'Name not available'}
                                                        </p>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>No reviewers connected.</p>
                                            )}
                                        </div>
                                        {connectedReviewer.reviewerState === "Reviewed" ? (
                                            <>
                                                <div>
                                                    <Link href={`/papers/${paper.id}/review`}>
                                                        <h2 className="mt-8 text-lg font-semibold text-green-700 dark:text-white">
                                                            {connectedReviewer.reviewer.name} has Reviewed the paper.
                                                            <FontAwesomeIcon icon={faEye} className="ml-2" />
                                                        </h2>
                                                    </Link>
                                                    <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />
                                                    <h2 className="mt-8 text-lg font-semibold text-green-700 dark:text-white">
                                                        Make a Decision
                                                    </h2>
                                                    <form className="max-w-full mx-auto m-5" onSubmit={submit3}>
                                                        <div className="mt-4">
                                                            <InputLabel htmlFor="name"
                                                                value="Select Your Choice" />

                                                            <select
                                                                id="name"
                                                                name="name"
                                                                value={data3.name}
                                                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                                onChange={(e) => setData3('name', e.target.value)}
                                                            >
                                                                <option value="">Select an option</option>
                                                                <option value="Accepted">Accepted</option>
                                                                <option value="Rejected">Rejected</option>
                                                                <option value="Revision">Revision</option>

                                                            </select>

                                                            <InputError message={errors3.name}
                                                                className="mt-2" />
                                                        </div>

                                                        <PrimaryButton className="mt-4" disabled={processing}>
                                                            Submit
                                                        </PrimaryButton>
                                                    </form>
                                                </div>

                                            </>
                                        ) : (
                                            <>
                                                {connectedReviewer.reviewerState === "Accepted" ? (
                                                    <>
                                                        <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white italic">
                                                            {connectedReviewer.reviewer.name} is reviewing the paper.
                                                        </h2>
                                                    </>
                                                ) : (
                                                    <>
                                                        {connectedReviewer.reviewerState === "Declined" ? (
                                                            <>
                                                                <div>
                                                                    <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">
                                                                        {connectedReviewer.reviewer.name} has declined
                                                                        reviewing the paper.
                                                                    </h2>
                                                                    <p className="mt-1 text-sm">
                                                                        Distribute this paper to another reviewers for
                                                                        reviewing.
                                                                    </p>
                                                                    <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />
                                                                    <form className="max-w-full mx-auto m-5"
                                                                        onSubmit={submit}>
                                                                        <div className="mt-4">
                                                                            <InputLabel htmlFor="reviewer_id"
                                                                                value="Select Reviewer" />

                                                                            <select
                                                                                id="reviewer_id"
                                                                                name="reviewer_id"
                                                                                value={data.reviewer_id}
                                                                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                                                onChange={(e) => setData('reviewer_id', e.target.value)}
                                                                            >
                                                                                <option value="">Select an option
                                                                                </option>
                                                                                {reviewers.map(reviewer => (
                                                                                    <option key={reviewer.id}
                                                                                        value={reviewer.id}>
                                                                                        {reviewer.name}
                                                                                    </option>
                                                                                ))}
                                                                            </select>

                                                                            <InputError message={errors.reviewer_id}
                                                                                className="mt-2" />
                                                                        </div>

                                                                        <PrimaryButton className="mt-4"
                                                                            disabled={processing}>
                                                                            Submit
                                                                        </PrimaryButton>
                                                                    </form>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>

                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>

                                ) : (
                                    <>
                                        {paper.status.name === "Accepted" ? (
                                            <>
                                                <h2 className="mt-8 text-lg font-semibold text-green-900 dark:text-white italic">
                                                    You have Accepted the paper
                                                </h2>

                                            </>
                                        ) : (
                                            <>
                                                {paper.status.name === "Rejected" ? (
                                                    <>
                                                        <h2 className="mt-8 text-lg font-semibold text-red-900 dark:text-white italic">
                                                            You have Rejected the paper
                                                        </h2>
                                                    </>
                                                ) : (
                                                    <>
                                                        {paper.status.name === "Revision" ? (
                                                            <>
                                                                <h2 className="mt-8 text-lg font-semibold text-red-900 dark:text-white italic">
                                                                    You have sent the paper to revision
                                                                </h2>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div>
                                                                    <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">
                                                                        Distribute to a Reviewer
                                                                    </h2>
                                                                    <p className="mt-1 text-sm">
                                                                        Distribute this paper to reviewers for
                                                                        reviewing.
                                                                    </p>
                                                                    <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />
                                                                    <form className="max-w-full mx-auto m-5"
                                                                        onSubmit={submit}>
                                                                        <div className="mt-4">
                                                                            <InputLabel htmlFor="reviewer_id"
                                                                                value="Select Reviewer" />

                                                                            <select
                                                                                id="reviewer_id"
                                                                                name="reviewer_id"
                                                                                value={data.reviewer_id}
                                                                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                                                onChange={(e) => setData('reviewer_id', e.target.value)}
                                                                            >
                                                                                <option value="">Select an option
                                                                                </option>
                                                                                {reviewers.map(reviewer => (
                                                                                    <option key={reviewer.id}
                                                                                        value={reviewer.id}>
                                                                                        {reviewer.name}
                                                                                    </option>
                                                                                ))}
                                                                            </select>

                                                                            <InputError message={errors.reviewer_id}
                                                                                className="mt-2" />
                                                                        </div>

                                                                        <PrimaryButton className="mt-4"
                                                                            disabled={processing}>
                                                                            Submit
                                                                        </PrimaryButton>
                                                                    </form>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>

                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Render this part if the user is not an editor
                    <div
                        className="bg-amber-50 max-w-4xl mx-auto p-6 dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20"
                    >
                        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-amber-50 dark:bg-gray-900 antialiased">
                            <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                                <article
                                    className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
                                >
                                    <span
                                        className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                                    >
                                        {paper.status.name}
                                    </span>
                                    <header className="mb-4 lg:mb-6 not-format">
                                        <address className="flex items-center mb-6 not-italic">
                                            <div
                                                className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                <div>
                                                    <a href="#" rel="author"
                                                        className="text-xl font-bold text-gray-900 dark:text-white">
                                                        {paper.author ? paper.author.user.name : 'Unknown'}
                                                    </a>

                                                    {paper.coauthors && paper.coauthors.length > 0 && (
                                                        <p className="text-base text-gray-500 dark:text-gray-400">
                                                            Co-authors: {paper.coauthors.map((c) => c.name).join(', ')}
                                                        </p>
                                                    )}

                                                    <p className="text-base text-gray-500 dark:text-gray-400">
                                                        <time>{dayjs(paper.created_at).format('MMM D, YYYY')}</time>
                                                    </p>

                                                    {paper.classifications && paper.classifications.length > 0 && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                                            Classifications: <span
                                                                className="font-thin">{paper.classifications.map((c) => c.name).join(', ')}</span>
                                                        </p>
                                                    )}

                                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                                        Keywords: {paper.keywords}
                                                    </p>

                                                </div>
                                            </div>
                                        </address>
                                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                            {paper.title}
                                        </h1>
                                    </header>

                                    <p className="lead text-justify">
                                        {paper.abstract}
                                    </p>

                                    {/* Download buttons for DOCX, PDF, and ZIP */}
                                    {paper.docFile && (
                                        <button
                                            onClick={() => handleDownload(`/papers/${paper.id}/download-docx`)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FontAwesomeIcon icon={faFileWord} size="2x" />
                                        </button>
                                    )}

                                    {/* Download PDF */}
                                    {paper.pdfFile && (
                                        <button
                                            onClick={() => handleDownload(`/papers/${paper.id}/download-pdf`)}
                                            className="text-yellow-300 hover:text-red-800"
                                        >
                                            <FontAwesomeIcon icon={faFilePdf} size="2x" />
                                        </button>
                                    )}

                                    {/* Download ZIP */}
                                    {paper.zipFile && (
                                        <button
                                            onClick={() => handleDownload(`/papers/${paper.id}/download-zip`)}
                                            className="text-yellow-600 hover:text-yellow-800"
                                        >
                                            <FontAwesomeIcon icon={faFileArchive} size="2x" />
                                        </button>
                                    )}

                                    <Modal show={noFileModal} onClose={() => setNoFileModal(false)}>
                                        <div className="p-6 text-center">
                                            <h2 className="text-xl font-bold">No File Attached</h2>
                                            <p className="mt-2">There is no file available for download.</p>
                                        </div>
                                    </Modal>

                                    {user.role === 'reviewer' ? (
                                        <>
                                            {connectedReviewer.reviewerState ? (
                                                <>
                                                    {connectedReviewer.reviewerState === "Accepted" ? (
                                                        <>
                                                            <Link href={`/reviewerForm/${paper.id}`}>
                                                                <PrimaryButton className="mt-5">
                                                                    Go to review form
                                                                </PrimaryButton>
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {connectedReviewer.reviewerState === "Reviewed" ? (
                                                                <>
                                                                    <p className="mt-4 text-sm text-green-700 italic underline">
                                                                        You Have Reviewed the paper
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="mt-1 text-sm  text-red-700 italic underline">
                                                                        You Have Rejected the paper to review
                                                                    </p>
                                                                </>
                                                            )}

                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <form className="max-w-full mx-auto m-5" onSubmit={submit2}>
                                                        <div className="mt-4">
                                                            <InputLabel htmlFor="reviewerState" value="Select Your Choice" />

                                                            <select
                                                                id="reviewerState"
                                                                name="reviewerState"
                                                                value={data2.reviewerState}
                                                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                                onChange={(e) => setData2('reviewerState', e.target.value)}
                                                            >
                                                                <option value="">Select an option</option>
                                                                <option value="Accepted">Accept</option>
                                                                <option value="Rejected">Reject</option>

                                                            </select>

                                                            <InputError message={errors2.reviewerState} className="mt-2" />
                                                        </div>

                                                        <PrimaryButton className="mt-4" disabled={processing}>
                                                            Submit
                                                        </PrimaryButton>
                                                    </form>
                                                </>
                                            )}
                                        </>


                                    ) : (
                                        <>
                                            {user.role === "author" ? (
                                                <>
                                                    {paper.status.name === "Revision" ? (
                                                        <>
                                                            <Link href={`/papers/${paper.id}/review`}>
                                                                <h2 className="mt-8 text-lg font-semibold text-green-700 dark:text-white">
                                                                    Your paper is reviewed for revision.
                                                                    <FontAwesomeIcon icon={faEye} className="ml-2" />
                                                                </h2>
                                                            </Link>
                                                            <Link href={`/papers/edit/${paper.id}`}>
                                                                <PrimaryButton className="mt-4">
                                                                    Edit Your Submission
                                                                </PrimaryButton>
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        <>

                                                        </>
                                                    )
                                                    }

                                                </>
                                            ) : (
                                                <>

                                                </>
                                            )}

                                        </>
                                    )
                                    }


                                </article>
                            </div>
                        </main>
                    </div>
                )}
            </div>

        </Layout>
    );
}
