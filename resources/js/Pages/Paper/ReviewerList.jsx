import {Head, useForm, usePage} from '@inertiajs/react';
import Layout from '@/Layouts/Layout.jsx';
import dayjs from 'dayjs';

// FontAwesome Icons
import {faFileWord, faFilePdf, faFileArchive, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReviewerCard from "@/Components/ReviewerCard.jsx";
import PaperCard from "@/Components/PaperCard.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function PaperPreview() {
    const { paper } = usePage().props;
    const user = usePage().props.auth.user;

    const { reviewers } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        affiliation: '',
        academicTitle: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('storeReviewer'));
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
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">
                    <div
                        className="block w-full p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                            Add Reviewer
                        </h2>
                        <p className="mt-1 text-sm">
                            Add Your Preferred Reviewer from Here
                        </p>
                        <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700"/>

                        <form className="max-w-full mx-auto m-5" onSubmit={submit}>
                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Name"/>

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter Name"
                                />

                                <InputError message={errors.name} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email"/>

                                <TextInput
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="abcd@gmail.com"
                                />

                                <InputError message={errors.email} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="affiliation" value="Affiliation"/>

                                <TextInput
                                    id="affiliation"
                                    name="affiliation"
                                    value={data.affiliation}
                                    className="mt-1 block w-full"
                                    autoComplete="affiliation"
                                    isFocused={true}
                                    onChange={(e) => setData('affiliation', e.target.value)}
                                    placeholder="Enter affiliation"
                                />

                                <InputError message={errors.affiliation} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="academicTitle" value="Academic Title"/>

                                <select
                                    id="academicTitle"
                                    name="academicTitle"
                                    value={data.academicTitle}
                                    className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                    onChange={(e) => setData('academicTitle', e.target.value)}
                                >
                                    <option value="">Select an option</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Assistant Professor">Assistant Professor</option>
                                    <option value="Associate Professor">Associate Professor</option>
                                    <option value="Professor">Professor</option>
                                </select>

                                <InputError message={errors.academicTitle} className="mt-2"/>
                            </div>

                            <PrimaryButton className="mt-4" disabled={processing}>
                                Submit
                            </PrimaryButton>
                        </form>

                    </div>
                    <div
                        className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                        <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                            Existing Reviewers
                        </h2>
                        <p className="mt-1 text-sm">
                            Here is a List of Existing Reviewer Here
                        </p>
                        <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700"/>
                        {reviewers.map((reviewer) => {

                            return (
                                <ReviewerCard
                                    key={reviewer.id}
                                    reviewer={reviewer}
                                />
                            );
                        })}
                    </div>
                    <hr className="h-px my-2 bg-green-300 border-0 dark:bg-gray-700"/>
                </div>

            </div>
        </Layout>
    );

}
