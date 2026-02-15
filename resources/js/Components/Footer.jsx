import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faLinkedin, faResearchgate } from '@fortawesome/free-brands-svg-icons'; // Not installed
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faShareAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <img src="/images/BAUST logo.png" alt="BAUST Logo" className="h-12 w-auto" />
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-white tracking-tight">BAUST Journal</span>
                                <span className="text-xs text-gray-400 uppercase tracking-widest">Academic Excellence</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            A premier platform for cutting-edge research and academic discourse. committed to advancing knowledge across science and technology.
                        </p>
                        <div className="flex space-x-4 mb-6">
                            {[faGlobe, faShareAlt].map((icon, idx) => (
                                <a key={idx} href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <FontAwesomeIcon icon={icon} size="lg" />
                                </a>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-gray-800 flex flex-wrap gap-4 items-center">
                            <a href="https://www.crossref.org/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">
                                <img src="https://assets.crossref.org/logo/crossref-logo-landscape-200.png" alt="Crossref" className="h-8 w-auto bg-gray-100 rounded px-2 py-1" />
                            </a>
                            <a href="https://doi.org/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/DOI_logo.svg/320px-DOI_logo.svg.png" alt="DOI" className="h-7 w-auto bg-gray-100 rounded px-2 py-1" />
                            </a>
                            <a href="https://portal.issn.org/resource/ISSN/2521-5256" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">
                                <img src="/images/issn.png" alt="ISSN Portal" className="h-8 w-auto object-contain" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {['About Us', 'Editorial Board', 'Publication Ethics', 'Current Issue', 'Archives', 'Submission Guidelines', 'Downloads'].map((item) => (
                                <li key={item}>
                                    <Link href={item === 'About Us' ? '/about' :
                                        item === 'Editorial Board' ? '/editorial-board' :
                                            item === 'Publication Ethics' ? '/publication-ethics' :
                                                item === 'Current Issue' ? '/current-issue' :
                                                    item === 'Archives' ? '/archive' : item === 'Downloads' ? '/downloads' : '#'} className="text-sm hover:text-primary-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Authors */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">For Authors</h3>
                        <ul className="space-y-3">
                            {['Submit Manuscript', 'Author Guidelines', 'Copyright Policy', 'Publication Fees', 'Track Submission'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm hover:text-primary-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-primary-500" />
                                <span className="text-sm">
                                    Bangladesh Army University of Science and Technology (BAUST), Saidpur
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faPhone} className="text-primary-500" />
                                <span className="text-sm">+880 1769 675554</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faEnvelope} className="text-primary-500" />
                                <span className="text-sm">journal@baust.edu.bd</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 text-center md:text-left">
                        &copy; {new Date().getFullYear()} BAUST Journal. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-xs hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
