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
import TextArea from "@/Components/TextArea.jsx";
import Modal from "@/Components/Modal.jsx";
import {useState} from "react";

export default function PaperPreview() {
    const { paper, reviewers, connectedReviewer } = usePage().props;
    const user = usePage().props.auth.user;


    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        paper_id: paper.id,
        overallRecommendation: '',
        generalComments: '',
        detailedFeedback: '',
        criticalAssessment: '',
        suggestionsForImprovement: '',
        summaryOfFindings: '',
        assessmentOfOriginality: '',
        assessmentOfClarity: '',
        assessmentOfMethodology: '',
        assessmentOfResults: '',
        assessmentOfReferences: '',
        confidentialCommentsToTheEditor: '',
        additionalReferencesOrResources: '',
        completionTimeframe: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('storeReview'), {
            onSuccess: () => {
                // Handle success, e.g., show a success notification
                setNotification('Review submitted successfully!');
                setShowModal(true);
            },
            onError: (errors) => {
                // Handle errors, you can log them or show error messages
                console.log('Error:', errors);
            },
        });
    };

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

                                <form className="max-w-full mx-auto m-5" onSubmit={submit}>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Overall Recommendation" />

                                        <TextArea
                                            id="overallRecommendation"
                                            name="overallRecommendation"
                                            value={data.overallRecommendation}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('overallRecommendation', e.target.value)}
                                            placeholder="Write an Overall Recommendation"
                                        />

                                        <InputError message={errors.overallRecommendation} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="General Comments" />

                                        <TextArea
                                            id="generalComments"
                                            name="generalComments"
                                            value={data.generalComments}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('generalComments', e.target.value)}
                                            placeholder="Write General Comments"
                                        />

                                        <InputError message={errors.generalComments} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Detailed Feedback" />

                                        <TextArea
                                            id="detailedFeedback"
                                            name="detailedFeedback"
                                            value={data.detailedFeedback}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('detailedFeedback', e.target.value)}
                                            placeholder="Write Detailed Feedback"
                                        />

                                        <InputError message={errors.detailedFeedback} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Critical Assessment" />

                                        <TextArea
                                            id="criticalAssessment"
                                            name="criticalAssessment"
                                            value={data.criticalAssessment}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('criticalAssessment', e.target.value)}
                                            placeholder="Write Critical Assessment"
                                        />

                                        <InputError message={errors.criticalAssessment} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Suggestions For Improvement" />

                                        <TextArea
                                            id="suggestionsForImprovement"
                                            name="suggestionsForImprovement"
                                            value={data.suggestionsForImprovement}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('suggestionsForImprovement', e.target.value)}
                                            placeholder="Write Suggestions For Improvement"
                                        />

                                        <InputError message={errors.suggestionsForImprovement} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Summary of Findings" />

                                        <TextArea
                                            id="summaryOfFindings"
                                            name="summaryOfFindings"
                                            value={data.summaryOfFindings}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('summaryOfFindings', e.target.value)}
                                            placeholder="Write Summary of Findings"
                                        />

                                        <InputError message={errors.summaryOfFindings} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Assessment of Originality" />

                                        <TextArea
                                            id="assessmentOfOriginality"
                                            name="assessmentOfOriginality"
                                            value={data.assessmentOfOriginality}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('assessmentOfOriginality', e.target.value)}
                                            placeholder="Write Assessment of Originality"
                                        />

                                        <InputError message={errors.assessmentOfOriginality} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Assessment of Clarity" />

                                        <TextArea
                                            id="assessmentOfClarity"
                                            name="assessmentOfClarity"
                                            value={data.assessmentOfClarity}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('assessmentOfClarity', e.target.value)}
                                            placeholder="Write Assessment of Clarity"
                                        />

                                        <InputError message={errors.assessmentOfClarity} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Assessment of Methodology" />

                                        <TextArea
                                            id="assessmentOfMethodology"
                                            name="assessmentOfMethodology"
                                            value={data.assessmentOfMethodology}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('assessmentOfMethodology', e.target.value)}
                                            placeholder="Write Assessment of Methodology"
                                        />

                                        <InputError message={errors.assessmentOfMethodology} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Assessment of Results" />

                                        <TextArea
                                            id="assessmentOfResults"
                                            name="assessmentOfResults"
                                            value={data.assessmentOfResults}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('assessmentOfResults', e.target.value)}
                                            placeholder="Write Assessment of Results"
                                        />

                                        <InputError message={errors.assessmentOfResults} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Assessment of References" />

                                        <TextArea
                                            id="assessmentOfReferences"
                                            name="assessmentOfReferences"
                                            value={data.assessmentOfReferences}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('assessmentOfReferences', e.target.value)}
                                            placeholder="Write Assessment of References"
                                        />

                                        <InputError message={errors.assessmentOfReferences} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Confidential Comments to the Editor" />

                                        <TextArea
                                            id="confidentialCommentsToTheEditor"
                                            name="confidentialCommentsToTheEditor"
                                            value={data.confidentialCommentsToTheEditor}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('confidentialCommentsToTheEditor', e.target.value)}
                                            placeholder="Write Confidential Comments to the Editor"
                                        />

                                        <InputError message={errors.confidentialCommentsToTheEditor} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Additional References or Resources" />

                                        <TextArea
                                            id="additionalReferencesOrResources"
                                            name="additionalReferencesOrResources"
                                            value={data.additionalReferencesOrResources}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('additionalReferencesOrResources', e.target.value)}
                                            placeholder="Write Additional References or Resources"
                                        />

                                        <InputError message={errors.additionalReferencesOrResources} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="bio" value="Completion Timeframe" />

                                        <TextArea
                                            id="completionTimeframe"
                                            name="completionTimeframe"
                                            value={data.completionTimeframe}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('completionTimeframe', e.target.value)}
                                            placeholder="Write about Completion Timeframe"
                                        />

                                        <InputError message={errors.completionTimeframe} className="mt-2" />
                                    </div>

                                    <PrimaryButton className="mt-4" disabled={processing}>
                                        Submit
                                    </PrimaryButton>
                                </form>
                                <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                                    <div className="p-6 text-center">
                                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Success</h2>
                                        <p className='text-gray-900 dark:text-white'>{notification}</p>
                                        <PrimaryButton onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                                            Close
                                        </PrimaryButton>
                                    </div>
                                </Modal>



                            </article>
                        </div>
                    </main>
                </div>
            </div>


        </Layout>
    );
}
