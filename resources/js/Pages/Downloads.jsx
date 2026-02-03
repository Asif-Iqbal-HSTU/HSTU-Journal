import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileWord, faDownload, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function Downloads() {
    return (
        <PublicLayout>
            <Head title="Downloads" />

            <div className="bg-white py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-12">
                        Downloads
                    </h1>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-2xl mx-auto">
                        <div className="bg-primary-50 px-6 py-8 border-b border-primary-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Manuscript Template</h2>
                            <p className="text-gray-600">Please download and use the official BAUST Journal template for your submission.</p>
                        </div>

                        <div className="p-8">
                            <a
                                href="/downloads/BAUSTJ_Camera_Ready_Template.docx" // Assuming file location, can be updated later
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 md:text-xl transition-transform transform hover:-translate-y-1 shadow-lg"
                            >
                                <FontAwesomeIcon icon={faDownload} className="mr-3" />
                                Download Template (DOCX)
                            </a>
                            <p className="mt-4 text-sm text-gray-400">BAUSTJ_Camera_Ready_Template.docx</p>
                        </div>

                        <div className="bg-red-50 p-6 border-t border-red-100">
                            <div className="flex items-start justify-center gap-3 text-left max-w-lg mx-auto">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 mt-1 flex-shrink-0" size="lg" />
                                <div>
                                    <h3 className="font-bold text-red-800 uppercase tracking-wide text-sm mb-1">Important Note</h3>
                                    <p className="text-red-700 text-sm font-medium">
                                        Authors are kindly requested to strictly follow the BAUSTJ TEMPLATE, which can be downloaded in Word A4 format. If this fails, the BAUSTJ Editorial Board will send it back immediately to the corresponding author with a grumpy note.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
