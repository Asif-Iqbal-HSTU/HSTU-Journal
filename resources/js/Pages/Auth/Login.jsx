import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Layout from "@/Layouts/Layout.jsx";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        role: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Layout>

            <Head title="Log in"/>

            <div
                className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
                {/* Log in Heading */}
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">Log In</h2>


                <div
                    className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="username" value="Username"/>

                            <TextInput
                                id="username"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('username', e.target.value)}
                                required
                                placeholder="Enter Username"
                            />

                            <InputError message={errors.username} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="role" value="Log in as"/>

                            <select
                                id="role"
                                name="role"
                                value={data.role}
                                className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                onChange={(e) => setData('role', e.target.value)}
                                required
                            >
                                <option value="">Select role</option>
                                <option value="author">Author</option>
                                <option value="editor">Editor</option>
                                <option value="reviewer">Reviewer</option>
                                <option value="publisher">Publisher</option>
                            </select>

                            <InputError message={errors.role} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password"/>

                            <div className="relative mt-1 w-full">
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'} // Toggle password visibility based on showPassword state
                                    name="password"
                                    value={data.password}
                                    className="pr-10 pl-2 py-2 rounded-md w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {/* Password toggle button */}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-4 py-2 rounded-md focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                >
                                    <
                                        FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}
                                                        className="text-gray-600 dark:text-gray-400"
                                    />

                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            {canResetPassword && (
                                <Link
                                    href={route('register')}
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Not Registered Yet?
                                </Link>
                            )}

                            <PrimaryButton className="ms-4" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

        </Layout>
    );
}
