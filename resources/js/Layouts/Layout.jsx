import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { faCircleQuestion, faUser, faSignOutAlt, faThLarge, faEdit } from '@fortawesome/free-solid-svg-icons';
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

    const { url } = usePage();
    const isActive = (routePath) => url === routePath;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img src="/images/BAUST logo.png" className="h-10 w-auto transition-transform group-hover:scale-105" alt="BAUST Logo" />
                                <div className="flex flex-col">
                                    <span className="text-xl font-extrabold text-gray-900 tracking-tight">BAUST Journal</span>
                                    <span className="text-[10px] text-primary-600 font-bold tracking-[0.2em] uppercase">Academic Portal</span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className={`${isActive('/') ? 'text-primary-600 font-bold' : 'text-gray-600'} hover:text-primary-600 text-sm font-medium transition-colors`}>
                                Home
                            </Link>

                            <Link href={route('backIssues.index')} className={`${isActive('/archive') ? 'text-primary-600 font-bold' : 'text-gray-600'} hover:text-primary-600 text-sm font-medium transition-colors`}>
                                Archive
                            </Link>

                            {user ? (
                                <>
                                    <Link href={route('dashboard')} className={`${isActive('/dashboard') ? 'text-primary-600 font-bold' : 'text-gray-600'} hover:text-primary-600 text-sm font-medium transition-colors`}>
                                        Dashboard
                                    </Link>

                                    {user.role === 'admin' && (
                                        <Link href={route('admin.editors.index')} className={`${isActive('/admin/editors') ? 'text-primary-600 font-bold' : 'text-gray-600'} hover:text-primary-600 text-sm font-medium transition-colors`}>
                                            Manage Editors
                                        </Link>
                                    )}

                                    {user.role === 'editor' && (
                                        <Link href={route('backIssues.create')} className={`${isActive('/editor/back-issue-entry') ? 'text-primary-600 font-bold' : 'text-gray-600'} hover:text-primary-600 text-sm font-medium transition-colors`}>
                                            Back Issue Entry
                                        </Link>
                                    )}

                                    {user.role === 'author' && (
                                        <Link href={route('newManuscriptPage')} className={`${isActive('/newManuscript') ? 'text-primary-600 font-bold' : 'text-gray-600'} hover:text-primary-600 text-sm font-medium transition-colors`}>
                                            New Manuscript
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-gray-600 hover:text-primary-600 text-sm font-medium transition-colors">
                                        Login
                                    </Link>
                                    <Link href={route('register')} className="bg-primary-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary-800 transition-all shadow-lg shadow-primary-900/20">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* User Profile Dropdown */}
                        {user && (
                            <div className="hidden md:flex items-center ml-4">
                                <div className="relative">
                                    <button
                                        onClick={toggleProfileDropdown}
                                        className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold border-2 border-white shadow-sm">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="text-left hidden lg:block">
                                            <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
                                            <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">{user.role}</p>
                                        </div>
                                    </button>

                                    {isProfileDropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                            <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account</p>
                                                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                                            </div>

                                            <Link href={route('dashboard')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                                                <FontAwesomeIcon icon={faThLarge} className="w-4" />
                                                Dashboard
                                            </Link>

                                            {user.role === 'admin' && (
                                                <Link href={route('admin.editors.index')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                                                    <FontAwesomeIcon icon={faEdit} className="w-4" />
                                                    Manage Editors
                                                </Link>
                                            )}

                                            <Link href={route('logout')} method="post" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-gray-50">
                                                <FontAwesomeIcon icon={faSignOutAlt} className="w-4" />
                                                Sign Out
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Mobile Toggle */}
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleMenu} className="p-2 text-gray-600 hover:text-primary-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-50 py-4 px-4 space-y-2">
                        <Link href="/" className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:text-primary-600">Home</Link>
                        <Link href={route('backIssues.index')} className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:text-primary-600">Archive</Link>
                        {user ? (
                            <>
                                <Link href={route('dashboard')} className="block px-4 py-3 rounded-xl bg-primary-50 text-primary-700 font-bold">Dashboard</Link>
                                <Link href={route('logout')} method="post" className="block px-4 py-3 rounded-xl text-red-600 font-medium hover:bg-red-50">Sign Out</Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-50">Login</Link>
                                <Link href={route('register')} className="block px-4 py-3 rounded-xl bg-primary-900 text-white font-bold text-center">Register</Link>
                            </>
                        )}
                    </div>
                )}
            </nav>

            {/* Header / Breadcrumb area */}
            {header && (
                <div className="bg-white border-b border-gray-100 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Floating Help Button */}
            <button
                onClick={() => setShowHelpModal(true)}
                className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl hover:bg-green-700 hover:scale-110 transition-all z-50 flex items-center gap-3 active:scale-95"
            >
                <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
                <span className="font-bold hidden sm:inline text-sm">Customer Support</span>
            </button>

            {/* Modals */}
            {showHelpModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl text-center transform animate-in zoom-in-95 duration-200">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FontAwesomeIcon icon={faCircleQuestion} className="text-3xl" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Need Assistance?</h2>
                        <p className="text-gray-600 mb-8">
                            If you face any issues while using the portal, please contact us at:<br />
                            <span className="text-xl font-black text-primary-600 mt-2 block">01725215111</span>
                        </p>
                        <button
                            onClick={() => setShowHelpModal(false)}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-xl shadow-gray-900/20"
                        >
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
