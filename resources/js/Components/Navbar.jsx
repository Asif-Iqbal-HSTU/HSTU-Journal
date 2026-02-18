import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/images/BAUST logo.png" alt="BAUST Journal" className="h-10 w-auto" />
                            <div className="flex flex-col">
                                <span className={`text-xl font-bold font-sans ${scrolled ? 'text-primary-900' : 'text-gray-900'} leading-tight`}>
                                    BAUST Journal
                                </span>
                                <span className="text-xs text-gray-500 tracking-wider">ACADEMIC EXCELLENCE</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'About', href: '/about' },
                            { name: 'Editorial Board', href: '/editorial-board' },
                            { name: 'Ethics', href: '/publication-ethics' },
                            { name: 'Current Issue', href: '/current-issue' },
                            // { name: 'Archive', href: route('backIssues.index') },
                            { name: 'Archive', href: '/archive' },
                            { name: 'Downloads', href: '/downloads' },
                        ].map((item) => {
                            const isLinkActive = usePage().url === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors hover:text-primary-600 ${isLinkActive
                                        ? 'text-primary-600 font-bold border-b-2 border-primary-600 pb-1'
                                        : (scrolled ? 'text-gray-700' : 'text-gray-800')
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-5 py-2.5 rounded-full bg-primary-900 text-white text-sm font-medium hover:bg-primary-800 transition-shadow shadow-lg shadow-primary-900/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className={`text-sm font-medium ${scrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-primary-600 transition-colors`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-5 py-2.5 rounded-full bg-primary-900 text-white text-sm font-medium hover:bg-primary-800 transition-shadow shadow-lg shadow-primary-900/20"
                                >
                                    Submit Manuscript
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700 hover:text-primary-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'About', href: '/about' },
                            { name: 'Editorial Board', href: '/editorial-board' },
                            { name: 'Current Issue', href: '/current-issue' },
                            { name: 'Archive', href: route('backIssues.index') },
                            { name: 'Downloads', href: '/downloads' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block px-3 py-2 text-base font-medium rounded-md ${usePage().url === item.href
                                    ? 'text-primary-600 bg-primary-50 font-bold'
                                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="w-full text-center px-5 py-3 rounded-lg bg-primary-900 text-white font-medium"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="w-full text-center px-5 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="w-full text-center px-5 py-3 rounded-lg bg-primary-900 text-white font-medium"
                                    >
                                        Submit Manuscript
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
