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
import BackButton from "@/Components/BackButton.jsx";

export default function PaperPreview() {
    const { paper, reviewers, connectedReviewer } = usePage().props;
    const user = usePage().props.auth.user;

    return (
        <Layout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Reviewer Form
                </h2>
            }
        >
            <Head title="Reviewer Form"/>
            <div className="container mx-auto py-12">
                <div
                    className="bg-amber-50 max-w-4xl mx-auto p-6 dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20"
                >
                    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-amber-50 dark:bg-gray-900 antialiased">
                        <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                            <article
                                className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
                            >
                                <Link href={`/papers/${paper.id}`}>
                                    <BackButton
                                        className="mt-5">
                                        Go to paper
                                    </BackButton>
                                </Link>

                                <header className="mb-4 lg:mb-6 not-format">
                                    <p className="lead text-justify">
                                        Reviewing the paper titled:
                                    </p>
                                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                        {paper.title}
                                    </h1>
                                </header>

                                <Link href={`/reviewerForm/${paper.id}`}>
                                    <PrimaryButton className="mt-5">
                                        Go to review form
                                    </PrimaryButton>
                                </Link>


                            </article>
                        </div>
                    </main>
                </div>
            </div>


        </Layout>
);
}
