import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout.jsx';
import dayjs from 'dayjs';

// FontAwesome Icons
import { faFileWord, faFilePdf, faFileArchive, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function PaperPreview() {
    const { paper, reviewers, paperReviewers } = usePage().props;
    const user = usePage().props.auth.user;
    console.log("ajaira");
    console.log(paper.author.user.email);

    const { data, setData, post, processing, errors, reset } = useForm({
        reviewer_id: '',
        paper_id: paper.id,
    });



    // const initialData2 = connectedReviewer
    //     ? {
    //         reviewer_id: connectedReviewer.reviewer.id,
    //         paper_id: paper.id,
    //         reviewerState: '',
    //     }
    //     : {
    //         reviewer_id: '',
    //         paper_id: paper.id,
    //         reviewerState: '',
    //     };

    const initialData2 =
    {
        reviewer_id: '',
        paper_id: paper.id,
        reviewerState: '',
    };

    const { data: data2, setData: setData2, post: post2, processing: processing2, errors: errors2, reset: reset2 } = useForm(initialData2);

    // const initialData3 =
    // {
    //     paper_id: paper.id,
    //     name: '',
    // }

    const initialData3 = {
        paper_id: paper.id,
        name: '',
        comment: '', // New comment field
    };


    const { data: data3, setData: setData3, post: post3, processing: processing3, errors: errors3, reset: reset3 } = useForm(initialData3);


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
            comment: data3.comment, // Include comment in submission
        };
        router.post(route('statusChange'), formData3, {
            onSuccess: () => {
                console.log("Status Changed");
            },
            onError: (errors3) => {
                console.log(errors3);
            }
        });
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
                                                            <div
                                                                className="text-lg text-gray-900 dark:text-white">
                                                                {paper.author ? paper.author.user.email : 'Unknown'}
                                                            </div>

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
                                            <div className="flex space-x-4 mt-4">
                                                {/* Download DOCX */}
                                                {paper.docFile && (
                                                <a
                                                    href={`/papers/${paper.id}/download-docx`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Download DOCX"
                                                >
                                                    <FontAwesomeIcon icon={faFileWord} size="2x" />
                                                </a>
                                                )}

                                                {/* Download PDF */}
                                                {paper.pdfFile && (
                                                <a
                                                    href={`/papers/${paper.id}/download-pdf`}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Download PDF"
                                                >
                                                    <FontAwesomeIcon icon={faFilePdf} size="2x" />
                                                </a>
                                                )}

                                                {/* Download ZIP */}
                                                {paper.pdfFile && (
                                                <a
                                                    href={`/papers/${paper.id}/download-zip`}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                    title="Download ZIP"
                                                >
                                                    <FontAwesomeIcon icon={faFileArchive} size="2x" />
                                                </a>
                                                )}
                                            </div>
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
                                            <h2 className="mt-8 text-lg font-semibold text-green-700 dark:text-white">
                                                {/* This paper is distributed to a reviewer. {connectedReviewer.reviewer.name} */}
                                                Reviewer List
                                            </h2>
                                            <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />
                                            {paper.connected_reviewers && paper.connected_reviewers.length > 0 ? (
                                                <div className="text-base text-gray-500 dark:text-gray-400">
                                                    {paper.connected_reviewers.map((c, index) => (
                                                        <>
                                                            <p key={index} className="mt-2 text-md font-semibold text-green-700 dark:text-white">
                                                                {index + 1}. {c.reviewer.name || 'Name not available'}
                                                            </p>
                                                            {c.reviewerState === "Reviewed" ? (
                                                                <>
                                                                    <div>
                                                                        <Link href={`/papers/${paper.id}/review`}>
                                                                            <h2 className="mt-2 text-sm text-grey-700 dark:text-white">
                                                                                {c.reviewer.name} has Reviewed the paper.
                                                                                <FontAwesomeIcon icon={faEye} className="ml-2" />
                                                                            </h2>
                                                                        </Link>
                                                                        <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />

                                                                    </div>

                                                                </>
                                                            ) : (
                                                                <>
                                                                    {c.reviewerState === "Accepted" ? (
                                                                        <>
                                                                            <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white italic">
                                                                                {c.reviewer.name} is reviewing the paper.
                                                                            </h2>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {c.reviewerState === "Declined" ? (
                                                                                <>
                                                                                    <div>
                                                                                        <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">
                                                                                            {c.reviewer.name} has declined
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
                                                    ))}

                                                </div>
                                            ) : (
                                                <p>No reviewers connected.</p>
                                            )}

                                            {paper.connected_reviewers && paper.connected_reviewers.length < 3 ? (
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
                                            ) : (
                                                <></>
                                            )}

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
                                                        <option value="Revision">Minor Revision</option>
                                                        <option value="Revision">Major Revision</option>

                                                    </select>

                                                    <InputError message={errors3.name}
                                                        className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="comment" value="Add a Comment (Optional)" />

                                                    <textarea
                                                        id="comment"
                                                        name="comment"
                                                        value={data3.comment}
                                                        rows="4"
                                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                        onChange={(e) => setData3('comment', e.target.value)}
                                                    ></textarea>

                                                    <InputError message={errors3.comment} className="mt-2" />
                                                </div>

                                                <PrimaryButton className="mt-4" disabled={processing}>
                                                    Submit
                                                </PrimaryButton>
                                            </form>



                                        </div>

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
                                                    <div
                                                        className="text-lg text-gray-900 dark:text-white">
                                                        {paper.author ? paper.author.user.email : 'Unknown'}
                                                    </div>

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
                                    <div className="flex space-x-4 mt-4">
                                        {/* Download DOCX */}
                                        <a
                                            href={`/papers/${paper.id}/download-docx`}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Download DOCX"
                                        >
                                            <FontAwesomeIcon icon={faFileWord} size="2x" />
                                        </a>

                                        {/* Download PDF */}
                                        <a
                                            href={`/papers/${paper.id}/download-pdf`}
                                            className="text-red-600 hover:text-red-800"
                                            title="Download PDF"
                                        >
                                            <FontAwesomeIcon icon={faFilePdf} size="2x" />
                                        </a>

                                        {/* Download ZIP */}
                                        <a
                                            href={`/papers/${paper.id}/download-zip`}
                                            className="text-yellow-600 hover:text-yellow-800"
                                            title="Download ZIP"
                                        >
                                            <FontAwesomeIcon icon={faFileArchive} size="2x" />
                                        </a>
                                    </div>

                                    {user.role === 'reviewer' ? (
                                        <>
                                            {paper.connected_reviewers
                                                .filter(
                                                    (connectedReviewer) =>
                                                        connectedReviewer.reviewer &&
                                                        connectedReviewer.reviewer.email === user.email
                                                ) // Filter for reviewers matching the logged-in user
                                                .map((connectedReviewer) => (
                                                    <div key={connectedReviewer.id} className="p-4 border rounded-lg shadow-sm bg-white mb-4">
                                                        <h3 className="text-lg font-semibold text-gray-800">
                                                            Paper: {paper.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">Author: {paper.author.user.name}</p>
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
                                                                ) : connectedReviewer.reviewerState === "Reviewed" ? (
                                                                    <>
                                                                        <p className="mt-4 text-sm text-green-700 italic underline">
                                                                            You Have Reviewed the Paper
                                                                        </p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="mt-1 text-sm text-red-700 italic underline">
                                                                            You Have Rejected the Paper for Review
                                                                        </p>
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <form
                                                                    className="max-w-full mx-auto m-5"
                                                                    onSubmit={(e) => {
                                                                        e.preventDefault();
                                                                        submitReviewerChoice(connectedReviewer.id, data2.reviewerState);
                                                                    }}
                                                                >
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
                                                    </div>
                                                ))}
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
                                                            <h2 className="mt-8 text-lg font-semibold text-green-700 dark:text-white">
                                                                Reviewer Comment:
                                                            </h2>
                                                            <p>
                                                                {paper.status.comment}
                                                            </p>
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
