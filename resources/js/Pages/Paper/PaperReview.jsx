import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import BackButton from "@/Components/BackButton.jsx";

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const { paper } = usePage().props;
    console.log(paper);
    return (
        <Layout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Review of the Paper
                </h2>
            }
        >
            <Head title="Author Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6">
                            <Link href={`/papers/${paper.id}`}>
                                <BackButton className="mt-5">Go to paper</BackButton>
                            </Link>
                            <h2 className="mb-2 text-gray-900 font-bold text-xl">Paper Review</h2>
                            <p className="text-sm text-gray-900">The following reviews have been added by the reviewers.</p>
                            <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />

                            {/* Dynamic Review Table */}
                            <div className="mt-5 overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b border-r">Criteria</th>
                                            {paper.reviews.map((review) => (
                                                <th
                                                    key={review.id}
                                                    className="px-4 py-2 border-b border-r text-gray-900"
                                                >
                                                    {review.user.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            "overallRecommendation",
                                            "generalComments",
                                            "detailedFeedback",
                                            "criticalAssessment",
                                            "suggestionsForImprovement",
                                            "summaryOfFindings",
                                            "assessmentOfOriginality",
                                            "assessmentOfClarity",
                                            "assessmentOfMethodology",
                                            "assessmentOfResults",
                                            "assessmentOfReferences",
                                            "confidentialCommentsToTheEditor",
                                            "additionalReferencesOrResources",
                                            "completionTimeframe",
                                        ].map((field, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 border-b border-r capitalize">
                                                    {field.replace(/([A-Z])/g, " $1")}
                                                </td>
                                                {paper.reviews.map((review) => (
                                                    <td
                                                        key={review.id}
                                                        className="px-4 py-2 border-b border-r"
                                                    >
                                                        {review[field] || "N/A"}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
