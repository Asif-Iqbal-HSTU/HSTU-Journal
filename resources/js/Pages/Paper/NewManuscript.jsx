import {Head, router, useForm, usePage} from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import {useState} from "react";
import {toast} from "react-toastify";
import Modal from "@/Components/Modal.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import ReviewerCard from "@/Components/ReviewerCard.jsx";
import TextInput from "@/Components/TextInput.jsx";
import AddReviewerForm  from "@/Components/AddReviewerForm.jsx";
import KeywordField  from "@/Components/KeywordsField.jsx";
// import {Inertia} from '@inertiajs/inertia'
export default function NewManuscript() {
    const user = usePage().props.auth.user;
    const { reviewers } = usePage().props;
    const [currentStep, setCurrentStep] = useState(1);
    const [userID, setUserID] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState(null);
    const [errorMessages, setErrorMessages] = useState([]); // State for error messages
    const [showErrorModal, setShowErrorModal] = useState(false); // State for error modal
    const [showReviewerAddModal, setShowReviewerAddModal] = useState(false);

    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    // Filter reviewers based on search query
    const filteredReviewers = reviewers.filter((reviewer) =>
        reviewer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [formData, setFormData] = useState({
        type: '',
        user_id: '',
        title: '',
        abstract: '',
        keywords: '',
        funding: '',
        conflictsOfInterest: '',
        consentToPolicies: '',
        ethicalStatement: '',
        language_option: '',
        comments: '',
        coAuthors: [],
        classification: [],
        files: {
            docFile: null,
            pdfFile: null,
            zipFile: null,
        },
    });

    const saveStep = (step) => {
        Inertia.post(`/submission/step/${step}`, data, {
            preserveScroll: true,  // Optionally, this keeps the scroll position on the page after the POST request
            onSuccess: () => console.log(`Step ${step} data saved successfully!`),
            onError: (errors) => console.log(`Error saving step ${step}:`, errors),
        });
    };


    const { data, setData, post, processing, errors, reset } = useForm({
        type: '',
        user_id: '',
        title: '',
        abstract: '',
        keywords: '',
        funding: '',
        conflictsOfInterest: '',
        consentToPolicies: '',
        ethicalStatement: '',
        language_option: '',
        comments: '',
        coAuthors: [],
        classification: [],
        files: {
            docFile: null,
            pdfFile: null,
            zipFile: null,
        },
    });

    const [coAuthorCount, setCoAuthorCount] = useState(0);

    const steps = [
        { title: 'Article Type' },
        { title: 'Classification' },
        { title: 'Basic Info' },
        { title: 'Co-Author Info' },
        { title: 'Upload Files' },
        { title: 'Fundings & Agreement' },
        { title: 'Language' },
        { title: 'Reviewers' },
        { title: 'Comments' },
        { title: 'Confirmation' },
    ];

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));

    // const nextStep = () => {
    //     // Call saveStep to save the current step's data before moving to the next one
    //     saveStep(currentStep); // Pass the current step to the saveStep function
    //
    //     // Only move to the next step after saving the current data
    //     setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    // };

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const classifications = [
        "Computer Science & Engineering",
        "Electrical & Electronic Engineering",
        "Civil Engineering",
        "Mechanical Engineering",
        "Architecture",
        "Physics",
        "Chemistry",
        "Mathematics",
        "English Language & Literature",
        "Sociology",
        "Political Science",
        "Philosophy",
        "History"
    ];

    const handleInputChange = (field, value) => {
        if (field === 'classification') {
            // Toggle selection for classification array
            const newClassification = data.classification.includes(value)
                ? data.classification.filter((item) => item !== value) // Remove if already selected
                : [...data.classification, value]; // Add if not selected
            setData({ ...data, classification: newClassification });
        } else {
            setData((prev) => ({ ...prev, [field]: value }));
        }
    };


    const handleCoAuthorChange = (index, field, value) => {
        const updatedCoAuthors = [...data.coAuthors];
        updatedCoAuthors[index] = { ...updatedCoAuthors[index], [field]: value };
        setData((prev) => ({ ...prev, coAuthors: updatedCoAuthors }));
    };

    const handleFileChange = (field, file) => {
        setData((prev) => ({
            ...prev,
            files: { ...prev.files, [field]: file },
        }));
    };

    const submitForm = (e) => {

        e.preventDefault();
        const formData = {
            type: data.type,
            user_id: user.id,
            title: data.title,
            abstract: data.abstract,
            keywords: data.keywords,
            funding: data.funding,
            conflictsOfInterest: data.conflictsOfInterest,
            consentToPolicies: data.consentToPolicies,
            ethicalStatement: data.ethicalStatement,
            language_option: data.language_option,
            comments: data.comments,
            classification: data.classification,
            //files: data.files,
            docFile: data.files.docFile,
            pdfFile: data.files.pdfFile,
            zipFile: data.files.zipFile,
            coAuthors: data.coAuthors,
        };
        router.post(route('storePaper'), formData, {
            onSuccess: () => {
                // setNotification('Paper uploaded');
                // setShowModal(true);
                setNotification('Paper uploaded');
                setShowModal(true);
                setShowErrorModal(false);
                console.log("okay");
            },
            onError: (errors) => {
                //console.log(errors);
                setErrorMessages(Object.values(errors).flat()); // Collect all error messages
                setShowErrorModal(true);
                setShowModal(false);
            }
        });
    }

    const renderFormFields = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Article Type Selection</h1>
                        <div className="mb-4">
                            <label>Article Type</label>
                            <select
                                value={data.type}
                                onChange={(e) => handleInputChange('type', e.target.value)}
                                className="border rounded w-full py-2 px-3 mt-2"
                            >
                                <option value="">Select Article Type</option>
                                <option value="Research Article">Research Article</option>
                                <option value="Review Article">Review Article</option>
                                <option value="Case Study">Case Study</option>
                                <option value="Technical Note">Technical Note</option>
                                <option value="Conference Paper">Conference Paper</option>
                                <option value="Book Review">Book Review</option>
                                <option value="Dataset Description">Dataset Description</option>
                            </select>
                            {errors.type && <p className="text-red-500">{errors.type}</p>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Classification</h1>
                        <div>
                            <label>Select the classifications your paper should satisfy</label>
                            {classifications.map((classification, index) => (
                                <div key={index} className="flex items-center mb-4 mt-2">
                                    <input
                                        type="checkbox"
                                        value={classification}
                                        checked={data.classification.includes(classification)}
                                        onChange={() => handleInputChange('classification', classification)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor={`checkbox-${index}`} className="ms-2 text-sm font-medium text-gray-900">
                                        {classification}
                                    </label>
                                </div>
                            ))}
                            {errors.classification && <p className="text-red-500">{errors.classification}</p>}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Basic Info</h1>
                        <div className="mb-4">
                            <label>Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="border rounded w-full py-2 px-3"
                            />
                            {errors.title && <p className="text-red-500">{errors.title}</p>}
                        </div>
                        <div className="mb-4">
                            <label>Abstract</label>
                            <textarea
                                value={data.abstract}
                                onChange={(e) => handleInputChange('abstract', e.target.value)}
                                className="border rounded w-full py-2 px-3"
                                rows="4"  // Controls height
                            />
                            {errors.abstract && <p className="text-red-500">{errors.abstract}</p>}
                        </div>

                        <div className="mb-4">
                            <label>Keywords</label>
                            <input
                                type="text"
                                value={data.keywords}
                                onChange={(e) => handleInputChange('keywords', e.target.value)}
                                className="border rounded w-full py-2 px-3"
                            />
                            {errors.keywords && <p className="text-red-500">{errors.keywords}</p>}
                        </div>

                        {/*<div className="mb-4">
                            <label>Keywords</label>
                            <KeywordField />
                            {errors.keywords && <p className="text-red-500">{errors.keywords}</p>}
                        </div>*/}
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Corresponding Authors</h1>
                        <div className="mb-4">
                            <label>Number of Co-Authors</label>
                            <input
                                type="number"
                                value={coAuthorCount}
                                onChange={(e) => setCoAuthorCount(Number(e.target.value))}
                                className="border rounded w-full py-2 px-3"
                                min={0}
                            />
                        </div>
                        {Array.from({ length: coAuthorCount }).map((_, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="font-medium">Co-Author {index + 1}</h3>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={data.coAuthors[index]?.name || ''}
                                    onChange={(e) => handleCoAuthorChange(index, 'name', e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                />
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={data.coAuthors[index]?.email || ''}
                                    onChange={(e) => handleCoAuthorChange(index, 'email', e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                        ))}
                    </div>
                );
            case 5:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Upload Files</h1>
                        <div className="mb-4">
                            <label>Editable File (e.g. .docx)</label>
                            <input
                                type="file"
                                accept=".docx"
                                onChange={(e) => handleFileChange('docFile', e.target.files[0])}
                                className="border rounded w-full py-2 px-3"
                            />
                            {errors.docFile && <p className="text-red-500">{errors.docFile}</p>}
                        </div>
                        <div className="mb-4">
                            <label>PDF File</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => handleFileChange('pdfFile', e.target.files[0])}
                                className="border rounded w-full py-2 px-3"
                            />
                            {errors.pdfFile && <p className="text-red-500">{errors.pdfFile}</p>}
                        </div>
                        <div className="mb-4">
                            <label>Zip File</label>
                            <input
                                type="file"
                                accept=".zip,.rar"
                                onChange={(e) => handleFileChange('zipFile', e.target.files[0])}
                                className="border rounded w-full py-2 px-3"
                            />
                            {errors.zipFile && <p className="text-red-500">{errors.zipFile}</p>}
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Funding Info</h1>

                        <div className="mb-4">
                            <label>Funding Information</label>
                            <textarea
                                value={data.funding}
                                onChange={(e) => handleInputChange('funding', e.target.value)}
                                className="border rounded w-full py-2 px-3"
                                rows="4"  // Controls height
                            />
                            {errors.funding && <p className="text-red-500">{errors.funding}</p>}
                        </div>

                        <div className="mb-4">
                            <label>Disclosure of Conflicts of Interest</label>
                            <textarea
                                value={data.conflictsOfInterest}
                                onChange={(e) => handleInputChange('conflictsOfInterest', e.target.value)}
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                            />
                            {errors.conflictsOfInterest && <p className="text-red-500">{errors.conflictsOfInterest}</p>}
                        </div>

                        <div className="mb-4">
                            <label>Ethical Statements</label>
                            <textarea
                                value={data.ethicalStatement}
                                onChange={(e) => handleInputChange('ethicalStatement', e.target.value)}
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                            />
                            {errors.ethicalStatement && <p className="text-red-500">{errors.ethicalStatement}</p>}
                        </div>

                        <div>
                            <div className="flex items-center mb-4 mt-2">
                                <input
                                    type="checkbox"
                                    checked={data.consentToPolicies === 'yes'}
                                    onChange={(e) => handleInputChange('consentToPolicies', e.target.checked ? 'yes' : 'no')}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor='consentToPolicies' className="ms-2 text-sm font-medium text-gray-900">
                                    I agree to the journal's submission policies, including copyright agreements, ethical guidelines, and any specific requirements
                                </label>
                            </div>

                            {errors.consentToPolicies && <p className="text-red-500">{errors.consentToPolicies}</p>}
                        </div>
                    </div>

                );
            case 7:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Language Option</h1>
                        <div className="mb-4">
                            <label>If English is not your first language, has your paper been edited by a native English speaker?</label>
                            <select
                                value={data.language_option}
                                onChange={(e) => handleInputChange('language_option', e.target.value)}
                                className="border rounded w-full py-2 px-3 mt-2"
                            >
                                <option value="">Select an Option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Not Applicable">Not Applicable</option>
                            </select>
                            {errors.language_option && <p className="text-red-500">{errors.language_option}</p>}
                        </div>
                    </div>

                );
            case 8:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Reviewers</h1>
                        <button
                            onClick={() => setShowReviewerAddModal(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Add Reviewer
                        </button>

                        <div className="mb-4">
                            <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                Existing Reviewers
                            </h2>
                            <p className="mt-1 text-sm">Here is a List of Existing Reviewer Here</p>
                            <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700" />

                            {/* Search Bar */}
                            <div className="mb-4">
                                <TextInput
                                    id="search"
                                    name="search"
                                    value={searchQuery}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search reviewers..."
                                />
                            </div>

                            {/* Scrollable Reviewer List */}
                            <div className="max-h-64 overflow-y-auto">
                                {filteredReviewers.map((reviewer) => (
                                    <ReviewerCard key={reviewer.id} reviewer={reviewer} />
                                ))}
                            </div>
                        </div>
                        </div>
                    </div>

                );
            case 9:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Comments</h1>

                        <div className="mb-4">
                            <label>Comments</label>
                            <textarea
                                value={data.comments}
                                onChange={(e) => handleInputChange('comments', e.target.value)}
                                className="border rounded w-full py-2 px-3"
                                rows="4"  // Controls height
                            />
                            {errors.comments && <p className="text-red-500">{errors.comments}</p>}
                        </div>
                    </div>

                );
            case 10:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-8">Confirmation</h1>
                        <div>
                            <p className="font-semibold underline">Type: </p>
                            <p>{data.type}</p>
                            <p className="mt-2 font-semibold underline">Title: </p>
                            <p>{data.title}</p>
                            <p className="mt-2 font-semibold underline">Abstract: </p>
                            <p>{data.abstract}</p>
                            <p className="mt-2 font-semibold underline">Keywords: </p>
                            <p>{data.keywords}</p>
                            <p className="mt-2 font-semibold underline">Classifications: </p>
                            <p>{data.classification.join(', ')}</p>
                            {/*<p>Co-Authors: {JSON.stringify(data.coAuthors, null, 2)}</p>*/}
                            <p className="mt-2 font-semibold underline">
                                Co-Authors:
                            </p>
                            <p>
                                {" "}
                                {data.coAuthors
                                    .map((author) => author.name)
                                    .join(', ')}
                            </p>
                        </div>
                        <PrimaryButton className="mt-2" onClick={submitForm}>
                            Submit
                        </PrimaryButton>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Layout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    New Manuscript
                </h2>
            }
        >
            <Head title="New Manuscript" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="flex justify-center items-center">
                            <div className="flex space-x-8 max-w-screen-lg mx-auto w-full mt-6">
                                <div className="w-1/4">
                                    <ol className="relative text-gray-500 border-l border-gray-200">
                                        {steps.map((step, index) => (
                                            <li key={index}
                                                className={`mb-10 ml-6 ${currentStep === index + 1 ? 'font-bold' : ''}`}>
                                <span
                                    className={`absolute flex items-center justify-center w-8 h-8 ${currentStep > index + 1 ? 'bg-green-200' : 'bg-gray-100'
                                    } rounded-full -left-4 ring-4 ring-white`}
                                >
                                    {currentStep > index + 1 ? (
                                        <svg className="w-3.5 h-3.5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                        </svg>
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </span>
                                                <h3 className="font-medium leading-tight">{step.title}</h3>
                                                <p className="text-sm">Step details here</p>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                <div className="w-3/4 p-8 bg-white rounded-lg shadow-lg">
                                    {/*<h1 className="text-2xl font-bold mb-8">Submit Paper</h1>*/}
                                    <form onSubmit={submitForm}>
                                        {/* <div className="mb-8">
                            {steps.map((step, index) => (
                                <span key={index} className={`step ${currentStep === index + 1 ? 'active' : ''}`}>
                                    {step.title}
                                </span>
                            ))}
                        </div> */}
                                        {renderFormFields()}
                                        <div className="flex justify-between mt-8">
                                            {currentStep > 1 && (
                                                <SecondaryButton
                                                    type="button"
                                                    className=""
                                                    onClick={prevStep}
                                                >
                                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                                    Previous
                                                </SecondaryButton>
                                            )}
                                            {currentStep < steps.length && (
                                                <PrimaryButton
                                                    type="button"
                                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                                    onClick={nextStep}
                                                >
                                                    Next <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                                                </PrimaryButton>
                                            )}
                                        </div>
                                    </form>
                                    <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                                        <div className="p-6 text-center">
                                            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Success</h2>
                                            <p className='text-gray-900 dark:text-white'>{notification}</p>
                                            <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                                                Close
                                            </button>
                                        </div>
                                    </Modal>
                                    {/* Error Modal */}
                                    <Modal show={showErrorModal} onClose={() => setShowErrorModal(false)} maxWidth="md">
                                        <div className="p-6 text-center">
                                            <h2 className="text-2xl font-semibold mb-4 text-red-500">Validation Errors</h2>
                                            <ul className='text-gray-900 dark:text-white'>
                                                {errorMessages.map((error, index) => (
                                                    <li key={index} className="mb-2">{error}</li>
                                                ))}
                                            </ul>
                                            <button onClick={() => setShowErrorModal(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                                                Close
                                            </button>
                                        </div>
                                    </Modal>

                                    <Modal show={showReviewerAddModal} onClose={() => setShowReviewerAddModal(false)} maxWidth="md">
                                        <div className="p-6 text-center">
                                            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Add Reviewer</h2>
                                            <AddReviewerForm onSuccess={() => setShowReviewerAddModal(false)} />
                                            <button
                                                onClick={() => setShowReviewerAddModal(false)}
                                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </Modal>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
