import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import PaperPreview from "@/Pages/Paper/PaperPreview.jsx";
import PaperCard from "@/Components/PaperCard.jsx";

// const user = usePage().props.auth.user;
export default function Dashboard() {

    const user = usePage().props.auth.user;
    const { papers } = usePage().props;
    return (
        <Layout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Author Dashboard" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-900 font-bold text-xl">Your papers</h2>
                            <p className="text-sm text-gray-900">Here is a list of papers You have submitted
                                till now</p>
                            <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />
                            <div className="mt-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">
                                    {papers.map((paper) => {
                                        const st = paper.status ? paper.status.name : 'Unknown'; // Check if status exists
                                        const authorName = paper.author && paper.author.user ? paper.author.user.name : 'Unknown Author'; // Check if author and user exist

                                        return (
                                            <PaperCard
                                                key={paper.id}
                                                paper={paper}
                                                paperStatus={st}
                                                author={authorName}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg mt-5">
                        <div className="p-6 text-gray-900">
                            Author, You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
