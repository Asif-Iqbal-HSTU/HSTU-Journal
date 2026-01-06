import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Layout({ user, header, children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    // Get the current URL path to detect active route
    const { url } = usePage();

    // Function to determine if the link is active
    const isActive = (routePath) => url === routePath;

    // const user = usePage().props.auth.user;

    return (
        <>
            <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-6 px-4">
                    {/* Left side: Logo */}
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/images/BAUST logo.png" className="h-8" alt="BAUST Logo"/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                             BAUST Journal
                        </span>
                    </Link>

                    {/* Right side: Navbar links and profile */}
                    <div className="flex items-center ml-auto space-x-6 md:space-x-8">
                            <ul className="hidden md:flex font-medium flex-row space-x-8 rtl:space-x-reverse">
                                {user ?
                                    <>
                                        {user.role === 'author' && (
                                            <>
                                                <li>
                                                    <Link href={route('authorDashboard')}
                                                          className={`${isActive('/dashboard/author') ? 'text-blue-700' : 'text-gray-900'} hover:text-blue-700`}>
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={route('newManuscriptPage')}
                                                          className={`${isActive('/newManuscript') ? 'text-blue-700' : 'text-gray-900'} hover:text-blue-700`}>
                                                        New Manuscript
                                                    </Link>
                                                </li>
                                                {/*<li>
                                                    <Link href={route('gotoReviewerPageForAuthor')}
                                                          className={`${isActive('/reviewerlist') ? 'text-blue-700' : 'text-gray-900'} hover:text-blue-700`}>
                                                        Reviewer List
                                                    </Link>
                                                </li>*/}
                                            </>
                                        )
                                        }
                                        {user.role === 'editor' && (
                                            <>
                                                <li>
                                                    <Link href={route('editorDashboard')}
                                                          className={`${isActive('/dashboard/editor') ? 'text-blue-700' : 'text-gray-900'} hover:text-blue-700`}>
                                                        Dashboard
                                                    </Link>
                                                </li>
                                            </>
                                        )
                                        }
                                        {user.role === 'reviewer' && (
                                            <>
                                                <li>
                                                    <Link href={route('reviewerDashboard')}
                                                          className={`${isActive('/dashboard/reviewer') ? 'text-blue-700' : 'text-gray-900'} hover:text-blue-700`}>
                                                        Dashboard
                                                    </Link>
                                                </li>
                                            </>
                                        )
                                        }
                                        <li>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                className="text-gray-900 hover:text-blue-700">
                                                Logout
                                            </Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li>
                                            <Link href={route('login')}
                                                  className={`${isActive('/login') ? 'text-blue-700' : 'text-gray-900'} hover:text-blue-700`}>
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('register')}
                                                  className={`${isActive('/register') ? 'text-blue-700' : 'text-gray-900'} hover:text-blue-700`}>
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                }
                        </ul>

                        {/* Profile image and dropdown */}
                        {user && (
                            <div className="relative">
                                <button
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    onClick={toggleProfileDropdown}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="/images/user.png" alt="user photo"/>
                                </button>

                                {isProfileDropdownOpen && (
                                    <div
                                        className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-700"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                        tabIndex="-1"
                                    >
                                        <div className="py-1" role="none">
                                            <div className="px-4 py-3">
                                                <span
                                                    className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                                                <span
                                                    className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                                {user.email}
                                            </span>
                                            </div>
                                            <ul className="py-1" aria-labelledby="user-menu-button">
                                                {user.role === 'author' && (
                                                    <li>
                                                        <Link href={route('authorDashboard')}
                                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                            Dashboard
                                                        </Link>
                                                    </li>
                                                )}
                                                {user.role === 'editor' && (
                                                    <li>
                                                        <Link href={route('editorDashboard')}
                                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                            Dashboard
                                                        </Link>
                                                    </li>
                                                )}
                                                <li>
                                                    <Link
                                                        href={route('logout')}
                                                        method="post"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                        Sign out
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                        }

                    </div>

                    {/* Floating Help Button */}
                    <button
                        onClick={() => setShowHelpModal(true)}
                        className="fixed bottom-20 right-20 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl hover:bg-green-700 transition z-50 flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
                        <span className="font-medium">Need Help?</span>
                    </button>



                    {/* Help Modal */}
                    {showHelpModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold mb-4 text-center">
                                    Need Help?
                                </h2>
                                <p className="text-gray-700 text-center mb-6">
                                    If you face any problem,<br />
                                    feel free to call at<br />
                                    <span className="font-bold">01725215111</span>
                                </p>

                                <button
                                    onClick={() => setShowHelpModal(false)}
                                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded="false"
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="w-full md:hidden" id="navbar-default">
                            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                {user ?
                                    <>
                                        <li>
                                            <Link href={route('dashboard')}
                                                  className={`${isActive('/dashboard') ? 'text-white bg-blue-700' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3 rounded`}>
                                                Dashboard
                                            </Link>
                                        </li>

                                        {user.role === 'author' && (
                                            <li>
                                                <Link href={route('newManuscriptPage')}
                                                      className={`${isActive('/newManuscript') ? 'text-white bg-blue-700' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3 rounded`}>
                                                    New Manuscript
                                                </Link>
                                            </li>
                                        )
                                        }
                                        <li>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                className={`${isActive('/') ? 'text-white bg-blue-700' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3 rounded`}>
                                                Logout
                                            </Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li>
                                            <Link href={route('login')}
                                                  className={`${isActive('/login') ? 'text-white bg-blue-700' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3 rounded`}>
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('register')}
                                                  className={`${isActive('/register') ? 'text-white bg-blue-700' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3 rounded`}>
                                                Register
                                            </Link>
                                        </li>
                                    </>

                                }
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            {/* Header */}
            {header && (
                <header className="bg-teal-50 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Main content */}
            <main>{children}</main>
        </>
    );
}
