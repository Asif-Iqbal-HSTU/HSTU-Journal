import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function AddReviewerForm({ onSuccess }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        affiliation: '',
        academicTitle: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('storeReviewer'), {
            onError: (errorResponse) => {
                setErrorMessages(Object.values(errorResponse)); // Pass errors to the error modal
                setShowErrorModal(true);
            },
            onSuccess,
        });
    };

    return (
        <form className="max-w-full mx-auto m-5" onSubmit={handleSubmit}>
            <div className="mt-4">
                <InputLabel htmlFor="name" value="Name" />
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
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="email"
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="abcd@gmail.com"
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="affiliation" value="Affiliation" />
                <TextInput
                    id="affiliation"
                    name="affiliation"
                    value={data.affiliation}
                    className="mt-1 block w-full"
                    autoComplete="affiliation"
                    onChange={(e) => setData('affiliation', e.target.value)}
                    placeholder="Enter affiliation"
                />
                <InputError message={errors.affiliation} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="academicTitle" value="Academic Title" />
                <select
                    id="academicTitle"
                    name="academicTitle"
                    value={data.academicTitle}
                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                    onChange={(e) => setData('academicTitle', e.target.value)}
                >
                    <option value="">Select an option</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Professor">Professor</option>
                </select>
                <InputError message={errors.academicTitle} className="mt-2" />
            </div>

            <PrimaryButton className="mt-4" disabled={processing}>
                Submit
            </PrimaryButton>
        </form>
    );
}
