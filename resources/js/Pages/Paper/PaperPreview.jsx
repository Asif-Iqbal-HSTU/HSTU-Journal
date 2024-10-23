import {Head, Link, useForm, usePage} from '@inertiajs/react';
import Layout from '@/Layouts/Layout.jsx';
import dayjs from 'dayjs';

// FontAwesome Icons
import { faFileWord, faFilePdf, faFileArchive } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function PaperPreview() {
    const { paper, reviewers, connectedReviewer } = usePage().props;
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        reviewer_id: '',
        paper_id: paper.id,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('connectReviewer'));
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
                                            <div className="flex space-x-4 mt-4">
                                                {/* Download DOCX */}
                                                <a
                                                    href={`/papers/${paper.id}/download-docx`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Download DOCX"
                                                >
                                                    <FontAwesomeIcon icon={faFileWord} size="2x"/>
                                                </a>

                                                {/* Download PDF */}
                                                <a
                                                    href={`/papers/${paper.id}/download-pdf`}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Download PDF"
                                                >
                                                    <FontAwesomeIcon icon={faFilePdf} size="2x"/>
                                                </a>

                                                {/* Download ZIP */}
                                                <a
                                                    href={`/papers/${paper.id}/download-zip`}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                    title="Download ZIP"
                                                >
                                                    <FontAwesomeIcon icon={faFileArchive} size="2x"/>
                                                </a>
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
                                    <div>
                                        <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">
                                            This paper is distributed to a reviewer. {connectedReviewer.reviewer.name}
                                        </h2>
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">
                                            Distribute to a Reviewer
                                        </h2>
                                        <p className="mt-1 text-sm">
                                            Distribute this paper to reviewers for
                                            reviewing.
                                        </p>
                                        <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700"/>
                                        <form className="max-w-full mx-auto m-5" onSubmit={submit}>
                                            <div className="mt-4">
                                                <InputLabel htmlFor="reviewer_id" value="Select Reviewer"/>

                                                <select
                                                    id="reviewer_id"
                                                    name="reviewer_id"
                                                    value={data.reviewer_id}
                                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                    onChange={(e) => setData('reviewer_id', e.target.value)}
                                                >
                                                    <option value="">Select an option</option>
                                                    {reviewers.map(reviewer => (
                                                        <option key={reviewer.id} value={reviewer.id}>
                                                            {reviewer.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.reviewer_id} className="mt-2"/>
                                            </div>

                                            <PrimaryButton className="mt-4" disabled={processing}>
                                                Submit
                                            </PrimaryButton>
                                        </form>
                                    </div>
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
                                    <div className="flex space-x-4 mt-4">
                                        {/* Download DOCX */}
                                        <a
                                            href={`/papers/${paper.id}/download-docx`}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Download DOCX"
                                        >
                                            <FontAwesomeIcon icon={faFileWord} size="2x"/>
                                        </a>

                                        {/* Download PDF */}
                                        <a
                                            href={`/papers/${paper.id}/download-pdf`}
                                            className="text-red-600 hover:text-red-800"
                                            title="Download PDF"
                                        >
                                            <FontAwesomeIcon icon={faFilePdf} size="2x"/>
                                        </a>

                                        {/* Download ZIP */}
                                        <a
                                            href={`/papers/${paper.id}/download-zip`}
                                            className="text-yellow-600 hover:text-yellow-800"
                                            title="Download ZIP"
                                        >
                                            <FontAwesomeIcon icon={faFileArchive} size="2x"/>
                                        </a>
                                    </div>
                                    <Link href={`/reviewerForm/${paper.id}`}>
                                        <PrimaryButton className="mt-5">
                                            Go to review form
                                        </PrimaryButton>
                                    </Link>



                                </article>
                            </div>
                        </main>
                    </div>
                )}
            </div>
        </Layout>
    );
}
