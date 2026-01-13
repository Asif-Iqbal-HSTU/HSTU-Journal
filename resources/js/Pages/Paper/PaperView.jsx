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

export default function PaperView() {
    const { paper, reviewers, paperReviewers } = usePage().props;
    const user = usePage().props.auth.user;
    console.log("ajaira");
    console.log(paper.author.user.email);

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
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="col-span-5">
                        <div
                            className="bg-amber-50 max-w-4xl mx-auto p-6 dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20"
                        >
                            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-amber-50 dark:bg-gray-900 antialiased">
                                <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                                    <article
                                        className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
                                    >
                                        {/*<span
                                                className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                                            >
                                                {paper.status.name}
                                            </span>*/}
                                        <header className="mb-4 lg:mb-6 not-format">
                                            <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-3xl dark:text-white">
                                                {paper.title}
                                            </h1>
                                            <address className="flex items-center mb-6 not-italic">
                                                <div
                                                    className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                    <div>
                                                        <a href="#" rel="author"
                                                           className="text-lg font-bold text-gray-900 dark:text-white"
                                                        >
                                                            Authors:&nbsp;
                                                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                                                                {paper.author ? paper.author.user.name : 'Unknown'}
                                                            </span>
                                                        </a>

                                                        {paper.coauthors && paper.coauthors.length > 0 && (
                                                            <p className="text-base text-gray-500 dark:text-gray-400">
                                                                Co-authors: {paper.coauthors.map((c) => c.name).join(', ')}
                                                            </p>
                                                        )}

                                                        <p className="text-base text-gray-500 dark:text-gray-400">
                                                            <time>Publish date: {dayjs(paper.published_at).format('MMM D, YYYY')}</time>
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
                                            {/*<h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                                {paper.title}
                                            </h1>*/}
                                        </header>

                                        <p className="lead text-justify">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                                Abstract: <br/>
                                                            </span>
                                            {paper.abstract}
                                        </p>

                                        {/* Download buttons for DOCX, PDF, and ZIP */}
                                        <div className="flex space-x-4 mt-4">
                                            {/* Download PDF */}
                                            {paper.pdfFile && (
                                                <a
                                                    href={`/archive/papers/${paper.id}/download-pdf`}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Download PDF"
                                                >
                                                    <FontAwesomeIcon icon={faFilePdf} size="2x" />
                                                </a>
                                            )}
                                        </div>
                                    </article>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
