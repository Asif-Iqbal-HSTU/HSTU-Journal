import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";
import BackButton from "@/Components/BackButton.jsx";

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const { paper } = usePage().props;

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
                                <BackButton
                                    className="mt-5">
                                    Go to paper
                                </BackButton>
                            </Link>
                            <h2 className="mb-2 text-gray-900 font-bold text-xl">Paper Review</h2>
                            <p className="text-sm text-gray-900">The following Review has been added by the Reviewer.</p>
                            <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />

                            {/* Review Table */}
                            <div className="mt-5 overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                    <tr>
                                        <th className="w-1/3 px-4 py-2 border-b border-r">Criteria</th>
                                        <th className="w-2/3 px-4 py-2 border-b">Comments</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Overall Recommendation</td>
                                        <td className="px-4 py-2 border-b">{paper.review.overallRecommendation}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">General Comments</td>
                                        <td className="px-4 py-2 border-b">{paper.review.generalComments}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Detailed Feedback</td>
                                        <td className="px-4 py-2 border-b">{paper.review.detailedFeedback}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Critical Assessment</td>
                                        <td className="px-4 py-2 border-b">{paper.review.criticalAssessment}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Suggestions for Improvement</td>
                                        <td className="px-4 py-2 border-b">{paper.review.suggestionsForImprovement}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Summary of Findings</td>
                                        <td className="px-4 py-2 border-b">{paper.review.summaryOfFindings}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Assessment of Originality</td>
                                        <td className="px-4 py-2 border-b">{paper.review.assessmentOfOriginality}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Assessment of Clarity</td>
                                        <td className="px-4 py-2 border-b">{paper.review.assessmentOfClarity}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Assessment of Methodology</td>
                                        <td className="px-4 py-2 border-b">{paper.review.assessmentOfMethodology}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Assessment of Results</td>
                                        <td className="px-4 py-2 border-b">{paper.review.assessmentOfResults}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Assessment of References</td>
                                        <td className="px-4 py-2 border-b">{paper.review.assessmentOfReferences}</td>
                                    </tr>

                                    {user.role === "editor" ? (
                                        <tr>
                                            <td className="px-4 py-2 border-b border-r text-red-600">Confidential Comments to the Editor</td>
                                            <td className="px-4 py-2 border-b text-red-600">{paper.review.confidentialCommentsToTheEditor}</td>
                                        </tr>
                                    ) : (
                                        <></>
                                    )}

                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Additional References or Resources</td>
                                        <td className="px-4 py-2 border-b">{paper.review.additionalReferencesOrResources || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-r">Completion Timeframe</td>
                                        <td className="px-4 py-2 border-b">{paper.review.completionTimeframe}</td>
                                    </tr>
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
