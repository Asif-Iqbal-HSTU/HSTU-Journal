import {Link, Head, usePage} from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import ExtraButton from '@/Components/PrimaryButton';
import Layout from "@/Layouts/Layout.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const user = usePage().props.auth.user;

    return (
        <Layout user={user}>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                {/*<div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">*/}
                {/*    {auth.user ? (*/}
                {/*        <Link*/}
                {/*            href={route('dashboard')}*/}
                {/*            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"*/}
                {/*        >*/}
                {/*            {auth.user.name} - Dashboard*/}
                {/*        </Link>*/}
                {/*    ) : (*/}
                {/*        <>*/}
                {/*            <Link*/}
                {/*                href={route('login')}*/}
                {/*                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"*/}
                {/*            >*/}
                {/*                Log in*/}
                {/*            </Link>*/}

                {/*            <Link*/}
                {/*                href={route('register')}*/}
                {/*                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"*/}
                {/*            >*/}
                {/*                Register*/}
                {/*            </Link>*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*</div>*/}

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex justify-center">
                        <img src="./images/logo.png" alt="Description of the image" height={50} width={150} />
                    </div>
                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-8 flex justify-center">
                            <div className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                <div>
                                    <div className="h-14 w-14 bg-green-800/20 dark:bg-white-1200/100 flex items-center justify-center rounded-full">
                                        <img src="./images/writing.png" alt="Description of the image" />
                                    </div>

                                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                        ScholarlyFlow
                                    </h2>

                                    <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                        Welcome to ScholarlyFlow – your seamless solution for academic journal management. Our platform empowers authors, editors, and reviewers to collaborate efficiently and transparently. Authors can easily submit their manuscripts and track the status of their submissions. Editors can assign reviewers, manage feedback, and make informed decisions on submissions. Reviewers can access their allocated papers and provide detailed feedback effortlessly. ScholarlyFlow ensures a streamlined, user-friendly experience for the entire academic publishing process. Join us in advancing academic excellence with ScholarlyFlow.
                                    </p>
                                    <div className="flex items-center gap-4 mt-4">
                                        {auth.user ? (
                                            <>
                                                {auth.user.role === "author" ? (
                                                    <Link href={route('authorDashboard')}>
                                                        <PrimaryButton>
                                                            Dashboard
                                                        </PrimaryButton>
                                                    </Link>
                                                ) : auth.user.role === "Editor" ? (
                                                    <Link href={route('editorDashboard')}>
                                                        <PrimaryButton>
                                                            Dashboard
                                                        </PrimaryButton>
                                                    </Link>
                                                ) : auth.user.role === "reviewer" ? (
                                                    <Link href={route('reviewerDashboard')}>
                                                        <PrimaryButton>
                                                            Dashboard
                                                        </PrimaryButton>
                                                    </Link>
                                                ) : (
                                                    <Link href={route('dashboard')}>
                                                        <PrimaryButton>
                                                            Dashboard
                                                        </PrimaryButton>
                                                    </Link>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <Link href={route('login')}>
                                                    <ExtraButton>
                                                        Login
                                                    </ExtraButton>
                                                </Link>
                                                <Link href={route('register')}>
                                                    <ExtraButton>
                                                        Register
                                                    </ExtraButton>
                                                </Link>
                                            </>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                        <div className="text-center text-sm sm:text-start">&nbsp;</div>

                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0">
                            AutomationApp v1.0.0
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </Layout>
    );
}
