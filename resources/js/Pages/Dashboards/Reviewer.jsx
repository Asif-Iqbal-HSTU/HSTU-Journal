import Layout from "@/Layouts/Layout.jsx";
import { Head, usePage } from "@inertiajs/react";
import PaperCard from "@/Components/PaperCard.jsx";

export default function ReviewerDashboard() {
    const user = usePage().props.auth.user;
    const { papers } = usePage().props;
    console.log(papers);
    return (
        <Layout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Reviewer Dashboard
                </h2>
            }
        >
            <Head title="Reviewer Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-2 text-gray-900 font-bold text-xl">
                                Papers to Review
                            </h2>
                            <p className="text-sm text-gray-900">
                                Here is a list of papers You have to check
                            </p>
                            <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />
                            <div className="mt-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">
                                    {papers
                                        .filter(
                                            (paper) => paper.status && paper.status.name === "Approved"
                                        ) // Filter papers with status "Approved"
                                        .filter(
                                            (paper) =>
                                                paper.connected_reviewer &&
                                                paper.connected_reviewer.reviewer &&
                                                paper.connected_reviewer.reviewer.email === user.email
                                        ) // Filter papers where connected reviewer email matches the user's email
                                        .map((paper) => {
                                            const authorName =
                                                paper.author && paper.author.user
                                                    ? paper.author.user.name
                                                    : "Unknown Author";

                                            const reviewerName =
                                                paper.connected_reviewer &&
                                                paper.connected_reviewer.reviewer &&
                                                paper.connected_reviewer.reviewer.email
                                                    ? paper.connected_reviewer.reviewer.email
                                                    : "Unknown";

                                            return (
                                                <PaperCard
                                                    key={paper.id}
                                                    paper={paper}
                                                    paperStatus={paper.status.name}
                                                    reviewer={reviewerName}
                                                />
                                            );
                                        })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
