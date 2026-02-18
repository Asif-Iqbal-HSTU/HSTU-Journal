import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <PublicLayout>
            <Head title="About BAUST Journal" />

            <div className="bg-white py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
                        About BAUST Journal
                    </h1>

                    <div className="prose prose-lg text-gray-500 max-w-none text-justify">
                        <p>
                            The BAUST Journal publishes original research papers, review papers/articles, case studies, and book reviews covering all branches of Engineering, Technology and Science, and Business Research including the fields of Computer Science and Engineering, Electrical and Electronic Engineering, Mechanical Engineering, Industrial and Production Engineering, Civil Engineering, Business Administration, English Language and Literature, Communication Engineering, Basic Science, Biological Science, Social Science, Humanities, Education, Environmental Science, etc.
                        </p>
                        <p>
                            All manuscripts are evaluated by peer reviewers who remain anonymous to ensure high standards. It is a print and online journal which is published twice a year by Bangladesh Army University of Science and Technology (BAUST), Saidpur.
                        </p>
                        <p>
                            The Advisory and Editorial Board members are selected from Institutions and Universities from home and abroad. Selection of the peer reviewers is the sole discretion of the editors.
                        </p>
                        <p>
                            We hope that your publication of articles/papers in such a standard journal would be of immense benefit to shape your academic career.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Aims & Scopes</h2>
                        <p>
                            Our BAUST journal aims to provide academics and scientists worldwide with a forum to discuss, exchange, and promote a range of novel challenges, advancements, and developments in diverse fields of research/study. All manuscripts must be prepared in English and are subject to a rigorous peer-review process.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Areas of Interest</h2>
                        <p>The areas of BAUST Journal include but are not limited to the following fields:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Engineering:</strong> Civil Engineering, Computer Science and Engineering, Electrical and Electronic Engineering, Information and Communication Engineering, Mechanical Engineering, Industrial Production Engineering, Chemical Engineering, Textile Engineering etc.</li>
                            <li><strong>Natural Sciences:</strong> Physics, Chemistry, Mathematics, Statistics, Biology, Material Science, Environmental Science, Geology and Geography, Food Science, Social Science etc.</li>
                            <li><strong>Business and Economics</strong></li>
                            <li><strong>English Language and Literature</strong></li>
                            <li><strong>Management</strong></li>
                            <li><strong>Laws</strong></li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Article Processing Charge (APC)</h2>
                        <div className="bg-green-50 border-l-4 border-primary-500 p-4">
                            <p className="font-bold text-gray-900">BAUST Journal requires no Article Processing Charge (APC)</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
