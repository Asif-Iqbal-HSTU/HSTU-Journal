import {Head, router, useForm, usePage} from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import Modal from "@/Components/Modal.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {faArrowLeft, faArrowRight, faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {Inertia} from '@inertiajs/inertia'
export default function EditManuscript() {
    const user = usePage().props.auth.user;
    const { paper } = usePage().props;
    const [currentStep, setCurrentStep] = useState(1);
    const [userID, setUserID] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState(null);
    const [coAuthorCount, setCoAuthorCount] = useState(0);

    console.log(paper.classifications.map((item) => item.name));

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
        type: paper.type || '',
        user_id: paper.user_id || '',
        title: paper.title || '',
        abstract: paper.abstract || '',
        keywords: paper.keywords || '',
        funding: paper.funding || '',
        conflictsOfInterest: paper.conflictsOfInterest || '',
        consentToPolicies: paper.consentToPolicies || '',
        ethicalStatement: paper.ethicalStatement || '',
        language_option: paper.language_option || '',
        comments: paper.comments || '',
        coAuthors: paper.coauthors || [],
        classification: paper.classifications.map((item) => item.name) || [],
        files: {
            docFile: null,
            pdfFile: null,
            zipFile: null,
        },
    });

    // Load the initial form data from the paper prop when the component mounts
    useEffect(() => {
        if (paper) {
            setData((prev) => ({
                ...prev,
                type: paper.type || '',
                user_id: paper.user_id || '',
                title: paper.title || '',
                abstract: paper.abstract || '',
                keywords: paper.keywords || '',
                funding: paper.funding || '',
                conflictsOfInterest: paper.conflictsOfInterest || '',
                consentToPolicies: paper.consentToPolicies || '',
                ethicalStatement: paper.ethicalStatement || '',
                language_option: paper.language_option || '',
                comments: paper.comments || '',
                coAuthors: paper.coauthors || [],
                classification: paper.classifications || [],
                files: {
                    docFile: paper.files?.docFile || null,
                    pdfFile: paper.files?.pdfFile || null,
                    zipFile: paper.files?.zipFile || null,
                },
            }));
            setCoAuthorCount(paper.coauthors ? paper.coauthors.length : 0);
        }
    }, [paper]);

    const steps = [
        { title: 'Article Type' },
        { title: 'Classification' },
        { title: 'Basic Info' },
        { title: 'Co-Author Info' },
        { title: 'Upload Files' },
        { title: 'Fundings & Agreement' },
        { title: 'Language' },
        { title: 'Comments' },
        { title: 'Confirmation' },
    ];

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));

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
            // Check if the classification is already selected
            const existing = data.classification.find((item) => item.name === value);

            let newClassification;
            if (existing) {
                // Remove if already selected
                newClassification = data.classification.filter((item) => item.name !== value);
            } else {
                // Add if not selected
                newClassification = [...data.classification, { name: value }];
            }

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
        router.post(route('updatePaper', { paper_id: paper.id }), formData, {
            onSuccess: () => {
                // setNotification('Paper uploaded');
                // setShowModal(true);
                setNotification('Paper updated');
                setShowModal(true);
                console.log("okay");
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    }

    const renderFormFields = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h2 className="text-lg font-medium mb-4">Article Type Selection</h2>
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
                        <h2 className="text-lg font-medium mb-4">Classification</h2>
                        <div>
                            <label>Select the classifications your paper should satisfy</label>
                            {classifications.map((classification, index) => (
                                <div key={index} className="flex items-center mb-4 mt-2">
                                    <input
                                        type="checkbox"
                                        value={classification}
                                        checked={data.classification.some((item) => item.name === classification)}
                                        onChange={() => handleInputChange('classification', classification)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor={`checkbox-${index}`}
                                           className="ms-2 text-sm font-medium text-gray-900">
                                        {classification}
                                    </label>
                                    {/* Debugging the checkbox state */}
                                    {/*<span>{console.log('Checkbox state:', data.classification.some((item) => item.name === classification))}</span>*/}
                                    {/*<span>{console.log('Classifications in data:', data.classification)}</span>*/}
                                    {/*<span>{console.log('Is checked:', data.classification.some((item) => item.name === classification), 'for', classification)}</span>*/}
                                </div>
                            ))}
                            {errors.classification && <p className="text-red-500">{errors.classification}</p>}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 className="text-lg font-medium">Basic Info</h2>
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
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h2 className="text-lg font-medium">Corresponding Authors</h2>
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
                        <h2 className="text-lg font-medium">Upload Files</h2>
                        <div className="mb-4">
                            <label>Editable File (e.g. .docx)</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange('docFile', e.target.files[0])}
                                className="border rounded w-full py-2 px-3"
                            />
                            {/* Show the file name if it exists */}
                            {data.files.docFile && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Current File: {data.files.docFile.name || paper.files.docFile}
                                </p>
                            )}
                            {errors.docFile && <p className="text-red-500">{errors.docFile}</p>}
                        </div>
                        <div className="mb-4">
                            <label>PDF File</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange('pdfFile', e.target.files[0])}
                                className="border rounded w-full py-2 px-3"
                            />
                            {data.files.pdfFile && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Current File: {data.files.pdfFile.name || paper.files.pdfFile}
                                </p>
                            )}
                            {errors.pdfFile && <p className="text-red-500">{errors.pdfFile}</p>}
                        </div>
                        <div className="mb-4">
                            <label>Zip File</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange('zipFile', e.target.files[0])}
                                className="border rounded w-full py-2 px-3"
                            />
                            {data.files.zipFile && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Current File: {data.files.zipFile.name || paper.files.zipFile}
                                </p>
                            )}
                            {errors.zipFile && <p className="text-red-500">{errors.zipFile}</p>}
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div>
                        <h2 className="text-lg font-medium">Funding Info</h2>

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
                        <h2 className="text-lg font-medium mb-4">Language Option</h2>
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
                        <h2 className="text-lg font-medium">Comments</h2>

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
            case 9:
                return (
                    <div>
                        <h2 className="text-lg font-medium">Confirmation</h2>
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
                                    <h1 className="text-2xl font-bold mb-8">Submit Paper</h1>
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
                                                    className="mt-2"
                                                    onClick={prevStep}
                                                >
                                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                                    Previous
                                                </SecondaryButton>
                                            )}
                                            {currentStep < steps.length && (
                                                <PrimaryButton
                                                    type="button"
                                                    className="mt-2"
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
