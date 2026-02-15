import { Link, Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faUsers, faGlobe, faCertificate, faArrowRight, faDownload, faBullhorn, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { faFilePdf, faXmark, faCalendarDays, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Welcome({ auth, latestPapers, editors }) {
    // Slider Content
    const slides = [
        {
            image: "/images/homeslider/1.jpg", // Placeholder - Ideally use asset() if local
            title: "Advancing Knowledge",
            subtitle: "Science & Technology"
        },
        {
            image: "/images/homeslider/2.jpg",
            title: "BAUST Journal",
            subtitle: "Peer Reviewed Excellence"
        },
    ];


    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const [selectedNotice, setSelectedNotice] = useState(null);
    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

    const notices = [
        {
            id: 1,
            title: "Call For Papers – Volume 4 Issue 2, October 2025 – BAUST Journal",
            dept: "Editorial Board",
            date: "Oct 2025",
            description: "We are officially inviting researchers to submit their original work. For this issue, we are implementing a dual-channel submission process to ensure maximum reliability.",
            email: "editor_bj@baust.edu.bd",
            systemLink: route('register'),
            isDualSubmission: true,
            attachment: null
        },
        {
            id: 2,
            title: "Authors can submit their paper(s) year-round.",
            dept: "Editorial Board",
            date: "Ongoing",
            description: "The BAUST Journal accepts high-quality research contributions throughout the year. Our peer-review process is continuous, allowing for flexible publication cycles and timely dissemination of your research findings.",
            attachment: null
        }
    ];

    const openNotice = (notice) => {
        setSelectedNotice(notice);
        setIsNoticeModalOpen(true);
    };

    return (
        <PublicLayout>
            <Head title="Welcome" />

            {/* Hero Section - Split Layout */}
            <div className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

                        {/* Left Col: Fixed Text */}
                        <div className="flex flex-col justify-center px-6 py-16 lg:py-0 lg:pr-12 relative z-10 lg:pl-8">
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-primary-900/50 border border-primary-700/50 text-primary-300 text-xs font-semibold w-fit tracking-wider uppercase backdrop-blur-sm shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                                    ISSN: 2521-5256
                                </span>
                                <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-900/50 border border-blue-700/50 text-blue-300 text-xs font-semibold w-fit tracking-wider uppercase backdrop-blur-sm shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    DOI Prefix: 10.66039
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                                Advancing Knowledge in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent">Multidisciplinary Sciences</span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed font-light">
                                BAUST Journal is a premier multidisciplinary platform for publishing state-of-the-art research across Science, Engineering, Business, and Humanities.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={route('current-issue')}
                                    className="inline-flex justify-center items-center px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-primary-600/30 transform hover:-translate-y-1 group"
                                >
                                    Read Current Issue
                                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex justify-center items-center px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-full font-medium transition-all backdrop-blur-sm hover:border-white/40 transform hover:-translate-y-1"
                                >
                                    Submit Manuscript
                                </Link>
                            </div>
                        </div>

                        {/* Right Col: Image Slider */}
                        <div
                            className="relative h-[400px] lg:h-auto overflow-hidden bg-black"
                            style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
                        >
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    {/* Gradient Overlay REMOVED for clean image */}
                                    {/* <div className="absolute inset-0 bg-gradient-to-t ..."></div> */}

                                    <div className="absolute inset-0 bg-black/20 z-10"></div> {/* Subtle dark overlay for text contrast if needed, otherwise remove too */}

                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[10s]"
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Welcome & Patron */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Chief Patron Card */}
                        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                            <div className="md:w-1/3 bg-gray-100">
                                {/* Placeholder Image */}
                                <img src="/images/vc.jpeg" alt="Chief Patron" className="w-full h-full object-cover object-top" style={{ minHeight: '250px' }} />
                            </div>
                            <div className="md:w-2/3 p-8">
                                <div className="text-sm font-bold text-primary-600 uppercase tracking-wide mb-1">Message from the</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Chief Patron</h3>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faQuoteLeft} className="text-gray-200 text-4xl absolute -top-4 -left-2" />
                                    <p className="text-gray-600 italic relative z-10 pl-6 leading-relaxed">
                                        "Research is the backbone of academic excellence. BAUST Journal provides a vital platform for our researchers to contribute to global knowledge."
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <p className="font-bold text-gray-900">Brig Gen Mohammad Mobarak Hossain Majumder , psc</p>
                                    <p className="text-sm text-gray-500">Vice Chancellor, BAUST</p>
                                </div>
                            </div>
                        </section>

                        {/* Why Publish Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
                                Why Publish in BAUST Journal?
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
                                BAUST Journal is the Platform for publishing state of the art research works in the
                                fields of Engineering, Arts and Sciences, and Business Administration. Scrutinized
                                by national experts in the fields, this journal allows you to present your research
                                work in a peer reviewed publication.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-primary-50 p-4 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                        <FontAwesomeIcon icon={faCertificate} />
                                    </div>
                                    <span className="font-semibold text-gray-800">Peer Reviewed Journal</span>
                                </div>
                                <div className="bg-primary-50 p-4 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                        <FontAwesomeIcon icon={faGlobe} />
                                    </div>
                                    <span className="font-semibold text-gray-800">State of the Art Research</span>
                                </div>
                            </div>
                        </section>

                        {/* Indexed In Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-8 bg-green-500 rounded-full"></span>
                                Indexed & Abstracted In
                            </h2>
                            <div className="flex flex-wrap gap-10 items-center justify-center">
                                <a href="https://www.crossref.org/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity transform hover:scale-105">
                                    <img src="https://assets.crossref.org/logo/crossref-logo-landscape-200.png" alt="Crossref" className="h-12 w-auto" />
                                </a>
                                <a href="https://doi.org/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity transform hover:scale-105">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/DOI_logo.svg/320px-DOI_logo.svg.png" alt="DOI" className="h-10 w-auto" />
                                </a>
                                <a href="https://portal.issn.org/resource/ISSN/2521-5256" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity transform hover:scale-105">
                                    <img src="/images/issn.png" alt="ISSN Portal" className="h-12 w-auto object-contain" />
                                </a>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Notice Board & Quick Links */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Notice Board */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="bg-primary-900 px-6 py-4 flex items-center justify-between">
                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                    <FontAwesomeIcon icon={faBullhorn} /> Notice Board
                                </h3>
                                <span className="text-primary-300 text-xs animate-pulse">Live</span>
                            </div>
                            <div className="p-4 bg-gray-50 h-96 overflow-y-auto custom-scrollbar">
                                <div className="space-y-3">
                                    {notices.map((notice) => (
                                        <button
                                            key={notice.id}
                                            onClick={() => openNotice(notice)}
                                            className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                                    {notice.dept}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-medium">
                                                    {notice.date}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                                                {notice.title}
                                            </h4>
                                            <div className="mt-3 flex items-center text-xs text-primary-600 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                                                View Details <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-[10px]" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ISSN & Stats */}
                        <div className="bg-primary-900 text-white rounded-2xl p-6 shadow-lg text-center">
                            <h4 className="text-primary-200 text-sm uppercase font-semibold">ISSN (Print)</h4>
                            <p className="text-3xl font-bold tracking-widest my-2">2521-5256</p>
                            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-accent">4</div>
                                    <div className="text-xs text-primary-200 uppercase">Volumes</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-accent">Open</div>
                                    <div className="text-xs text-primary-200 uppercase">Access</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Editorial Board Slideshow */}
            {editors && editors.length > 0 && (
                <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <FontAwesomeIcon icon={faUsers} className="text-primary-600" />
                            Editorial Board Members
                        </h2>
                    </div>

                    <div className="flex animate-scroll hover:pause whitespace-nowrap">
                        {[...editors, ...editors].map((member, idx) => (
                            <div key={idx} className="inline-flex items-center gap-4 px-6 py-4 mx-4 bg-gray-50 rounded-xl border border-gray-100 min-w-[320px]">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-primary-200 shadow-sm">
                                    <img
                                        src={member.image_path || '/images/person.png'}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = '/images/person.png' }}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-gray-900 text-base leading-tight">{member.name}</p>
                                    <p className="text-gray-900 text-xs leading-tight">{member.designation}</p>
                                    <p className="text-sm text-primary-600 font-medium mt-1">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes scroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-scroll {
                            animation: scroll 30s linear infinite;
                            display: flex;
                            width: max-content;
                        }
                        .pause:hover {
                            animation-play-state: paused;
                        }
                    ` }} />
                </section>
            )}

            {/* Current Issue Preview */}
            <section id="current-issue" className="py-16 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900">Latest Articles</h2>
                            <p className="mt-2 text-gray-500">Recently published research</p>
                        </div>
                        <Link href={route('current-issue')} className="text-primary-600 hover:text-primary-700 font-medium group flex items-center gap-2">
                            View Full Issue <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {latestPapers && latestPapers.length > 0 ? (
                            latestPapers.map((paper) => (
                                <div key={paper.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">
                                            Vol {paper.volume}, Issue {paper.issue}
                                        </span>
                                    </div>
                                    <Link href={route('article.show', paper.slug || paper.id)} className="block mt-2 flex-grow">
                                        <h3 className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors line-clamp-3">
                                            {paper.title}
                                        </h3>
                                    </Link>
                                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <span className="text-sm text-gray-500 truncate mr-2">
                                            {paper.author?.user?.name || 'Academic Writer'}
                                            {paper.coauthors?.length > 0 && ` et al.`}
                                        </span>
                                        <a
                                            href={route('archive.papers.download.pdf', paper.id)}
                                            className="text-gray-400 hover:text-primary-600 transition-colors p-2"
                                            title="Download PDF"
                                        >
                                            <FontAwesomeIcon icon={faDownload} />
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-gray-500">
                                No articles published yet.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Notice Modal */}
            <Transition appear show={isNoticeModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={() => setIsNoticeModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-0 text-left align-middle shadow-2xl transition-all">
                                    {selectedNotice && (
                                        <>
                                            <div className="bg-primary-900 p-8 text-white relative">
                                                <button
                                                    onClick={() => setIsNoticeModalOpen(false)}
                                                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                                                >
                                                    <FontAwesomeIcon icon={faXmark} className="text-xl" />
                                                </button>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="bg-primary-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-primary-700">
                                                        {selectedNotice.dept}
                                                    </span>
                                                    <div className="flex items-center gap-2 text-sm text-primary-300">
                                                        <FontAwesomeIcon icon={faCalendarDays} className="text-xs" />
                                                        {selectedNotice.date}
                                                    </div>
                                                </div>
                                                <Dialog.Title as="h3" className="text-3xl font-bold leading-tight">
                                                    {selectedNotice.title}
                                                </Dialog.Title>
                                            </div>

                                            <div className="p-8">
                                                <div className="prose prose-primary max-w-none text-gray-600 leading-relaxed mb-8">
                                                    {selectedNotice.description}
                                                </div>

                                                {selectedNotice.isDualSubmission && (
                                                    <div className="space-y-4 mb-8">
                                                        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
                                                            <p className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
                                                                Submission Channels (Please use both)
                                                            </p>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <a
                                                                    href={`mailto:${selectedNotice.email}`}
                                                                    className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-primary-200 hover:border-primary-500 hover:shadow-md transition-all group text-center"
                                                                >
                                                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-2 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                                                        <FontAwesomeIcon icon={faEnvelope} />
                                                                    </div>
                                                                    <span className="text-xs font-bold text-gray-900">Email Submission</span>
                                                                    <span className="text-[10px] text-primary-600 mt-1">{selectedNotice.email}</span>
                                                                </a>
                                                                <Link
                                                                    href={selectedNotice.systemLink}
                                                                    className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-primary-200 hover:border-primary-500 hover:shadow-md transition-all group text-center"
                                                                >
                                                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-2 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                                                        <FontAwesomeIcon icon={faGlobe} />
                                                                    </div>
                                                                    <span className="text-xs font-bold text-gray-900">Submission System</span>
                                                                    <span className="text-[10px] text-primary-600 mt-1">BAUSTJ Online Portal</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-center text-gray-500 italic">
                                                            Important: To ensure your paper is successfully received, please submit using both the email and the online system.
                                                        </p>
                                                    </div>
                                                )}

                                                {selectedNotice.attachment && (
                                                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                                                                <FontAwesomeIcon icon={faFilePdf} />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900">Attachment Found</p>
                                                                <p className="text-xs text-gray-500">Official Document (PDF)</p>
                                                            </div>
                                                        </div>
                                                        <a
                                                            href={selectedNotice.attachment}
                                                            className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95"
                                                        >
                                                            <FontAwesomeIcon icon={faDownload} />
                                                            Download
                                                        </a>
                                                    </div>
                                                )}

                                                <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
                                                    <button
                                                        type="button"
                                                        className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors"
                                                        onClick={() => setIsNoticeModalOpen(false)}
                                                    >
                                                        Close Notice
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </PublicLayout>
    );
}
